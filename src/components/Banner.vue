<template>
  <!-- 导航栏 -->
    <div class="g-nav">
      <div class="bar">
        <div>
          <a href="https://yunxin.163.com" target="_blank" class="logo">
            <img :src="logo"/>
          </a>
        </div>
        <div><a>开发者工具箱</a></div>
        <div><a class="a" @click="handleLinkview()">常用链接</a></div>
        <div><a class="a" @click="handleExp()">经验分享</a></div>
        <div><a href="https://faq.yunxin.163.com/kb/main/#/" target="_blank">知识库</a></div>
        <div><a class="a" @click="handleManager()">管理后台</a></div>
        <div class="g-info" v-if="auth">
          <div>欢迎您：<span class="g-admin">管理员</span><span class="logout" @click="logout()">登出</span></div>
        </div>
      </div>
      <div class="g-title">
        <span>开发者工具箱</span>
        <span>{{ name }}</span>
      </div>
      <div class="g-tools">
        <div class="tools" @click="openUrl(0)">
          <div class="svg">
            <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon an-icon ant-read" viewBox="64 64 896 896" width="32" height="32" style="fill: rgb(255, 255, 255);"><path d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 0 0 324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3 6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39zm563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5 48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888v488zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5zM396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5z"></path>
            </svg>
          </div>
          <div class="desc">
            <div>开发者宝典</div>
            <div>一天快速接入SDK</div>
          </div>
        </div>
        <div class="tools" @click="openUrl(1)">
          <div class="svg">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svg-icon svg-md-weekend" width="32" height="32" viewBox="0 0 24 24" style="fill: rgb(255, 255, 255);"><path d="M21 10c-1.1 0-2 .9-2 2v3H5v-3c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2zm-3-5H6c-1.1 0-2 .9-2 2v2.15c1.16.41 2 1.51 2 2.82V14h12v-2.03c0-1.3.84-2.4 2-2.82V7c0-1.1-.9-2-2-2z"></path>
            </svg>
          </div>
          <div class="desc">
            <div>近期沙龙活动</div>
            <div>网易大咖面对面聊5G</div>
          </div>
        </div>
        <div class="tools" @click="openUrl(2)">
          <div class="svg">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svg-icon svg-md-public" width="32" height="32" viewBox="0 0 24 24" style="fill: rgb(255, 255, 255);"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
            </svg>
          </div>
          <div class="desc">
            <div>好友推荐计划</div>
            <div>高额返利任性聊</div>
          </div>
        </div>
        <div class="tools" @click="openUrl(3)">
          <div class="svg">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svg-icon fa-svg-icon svg-fa-handshake" width="32" height="32" viewBox="0 0 640 512" style="fill: rgb(255, 255, 255);"><path d="M519.2 127.9l-47.6-47.6A56.252 56.252 0 0 0 432 64H205.2c-14.8 0-29.1 5.9-39.6 16.3L118 127.9H0v255.7h64c17.6 0 31.8-14.2 31.9-31.7h9.1l84.6 76.4c30.9 25.1 73.8 25.7 105.6 3.8 12.5 10.8 26 15.9 41.1 15.9 18.2 0 35.3-7.4 48.8-24 22.1 8.7 48.2 2.6 64-16.8l26.2-32.3c5.6-6.9 9.1-14.8 10.9-23h57.9c.1 17.5 14.4 31.7 31.9 31.7h64V127.9H519.2zM48 351.6c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.9-7.2 16-16 16zm390-6.9l-26.1 32.2c-2.8 3.4-7.8 4-11.3 1.2l-23.9-19.4-30 36.5c-6 7.3-15 4.8-18 2.4l-36.8-31.5-15.6 19.2c-13.9 17.1-39.2 19.7-55.3 6.6l-97.3-88H96V175.8h41.9l61.7-61.6c2-.8 3.7-1.5 5.7-2.3H262l-38.7 35.5c-29.4 26.9-31.1 72.3-4.4 101.3 14.8 16.2 61.2 41.2 101.5 4.4l8.2-7.5 108.2 87.8c3.4 2.8 3.9 7.9 1.2 11.3zm106-40.8h-69.2c-2.3-2.8-4.9-5.4-7.7-7.7l-102.7-83.4 12.5-11.4c6.5-6 7-16.1 1-22.6L367 167.1c-6-6.5-16.1-6.9-22.6-1l-55.2 50.6c-9.5 8.7-25.7 9.4-34.6 0-9.3-9.9-8.5-25.1 1.2-33.9l65.6-60.1c7.4-6.8 17-10.5 27-10.5l83.7-.2c2.1 0 4.1.8 5.5 2.3l61.7 61.6H544v128zm48 47.7c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.9-7.2 16-16 16z"></path>
            </svg>
          </div>
          <div class="desc">
            <div>合作共创</div>
            <div>加入云信合作伙伴计划</div>
          </div>
        </div>
        <div class="tools info">
          <div class="tip">关注我们：</div>
          <div class="svg">
            <div class="image" @mouseenter="handleWechat()" @mouseleave="handleWechat()">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svg-icon fa-svg-icon svg-fa-weixin" width="22" height="22" viewBox="0 0 576 512" style="fill: rgb(255, 255, 255);"><path d="M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2.1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3.1 10-9.9 19.6-24.4 19.6z"></path>
              </svg>
              <img v-if="wechatIf" :src="wechat"/>
            </div>
            <div class="image" @mouseenter="handleWeibo()" @mouseleave="handleWeibo()">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svg-icon fa-svg-icon svg-fa-weibo" width="22" height="22" viewBox="0 0 512 512" style="fill: rgb(255, 255, 255);"><path d="M407 177.6c7.6-24-13.4-46.8-37.4-41.7-22 4.8-28.8-28.1-7.1-32.8 50.1-10.9 92.3 37.1 76.5 84.8-6.8 21.2-38.8 10.8-32-10.3zM214.8 446.7C108.5 446.7 0 395.3 0 310.4c0-44.3 28-95.4 76.3-143.7C176 67 279.5 65.8 249.9 161c-4 13.1 12.3 5.7 12.3 6 79.5-33.6 140.5-16.8 114 51.4-3.7 9.4 1.1 10.9 8.3 13.1 135.7 42.3 34.8 215.2-169.7 215.2zm143.7-146.3c-5.4-55.7-78.5-94-163.4-85.7-84.8 8.6-148.8 60.3-143.4 116s78.5 94 163.4 85.7c84.8-8.6 148.8-60.3 143.4-116zM347.9 35.1c-25.9 5.6-16.8 43.7 8.3 38.3 72.3-15.2 134.8 52.8 111.7 124-7.4 24.2 29.1 37 37.4 12 31.9-99.8-55.1-195.9-157.4-174.3zm-78.5 311c-17.1 38.8-66.8 60-109.1 46.3-40.8-13.1-58-53.4-40.3-89.7 17.7-35.4 63.1-55.4 103.4-45.1 42 10.8 63.1 50.2 46 88.5zm-86.3-30c-12.9-5.4-30 .3-38 12.9-8.3 12.9-4.3 28 8.6 34 13.1 6 30.8.3 39.1-12.9 8-13.1 3.7-28.3-9.7-34zm32.6-13.4c-5.1-1.7-11.4.6-14.3 5.4-2.9 5.1-1.4 10.6 3.7 12.9 5.1 2 11.7-.3 14.6-5.4 2.8-5.2 1.1-10.9-4-12.9z"></path>
              </svg>
              <img v-if="weiboIf" :src="weibo"/>
            </div>
            <div class="image" @mouseenter="handleGithub()" @mouseleave="handleGithub()">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svg-icon fa-svg-icon svg-fa-github" width="22" height="22" viewBox="0 0 496 512" style="fill: rgb(255, 255, 255);"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
              <img v-if="githubIf" :src="github"/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
const Base64 = require('js-base64').Base64
export default {
  name: 'banner',
  data () {
    return {
      logo: require('../assets/image/logo.png'),
      background: require('../assets/image/background.jpg'),
      wechat: require('../assets/image/wechat.jpg'),
      weibo: require('../assets/image/weibo.jpg'),
      github: require('../assets/image/github.jpg'),
      wechatIf: false,
      weiboIf: false,
      githubIf: false,
      name: '',
      auth: false // 判断权限
    }
  },
  // 页面创建的时候获取url里面的地址内容
  created () {
    const url = window.location.href
    const name = url.substring(url.lastIndexOf('\/') + 1, url.length)
    if (name === 'linkview') {
      this.name = '常用链接'
    } else {
      this.name = '经验分享'
    }
  },
  methods: {
    logout () {
      this.$confirm('是否需要退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.POST('./php/login/login.php', { type: 'logout' })
          .then(res => {
            if (res.code === 200) {
              this.$router.push('/')
              localStorage.removeItem('ext')
            }
          })
      }).catch(() => {
      })
    },
    handleWechat () {
      if (this.wechatIf) {
        this.wechatIf = false
      } else {
        this.wechatIf = true
      }
    },
    handleWeibo () {
      if (this.weiboIf) {
        this.weiboIf = false
      } else {
        this.weiboIf = true
      }
    },
    handleGithub () {
      if (this.githubIf) {
        this.githubIf = false
      } else {
        this.githubIf = true
      }
    },
    handleLinkview () {
      if (this.name !== '常用链接') {
        this.$router.push('../linkview')
      }
    },
    handleExp () {
      if (this.name !== '经验分享') {
        this.$router.push('../experiencesharing')
      }
    },
    handleManager () {
      this.$router.push('../manager')
    },
    // 链接不同的url
    openUrl (value) {
      switch (value) {
        case 0:
          window.open('https://bbs.yunxin.163.com/forum.php?mod=viewthread&tid=1920&extra=page%3D1', '_blank')
          break
        case 1:
          window.open('https://mctalk.yunxin.163.com', '_blank')
          break
        case 2:
          window.open('https://yunxin.163.com/promotion/recommend', '_blank')
          break
        case 3:
          window.open('https://yunxin.163.com/partner', '_blank')
          break
      }
    },
    // 获取权限判断是否需要展示添加页面
    getAuth () {
      if (Base64.decode(localStorage.getItem('ext')) === 'devopsManager') {
        this.auth = true
      }
    }
  },
  mounted () {
    this.getAuth()
  }
}
</script>
<style lang="css" scoped>
/** 导航栏 */
.g-nav {
  width: 100%;
  color: #fff;
  font-size: 20px;
  height: 25%;
  background-color: #0e0e0e;
  background-image: url('../assets/image/banner.png');
  background-repeat: no-repeat;
  position: relative;
  min-width: 1000px;
}
/** 内置标签栏 */
.bar {
  width: 80%;
  margin: 0 auto;
  line-height: 66px;
  display: flex;
  align-items: center;
}
.bar > div {
  margin-right: 17px;
  font-size: 20px;
}
.bar > div:not(:first-child) {
  font-size: 18px;
  margin-right: 50px;
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
  line-height: 30px;
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
/** tools */
.g-tools {
  width: 100%;
  position: absolute;
  bottom: 0;
  background: rgba(255, 255, 255, 0.16);
  min-width: 800px;
  font-size: 14px;
  line-height: 22px;
  height: 56px;
  display: flex;
  align-items: center;
}
.g-tools > div:first-child {
  margin-left: 200px;
}
/** tools公共模块 */
.tools {
  width: 180px;
  display: inline-block;
  margin-right: 50px;
  cursor: pointer;
}
.svg {
  display: inline-block;
}
/** 文字及svg的距离 */
.desc {
  display: inline-block;
  margin-left: 25px;
}
/** 上下字体大小 */
.desc > div:first-child {
  font-size: 14px;
}
.desc > div:last-child {
  font-size: 10px;
}
/** 分享内容排版 */
.info {
  display: flex;
  align-items: center;
  width: 200px;
}
.tip {
  display: inline-block;
  font-size: 14px;
}
.svg > div {
  display: inline-block;
}
.image {
  width: 22px;
  height: 22px;
  margin-left: 12px;
  position: relative;
}
/** 二维码图片 */
.image > img {
  position: absolute;
  z-index: 99;
  top: 42px;
  left: -30px;
}
.a {
  cursor: pointer;
}
/** 登录信息 */
.g-info {
  display: inline-block;
  position: absolute;
  right: 40px;
  top: 0;
}
/** 信息间隔 */
.g-admin {
  margin-right: 60px;
}
.logout:hover {
  cursor: pointer;
}
</style>
