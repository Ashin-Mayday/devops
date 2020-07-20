<template>
  <div class="content">
      <HeadFoot/>
      <div class="m-content">
        <div class="g-menu">
          <div>管理</div>
          <div :class="[isActive === index ? 'active' : '']" @click="change(index)" v-for="(item,index) in menu" :key="index">
            {{ item }}
          </div>
        </div>
        <component :is="current"></component>
      </div>
  </div>
</template>
<script>
import HeadFoot from '@/components/HeadFoot.vue'
import ArticleComponent from '@/components/ArticleComponent.vue'
import NoticationComponent from '@/components/NoticationComponent.vue'
export default {
  name: 'manager',
  components: {
    HeadFoot,
    ArticleComponent,
    NoticationComponent
  },
  data () {
    return {
      current: 'ArticleComponent', // 当前活跃的component
      menu: ['文章管理', '通知管理'],
      isActive: 0
    }
  },
  methods: {
    // 切换component
    change (index) {
      this.isActive = index
      switch (index) {
        case 0:
          this.current = ArticleComponent
          break
        case 1:
          this.current = NoticationComponent
          break
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
}
.active {
  background-color: rgb(0, 122, 255);
  color: #fff;
}
/** 输入content */
/** 20200708修改 */
.m-content {
  width: 80%;
  height: 90%;
  position: absolute;
  top: 100px;
  left: 10%;
  min-width: 800px;
  display: flex;
  justify-content: center;
}
/** menu栏 */
.g-menu {
  background: #fff;
  height: 300px;
  width: 200px;
  min-width: 200px;
  margin-top: 60px;
  text-align: center;
}
.g-menu :first-child {
  font-weight: bold;
  border-bottom: 1px solid #ebebeb;
  font-size: 20px;
  margin: 0 auto;
  line-height: 44px;
  text-align: left;
  padding-left: 10px;
  margin-bottom: 10px;
  width: 160px;
  /** 20200708新增 */
  cursor: pointer;
}
.g-menu :not(:first-child) {
  border: 1px solid rgb(28, 43, 65);
  padding: 2px 2px;
  font-size: 18px;
  line-height: 40px;
  width: 160px;
  margin: 0 auto;
  /** 20200708新增 */
  cursor: pointer;
}
.el-input__suffix {
  height: 75%;
}
</style>
