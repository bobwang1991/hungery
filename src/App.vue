<template>
  <div id="app">
    <vHeader :seller="datas.seller"></vHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 把加载过的组件缓存起来 -->
    <keep-alive>
      <router-view :datas="datas" ref="abc"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import vHeader from './components/mods/header.vue'
  import axios from 'axios'
  export default {
    data () {
      return {
        datas: {
          // 商户的信息
          seller: {},
          // 商品数据
          goods: [],
          // 商户的评论
          ratings: []
        }
      }
    },
    mounted () {
      document.addEventListener('visibilitychange', this.changeTitle, false)
      axios.get('../static/data.json').then(res => {
        this.datas.seller = res.data.seller
        this.datas.goods = res.data.goods
        this.datas.ratings = res.data.ratings
        // $nextTick() 作用是等dom更新完之后在执行的函数
        this.$nextTick(() => {
          this.$refs['abc']._scroll()
        })
      })
    },
    components: {
      vHeader
    },
    methods: {
      changeTitle () {    // 切换标签页后，改变title
        if (document.hidden) {
          document.title = '/(ㄒoㄒ)/~~不要走，快回来！~~~'
        } else {
          document.title = '饿了么商家--Vue实战--欢迎回来'
        }
      }
    }
  }
</script>

<style scoped>
  /*
    scoped 当写上 当前这个模板和当前模板下所有的子模板 应用这个样式
  */
  #app {
    max-width: 750px;
    margin: 0 auto;
  }
  .tab .tab-item a.router-link-exact-active {
    color: #fff;
    background: #f60;
    font-weight: bolder;
  }
</style>
