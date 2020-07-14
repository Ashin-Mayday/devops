<template>
  <div class="g-content">
    <!-- 标签 -->
    <div class="m-tag">
      <div>
        <span>标签一：</span>
        <el-select v-model="tagValue" clearable placeholder="请选择" size="mini" @change="tagSearch(tagValue)" class="select">
          <el-option v-for="item in tagOptions" :key="item.value" :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>分类：</span>
            <el-select v-model="typeValue" clearable placeholder="请选择" size="mini" @change="typeSearch(typeValue)" class="select">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
      </div>
      <div>
        <span>关键字：</span>
          <input v-model="keywords" placeholder="请输入关键字" class="key"/>
      </div>
      <div class="search" @click="getArticleListByKeywords()">搜索</div>
      <div class="newArticle" @click="addArticle()">新文章</div>
    </div>
          <!-- 表格 -->
          <div class="table">
            <div class="m-table">
                <el-table :data="articleOptions.slice((currentPage-1) * pagesize,currentPage * pagesize)" height="100%">
                  <el-table-column prop="title" label="主题" width="180"></el-table-column>
                  <el-table-column prop="tag" label="标签" width="240">
                    <template slot-scope="scope">
                    <div v-for="(tagItem,index) in scope.row.postTag.split(',')" :key="index" class="tagDiv">
                      <div v-if="tagOptions[tagItem - 1]">
                        <div v-if="index==0" class="g-tag">
                          <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="64 64 896 896" width="15" height="15" :style="'fill:' + tagColor[tagItem]">
                            <path d="M938 458.8l-29.6-312.6c-1.5-16.2-14.4-29-30.6-30.6L565.2 86h-.4c-3.2 0-5.7 1-7.6 2.9L88.9 557.2a9.96 9.96 0 0 0 0 14.1l363.8 363.8c1.9 1.9 4.4 2.9 7.1 2.9s5.2-1 7.1-2.9l468.3-468.3c2-2.1 3-5 2.8-8zM459.7 834.7L189.3 564.3 589 164.6 836 188l23.4 247-399.7 399.7zM680 256c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88zm0 120c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path></svg>
                          <span class="tagItem" :style="{'color': tagColor[tagItem]}">{{ tagOptions[tagItem-1].label }}</span>
                        </div>
                        <div v-else class="g-tag">
                          <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="64 64 896 896" width="15" height="15" :style="'fill:' + tagColor[tagItem]">
                            <path d="M938 458.8l-29.6-312.6c-1.5-16.2-14.4-29-30.6-30.6L565.2 86h-.4c-3.2 0-5.7 1-7.6 2.9L88.9 557.2a9.96 9.96 0 0 0 0 14.1l363.8 363.8c1.9 1.9 4.4 2.9 7.1 2.9s5.2-1 7.1-2.9l468.3-468.3c2-2.1 3-5 2.8-8zM459.7 834.7L189.3 564.3 589 164.6 836 188l23.4 247-399.7 399.7zM680 256c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88zm0 120c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path></svg>
                          <span class="tagItem" :style="{'color': tagColor[tagItem]}">{{ tagOptions[tagItem-1].label }}</span>
                        </div>
                      </div>
                    </div>
                  </template>
                  </el-table-column>
                  <el-table-column label="分类" width="100">
                  <template slot-scope="scope">
                    <div>{{ typeOptions[scope.row.postType - 1].label }}</div>
                  </template>
                </el-table-column>
                  <el-table-column prop="updateTime" label="更新时间" width="160"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-if="!scope.row.deleteTime">删除</el-button>
                      <el-button size="mini" type="success" @click="handleResume(scope.$index, scope.row)" v-else>恢复</el-button>
                      <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
            <div class="block">
              <el-pagination layout="prev, pager, next" :total="total" @current-change="current_change">
              </el-pagination>
            </div>
          </div>
        </div>
</template>
<script>
export default {
  name: 'articlecomponent',
  data () {
    return {
      tagColor: [ '#135200', '#135200', '#3D5AFE', '#820014', '#00474F', '#27B148', '#616161','#F50057', '#391085','#A411D1', '#FF6200', '#FF6200'],
      articleOptions: [], // 文章列表
      tagOptions: [], // 标签
      typeOptions: [], // 分类
      tagValue: '',
      typeValue: '',
      keywords: '', // 关键字搜索
      total: 0, // 总数
      pagesize: 10, // 每页的条数
      currentPage: 1 // 默认开始页面
    }
  },
  mounted () {
    this.getTag()
    this.getType()
    this.getArticleListByParams()
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
      })
    },
    // 根据标签检索
    tagSearch (value) {
      if (this.typeValue) {
        if (value) {
          var params = {}
          params = { order: 'DESC', postTag: value, postType: this.typeValue }
          this.getPostArticle(params)
        } else {
          var params = {}
          params = { order: 'DESC', postTag: value }
          this.getPostArticle(params)
        }
      } else {
        if (value) {
          var params = {}
          params = { order: 'DESC', postTag: value }
          this.getPostArticle(params)
        } else {
          this.getArticleListByParams()
        }
      }
    },
    // 根据分类检索
    typeSearch (value) {
      if (this.tagValue) {
        if (value) {
          var params = {}
          params = { order: 'DESC', postType: value, postTag: this.tagValue }
          this.getPostArticle(params)
        } else {
          var params = {}
          params = { order: 'DESC', postTag: this.tagValue }
          this.getPostArticle(params) 
        }
      } else {
        if (value) {
          var params = {}
          params = { order: 'DESC', postType: value }
          this.getPostArticle(params)
        } else {
          this.getArticleListByParams()
        }
      }
    },
    // 根据参数获取文章列表
    getArticleListByParams () {
      var params = { order: 'DESC'}
      this.getPostArticle(params)
    },
    // 根据关键字查询
    getArticleListByKeywords () {
      var params = {}
      if (this.keywords) {
        params = { order: 'DESC', keywords: this.keywords }
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
              postTag: res.msg.list[index].postTag, // 因为入库是JSON String的，需做一层转换
              postType: res.msg.list[index].postType,
              visitNum: res.msg.list[index].visitNum,
              updateTime: time,
              deleteTime: res.msg.list[index].deleteTime
            }
            this.articleOptions.push(options)
          }
        }
      })
    },
    // 编辑操作
    handleEdit (index, row) {
      this.$router.push({ path: '/editor', query: { id: row.id } })
    },
    // 恢复操作
    handleResume (index, row) {
      // console.log(index, row)
      this.$confirm('是否确认恢复?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.POST('./php/post/set_post.php',
          {
            op: 'restore',
            id: row.id
          })
          .then(res => {
            if (res.code === 200) {
              this.getArticleListByParams()
            }
          })
      }).catch(() => {
      })
    },
    // 删除操作
    handleDelete (index, row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.POST('./php/post/set_post.php',
          {
            op: 'delete',
            id: row.id
          })
          .then(res => {
            if (res.code === 200) {
              this.getArticleListByParams()
            }
          })
      }).catch(() => {
      })
    },
    // 切换当前分页
    current_change (currentPage) {
      this.currentPage = currentPage
    },
    // 添加新文章
    addArticle () {
      this.$router.push('../editor')
    }
  }
}
</script>
<style lang="css" scoped>
.g-content {
  margin-left: 40px;
}
/** 标签咧  */
.m-tag {
  display: flex;
  font-size: 16px;
  margin: 0 auto;
  line-height: 40px;
  justify-content: center;
  min-width: 600px;
  width: 980px;
  padding: 10px 10px;
  align-items: center;
}
.select {
  width: 140px;
}
/** 标签内的间距 */
.m-tag > div {
  margin-right: 20px;
}
/** input标签 */
.key {
  margin-left: 10px;
  width: 140px;
  border: 1px solid #DCDFE6;
  height: 30px;
  background-color: #fff;
  border-radius: 4px;
  text-indent: 5px;
}
input::-webkit-input-placeholder {
  position: relative;
  left: 5px;
}
/** 新增文章div */
.newArticle {
  width: 120px;
  line-height: 30px;
  text-align: center;
  border: 1px solid rgba(28, 43, 65, 1);
  background-color: rgba(251, 251, 251, 1);
  border-radius: 4px;
  cursor: pointer;
}
/** 发布按钮 */
.search {
  text-align: center;
  border-radius: 4px;
  background: #000;
  color: #fff;
  font-weight: bold;
  width: 100px;
  line-height: 30px;
}
/** 包含 */
.table {
  background: #fff;
}
/** table的前后左右加padding */
.m-table {
  padding: 10px 10px;
  width: 980px;
  height: 480px;
}
/** 分页列表 */
.block {
  width: inherit;
  text-align: center;
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
</style>
