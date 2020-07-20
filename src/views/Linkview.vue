<template>
  <div class="content">
    <Banner/>
    <div class="m-content">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane :label="item.name" :name="item.name" v-for="(item,index) in linkType" :key="index">
          <div class="g-card">
             <el-row :gutter="50">
               <el-col :span="6" v-for="(it,num) in link" :key="num">
                 <div class="g-query" @click="query(num)" @mousemove="handle(num)" @mouseleave="unHandle(num)">
                   <el-card shadow="hover">
                     <div class="g-title">{{ it.label.title }}</div>
                     <div class="g-title-content" v-for="(desc,key) in comment[num]" :key="key">
                         <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" v-if=" desc != ''" viewBox="0 0 512 512" width="10" height="10" style="fill: rgba(42, 107, 242, 0.69);"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
                         <span>{{ desc }}</span>
                     </div>
                     <div class="g-title-content bottom">
                       <span>点击：<span class="num">{{ it.label.visitNum }}次</span></span>
                     </div>
                    </el-card>
                    <span class="active" v-show="it.checked" @click.stop="deleteItem(num)" v-if="auth">一</span>
                 </div>
                </el-col>
                <el-col :span="6" v-if="auth">
                 <div class="g-query" @click="addLinkview(item,index)">
                   <el-card shadow="hover">
                     <div class="g-logo">
                        <span class="icon svg-icon-wrap svg-md svg-md-add-wrap" style="width: 64px; height: 64px; min-width: 64px; min-height: 64px;">
                          <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 24 24" width="90" height="90" style="fill: rgb(24, 144, 255);"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                          </svg>
                        </span>
                     </div>
                    </el-card>
                 </div>
                </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="新增内容" :visible.sync="dialogFormVisible" class="dialog">
      <el-form :model="form">
        <el-form-item label="标题:" :label-width="formLabelWidth">
          <el-input v-model="form.title" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="URL:" :label-width="formLabelWidth">
          <el-input v-model="form.url" maxlength="255" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="添加描述1:" :label-width="formLabelWidth">
          <el-input v-model="form.descOne" maxlength="25" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="添加描述2:" :label-width="formLabelWidth">
          <el-input v-model="form.descTwo" maxlength="25" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <div class="f-search">
      <span>关键词：</span>
      <input type="text" placeholder="请输入关键字" v-model="keywords"/>
      <span class="search" @click="search()">搜索</span>
      <div class="g-link" v-for="(annoItem,index) in annoOptions" :key="index" :value="annoItem">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 512 512" width="10" height="10" style="fill: rgba(42, 107, 242, 0.69);"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
        <a href="javascript:void(0)" @click="skip(annoItem.url)">[重要公告] {{ annoItem.content }}</a>
      </div>
    </div> -->
    <div class="feedback" @click="feedback()">
      <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 640 512" width="24" height="24" style="fill: rgb(16, 16, 16);"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
      <span>意见反馈</span>
    </div>
    <div class="f-info" v-if="infoBack">
      <div class="info">
        <el-input class="textarea" type="textarea" placeholder="反馈内容" v-model="info.content" maxlength="30" show-word-limit></el-input>
        <input v-model="info.contact" placeholder="联系邮箱/电话(必填)"/>
      </div>
      <div class="handleBtn">
        <el-button type="primary" @click="confirm()">确认</el-button>
        <el-button type="danger" @click="feedback()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
const Base64 = require('js-base64').Base64
export default {
  name: 'linkview',
  components: {
    Banner // banner组件
  },
  data () {
    return {
      activeName: '',
      linkType: [], // 标签主题
      link: [], // 标签内容
      comment: [], // 当前简介的内容
      dialogFormVisible: false, // dialog的展示
      annoOptions: [], // 最新的公告
      // dialog中的内容
      form: {
        title: '',
        url: '',
        descOne: '',
        descTwo: ''
      },
      formLabelWidth: '120px', // 设置item的长度
      // 保证知晓是哪个tab
      item: '',
      index: 1,
      keywords: '', // 关键字
      info: { // 反馈信息
        content: '',
        contact: ''
      },
      infoBack: false,
      auth: false // 权限
    }
  },
  methods: {
    // 获取link分类
    getLinkType () {
      this.$api.POST('./php/link/get_link_type.php')
        .then(res => {
          for (const index in res.msg) {
            this.linkType.push(res.msg[index])
          }
          this.activeName = (this.linkType)[0].name
          this.getLinkByType((this.linkType)[0].id)
        })
    },
    // 获取默认第一个link
    getLinkByType (linkType) {
      this.link = [] // 保证每次进来的link数组都是最新获取的
      this.comment = []
      this.$api.POST('./php/link/get_link.php', { linkType: linkType })
        .then(res => {
          for (const index in res.msg) {
            // 处理comment的多种简介情况
            this.handleComment(index, res.msg[index].comment)
            // 给当前每个item添加checked状态，保证处理的都是同一个
            const options = {
              label: res.msg[index],
              checked: false
            }
            this.link.push(options)
          }
        })
    },
    // 处理comment有多种描述情况
    handleComment (index, comment) {
      if (comment == null) {
        this.comment.push(comment)
      } else {
        const strComment = JSON.stringify(comment) // 先把object转成str在操作
        if (strComment.indexOf('&') !== -1) {
          const descOne = strComment.substring(1, strComment.indexOf('&'))
          const descTwo = strComment.substring(strComment.indexOf('&') + 1, strComment.length - 1)
          const descArr = { descOne, descTwo }
          this.comment.push(descArr)
        } else {
          const descArr = { comment } // 保证不会被当成字符串循环
          this.comment.push(descArr)
        }
      }
    },
    // 详细跳转页面
    query (num) {
      const id = (this.link)[num].label.id
      this.$api.POST('./php/set_visit.php', { id: id, type: 2 })
        .then(function (res) {
          // console.log(res)
        })
      // 获取当前link的url
      const url = (this.link)[num].label.url
      // 重定向到URL
      window.open(url,'_blank')
    },
    // 处理出现编辑的UI
    handle (num) {
      this.link[num].checked = true
    },
    unHandle (num) {
      this.link[num].checked = false
    },
    // tab切换
    handleClick (tab, event) {
      this.index = parseInt(tab.index) + 1 // 保证跟linktype一致
      this.getLinkByType(this.index) // 获取相关link
    },
    // 添加相关link
    addLinkview (item, index) {
      this.dialogFormVisible = true
      this.item = item
      this.index = index
    },
    // 删除相关item
    deleteItem (num) {
      // 通过num去获取link的id
      const linkType = this.link[num].label.linkType
      const id = this.link[num].label.id
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.POST('./php/link/set_link.php', { op: 'delete', id: id })
          .then(res => {
            // console.log(res)
            if (res.code === 200) {
              // 重新在获取一次当前link的type分类
              this.getLinkByType(linkType)
            }
          })
      }).catch(() => {
      })
    },
    // 提交表单
    submit () {
      if (!(this.form.title && this.form.url)) {
        this.$message.error('标题和URL不能为空')
      } else {
        // 组件一个params的json
        const params = {
          op: 'insert',
          linkType: this.item.id,
          title: this.form.title,
          url: this.form.url,
          comment: this.form.descOne + '&' + this.form.descTwo
        }
        this.$api.POST('./php/link/set_link.php', params).then(res => {
          if (res.code === 200) {
            this.dialogFormVisible = false
            this.$message({ message: '提交成功', type: 'success' })
            this.getLinkByType(this.item.id)
            this.clearData()
          } else {
            this.$message.error(res.msg + ', code:' + res.code)
          }
        })
      }
    },
    // 提交成功，清空表单数据
    clearData () {
      this.form.title = ''
      this.form.url = ''
      this.form.descOne = ''
      this.form.descTwo = ''
    },
    // 获取公告
    getAnno () {
      this.$api.POST('./php/anno/get_anno.php').then(res => {
        if (res.code === 200) {
          const options = {
            id: res.msg[0].id,
            time: res.msg[0].time,
            content: res.msg[0].content,
            url: res.msg[0].url
          }
          this.annoOptions.push(options)
        }
      })
    },
    // 跳转公告
    skip (url) {
      const id = (this.annoOptions)[0].id
      this.$api.POST('./php/set_visit.php', { id: id, type: 1 })
        .then(function (res) {
          // console.log(res)
        })
      // 重定向到URL
      window.open(url, '_blank')
    },
    // 根据关键字搜索
    search () {
      if (this.keywords) {
        this.getLinkByKeywords(this.keywords, this.index)
      }
    },
    getLinkByKeywords (keywords, index) {
      // console.log(index)
      this.link = [] // 保证每次进来的link数组都是最新获取的
      this.comment = []
      this.$api.POST('./php/link/get_link.php', { keywords: keywords, linkType: index })
        .then(res => {
          for (const index in res.msg) {
            // 处理comment的多种简介情况
            this.handleComment(index, res.msg[index].comment)
            // 给当前每个item添加checked状态，保证处理的都是同一个
            const options = {
              label: res.msg[index],
              checked: false
            }
            this.link.push(options)
          }
        })
    },
    // 意见反馈的展示or隐藏
    feedback () {
      if (this.infoBack) {
        this.infoBack = false
        this.info.content = ''
        this.info.contact = ''
      } else {
        this.infoBack = true
      }
    },
    // 确认提交相关反馈
    confirm () {
      if (this.info.content && this.info.contact) {
        if (this.isPhoneAvailable(this.info.contact) || this.isEmailAvailable(this.info.contact)) {
          this.$api.POST('./php/feedback/set_feedback.php', { op: 'insert', content: this.info.content, contact: this.info.contact })
            .then(res => {
            // console.log(res)
              if (res.code === 200) {
                this.$message({
                  message: '感谢您的反馈',
                  type: 'success'
                })
                this.info.contact = ''
                this.info.content = ''
                this.feedback()
              }
            })
        } else {
          this.$message.error('请填写正确的邮箱/电话')
        }
      } else {
        this.$message.error('反馈信息不能为空')
      }
    },
    isPhoneAvailable (phone) {
      var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!myreg.test(phone)) {
        return false
      } else {
        return true
      }
    },
    isEmailAvailable (emailInput) {
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!myreg.test(emailInput)) {
        return false
      } else {
        return true
      }
    },
    // 获取权限判断是否需要展示添加页面
    getAuth () {
      if (Base64.decode(sessionStorage.getItem('ext')) === 'devopsManager') {
        this.auth = true
      }
    }
  },
  mounted () {
    // 获取link分类
    this.getLinkType()
    this.getAnno()
    this.getAuth()
  }
}
</script>
<style scoped>
@import '../assets/css/manager-dialog.css';
</style>
<style scoped>
.content {
  height: 100%;
  width: 100%;
}
.m-content {
  min-width: 800px;
}
.el-input {
  width: 50%;
}
/** card外层div，控制UI */
.g-query {
  margin-top: 30px;
  min-width: 250px;
  position: relative;
  cursor: pointer;
}
/** 整体card位置 */
.g-card {
  margin: 0 auto;
  margin-top: 30px;
  width: 80%;
}
/** 出现删除的UI */
.active {
  width: 30px;
  height: 30px;
  z-index: 116;
  background-color: rgb(255, 77, 79);
  border-radius: 50%;
  border-width: 1px;
  color: rgb(251, 251, 251);
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
  opacity: 1;
  position: absolute;
  right: -10px;
  top: -10px;
}
.active:hover {
  cursor: pointer;
}
.g-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 17px;
}
/** card的content */
.g-title-content {
  line-height: 20px;
  font-size: 12px;
}

/** content之间的调优 */
.g-title-content > span {
  margin-left: 2%;
}

/** 最后累计的次数 */
.bottom {
  text-align: right;
}
.num {
  color: rgb(42, 107, 242);
}

/** search模块 */
.f-search {
  position: absolute;
  font-size: 14px;
  z-index:10;
  left: 50%;
  margin-top: 0.6%;
}

/** search的input */
.f-search > input {
  margin-left: 20px;
  border: 1px solid #dcdfe6;
  line-height: 30px;
  text-indent: 10px;
}
input::-webkit-input-placeholder {
  position: relative;
}
/** span模拟button */
.search {
  display: inline-block;
  width: 80px;
  background: #000;
  margin-left: 40px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
}
/** 意见反馈 */
.feedback {
  border: 1px solid rgb(187, 187, 187);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
  height: 120px;
  position: fixed;
  right: 5px;
  bottom: 190px;
  padding: 12px;
  z-index: 20;
  cursor: pointer;
}
.feedback > span {
  font-size: 14px;
  margin-top: 2px;
  line-height: 18px;
}
/** 添加图标 */
.g-logo {
  text-align: center;
}
.g-link {
  display: inline-block;
  margin-left: 100px;
}
.g-link  > a {
  margin-left: 8px;
}
/** 鼠标移动上去效果 */
a:hover {
  color: rgba(42, 107, 242, 1)
}
/** 针对a标签取消限制 */
a:link {
  color: inherit;
  text-decoration: none;
}
a:focus {
  outline: none;
}
/** 意见反馈信息 */
.f-info {
  width: 300px;
  height: 180px;
  position: fixed;
  border: 2px solid rgb(7, 8, 12);
  background-color: rgb(251, 251, 251);
  box-shadow: rgba(251, 251, 251, 0.07) 0px 0px;
  right: 50px;
  text-align: center;
  bottom: 150px;
}
.info:first-child {
  margin-top: 10px;
}
.info > input {
  border-bottom: 1px solid rgba(187,187,187,1);
  width: 240px;
  font-size: 12px;
  text-indent: 5px;
  padding-bottom: 2px;
}
.handleBtn {
  text-align: right;
  margin-right: 30px;
}
</style>
<!--element 样式定制 20200704新增-->
<style>
  .el-tabs__item {
    padding: 1% 6%;
    height: 1%;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 18px;
    color: #303133;
    width: 150px;
  }
  .el-tabs__item.is-active {
    color: #ffffff;
    background: #2A6BF2;
  }

  .el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2) {
    padding-left: 30px;
  }

  .el-tabs__header {
    padding: 0;
    position: relative;
     margin: 0 0 0px;
  }

  .el-button{
    line-height: 0.5;
  }

  .el-textarea__inner{
    line-height: 1.0;
  }

  .el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2) {
    padding-left: 6%;
  }
</style>
