<template>
  <div class="s-content">
    <HeadFoot/>
    <div class="m-content">
      <div class="g-article">
        <div class="g-recommend">
          <div class="recommend">推荐阅读</div>
            <div class="g-link" v-for="(article, num) in topArticleOptions" :key="num">
              <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 512 512" width="10" height="10" style="fill: rgba(42, 107, 242, 0.69);"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
              <a @click="openArticle(article)">[{{ typeOptions[article.postType - 1].label}}] {{ article.title }}</a>
            </div>
          </div>
          <div class="g-notication">
            <div class="recommend">重要通知</div>
            <div class="g-link"  v-for="(annoItem,index) in annoOptions" :key="index" :value="annoItem">
              <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 512 512" width="10" height="10" style="fill: rgba(42, 107, 242, 0.69);"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
              <a :href="annoItem.url">[重要公告] {{ annoItem.content }}</a>
            </div>
          </div>
      </div>
      <div class="g-container">
        <div class="m-container">
          <!-- 文章标题 -->
          <div class="g-tip">
            <svg @click="goExper()" xmlns="http://www.w3.org/2000/svg" class="svg-icon_home" viewBox="0 0 24 24" width="20" height="20" style="fill: rgb(42, 107, 242);"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
            <div> > {{ content.title }}</div>
          </div>
          <div class="g-title">{{ content.title }}</div>
          <!-- 文章信息 -->
          <div class="g-info">
              <img :src="userinfo"/>
              <div>{{ content.author }}</div>
              <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 24 24" width="15" height="15" style="fill: rgb(16, 16, 16);"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
              <div v-if="content.updateTime">{{ content.updateTime }}</div>
              <div v-else>{{ content.publishTime }}</div>
              <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 24 24" width="15" height="15" style="fill: rgb(16, 16, 16);"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>
              <div>{{ content.visitNum }}</div>
              <div v-for="(tagItem,index) in content.postTag" :key="index" class="tagDiv">
                  <div v-if="tagOptions[tagItem - 1]">
                    <div v-if="index==0" class="g-tag">
                      <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="64 64 896 896" width="15" height="15" style="fill: rgb(135, 56, 0);"><path d="M938 458.8l-29.6-312.6c-1.5-16.2-14.4-29-30.6-30.6L565.2 86h-.4c-3.2 0-5.7 1-7.6 2.9L88.9 557.2a9.96 9.96 0 0 0 0 14.1l363.8 363.8c1.9 1.9 4.4 2.9 7.1 2.9s5.2-1 7.1-2.9l468.3-468.3c2-2.1 3-5 2.8-8zM459.7 834.7L189.3 564.3 589 164.6 836 188l23.4 247-399.7 399.7zM680 256c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88zm0 120c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path></svg>
                      <span class="tagItem">{{ tagOptions[tagItem - 1].label }}</span>
                    </div>
                    <div v-else class="g-tag">
                      <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="64 64 896 896" width="15" height="15" style="fill: rgb(19, 82, 0);"><path d="M938 458.8l-29.6-312.6c-1.5-16.2-14.4-29-30.6-30.6L565.2 86h-.4c-3.2 0-5.7 1-7.6 2.9L88.9 557.2a9.96 9.96 0 0 0 0 14.1l363.8 363.8c1.9 1.9 4.4 2.9 7.1 2.9s5.2-1 7.1-2.9l468.3-468.3c2-2.1 3-5 2.8-8zM459.7 834.7L189.3 564.3 589 164.6 836 188l23.4 247-399.7 399.7zM680 256c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88zm0 120c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path></svg>
                      <span class="tagItem">{{ tagOptions[tagItem - 1].label }}</span>
                    </div>
                </div>
              </div>
          </div>
          <!-- 文章内容 -->
          <div class="g-content">
            <ckeditor :editor="editor" v-model="content.content" @ready="onReady" :config="editorConfig"></ckeditor>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeadFoot from '@/components/HeadFoot.vue'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import '@/assets/css/ckeditor.css'
export default {
  name: 'articlecontent',
  components: {
    HeadFoot
  },
  data () {
    return {
      userinfo: require('../assets/image/userinfo.png'),
      annoOptions: [], // 公告
      tagOptions: [], // 标签
      typeOptions: [], // 分类
      id: this.$route.query.id, // 文章id
      topArticleOptions: [], // 前五文章列表
      editor: DecoupledEditor,
      editorConfig: {
        mediaEmbed: { 
						providers: [
					{
						name: 'myprovider',
						url: [
							/^netease.*\.im.*\/quickhtml\/(\w+)/,
							/^yx-web-nosdn\.netease.*/,
							/^vod\.126\.net*/,
							/.*\.mp4\.*/
						],
						html: match => {
							//获取媒体url
							const input = match['input'];
							return (
								'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 70%;">' +
    								`<iframe src="https://${input}" ` +
    									'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
    									'frameborder="0" allowtransparency="true" allowfullscreen="true" allow="encrypted-media">' +
    								'</iframe>' +
    							'</div>'
							);
						}
					}
        ]},
      },
      content: {
        title: '', // 标题
        author: '', // 作者
        updateTime: '', // 更新时间
        publishTime: '', // 发布时间
        visitNum: '', // 观看次数
        postTag: [], // 标签
        content: '' // 内容
      }
    }
  },
  mounted () {
    this.getAnno()
    this.getTag()
    this.getContentById(this.id)
    this.getType()
  },
  methods: {
    onReady (editor) {
      editor.isReadOnly = true
    // Insert the toolbar before the editable area.
    },
    // 前往经验分享
    goExper () {
      this.$router.push('../experiencesharing')
    },
    // 监听表格每行，进行业务跳转查看
    openArticle (row) {
      if (this.$route.path === '/articlecontent') {
        this.getContentById(row.id)
      }
    },
    // 获取分类模块
    getType () {
      this.$api.POST('./php/post/get_post_type.php').then(res => {
        if (res.code === 200) {
          for (const index in res.msg) {
            const options = {
              value: res.msg[index].id,
              label: res.msg[index].name
            }
            this.typeOptions.push(options)
          }
        }
        this.getTopArticle()
      })
    },
    // 获取公告
    getAnno () {
      this.$api.POST('./php/anno/get_anno.php').then(res => {
        if (res.code === 200) {
          for (const index in res.msg) {
            const options = {
              id: res.msg[index].id,
              time: res.msg[index].time,
              content: res.msg[index].content,
              url: res.msg[index].url
            }
            this.annoOptions.push(options)
          }
        }
      })
    },
    // 获取标签模块
    getTag () {
      this.$api.POST('./php/post/get_post_tag.php').then(res => {
        if (res.code === 200) {
          for (const index in res.msg) {
            const options = {
              value: res.msg[index].id,
              label: res.msg[index].name
            }
            this.tagOptions.push(options)
          }
        }
      })
    },
    // 通过id获取文章内容
    getContentById (id) {
      this.$api.POST('./php/post/get_post.php', { id: id }).then(res => {
        // console.log(res)
        if (res.code === 200) {
          for (const index in res.msg) {
            if (res.msg[index].updateTime) {
              var updateTime = this.handleTime(res.msg[index].updateTime)
            } else {
              var publishTime = this.handleTime(res.msg[index].publishTime)
            }
            this.content.title = res.msg[index].title
            this.content.author = res.msg[index].authorName
            this.content.updateTime = updateTime
            this.content.publishTime = publishTime
            this.content.visitNum = res.msg[index].visitNum
            this.content.content = res.msg[index].content
            this.content.postTag = res.msg[index].postTag.split(',')
          }
        }
      })
    },
    // 转换日期
    handleTime (time) {
      var date = new Date(time.replace(/-/g, "/"))
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var nowDate = date.getDate()
      if(month >= 1 && month <= 9) {
        month = "0" + month
      }
      if(nowDate >=0 && nowDate <= 9) {
        nowDate = "0" + nowDate
      }
      var newDate = year + '-' + month + '-' + nowDate
      return newDate
    },
    // 获取前五文章
    getTopArticle () {
      this.topArticleOptions = []
      const params = {
        order: 'DESC',
        orderBy: 'visitNum',
        status: 1,
        page: 1,
        rows: 5
      }
      this.$api.POST('./php/post/get_post_list.php', params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          for (const index in res.msg.list) {
            const options = {
              id: res.msg.list[index].id,
              title: res.msg.list[index].title,
              postTag: res.msg.list[index].postTag,
              postType: res.msg.list[index].postType,
              visitNum: res.msg.list[index].visitNum,
              updateTime: res.msg.list[index].updateTime
            }
            this.topArticleOptions.push(options)
          }
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
.svg-icon_home:hover{
  cursor: pointer;
}
.s-content {
  background-color: #ebebeb;
  width: 100%;
  height: 100%;
}
/** 整个阅读的html */
.g-container {
  width: 50%;
  background: #fff;
  position: absolute;
  top: 90px;
  left: 10%;
  bottom: 20px;
  overflow: auto;
  min-width: 600px;
}
/** 内容模块 */
.m-container {
  /** 20200707修改 */
  width: 95%;
  margin: 0 auto;
}
/** 内容模块最顶层tip模块 */
.g-tip {
  border-bottom: 1px solid #ebebeb;
  font-size: 12px;
  line-height: 30px;
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-bottom: 10px;
}
/** 内容模块title */
.g-title {
  /** 20200712修改 */
  font-size: 3.0vh;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
}
/** 内容模块信息 */
.g-info {
  display: flex;
  align-items: center;
  font-size: 1.3vh;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.g-info > img {
  display: inline-block;
  width: 20px;
}
.g-info > div {
  padding-right: 20px;
  margin-left: 2px;
}
.g-tag {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.tagItem {
  margin-left: 2px;
}
/** 内容 */
.g-content {
  font-size: 16px;
  bottom: 0;
  top: 120px;
}
/** 文章阅读 */
.g-article {
  margin-left: 40px;
  width: 240px;
  height: 400px;
  background: #fff;
  position: absolute;
  top: 90px;
  left: 60%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  min-width: 240px;
}
/** 推荐阅读 */
.g-recommend {
  display: inline-block;
  height: 200px;
  width: 90%;
  margin: 0 auto;
}
.recommend {
  border-bottom: 1px solid #000;
  line-height: 40px;
}
.g-link {
  margin-top: 15px;
  font-size: 12px;
  padding-left: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.g-link  > a {
  margin-left: 8px;
  cursor: pointer;
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
/** 重要通知 */
.g-notication {
  display: inline-block;
  width: 90%;
  margin: 0 auto;
}
/** 表格标签 */
.tagDiv {
  display: inline-block;
}
</style>
<style>
.ck.ck-editor__editable.ck-read-only .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle, .ck.ck-editor__editable.ck-read-only .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle:hover{
  visibility: hidden;
}

</style>
