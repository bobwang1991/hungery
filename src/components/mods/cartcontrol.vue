<template>
   <div class="cartcontrol">
     <transition name="fadeRotate">
       <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart($event)">
         <span class="icon-remove_circle_outline inner"></span>
       </div>
     </transition>
     <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
     <div class="cart-add" @click.stop="addCart($event)">
       <i class="icon-add_circle"></i>
     </div>
   </div>
</template>

<script>
  import Vue from 'vue'
  import {mapMutations, mapState} from 'vuex'
  export default {
    props: ['food'],
    methods: {
      ...mapMutations([
        'vsaddCart',
        'vxdecreaseCart'
      ]),
      addCart (event) {
        // _constructed 是滚动插件所添加的一个
        // 没有这个值的点击事件是pc端
        if (!event._constructed) {
          return false
        }
        if (typeof this.food.count === 'undefined') {
          // Vue.set 可以直接往data里或接收的数据中添加
          // this.$set 需要执行函数的时候传值过来 然后往传递的值里添加
          // this.food.count = 0
          Vue.set(this.food, 'count', 0)
          Vue.set(this.food, 'active', true)
        }
        this.food.count++
        // 默认为true
        if (this.food.active) {
          this.vxaddCart(this.food)
          this.food.active = false
        }
        this.vsaddCart(this.food)
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return false
        }
        this.food.count--
        if (this.food.count === 0) {
          this.vxdecreaseCart(this.food)
        }
      }
    },
    computed: {
      ...mapState([
        'vxfood'
      ])
    }
  }
</script>
