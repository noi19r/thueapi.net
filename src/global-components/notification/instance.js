import { createApp } from 'vue'
import notification from './Notification.vue'

const createInstance = (cfg) => {
  const config = cfg || {}
  let notificationNode = document.createElement('div')

  let attr = document.createAttribute('class')
  attr.value = 'notification-model'
  notificationNode.setAttributeNode(attr)
  const app = createApp(notification, {
    config,
    remove() {
      handleRemove()
    }
  })

  app.vm = app.mount(notificationNode)
  document.body.appendChild(notificationNode)

  const handleRemove = () => {
    document.body.removeChild(notificationNode)
    app.unmount(notificationNode)
  }

  app.close = () => {
    handleRemove()
  }

  return app
}

export default createInstance
