<template>
  <div>
    <!-- 导航栏 -->
    <div class="g-nav">
      <div class="bar">
        <div>
          <div id="homeClickDiv" @click="homeUrl()"></div>
          <div id="commClickDiv" @click="commUrl()"></div>
          <a href="https://yunxin.163.com" target="_blank" class="logo">
            <img :src="logo"/>
          </a>
        </div>
        <div><a class="a-link" @click="handleLinkview()">常用链接</a></div>
        <div><a class="a-link" @click="handleExp()">经验分享</a></div>
        <div><a class="a-link" href="https://faq.yunxin.163.com/kb/main/#/" target="_blank">知识库</a></div>
        <div v-if="auth"><a class="a-link" @click="handleManager()">管理后台</a></div>
      </div>
      <div class="g-info" v-if="auth">
          <div>欢迎您：<span class="g-admin">管理员</span><span class="logout" @click="logout()">登出</span></div>
      </div>
    </div>
  </div>
</template>
<script>
const Base64 = require('js-base64').Base64
export default {
  name: 'HeadFoot',
  data () {
    return {
      logo: require('../assets/image/logo_new.png'),
      name: '',
      auth: false // 权限
    }
  },
  methods: {
    homeUrl () {
      window.open('https://yunxin.163.com/', "_blank")
    },
    commUrl () {
      this.$router.push('../linkview')
    },
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
              sessionStorage.removeItem('ext')
            }
          })
      }).catch(() => {
      })
    },
    handleLinkview () {
      this.$router.push('../linkview')
    },
    handleExp () {
      this.$router.push('../experiencesharing')
    },
    handleManager () {
      // 防止重复跳转
      if (this.name !== 'manager') {
        this.$router.push('../manager')
      }
    },
    // 获取权限判断是否需要展示添加页面
    getAuth () {
      if (Base64.decode(sessionStorage.getItem('ext')) === 'devopsManager') {
        this.auth = true
      }
    }
  },
  // 页面创建的时候获取url里面的地址内容
  created () {
    const url = window.location.href
    const name = url.substring(url.lastIndexOf('\/') + 1, url.length)
    this.name = name
  },
  mounted () {
    this.getAuth()
  }
}
</script>
<style lang="css" scoped>
#homeClickDiv {
  height: 66px;
  width: 105px;
  position: absolute;
  cursor: pointer
}
#commClickDiv {
  height: 66px;
  width: 105px;
  position: absolute;
  margin-left: 106px;
  cursor: pointer
}
/** 导航栏 */
.g-nav {
  color: #fff;
  font-size: 16px;
  line-height: 60px;
  position: fixed;
  background: rgba(28, 43, 65, 1);
  z-index: 100;
  width: 100%;
  min-width: 1000px;
}
/** 内置标签栏 */
.bar {
  min-width: 800px;
  width: 80%;
  margin: 0 auto;
  line-height: 60px;
  display: flex;
  align-items: center;
}
.bar > div {
  margin-right:50px;
  font-size: 20px;
}
.bar > div:not(:first-child) {
  font-size: 18px;
  margin-right: 50px;
}
.a-link {
  cursor: pointer;
}
.a-link:hover {
  color: #38A5EE;
}
/** 导航栏logo图 */
.logo > img {
  height: 26px;
  margin-bottom: 3%;
}
/** 针对a标签取消限制 */
a:link {
  color: inherit;
  text-decoration: none;
}
a:focus {
  outline:none;
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
.a-link {
  cursor: pointer;
}
</style>
