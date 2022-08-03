// 自定义默认图片指令
export const imgError = {
  inserted(el, binding) {
    // 404的时候,修改src为默认图片
    el.onerror = () => {
      // binding.value包含用户传递过来的值
      el.src = binding.value
    }
  }
}
