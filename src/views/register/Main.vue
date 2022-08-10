<template>
  <div>
    <DarkModeSwitcher />
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Register Info -->
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
              sign up to your account.
            </div>
            <div class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
              Manage all your e-commerce accounts in one place
            </div>
          </div>
        </div>
        <!-- END: Register Info -->
        <!-- BEGIN: Register Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">Tạo Tài Khoản</h2>
            <div class="intro-x mt-2 text-slate-400 dark:text-slate-400 xl:hidden text-center">
              A few more clicks to sign in to your account. Manage all your e-commerce accounts in one place
            </div>
            <form class="validate-form" @submit.prevent="save">
              <div class="intro-x mt-8">
                <input
                  id="validation-form-1"
                  v-model.trim="validate.name.$model"
                  type="text"
                  name="name"
                  class="intro-x login__input form-control py-3 px-4 block"
                  :class="{ 'border-danger': validate.name.$error }"
                  placeholder="Tên của bạn"
                />
                <template v-if="validate.name.$error">
                  <div v-for="(error, index) in validate.name.$errors" :key="index" class="text-danger mt-2">
                    {{ error.$message }}
                  </div>
                </template>
                <input
                  id="validation-form-2"
                  v-model.trim="validate.email.$model"
                  type="email"
                  name="email"
                  class="intro-x login__input form-control py-3 px-4 block mt-4"
                  :class="{ 'border-danger': validate.email.$error }"
                  placeholder="example@gmail.com"
                />
                <template v-if="validate.email.$error">
                  <div v-for="(error, index) in validate.email.$errors" :key="index" class="text-danger mt-2">
                    {{ error.$message }}
                  </div>
                </template>
                <input
                  id="validation-form-3"
                  v-model.trim="validate.phoneNumber.$model"
                  type="tel"
                  name="telphone"
                  class="intro-x login__input form-control py-3 px-4 block mt-4"
                  :class="{ 'border-danger': validate.phoneNumber.$error }"
                  placeholder="Số điện thoại"
                />
                <template v-if="validate.phoneNumber.$error">
                  <div v-for="(error, index) in validate.phoneNumber.$errors" :key="index" class="text-danger mt-2">
                    {{ error.$message }}
                  </div>
                </template>
                <input
                  id="validation-form-4"
                  v-model.trim="validate.password.pass.$model"
                  type="password"
                  name="password"
                  class="intro-x login__input form-control py-3 px-4 block mt-4"
                  :class="{ 'border-danger': validate.password.pass.$error }"
                  placeholder="Nhập mật khẩu"
                />
                <template v-if="validate.password.pass.$error">
                  <div v-for="(error, index) in validate.password.pass.$errors" :key="index" class="text-danger mt-2">
                    {{ error.$message }}
                  </div>
                </template>
                <input
                  id="validation-form-5"
                  v-model.trim="validate.password.confirm.$model"
                  type="password"
                  name="password"
                  class="intro-x login__input form-control py-3 px-4 block mt-4"
                  :class="{ 'border-danger': validate.password.confirm.$error }"
                  placeholder="Nhập lại mật khẩu"
                />
                <template v-if="validate.password.confirm.$error">
                  <div
                    v-for="(error, index) in validate.password.confirm.$errors"
                    :key="index"
                    class="text-danger mt-2"
                  >
                    {{ error.$message }}
                  </div>
                </template>
              </div>
              <div class="intro-x flex items-center text-slate-600 dark:text-slate-500 mt-4 text-xs sm:text-sm">
                <input id="remember-me" type="checkbox" class="form-check-input border mr-2" />
                <label class="cursor-pointer select-none" for="remember-me">Tôi đồng ý với những</label>
                <a class="text-primary dark:text-slate-200 ml-1" href="">Điều Khoản Dịch Vụ</a>.
              </div>
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top" :disabled="isLoading">
                  Đăng Ký
                </button>
                <router-link
                  to="/login"
                  class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                >
                  Đăng Nhập
                </router-link>
              </div>
            </form>
          </div>
        </div>
        <!-- END: Register Form -->
      </div>
    </div>
  </div>
</template>

<script setup>
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import { onMounted, reactive, toRefs, computed, toRaw, ref } from 'vue'
import { required, minLength, maxLength, email, sameAs, helpers } from '@vuelidate/validators'

import { useVuelidate } from '@vuelidate/core'

import dom from '@left4code/tw-starter/dist/js/dom'
import { useUserStore } from '@/stores/user'
import { register } from '@/api'
import router from '@/router'
import { toast } from '../../plugins/toast'
const userStore = useUserStore()
const isLoading = ref(false)
onMounted(() => {
  dom('body').removeClass('main').removeClass('error-page').addClass('login')
})

const formData = reactive({
  name: '',
  email: '',
  phoneNumber: '',
  password: {
    pass: '',
    confirm: ''
  }
})

const rules = computed(() => {
  return {
    name: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(30)
    },
    email: {
      required,
      email
    },
    phoneNumber: {
      required,
      phone: helpers.withMessage(
        'Số điện thoại không hợp lệ',
        helpers.regex(
          /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
        )
      )
    },
    password: {
      pass: {
        required,
        minLength: minLength(6)
      },
      confirm: {
        required,
        sameAs: sameAs(formData.password.pass)
      }
    }
  }
})

const validate = useVuelidate(rules, toRefs(formData))

const save = async () => {
  validate.value.$touch()
  if (validate.value.$invalid) {
    toast.danger('Vui lòng kiểm tra lại thông tin')
  } else {
    let data = toRaw(formData)
    await register({
      name: data.name,
      email: data.email,
      phone: data.phoneNumber,
      password: data.password.pass
    })
    isLoading.value = true
    toast.success('Tạo tài khoản thành công')
    setTimeout(() => router.push({ name: 'login' }), 2000)
  }
}
</script>
