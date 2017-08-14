export default {
  // 默认第一个接收的 vuex里所定义的数据
  vsaddCart (state, val) {
    state.vxfood.push(val)
  },
  vxdecreaseCart (state, food) {
    state.vxfood.forEach((value, index) => {
      if (value.name === food.name) {
        state.food.splice(index, 1)
      }
    })
  }
}
