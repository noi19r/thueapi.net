<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Cập nhật thông tin</h2>
  </div>
  <div class="grid grid-cols-12 gap-6">
    <!-- BEGIN: Profile Menu -->
    <div class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
      <div class="intro-y box mt-5">
        <div class="relative flex items-center p-5">
          <div class="w-12 h-12 image-fit">
            <img alt="Midone Tailwind HTML Admin Template" class="rounded-full" :src="$f()[0].photos[0]" />
          </div>
          <div class="ml-4 mr-auto">
            <div class="font-medium text-base">
              {{ userInfo.name }}
            </div>
            <div class="text-slate-500">{{ userInfo.roles.at(-1) }}</div>
          </div>
        </div>
        <div class="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
          <a
            href=""
            class="flex items-center"
            :class="{
              'text-primary font-medium': activeTab == 'info'
            }"
            @click.prevent="activeTab = 'info'"
          >
            <ActivityIcon class="w-4 h-4 mr-2" /> Thông tin các nhân
          </a>
          <a
            href=""
            class="flex items-center mt-5"
            :class="{
              'text-primary font-medium': activeTab == 'gatepay'
            }"
            @click.prevent="activeTab = 'gatepay'"
          >
            <BoxIcon class="w-4 h-4 mr-2" /> Hạn sử dụng
          </a>
          <a
            class="flex items-center mt-5"
            href=""
            :class="{
              'text-primary font-medium': activeTab == 'changePass'
            }"
            @click.prevent="activeTab = 'changePass'"
          >
            <LockIcon class="w-4 h-4 mr-2" /> Đổi mật khẩu
          </a>
          <a
            class="flex items-center mt-5"
            href=""
            :class="{
              'text-primary font-medium': activeTab == 'setting'
            }"
            @click.prevent="activeTab = 'setting'"
          >
            <SettingsIcon class="w-4 h-4 mr-2" /> Bảo mật 2 lớp
          </a>
        </div>

        <div class="p-5 border-t border-slate-200/60 dark:border-darkmode-400 flex">
          <button type="button" class="btn btn-primary py-1 px-2">New Group</button>
          <button type="button" class="btn btn-outline-secondary py-1 px-2 ml-auto">New Quick Link</button>
        </div>
      </div>
    </div>
    <!-- END: Profile Menu -->
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <!-- BEGIN: Display Information -->
      <div class="intro-y box lg:mt-5" v-if="activeTab == 'info'">
        <div class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="font-medium text-base mr-auto">Thông tin cá nhân</h2>
        </div>
        <div class="p-5">
          <div class="flex flex-col-reverse xl:flex-row flex-col">
            <div class="flex-1 mt-6 xl:mt-0">
              <form class="validate-form" @submit.prevent="saveTelegram">
                <div class="grid grid-cols-12 gap-x-5">
                  <div class="col-span-12 2xl:col-span-6">
                    <div>
                      <label for="update-profile-form-1" class="form-label">Họ & Tên</label>
                      <input
                        id="update-profile-form-1"
                        type="text"
                        class="form-control"
                        placeholder="Input text"
                        :value="userInfo.name"
                        disabled
                      />
                    </div>
                    <div class="mt-3">
                      <label for="update-profile-form-6" class="form-label">Email</label>
                      <input
                        id="update-profile-form-6"
                        type="text"
                        class="form-control"
                        placeholder="Input text"
                        :value="userInfo.email"
                        disabled
                      />
                    </div>
                    <div class="mt-3">
                      <label for="update-profile-form-10" class="form-label">Telegram</label>
                      <input
                        id="update-profile-form-9"
                        v-model.trim="validateTelegram.username.$model"
                        type="text"
                        class="form-control"
                        :class="{ 'border-danger': validateTelegram.username.$error }"
                        placeholder="Input text"
                      />

                      <template v-if="validateTelegram.username.$error">
                        <div
                          v-for="(error, index) in validateTelegram.username.$errors"
                          :key="index"
                          class="text-danger mt-2"
                        >
                          {{ error.$message }}
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="col-span-12 2xl:col-span-6">
                    <div class="mt-3 2xl:mt-0">
                      <label for="update-profile-form-3" class="form-label">Số Dư Hiện Tại</label>
                      <input
                        id="update-profile-form-3"
                        type="text"
                        class="form-control"
                        placeholder="Input text"
                        :value="`${$h.formatCurrency(userInfo.amount)} vnđ`"
                        disabled
                      />
                    </div>
                    <div class="mt-3">
                      <label for="update-profile-form-4" class="form-label">Số Điện Thoại</label>
                      <input
                        id="update-profile-form-4"
                        type="text"
                        class="form-control"
                        placeholder="Input text"
                        :value="userInfo.phone"
                        disabled
                      />
                    </div>
                    <div class="mt-3">
                      <label for="update-profile-form-9" class="form-label">ID Telegram</label>
                      <input
                        id="update-profile-form-9"
                        type="text"
                        class="form-control"
                        placeholder=""
                        :value="userInfo.telegram.id"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="flex justify-end mt-4">
                  <button class="btn btn-primary w-25 mr-auto">Lưu thông tin</button>
                  <a href="" class="text-danger flex items-center">
                    <Trash2Icon class="w-4 h-4 mr-1" /> Delete Account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Display Information -->

      <!-- BEGIN: Change Password -->
      <div class="intro-y box lg:mt-5" v-else-if="activeTab == 'changePass'">
        <div class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="font-medium text-base mr-auto">Đổi Mật Khẩu</h2>
        </div>
        <div class="p-5">
          <form class="validate-form" @submit.prevent="saveChangePassword">
            <div>
              <label for="change-password-form-1" class="form-label">Mật khẩu cũ</label>
              <input
                id="change-password-form-1"
                v-model.trim="validateChangePassword.currentPassword.$model"
                type="password"
                name="password"
                class="form-control"
                :class="{ 'border-danger': validateChangePassword.currentPassword.$error }"
                placeholder="Nhập mật khẩu cũ"
              />
              <template v-if="validateChangePassword.currentPassword.$error">
                <div
                  v-for="(error, index) in validateChangePassword.currentPassword.$errors"
                  :key="index"
                  class="text-danger mt-2"
                >
                  {{ error.$message }}
                </div>
              </template>
            </div>
            <div class="mt-3">
              <label for="change-password-form-2" class="form-label">Mật khẩu mới</label>
              <input
                id="change-password-form-2"
                v-model.trim="validateChangePassword.password.$model"
                type="password"
                name="password"
                class="form-control"
                :class="{ 'border-danger': validateChangePassword.password.$error }"
                placeholder="Nhập mật khẩu mới"
              />
              <template v-if="validateChangePassword.password.$error">
                <div
                  v-for="(error, index) in validateChangePassword.password.$errors"
                  :key="index"
                  class="text-danger mt-2"
                >
                  {{ error.$message }}
                </div>
              </template>
            </div>
            <div class="mt-3">
              <label for="change-password-form-3" class="form-label">Nhập lại mật khẩu</label>
              <input
                id="change-password-form-3"
                v-model.trim="validateChangePassword.surePassword.$model"
                type="password"
                name="password"
                class="form-control"
                :class="{ 'border-danger': validateChangePassword.surePassword.$error }"
                placeholder="Nhập lại mật khẩu mới"
              />
              <template v-if="validateChangePassword.surePassword.$error">
                <div
                  v-for="(error, index) in validateChangePassword.surePassword.$errors"
                  :key="index"
                  class="text-danger mt-2"
                >
                  {{ error.$message }}
                </div>
              </template>
            </div>
            <button class="btn btn-primary mt-4">Thay đổi mật khẩu</button>
          </form>
        </div>
      </div>
      <!-- END: Change Password -->
      <!-- BEGIN: GATEWAY -->
      <div class="intro-y box lg:mt-5" v-else-if="activeTab == 'gatepay'">
        <div class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="font-medium text-base mr-auto">Các cổng thanh toán đang sử dụng</h2>
        </div>
        <div class="intro-y overflow-auto lg:overflow-visible sm:mt-0">
          <div v-if="!deckData.length" class="p-5 text-center font-medium">
            <span>Không có gì để hiển thị</span>
          </div>
          <table v-else class="table table-report sm:mt-2">
            <thead>
              <tr>
                <th class="whitespace-nowrap">Cổng Thanh Toán</th>

                <th class="whitespace-nowrap">Ngày Hết Hạn</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(deck, deckKey) in deckData" :key="deckKey" class="intro-x">
                <td class="!py-2">
                  <div class="flex items-center">
                    <div class="w-10 h-10 image-fit zoom-in">
                      <Tippy
                        tag="img"
                        alt="Midone - HTML Admin Template"
                        class="rounded-lg border-1 border-white shadow-md tooltip"
                        :src="`http://localhost:8080/src/assets/images/preview-10.jpg`"
                        :content="`Tài Khoản Cá Nhân`"
                      />
                    </div>

                    <a class="font-medium whitespace-nowrap ml-4">{{ deck.type }}</a>
                  </div>
                </td>

                <td class="whitespace-nowrap">
                  <div class="flex items-center mr-3 font-medium">
                    {{ $h.formatDate(deck.expired, 'DD/MM/YYYY HH:mm') }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- END: GATEWAY -->
      <!-- BEGIN: 2FA -->
      <div class="intro-y box lg:mt-5" v-else-if="activeTab == 'setting'">
        <div class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="font-medium text-base mr-auto">Bảo mật 2 lớp - 2FA</h2>
        </div>

        <div class="p-5">
          <div class="grid grid-cols-12 gap-x-5">
            <div class="col-span-12 xl:col-span-6" v-if="!userInfo.is2FA">
              <div>
                <img alt="Midone - HTML Admin Template" class="rounded-md" width="340" height="340" :src="qrcode" />
              </div>
            </div>
            <div
              class="col-span-12"
              :class="{
                'xl:col-span-6': !userInfo.is2FA
              }"
            >
              <form class="validate-form" @submit.prevent="save2FA">
                <div class="mt-3 xl:mt-0">
                  <label for="update-profile-form-10" class="form-label">Xác nhận OTP</label>
                  <input
                    id="2fa-form-3"
                    v-model.trim="validate2FA.otp.$model"
                    class="form-control"
                    :class="{ 'border-danger': validate2FA.otp.$error }"
                    type="text"
                    name="otp"
                    placeholder="OTP"
                  />
                  <template v-if="validate2FA.otp.$error">
                    <div v-for="(error, index) in validate2FA.otp.$errors" :key="index" class="text-danger mt-2">
                      {{ error.$message }}
                    </div>
                  </template>
                </div>

                <div class="flex justify-end mt-4">
                  <button class="btn btn-primary w-20 mr-auto">
                    {{ !userInfo.is2FA ? 'Bật 2FA' : 'Tắt 2FA' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- END: 2FA -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, toRefs, toRaw } from 'vue'
import { required, minLength, sameAs } from '@vuelidate/validators'

import { useVuelidate } from '@vuelidate/core'

import { useUserStore } from '@/stores/user'
import { helper as $h } from '@/utils/helper'
import { qr2FA, changePassword, verify2FA, updateTelegram, deckList } from '@/api'
import { toast } from '../../plugins/toast'

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfoMe)
const select = ref('1')
const activeTab = ref('info')
const qrcode = ref('')
const deleteConfirmationModal = ref(false)
const deckData = ref([])
const formTelegramData = reactive({
  username: userStore.userInfoMe.telegram.username
})

const getDeckList = async () => {
  let data = await deckList()
  deckData.value = data.list
}

const formChangePasswordData = reactive({
  currentPassword: '',
  password: '',
  surePassword: ''
})
const rulesTelegram = computed(() => {
  return {
    username: {
      required,
      minLength: minLength(3)
    }
  }
})
const validateTelegram = useVuelidate(rulesTelegram, toRefs(formTelegramData))

const rules = computed(() => {
  return {
    currentPassword: {
      required,
      minLength: minLength(6)
    },
    password: {
      required,
      minLength: minLength(6)
    },
    surePassword: {
      required,
      sameAs: sameAs(formChangePasswordData.password)
    }
  }
})
const form2FAData = reactive({
  otp: ''
})
const rules2FA = computed(() => {
  return {
    otp: {
      required,
      minLength: minLength(6)
    }
  }
})

const validateChangePassword = useVuelidate(rules, toRefs(formChangePasswordData))
const validate2FA = useVuelidate(rules2FA, toRefs(form2FAData))

const saveChangePassword = async () => {
  validateChangePassword.value.$touch()
  if (validateChangePassword.value.$invalid) {
    toast.danger('Vui lòng kiểm tra lại thông tin')
  } else {
    let data = toRaw(formChangePasswordData)
    await changePassword(data)

    toast.success('Thay đổi mật khẩu thành công')
    // setTimeout(() => router.push({ name: 'login' }), 3000)
  }
}

const save2FA = async () => {
  validate2FA.value.$touch()
  if (validate2FA.value.$invalid) {
    toast.danger('Vui lòng kiểm tra lại OTP đã nhập')
  } else {
    let data = toRaw(form2FAData)
    await verify2FA(data)
    await userStore.setUserInfo()
    toast.success('Thay xác thực 2 yếu tố thành công')
    if (!userStore.userInfoMe.is2FA) {
      let qrImage = await qr2FA()
      qrcode.value = qrImage.image
    }
  }
}

const saveTelegram = async () => {
  validateTelegram.value.$touch()
  if (validateTelegram.value.$invalid) {
    toast.danger('Vui lòng kiểm tra lại thông tin')
  } else {
    let data = toRaw(formTelegramData)
    await updateTelegram(data)
    userStore.setUserInfo()
    toast.success('Cập nhật thông tin thành công')
  }
}

onMounted(async () => {
  userStore.setUserInfo()
  getDeckList()
  if (!userStore.userInfoMe.is2FA) {
    let qrImage = await qr2FA()
    qrcode.value = qrImage.image
  }
})
</script>
