<template>
  <div class="content">
    <HeadFoot/>
    <div class="g-content">
      <div class="m-title">
        <el-input v-model="title" placeholder="请输入内容" clearable maxlength="100" show-word-limit></el-input>
      </div>
      <div class="m-edit">
        <ckeditor style="border: 1px solid #ccc" :editor="editor" @ready="onReady" :config="editorConfig" v-model="editorData"></ckeditor>
      </div>
      <div class="m-tag">
        <div>
          <span>标签一：</span>
          <el-select size="small" v-model="fisrtTagValue" clearable placeholder="请选择" @change="changeFirstTagNum(fisrtTagValue)">
            <el-option v-for="item in tagOptions" :key="item.value" :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>标签二：</span>
          <el-select v-model="tagValue" size="small" clearable placeholder="请选择" @change="changeTagNum(tagValue)">
            <el-option v-for="item in tagOptions" :key="item.value" :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>分类：</span>
          <el-select v-model="typeValue" size="small" clearable placeholder="请选择">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="publish">
          <span v-if="!id" @click="handle('insert')">发布</span>
          <span v-else @click="handle('update')">更新</span>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeadFoot from '@/components/HeadFoot.vue'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import '@/assets/css/ckeditor.css'
const upload = require('../assets/js/upload')
export default {
  name: 'editor',
  components: {
    HeadFoot
  },
  data () {
    return {
      tagOptions: [], // 标签
      typeOptions: [], // 分类
      firstTagOptions: [], // 第一标签
      tagValue: '',
      tagNum: '', // 编辑时回传记录当前的value
      typeValue: '',
      fisrtTagValue: '',
      firstTagNum: '', // 编辑时回传记录当前的value
      editor: DecoupledEditor,
      editorData: '请输入您的内容',
      editorConfig: {
        extraPlugins: [upload.MyCustomUploadAdapterPlugin],
        fontSize: { options: [8, 10, 'default', 14, 16, 18, 20, 22, 24] },
        fontFamily: { options: ['default',
        'Arial, Helvetica, sans-serif',
        'Courier New, Courier, monospace',
        'Georgia, serif',
        'Lucida Sans Unicode, Lucida Grande, sans-serif',
        'Tahoma, Geneva, sans-serif',
        'Times New Roman, Times, serif',
        'Trebuchet MS, Helvetica, sans-serif',
        'Verdana, Geneva, sans-serif'] },
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
        link: {
          mode: 'automatic',
          callback: url => url.startsWith( 'https://' ),
          attributes: {
            target: '_blank'
          }
        }
      },
      title: '', // 文章title
      id: this.$route.query.id // 编辑跳转的id
    }
  },
  mounted () {
    this.getTag()
    this.getType()
    if (this.id) {
      this.getContentById(this.id)
    }
  },
  methods: {
    // document onReady方式，引入element
    onReady (editor) {
      // editor.isReadOnly = true;
    // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      )
    },
    // 通过id获取文章内容
    getContentById (id) {
      this.$api.POST('./php/post/get_post.php', { id: id }).then(res => {
        // console.log(res)
        const postTag = res.msg[0].postTag.split(',')
        if (res.code === 200) {
          this.title = res.msg[0].title
          this.editorData = res.msg[0].content
          this.typeValue = res.msg[0].postType
          if (this.tagOptions[postTag[0] - 1]) {
            this.firstTagNum = parseInt(postTag[0])
            this.fisrtTagValue = this.tagOptions[postTag[0] - 1].label
          }
          if (this.tagOptions[postTag[1] - 1]) {
            this.tagNum = parseInt(postTag[1])
            this.tagValue = this.tagOptions[postTag[1] - 1].label
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
      })
    },
    // 记录当前的value
    changeFirstTagNum (value) {
      this.firstTagNum = value
    },
    changeTagNum (value) {
      this.tagNum = value
    },
    // 发布
    publish (postTagArr) {
      this.$confirm('是否需要提交文章内容?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.POST('./php/post/set_post.php',
          {
            op: 'insert',
            postType: this.typeValue,
            postTag: JSON.stringify(postTagArr),
            title: this.title,
            content: this.editorData
          }).then(res => {
          if (res.code === 200) {
            this.$router.push('/experiencesharing')
            return true
          }
        })
      }).catch(() => {
      })
    },
    // 文章编辑更新
    update (postTagArr) {
      this.$confirm('是否需要提交文章内容?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.POST('./php/post/set_post.php',
          {
            op: 'update',
            id: this.id,
            postType: this.typeValue,
            postTag: JSON.stringify(postTagArr),
            title: this.title,
            content: this.editorData
          }).then(res => {
          if (res.code === 200) {
            this.$router.push('/experiencesharing')
            return true
          }
        })
      }).catch(() => {
      })
    },
    handle (param) {
      // 不允许为空的判断
      if (this.title && this.editorData && (this.firstTagNum || this.tagNum) && this.typeValue) {
        if (this.firstTagNum !== this.tagNum) {
          const postTagArr = []
          if (this.firstTagNum) {
            postTagArr.push(this.firstTagNum)
          }
          if (this.tagNum) {
            postTagArr.push(this.tagNum)
          }
          // console.log(postTagArr)
          if (param === 'insert') {
            this.publish(postTagArr)
          }
          if (param === 'update') {
            this.update(postTagArr)
          }
        } else {
          this.$message.error('分类标签不能一致')
        }
      } else {
        this.$message.error('请先完善相关信息，再次发布')
      }
    }
  }
}
</script>
<style lang="css" scoped>
.content {
  background-color: #ebebeb;
  width: 100%;
  height: 100%;
  position: relative;
}
/** 输入content */
.g-content {
  width: 80%;
  position: absolute;
  top: 100px;
  left: 10%;
  min-width: 800px;
  bottom: 100px;
}
/** 标题框 */
.m-title {
  width: 80%;
  line-height: 40px;
  margin: 0 auto;
  font-size: 20px;
  font-weight: bold;
}
/** 设置placeholder位置 */
input::-webkit-input-placeholder {
  padding-left: 10px;
}
/** 编辑框 */
.m-edit {
  width: 80%;
  background: #fff;
  margin: 0 auto;
  overflow: auto;
  position: absolute;
  left: 10%;
  bottom: 50px;
  top: 55px;
  background-color: #f2f2f2;
	overflow-x: hidden;
}
/** 标签咧  */
.m-tag {
  display: flex;
  font-size: 16px;
  line-height: 30px;
  justify-content: baseline;
  min-width: 1000px;
  position: absolute;
  bottom: 0;
  left: 10%;
}
/** 标签内的间距 */
.m-tag > div {
  margin: 0 10px;
}
/** 发布按钮 */
.publish {
  font-size: 14px;
  width: 80px;
  height: 30px;
  text-align: center;
  border-radius: 4px;
  background: #000;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
</style>
