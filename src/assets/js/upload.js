import SDK from '../js/NIM_Web_SDK_v7.7.0'

class MyUploadAdapter {
  constructor (loader) {
    // 要在上载期间使用的文件加载器实例
    this.loader = loader
  }

  // 启动上载过程
  upload () {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        this._initListeners(resolve, reject, file)
      }))
  }

  // 初始化 上传图片 监听.
  _initListeners (resolve, reject, file) {
    // 转成base64上传
    var fileBase
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      fileBase = e.target.result
    }
    var nim = SDK.NIM.getInstance({
      debug: false, // 是否开启日志，将其打印到console。集成开发阶段建议打开。
      appKey: 'f097ff62d4aa8e0a6dbb138c96d492c7',
      account: 'liuxuanlin',
      token: '123456',
      db: false, // 若不要开启数据库请设置false。SDK默认为true。
      onconnect: onConnect,
      onwillreconnect: onWillReconnect,
      ondisconnect: onDisconnect,
      onerror: onError
    })
    function onConnect () {
      console.log('连接成功')
      nim.previewFile({
        type: 'image',
        dataURL: fileBase,
        uploadprogress: function (obj) {
          console.log('文件总大小: ' + obj.total + 'bytes')
          console.log('已经上传的大小: ' + obj.loaded + 'bytes')
          console.log('上传进度: ' + obj.percentage)
          console.log('上传进度文本: ' + obj.percentageText)
        },
        done: function (error, file) {
          console.log('上传image' + (!error ? '成功' : '失败'))
          // show file to the user
          if (!error) {
            console.log(file)
            resolve({
              default: file.url
            })
            nim.disconnect()
          }
        }
      })
    }
    function onWillReconnect (obj) {
      // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
      console.log('即将重连')
      console.log(obj.retryCount)
      console.log(obj.duration)
    }
    function onDisconnect (error) {
      // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
      console.log('丢失连接')
      console.log(error)
      if (error) {
        switch (error.code) {
          // 账号或者密码错误, 请跳转到登录页面并提示错误
          case 302:
            break
            // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
          case 417:
            break
            // 被踢, 请提示错误后跳转到登录页面
          case 'kicked':
            break
          default:
            break
        }
      }
    }
    function onError (error) {
      console.log(error)
    }
  }
}

function MyCustomUploadAdapterPlugin (editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // 在这里将URL配置为后端上载脚本
    return new MyUploadAdapter(loader)
  }
}

export {
  MyUploadAdapter,
  MyCustomUploadAdapterPlugin
}
