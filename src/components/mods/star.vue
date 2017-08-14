<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" :class="item" v-for="item in starScore"></span>
  </div>
</template>

<script>
  export default {
    props: ['score', 'size'],
    computed: {
      starScore () {
        let arr = []
        // 获取整数部分 向下取整
        let sun = Math.floor(this.score)
        // 获取小数部分
        let point = (this.score - sun) >= 0.5
        for (let i = 0; i < sun; i++) {
          arr.push('on')
        }
        if (point) {
          arr.push('half')
        }
        while (arr.length < 5) {
          arr.push('off')
        }
        return arr
      }
    }
  }
</script>
