<template>
  <div class="g-content">
    <!-- 标签 -->
    <div class="m-tag">
      <div class="increase" @click="increase()">新增</div>
    </div>
    <!-- 表格 -->
    <div class="table">
        <div class="m-table">
            <el-table :data="annoOptions.slice((currentPage-1) * pagesize,currentPage * pagesize)" height="100%">
              <el-table-column type="index" label="序号" width="100"></el-table-column>
              <el-table-column prop="content" label="公告内容" width="240"></el-table-column>
              <el-table-column prop="time" label="更新时间" width="240"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="total" @current-change="current_change"></el-pagination>
        </div>
    </div>
    <el-dialog title="公告" :visible="dialogFormVisible">
      <el-form :model="form">
        <el-input type="textarea" placeholder="公告内容(0/100)" v-model="form.content" maxlength="100"></el-input>
        <el-input v-model="form.url" placeholder="URL" class="url" maxlength="255" show-word-limit></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
 </div>
</template>
<script>
export default {
  name: 'noticationcomponent',
  data () {
    return {
      annoOptions: [], // 公告内容
      total: 0, // 分页数据
      pagesize: 10, // 每页的条数
      currentPage: 1, // 默认开始页面
      dialogFormVisible: false, // dialog的展示
      // dialog中的内容
      form: {
        content: '',
        url: ''
      },
      formLabelWidth: '120px', // 设置item的长度
      isIncrease: false, // 是否是新增
      id: '' // 编辑的id
    }
  },
  methods: {
    // 新增公告
    increase () {
      this.dialogFormVisible = true
      this.isIncrease = true // 重置
    },
    // 提交确认公告
    submit () {
      if (this.form.content && this.form.url) {
        if (this.isIncrease) {
          this.$api.POST('./php/anno/set_anno.php', { op: 'insert', content: this.form.content, url: this.form.url }).then(res => {
            // console.log(res)
            if (res.code === 200) {
              this.isIncrease = false // 重置
              this.form.content = ''
              this.form.url = ''
              this.dialogFormVisible = false
              this.getAnno()
            }
          })
        } else {
          this.$api.POST('./php/anno/set_anno.php', { op: 'update', id: this.id, content: this.form.content, url: this.form.url }).then(res => {
            // console.log(res)
            if (res.code === 200) {
              this.isIncrease = false // 重置
              this.form.content = ''
              this.form.url = ''
              this.dialogFormVisible = false
              this.getAnno()
            }
          })
        }
      } else {
        this.$message.error('公告数据不能为空')
      }
    },
    // 获取公告
    getAnno () {
      this.annoOptions = []
      this.$api.POST('./php/anno/get_anno.php').then(res => {
        if (res.code === 200) {
          this.total = res.msg.length
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
    // 删除操作
    handleDelete (index, row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.POST('./php/anno/set_anno.php',
          {
            op: 'delete',
            id: row.id
          })
          .then(res => {
            if (res.code === 200) {
              this.getAnno()
            }
          })
      }).catch(() => {
      })
    },
    // 编辑操作
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.form.content = row.content
      this.form.url = row.url
      this.id = row.id
    },
    // 切换当前分页
    current_change (currentPage) {
      this.currentPage = currentPage
    }
  },
  mounted () {
    this.getAnno()
  }
}
</script>
<style scoped>
@import '../assets/css/manager-dialog.css';
</style>
<style lang="css" scoped>
.g-content {
  margin-left: 40px;
}
/** 标签咧  */
.m-tag {
  font-size: 16px;
  padding: 10px 10px;
  min-width: 600px;
  width: 100%;
}
/** 新增按钮 */
.increase {
  text-align: center;
  border-radius: 4px;
  border: 1px solid rgba(28, 43, 65, 1);
  background: #1c2b41;
  color: #fff;
  width: 120px;
  line-height: 30px;
}
.increase:hover {
  background: #1a9aef;
  cursor: pointer;
}
.url {
  width: 80%;
  margin: 5% 0 0 10%;
}
/** 包含 */
/**20200708修改*/
.table {
  background: #fff;
  height: 80%;
  width: 980px;
}
/** table的前后左右加padding */
.m-table {
  padding: 10px 10px;
  height: 90%;
  margin-left: 20px;
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
  margin-left: 5px;
}
</style>
