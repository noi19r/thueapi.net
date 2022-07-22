<template>
  <div ref="toastifyRef" v-toastify-directive="{ props, emit }" class="toastify-content hidden flex">
    <CheckCircleIcon :class="`text-${props.options.status}`" />
    <div class="ml-4 mr-4">
      <div class="font-medium">123123</div>
      <div class="text-slate-500 mt-1">aaaa</div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue'
import { init, reInit } from './index'

const vToastifyDirective = {
  mounted(el, { value }) {
    init(el, value.props)
  },
  updated(el) {
    reInit(el)
  }
}

const props = defineProps({
  options: {
    type: Object,
    default: () => ({})
  },
  refKey: {
    type: String,
    default: null
  }
})

const emit = defineEmits()

const toastifyRef = ref()
const bindInstance = () => {
  if (props.refKey) {
    const bind = inject(`bind[${props.refKey}]`)
    if (bind) {
      bind(toastifyRef.value)
    }
  }
}

onMounted(() => {
  bindInstance()
})
</script>
