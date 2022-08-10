import { ref } from 'vue'
let isLoading = ref(false)
let isCheck = false

const setCheckLoading = (x) => {
  isCheck = x
}
const setLoading = (x) => {
  if (isCheck) {
    if (x == false) isCheck = false

    isLoading.value = x
  }
}

export { isLoading, setLoading, setCheckLoading }
