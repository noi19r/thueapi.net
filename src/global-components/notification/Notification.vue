<template>
  <div class="toastify-content hidden flex">
    <CheckCircleIcon :class="`text-${options.status}`" />
    <div class="ml-4 mr-4">
      <div class="font-medium">{{ options.title }}</div>
      <div class="text-slate-500 mt-1">{{ options.message }}</div>
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
</script>
