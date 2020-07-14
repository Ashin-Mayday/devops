<template>
  <div class="content">
     <Banner/>
     <div class="g-content">
        <!-- search部分 -->
         <div class="m-search">
            <div class="g-hot" :class="[isActive === index ? 'active' : '']"
            @click="getArticleListByParams(index)" v-for="(item,index) in hotBtn" :key="index">
            {{ item }}
          </div>
            <div>标签：
              <el-select v-model="tagValue" clearable placeholder="请选择" @change="tagSearch(tagValue)">
                <el-option v-for="item in tagOptions" :key="item.value"
                :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>分类：
              <el-select v-model="typeValue" clearable placeholder="请选择" @change="typeSearch(typeValue)">
                <el-option v-for="it in typeOptions" :key="it.value" :label="it.label" :value="it.value">
                </el-option>
              </el-select>
            </div>
            <div>关键词：
              <el-input v-model="keywords" placeholder="请输入关键字" class="key"></el-input>
            </div>
            <div class="search" @click="getArticleListByKeywords()">搜索</div>
         </div>
         <!-- 表格内容  -->
         <div class="m-content">
            <div class="g-table">
              <el-table :data="articleOptions.slice((currentPage-1) * pagesize,currentPage * pagesize)" height="100%" @row-click="openArticle">
                <el-table-column prop="title" label="主题" width="180"></el-table-column>
                <el-table-column label="标签" width="240">
                  <template slot-scope="scope">
                    <div v-for="(tagItem,index) in scope.row.postTag.split(',')" :key="index" class="tagDiv">
                      <div v-if="tagOptions[tagItem - 1]">
                        <div v-if="index==0" class="g-tag">
                          <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="64 64 896 896" width="15" height="15" :style="'fill:' + tagColor[tagItem]">
                            <path d="M938 458.8l-29.6-312.6c-1.5-16.2-14.4-29-30.6-30.6L565.2 86h-.4c-3.2 0-5.7 1-7.6 2.9L88.9 557.2a9.96 9.96 0 0 0 0 14.1l363.8 363.8c1.9 1.9 4.4 2.9 7.1 2.9s5.2-1 7.1-2.9l468.3-468.3c2-2.1 3-5 2.8-8zM459.7 834.7L189.3 564.3 589 164.6 836 188l23.4 247-399.7 399.7zM680 256c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88zm0 120c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path>
                          </svg>
                          <span class="tagItem" :style="{'color': tagColor[tagItem]}">{{ tagOptions[tagItem - 1].label }}</span>
                        </div>
                        <div v-else class="g-tag">
                          <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="64 64 896 896" width="15" height="15" :style="'fill:' + tagColor[tagItem]">
                            <path d="M938 458.8l-29.6-312.6c-1.5-16.2-14.4-29-30.6-30.6L565.2 86h-.4c-3.2 0-5.7 1-7.6 2.9L88.9 557.2a9.96 9.96 0 0 0 0 14.1l363.8 363.8c1.9 1.9 4.4 2.9 7.1 2.9s5.2-1 7.1-2.9l468.3-468.3c2-2.1 3-5 2.8-8zM459.7 834.7L189.3 564.3 589 164.6 836 188l23.4 247-399.7 399.7zM680 256c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88zm0 120c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path></svg>
                          <span class="tagItem" :style="{'color': tagColor[tagItem]}">{{ tagOptions[tagItem - 1].label }}</span>
                        </div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="分类" width="160">
                  <template slot-scope="scope">
                    <div>{{ typeOptions[scope.row.postType - 1].label }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="visitNum" label="访问" width="100"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" width="240"></el-table-column>
              </el-table>
              <div class="block">
              <el-pagination layout="prev, pager, next" :total="total" @current-change="current_change">
              </el-pagination>
            </div>
            </div>
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
                <div class="g-link" v-for="(annoItem,index) in annoOptions" :key="index" :value="annoItem">
                  <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 512 512" width="10" height="10" style="fill: rgba(42, 107, 242, 0.69);"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
                  <a :href="annoItem.url">[重要公告] {{ annoItem.content }}</a>
                </div>
              </div>
            </div>
          </div>
     </div>
  </div>
</template>
<script>
import Banner from '@/components/Banner.vue'
export default {
  name: 'experiencesharing',
  components: {
    Banner: Banner // banner组件
  },
  data () {
    return {
      tagColor: [ '#135200', '#135200', '#3D5AFE', '#820014', '#00474F', '#27B148', '#616161','#F50057', '#391085','#A411D1', '#FF6200', '#FF6200'],
      hotBtn: ['最新', '热门'], // 最新、热门
      isActive: 0, // 当前活跃是哪个btn
      tagOptions: [], // 标签
      typeOptions: [], // 分类
      tagValue: '',
      typeValue: '',
      annoOptions: [], // 公告
      articleOptions: [], // 文章列表
      topArticleOptions: [], // 前五文章列表
      total: 0, // 总数
      pagesize: 10, // 每页的条数
      currentPage: 1, // 默认开始页面
      keywords: '' // 关键字
    }
  },
  mounted () {
    this.getTag()
    this.getType()
    this.getAnno()
    this.getArticleListByParams(0)
  },
  methods: {
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
        this.getTopArticle()
      })
    },
    // 获取公告
    getAnno () {
      this.$api.POST('./php/anno/get_anno.php').then(res => {
        if (res.code === 200) {
          for (const index in res.msg) {
            if (index < 5) {
              const options = {
                id: res.msg[index].id,
                time: res.msg[index].time,
                content: res.msg[index].content,
                url: res.msg[index].url
              }
              this.annoOptions.push(options)
            }
          }
        }
      })
    },
    // 根据标签检索
    tagSearch (value) {
      if (this.typeValue) {
        if (value) {
          var params = {}
          params = { order: 'DESC', postTag: value, postType: this.typeValue, status: 1 }
          this.getPostArticle(params)
        } else {
          var params = {}
          params = { order: 'DESC', postType: this.typeValue, status: 1 }
          this.getPostArticle(params)
        }
      } else {
        if (value) {
          var params = {}
          params = { order: 'DESC', postTag: value, status: 1 }
          this.getPostArticle(params)
        } else {
          this.getArticleListByParams(0)
        }
      }
    },
    // 根据分类检索
    typeSearch (value) {
      if (this.tagValue) {
        if (value) {
          var params = {}
          params = { order: 'DESC', postType: value, postTag: this.tagValue, status: 1 }
          this.getPostArticle(params)
        } else {
          var params = {}
          params = { order: 'DESC', postTag: this.tagValue, status: 1 }
          this.getPostArticle(params) 
        }
      } else {
        if (value) {
          var params = {}
          params = { order: 'DESC', postType: value, status: 1 }
          this.getPostArticle(params)
        } else {
          this.getArticleListByParams(0)
        }
      }
    },
    // 根据参数获取文章列表
    getArticleListByParams (index) {
      this.isActive = index
      var params = {}
      if (index === 0) {
        params = { order: 'DESC', status: 1 }
      } else if (index === 1) {
        params = { order: 'DESC', orderBy: 'visitNum', status: 1 }
      }
      this.getPostArticle(params)
    },
    // 根据关键字查询
    getArticleListByKeywords () {
      var params = {}
      if (this.keywords) {
        params = { order: 'DESC', keywords: this.keywords, status: 1 }
        this.getPostArticle(params)
      } else {
        this.$message.error('关键字不能为空')
      }
    },
    // 查询文章post方法
    getPostArticle (params) {
      this.articleOptions = []
      this.$api.POST('./php/post/get_post_list.php', params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.total = res.msg.allCounts
          for (const index in res.msg.list) {
            var time
            if (res.msg.list[index].updateTime) {
              time = res.msg.list[index].updateTime
            } else {
              time = res.msg.list[index].publishTime
            }
            const options = {
              id: res.msg.list[index].id,
              title: res.msg.list[index].title,
              postTag: res.msg.list[index].postTag,
              postType: res.msg.list[index].postType,
              visitNum: res.msg.list[index].visitNum,
              updateTime: time
            }
            this.articleOptions.push(options)
          }
        }
      })
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
    },
    // 监听表格每行，进行业务跳转查看
    openArticle (row) {
      // console.log(row)
      this.$router.push({ path: '/articlecontent', query: { id: row.id } })
    },
    // 切换当前分页
    current_change (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>
<style lang="css" scoped>
.content {
  height: 100%;
  width: 100%;
}
.g-content {
  width: 80%;
  margin: 0 auto;
  margin-top: 2%;
}
.m-search {
  font-size: 16px;
  line-height: 30px;
  width: 80%;
  min-width: 1200px;
  display: flex;
  align-items: center;
}
.m-search > div {
  margin-right: 20px;
}
/** 最新 */
.active {
  display: inline-block;
  width: 80px;
  background: #000;
  text-align: center;
  line-height: 30px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
/** 热门 */
.g-hot {
  display: inline-block;
  width: 80px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #000;
  cursor: pointer;
}
/** search的input */
.key {
  font-size: 14px;
  width: 180px;
}
/** span模拟button */
.search {
  display: inline-block;
  width: 80px;
  background: #000;
  text-align: center;
  line-height: 30px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
/** 内容  */
.m-content {
  /* margin-top: 1%; */
  padding-top: 10px;
  display: flex;
  /* border: 1px solid red; */
  height: 460px;
}
/** 表格 */
.g-table {
  display: inline-block;
  /* width: 1000px; */
  /* border: 1px solid red; */
}
/** 表格标签 */
.tagDiv {
  display: inline-block;
}
.g-tag {
  display: flex;
  align-items: center;
  width: 100px;
}
.tagItem {
  margin-left: 10px;
}
/** 文章 */
.g-article {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  min-width: 240px;
  width: 240px;
  margin-left: 50px;
}
/** 推荐阅读 */
.g-recommend {
  display: inline-block;
  height: 200px;
  /* border: 1px solid red; */
}
.recommend {
  border-bottom: 1px solid #000;
  line-height: 40px;
}
.g-link {
  margin-top: 15px;
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
  /* border: 1px solid red; */
}
/** 分页列表 */
.block {
  width: inherit;
  text-align: center;
}
</style>
