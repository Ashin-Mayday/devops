<template>
  <div class="content">
    <!-- 导航栏 -->
    <div class="g-nav">
      <div class="bar">
        <div>
          <a href="https://yunxin.163.com" target="_blank" class="logo">
            <img :src="logo"/>
          </a>
        </div>
        <div><a>开发者工具箱</a></div>
        <div><a href="https://faq.yunxin.163.com" target="_blank">知识库</a></div>
      </div>
      <div class="g-title">
        <span>开发者工具箱</span>
        <span>登录</span>
      </div>
    </div>
    <img class="s-bg" :src="background"/>
    <div class="m-form">
      <!-- 输入账号块 -->
      <div class="m-form-info">
        <div class="info">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 448 512" width="24" height="24" style="fill: rgb(251, 251, 251);">
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>
          </span>
          <input type="text" placeholder="请输入账号" v-model="account" maxlength="32"/>
        </div>
        <hr/>
      </div>
      <!-- 输入密码块 -->
      <div class="m-form-info">
        <div class="info">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 24 24" width="24" height="24" style="fill: rgb(251, 251, 251);"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></svg>
          </span>
          <input type="password" placeholder="请输入密码" v-model="token"/>
        </div>
        <hr/>
      </div>
      <!-- 登录模块 -->
      <div class="m-form-info remember-login">
        <div class="m-form-remember">
            <input type="checkbox" id="remember" v-model="check" checked/>
            <label for="remember">记住密码</label>
        </div>
        <div class="m-form-submit" @click="login()">
          登&nbsp;录
        </div>
      </div>
    </div>
    <!-- 底部logo  -->
    <div class="g-bottom">
      <div class="left bottom">
        <img :src="neteaseLogo"/>
      </div>
      <div class="right bottom">
        <img :src="yxLogo"/>
      </div>
    </div>
  </div>
</template>

<script>
const Base64 = require('js-base64').Base64
// import Base64 from 'js-base64'
// @ is an alias to /src
export default {
  name: 'login',
  data () {
    return {
      logo: require('../assets/image/logo.png'),
      background: require('../assets/image/background.jpg'),
      neteaseLogo: require('../assets/image/neteaseLogo.png'),
      yxLogo: require('../assets/image/yxLogo.png'),
      account: '',
      token: '',
      check: true // 记住密码
    }
  },
  mounted () {
    // 记住密码
    const strAccount = localStorage.getItem('account')
    const strToken = localStorage.getItem('token')
    if (strAccount) {
      this.account = strAccount
      this.check = true
    }
    if (strToken) {
      this.token = Base64.decode(strToken) // 需要解析base64
    }
  },
  methods: {
    // 登录方法
    login () {
      if (!(this.account && this.token)) {
        this.$message.error('账号密码不能为空')
      } else {
        // 请求登陆模块
        this.$api.POST('./php/login/login.php', { account: this.account, token: Base64.encode(this.token), type: 'login' })
          .then( res => {
            // console.log(res)
            if (res.code == 200) {
              // 存储本地，是否记住密码
              if (this.check) {
                localStorage.setItem('account', this.account)
                localStorage.setItem('token', Base64.encode(this.token))
              } else {
                localStorage.removeItem('account')
                localStorage.removeItem('token')
                sessionStorage.removeItem('ext')
              }
              // 先用于当前登陆权限判断
              sessionStorage.setItem('ext', Base64.encode('devopsManager'))
              this.account = ''
              this.token = ''
              if (this.$route.query.redirect) {
                const path = this.$route.query.redirect
                this.$router.push({ path: path })
              } else {
                this.$router.push('linkview')
              }
            } else {
              this.$message.error(res.msg)
            }
          })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.content {
  height: 100%;
  width: 100%;
  background-color: #0e0e0e;
}
/** 导航栏 */
.g-nav {
  color: #fff;
  font-size: 20px;
  position: relative;
  min-width: 800px;
}
/** 内置标签栏 */
.bar {
  width: 80%;
  margin: 0 auto;
  line-height: 86px;
  display: flex;
  align-items: center;
}
.bar > div {
  margin-right: 17px;
  font-size: 20px;
}
.bar > div:last-child {
  font-size: 18px;
  margin-left: 42px;
}
/** 导航栏logo图 */
.logo > img {
  display: inline-block;
  height: 26px;
  width: 144px;
}
/** 针对a标签取消限制 */
a:link {
  color: inherit;
  text-decoration: none;
}
a:focus {
  outline:none;
}
/** 工具箱的title */
.g-title {
  position: absolute;
  left: 15%;
}
.g-title > span:first-child {
  min-width: 600px;
  width: 227px;
  height: 42px;
  color: #fff;
  font-size: 36px;
  font-weight: 400;
  font-family: Arial;
}
.g-title > span:last-child {
  margin-left: 5px;
  font-family: FZLanTingHei;
  font-weight: 700;
  font-size: 18px;
  color: rgb(200, 195, 195);
}

/** 使用绝对定位定位背景图片 */
.s-bg {
  display: inline-block;
  width: 100%;
  height: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

/** 表单form */
.m-form {
  width: 381px;
  height: 260px;
  left: 1258px;
  top: 321px;
  z-index: 24;
  background-color: rgba(7, 8, 12, 0.02);
  border-color: rgb(200, 195, 195);
  border-width: 0px;
  border-style: solid;
  box-shadow: rgba(251, 251, 251, 0.07) 0px 0px 10px 5px;
  font-size: 14px;
  padding: 0px;
  text-align: center;
  line-height: 20px;
  font-weight: normal;
  font-style: normal;
  opacity: 1;
  position: absolute;
  left: 60%;
  top: 25%;
}

/** 账号信息模块 */
.m-form-info {
  margin: 8% 0;
  width: 280px;
  margin-left: 10%;
}
/** 使用flex布局排列 */
.info {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: baseline;
}

/** 图标 */
.info > span {
  display: inline-block;
  width: 40px;
}

/** 输入框 */
.info > input {
  width: 250px;
  padding-left: 10%;
  color: #fff;
  line-height: 20px;
  font-size: 16px;
  margin-right: 18%;
  vertical-align:middle;
  margin-bottom: 2%;
}
/** 分割线 */
hr {
  width: 100%;
}
/** 登陆块 */
.remember-login {
  height: 30px;
  display: flex;
  color: #fff;
  position: relative;
}

/** 登录按钮 */
.m-form-submit {
  color:#fff;
  width: 80px;
  line-height: 30px;
  background: rgb(0, 122, 255);
  position: absolute;
  right: 0;
  cursor: pointer;
}
/** 记住密码模块 */
.m-form-remember {
  width: 80px;
  display: inline-block;
}
/** checkbox */
input[type=checkbox] {
  width: 14px;
  height: 14px;
  background-color: #ffffff;
  border:solid 1px  #dddddd;
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  cursor: default;
  -webkit-appearance: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-transition: background-color ease 0.1s;
  transition: background-color ease 0.1s;
}
label {
  padding-left: 5%;
}
/** 选中checkbox */
#remember:checked {
  background: rgb(0, 122, 255);
}
/** 勾的样式 */
#remember:checked::after{
  content:'';
  position:absolute;
  background:transparent;
  border:#fff solid 2px;
  border-top:none;
  border-right:none;
  height:6px;
  width:10px;
  -moz-transform:rotate(-45deg);
  -ms-transform:rotate(-45deg);
  -webkit-transform:rotate(-45deg);
  transform:rotate(-45deg);
}

/** 底部栏 */
.g-bottom {
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, -50%);
  display: flex;
}
/** 公共栏 */
.bottom {
  display: block;
  width: 50%;
}
/** 图片设置 */
.bottom > img {
  display: inline-block;
  height: 30px;
}
/** 左边的logo */
.left {
  text-align: right;
  border-right: 1px solid rgba(187,187,187,1);
  padding-right: 5%;
}
/** 右边的logo */
.right {
  padding-left: 5%;
}
</style>
