<template>
  <div>
    <DarkModeSwitcher />
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            <img alt="Midone Tailwind HTML Admin Template" class="w-6" src="@/assets/images/logo.svg" />
            <span class="text-white text-lg ml-3"> Icewall </span>
          </a>
          <div class="my-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="-intro-x w-1/2 -mt-16"
              src="@/assets/images/illustration.svg"
            />
            <div class="-intro-x text-white font-medium text-4xl leading-tight mt-10">
              A few more clicks to <br />
              sign in to your account.
            </div>
            <div class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
              Manage all your e-commerce accounts in one place
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">Chào Mừng Bạn Trở Lại</h2>
            <div class="intro-x mt-2 text-slate-400 xl:hidden text-center">
              A few more clicks to sign in to your account. Manage all your e-commerce accounts in one place
            </div>
            <form class="validate-form" @submit.prevent="save">
              <div class="intro-x mt-8">
                <input
                  id="validation-form-1"
                  v-model.trim="validate.email.$model"
                  type="email"
                  name="email"
                  class="intro-x login__input form-control py-3 px-4 block"
                  :class="{ 'border-danger': validate.email.$error }"
                  placeholder="example@gmail.com"
                />
                <template v-if="validate.email.$error">
                  <div v-for="(error, index) in validate.email.$errors" :key="index" class="text-danger mt-2">
                    {{ error.$message }}
                  </div>
                </template>
                <input
                  id="validation-form-2"
                  v-model.trim="validate.password.$model"
                  type="password"
                  name="password"
                  class="intro-x login__input form-control py-3 px-4 block mt-4"
                  :class="{ 'border-danger': validate.password.$error }"
                  placeholder="secret"
                />
                <template v-if="validate.password.$error">
                  <div v-for="(error, index) in validate.password.$errors" :key="index" class="text-danger mt-2">
                    {{ error.$message }}
                  </div>
                </template>
              </div>
              <div class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                <div class="flex items-center mr-auto">
                  <input id="remember-me" type="checkbox" class="form-check-input border mr-2" />
                  <label class="cursor-pointer select-none" for="remember-me">Ghi nhớ đăng nhập</label>
                </div>
                <a href="">Quên mật khẩu?</a>
              </div>
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top" :disabled="isLoading">
                  Đăng Nhập
                </button>

                <router-link
                  to="/register"
                  class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                >
                  Đăng Ký
                </router-link>
              </div>
            </form>

            <div class="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left">
              By signin up, you agree to our
              <a class="text-primary dark:text-slate-200" href="">Terms and Conditions</a>
              &
              <a class="text-primary dark:text-slate-200" href="">Privacy Policy</a>
            </div>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, toRefs, toRaw, ref } from 'vue'
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import { required, minLength, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { toast } from '../../plugins/toast'
import dom from '@left4code/tw-starter/dist/js/dom'
import { useUserStore } from '@/stores/user'
import { login } from '@/api'
import router from '@/router'
const isLoading = ref(false)
const userStore = useUserStore()
const formData = reactive({
  email: '',
  password: ''
})

const rules = {
  email: {
    required,
    email
  },
  password: {
    required,
    minLength: minLength(6)
  }
}

const validate = useVuelidate(rules, toRefs(formData))

const save = async () => {
  validate.value.$touch()
  if (validate.value.$invalid) {
    toast.danger('Vui lòng kiểm tra lại thông tin')
  } else {
    let result = await login(toRaw(formData))
    userStore.setToken({ ...result, remember: true })

    await userStore.setUserInfo()
    isLoading.value = true
    toast.success('Đăng nhập thành công')
    setTimeout(() => router.push({ name: 'side-menu-dashboard' }), 2000)
  }
}
onMounted(() => {
  dom('body').removeClass('main').removeClass('error-page').addClass('login')
})
</script>
