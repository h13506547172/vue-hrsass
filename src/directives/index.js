// 自定义默认图片指令
export const imgError = {
  inserted(el, binding) {
    if (!el.src) {
      // 如果图片地址不存在
      el.src = binding.value
    } else {
      // 404的时候,修改src为默认图片
      el.onerror = () => {
        // binding.value包含用户传递过来的值
        el.src = binding.value
      }
    }
  },
  update(el, binding) {
    if (!el.src) {
      // 如果图片地址不存在
      el.src = binding.value
    } else {
      // 404的时候,修改src为默认图片
      el.onerror = () => {
        // binding.value包含用户传递过来的值
        el.src = binding.value
      }
    }
  }
}
