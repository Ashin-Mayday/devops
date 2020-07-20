<template>
  <div>
    <!-- 导航栏 -->
    <div class="g-nav">
      <div class="bar">
        <ul>
          <li>
            <a href="https://yunxin.163.com" target="_blank" class="logo">
              <img :src="logo"/>
            </a>
          </li>
          <li><a>开发者工具箱</a></li>
          <li><a class="a" @click="handleLinkview()">常用链接</a></li>
          <!-- 20200708新增-->
          <li><a class="a" @click="handleExp()">经验分享</a></li>
          <li>
            <a href="https://faq.yunxin.163.com/kb/main/#/" target="_blank">知识库</a>
          </li>
          <li><a class="a" @click="handleManager()">管理后台</a></li>
        </ul>
      </div>
      <div class="g-info" v-if="auth">
          <div>欢迎您：<span class="g-admin">管理员</span><span class="logout" @click="logout()">登出</span></div>
      </div>
    </div>
    <!-- 20200707去掉底-->
    <!-- <div class="g-bottom">
      <div class="left bottom">
        <img :src="neteaseLogo"/>
      </div>
      <div class="right bottom">
        <img :src="yxLogo"/>
      </div>
    </div> -->
  </div>
</template>
<script>
const Base64 = require('js-base64').Base64
export default {
  name: 'HeadFoot',
  data () {
    return {
      logo: require('../assets/image/logo.png'),
      name: '',
      auth: false // 权限
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
/** 导航栏 */
.g-nav {
  color: #fff;
  font-size: 16px;
  line-height: 60px;
  position: fixed;
  background: rgba(28, 43, 65, 1);
  z-index: 100;
  width: 100%;
  display: fixed;
  min-width: 1000px;
}
/** 内置标签栏 */
.bar {
  min-width: 800px;
  margin-left: 7%;
}
/** 取消ul的标签及横向排列 */
ul {
  list-style: none;
  margin: 0;
}
li {
  display: inline;
  margin-left: 41px;
}
/** 导航栏logo图 */
.logo > img{
  height: 30px;
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
.a {
  cursor: pointer;
}
</style>
