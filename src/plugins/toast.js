import { createToast } from 'mosha-vue-toastify'

const toastController = {
  success(props) {
    if (typeof props === 'string') props = { title: 'Thành công', description: props }
    return createToast(props, {
      type: 'success',
      timeout: props.timeout || 4000
    })
  },
  info(props) {
    if (typeof props === 'string') props = { title: 'Thông tin', description: props }
    return createToast(props, { type: 'info', timeout: props.timeout || 2000 })
  },
  danger(props) {
    if (typeof props === 'string') props = { title: 'Thất bại', description: props }
    if (Object.prototype.toString.call(props) === '[object Object]' && !props.title)
      Object.assign(props, { title: 'Thất bại' })
    return createToast(props, {
      type: 'danger',
      timeout: props.timeout || 4000
    })
  },
  warning(props) {
    if (typeof props === 'string') props = { title: 'Cảnh báo', description: props }
    return createToast(props, {
      type: 'warning',
      timeout: props.timeout || 4000
    })
  },
  denied(props) {
    if (typeof props === 'string') props = { description: props }
    return createToast(props, {
      type: 'default',
      timeout: props.timeout || 4000
    })
  }
}

export default {
  install: (app) => {
    app.config.globalProperties.$toast = toastController
  }
}

export let toast = toastController
