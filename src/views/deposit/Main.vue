<template>
  <h2 class="intro-y text-2xl font-medium mt-10 text-center mr-auto">Nạp Tiền</h2>

  <!-- BEGIN: Pricing Content -->
  <div class="flex mt-10">
    <div class="flex flex-col lg:flex-row">
      <div class="intro-y flex justify-center flex-col flex-1 text-center sm:px-10 lg:px-5 pb-10 lg:pb-0">
        <div class="font-medium text-2xl">Hướng dẫn nạp tiền</div>
        <div class="mt-3 lg:text-justify text-slate-600 dark:text-slate-500">
          <p class="text-danger text-2lg">
            <span class="mx-1 text-primary"> • </span>Vui lòng nhập đúng nội dung để nạp tiền tự động.
          </p>
          <p class="mt-2 text-primary">
            <span class="mx-1 text-primary"> • </span>
            Sau khi kiểm tra, hệ thống sẽ hiển thị xác nhận và cộng tiền vào tài khoản cho quý khách.
            <br />
          </p>
        </div>
      </div>
      <div class="intro-y flex-1 box py-10 lg:ml-5 mb-5 lg:mb-0">
        <img :src="'https://quan.thueapi.com/images/banks/acb.png'" class="block w-20 h-20 text-primary mx-auto" />
        <div class="text-xl font-medium text-center mt-5">{{ isSyntax.bank.type }}</div>
        <div class="text-slate-600 dark:text-slate-500 text-center mt-5 font-medium">
          Chủ tài khoản:<span class="mx-1 text-primary">{{ isSyntax.bank.name }}</span>
        </div>
        <div class="text-slate-600 dark:text-slate-500 text-center mt-2 font-medium">
          Số tài khoản:<span class="mx-1 text-primary">{{ isSyntax.bank.accountNumber }}</span>
        </div>
        <div class="text-slate-500 px-10 text-center mx-auto mt-2 font-medium">
          Nội dung: <span class="text-danger">{{ isSyntax.syntax }}</span>
        </div>

        <div class="flex justify-center mt-2">
          <div class="w-64 h-64 float-left image-fit mx-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              :src="`https://img.vietqr.io/image/acb-${isSyntax.bank.accountNumber}-qr_only.jpg?amount=10000&addInfo=${isSyntax.syntax}&accountName=${isSyntax.bank.name}`"
              data-action="zoom"
              class="w-full rounded-md"
            />
          </div>
        </div>
      </div>
      <div class="intro-y flex-1 box py-10 lg:ml-5">
        <img :src="'https://quan.thueapi.com/images/banks/momo.png'" class="block w-20 h-20 text-primary mx-auto" />
        <div class="text-xl font-medium text-center mt-5">{{ isSyntax.wallet.type }}</div>
        <div class="text-slate-600 dark:text-slate-500 text-center mt-5 font-medium">
          Chủ tài khoản:<span class="mx-1 text-primary">{{ isSyntax.wallet.name }}</span>
        </div>
        <div class="text-slate-600 dark:text-slate-500 text-center mt-2 font-medium">
          Số tài khoản:<span class="mx-1 text-primary">{{ isSyntax.wallet.phone }}</span>
        </div>
        <div class="text-slate-500 px-10 text-center mx-auto mt-2 font-medium">
          Nội dung: <span class="text-danger">{{ isSyntax.syntax }}</span>
        </div>
        <div class="flex justify-center mt-2">
          <div class="w-64 h-64 float-left image-fit mx-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              :src="`https://chart.googleapis.com/chart?chs=480x480&cht=qr&choe=UTF-8&chl=2|99|${isSyntax.wallet.phone}|NGUYEN VAN A|admin@gmail.com|0|0|10000|${isSyntax.syntax}|transfer_myqr`"
              data-action="zoom"
              class="w-full rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END: Pricing Content -->
  <h2 class="intro-y text-2xl font-medium mt-10 text-center mr-auto">Lịch Sử Nạp Tiền</h2>

  <div class="grid grid-cols-12 gap-6 mt-5">
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <table class="table table-report -mt-2">
        <thead>
          <tr>
            <th class="whitespace-nowrap">Cổng Nạp</th>
            <th class="text-center whitespace-nowrap">Số Tiền Nạp</th>
            <th class="text-center whitespace-nowrap">Nội Dung</th>
            <th class="text-center whitespace-nowrap">Thời Gian</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!isHistory.length">
            <td valign="top" colspan="4" class="text-center font-medium">Không có gì để hiển thị</td>
          </tr>
          <tr v-for="(item, itemKey) in isHistory" :key="itemKey" class="intro-x">
            <td>
              <a class="font-medium whitespace-nowrap">{{ item.type }}</a>
            </td>
            <td class="text-center">{{ $h.formatCurrency(item.amount) }} vnđ</td>
            <td class="text-center">{{ item.syntax }}</td>
            <td class="text-center">{{ $h.formatDate(item.updatedAt, 'DD/MM/YYYY HH:mm') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- END: Data List -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { rechargeSyntax, rechargeHistory } from '@/api'
import { helper as $h } from '@/utils/helper'

const isSyntax = ref({
  bank: {
    type: 'ACB',
    name: 'DANG QUANG LOI',
    accountNumber: '999999999'
  },
  wallet: {
    type: 'Ví Momo',
    name: 'DANG QUANG LOI',
    phone: '03555555555'
  },
  syntax: 999999
})

const isHistory = ref([])

const getSyntax = async () => {
  let data = await rechargeSyntax()
  isSyntax.value = data
}

const getHistory = async () => {
  let data = await rechargeHistory()
  isHistory.value = data
}
onMounted(() => {
  getSyntax()
  getHistory()
})
</script>
