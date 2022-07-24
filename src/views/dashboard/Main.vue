<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-9">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: Notification -->
        <div class="col-span-12 mt-6 -mb-6 intro-y" v-if="userInfo.amount < 10000">
          <Alert class="box bg-primary text-white flex items-center mb-6" v-slot="{ dismiss }">
            <span
              >Số dư của bạn đang ở mức thấp, bạn cần nạp thêm để tránh gián đoạn dịch vụ.
              <!-- <a href="https://sow.dev" class="underline ml-1" target="blank">@sow.dev</a>. -->
            </span>
            <button type="button" class="btn-close text-white" @click="dismiss" aria-label="Close">
              <XIcon class="w-4 h-4" />
            </button>
          </Alert>
        </div>

        <!-- BEGIN: Notification -->
        <!-- BEGIN: Ads 1 -->
        <div class="col-span-12 lg:col-span-6 mt-6">
          <div class="box p-8 relative overflow-hidden bg-primary intro-y">
            <div class="leading-[2.15rem] w-full sm:w-72 text-white text-xl -mt-3">
              Transact safely with Lender’s Fund Account (RDL)
            </div>
            <div class="w-full sm:w-72 leading-relaxed text-white/70 dark:text-slate-500 mt-3">
              Apply now, quick registration.
            </div>
            <button class="btn w-32 bg-white dark:bg-darkmode-800 dark:text-white mt-6 sm:mt-10">Start Now</button>
            <img
              class="hidden sm:block absolute top-0 right-0 w-2/5 -mt-3 mr-2"
              alt="Midone Tailwind HTML Admin Template"
              src="@/assets/images/woman-illustration.svg"
            />
          </div>
        </div>
        <!-- END: Ads 1 -->
        <!-- BEGIN: Ads 2 -->
        <div class="col-span-12 lg:col-span-6 mt-6">
          <div class="box p-8 relative overflow-hidden intro-y">
            <div class="leading-[2.15rem] w-full sm:w-52 text-primary dark:text-white text-xl -mt-3">
              Invite friends to get
              <span class="font-medium">FREE</span> bonuses!
            </div>
            <div class="w-full sm:w-60 leading-relaxed text-slate-500 mt-2">
              Get a IDR 100,000 voucher by inviting your friends to fund #BecomeMember
            </div>
            <Tippy tag="div" class="w-48 relative mt-6 cursor-pointer" content="Copy referral link">
              <input type="text" class="form-control" value="https://dashboard.in" />
              <CopyIcon class="absolute right-0 top-0 bottom-0 my-auto mr-4 w-4 h-4" />
            </Tippy>
            <img
              class="hidden sm:block absolute top-0 right-0 w-1/2 mt-1 -mr-12"
              alt="Midone Tailwind HTML Admin Template"
              src="@/assets/images/phone-illustration.svg"
            />
          </div>
        </div>
        <!-- END: Ads 2 -->
        <!-- BEGIN: Weekly Top Products -->
        <div class="col-span-12 mt-6">
          <div class="intro-y block sm:flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">Các Giao Dịch Gần Nhất</h2>
          </div>
          <div class="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
            <table class="table table-report sm:mt-2">
              <thead>
                <tr>
                  <th class="whitespace-nowrap">Mã Giao Dịch</th>
                  <th class="whitespace-nowrap">Thông Tin</th>
                  <th class="text-center whitespace-nowrap">Biến Động</th>
                  <th class="text-center whitespace-nowrap">Nội Dung</th>
                  <th class="text-center whitespace-nowrap">Thời Gian</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!isLastTransaction.length">
                  <td valign="top" colspan="5" class="text-center font-medium">Không có gì để hiển thị</td>
                </tr>
                <tr
                  v-else
                  v-for="(transaction, transactionKey) in isLastTransaction"
                  :key="transactionKey"
                  class="intro-x"
                >
                  <td>
                    <a class="font-medium whitespace-nowrap">{{ transaction.bank }}</a>
                    <div class="text-primary text-2xs whitespace-nowrap mt-0.5">
                      {{ transaction.transId }}
                    </div>
                  </td>
                  <td>
                    <a class="font-medium whitespace-nowrap">{{
                      transaction.bank == 'zalopay'
                        ? transaction.info[1]
                          ? transaction.info[1].value
                          : transaction.info[0].name
                        : transaction.partnerId
                    }}</a>
                    <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {{ transaction.bank == 'zalopay' ? transaction.info[0].value : transaction.partnerName }}
                    </div>
                  </td>

                  <td class="text-center">
                    <a
                      class="font-medium font-medium"
                      :class="{
                        'text-success': transaction.io == 1,
                        'text-danger': transaction.io == -1
                      }"
                      >{{ $h.formatCurrency(transaction.amount * transaction.io) }}</a
                    >

                    <div class="text-primary text-2xs whitespace-nowrap mt-0.5">
                      {{ $h.formatCurrency(transaction.postBalance) }} vnđ
                    </div>
                  </td>
                  <td class="w-40">
                    <div class="flex items-center justify-center">
                      {{ transaction.comment }}
                    </div>
                  </td>
                  <td class="text-center font-medium whitespace-nowrap">
                    {{ $h.formatDate(transaction.time, 'DD/MM/YYYY HH:mm') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div class="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3">
            <nav class="w-full sm:w-auto sm:mr-auto">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#">
                    <ChevronsLeftIcon class="w-4 h-4" />
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    <ChevronLeftIcon class="w-4 h-4" />
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">...</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">2</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">3</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">...</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    <ChevronRightIcon class="w-4 h-4" />
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    <ChevronsRightIcon class="w-4 h-4" />
                  </a>
                </li>
              </ul>
            </nav>
            <select class="w-20 form-select box mt-3 sm:mt-0">
              <option>10</option>
              <option>25</option>
              <option>35</option>
              <option>50</option>
            </select>
          </div> -->
        </div>
        <!-- END: Weekly Top Products -->
      </div>
    </div>
    <div class="col-span-12 2xl:col-span-3">
      <div class="2xl:border-l -mb-10 pb-10">
        <div class="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
          <!-- BEGIN: Important Notes -->
          <div class="col-span-12 md:col-span-6 xl:col-span-12 mt-3 2xl:mt-8">
            <div class="intro-x flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-auto">Thông Báo</h2>
              <button
                data-carousel="important-notes"
                data-target="prev"
                class="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"
                @click="prevImportantNotes"
              >
                <ChevronLeftIcon class="w-4 h-4" />
              </button>
              <button
                data-carousel="important-notes"
                data-target="next"
                class="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"
                @click="nextImportantNotes"
              >
                <ChevronRightIcon class="w-4 h-4" />
              </button>
            </div>
            <div class="mt-5 intro-x">
              <div class="box zoom-in" v-if="listImportantNote.length">
                <TinySlider ref-key="importantNotesRef">
                  <div class="p-5" v-for="(item, itemKey) in listImportantNote" :key="itemKey">
                    <div class="text-base font-medium truncate">{{ item.title }}</div>
                    <!-- <div class="text-slate-400 mt-1">{{ $h.timeAgo(item.createdAt) }}</div> -->
                    <div class="text-slate-500 text-justify mt-1">
                      {{ item.content }}
                    </div>
                    <div class="font-medium flex mt-5">
                      <div class="btn btn-secondary py-1 px-2 h-5">
                        {{ $h.formatDate(item.createdAt, 'DD/MM/YYYY HH:mm') }}
                      </div>
                      <div class="btn btn-secondary py-1 px-2 h-5 ml-auto ml-auto">
                        {{ $h.timeAgoVi(item.createdAt) }}
                      </div>
                    </div>
                  </div>
                </TinySlider>
              </div>
            </div>
          </div>
          <!-- END: Important Notes -->
          <!-- BEGIN: Transactions -->
          <div class="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
            <div class="intro-x flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">Lịch Sử Đăng Nhập</h2>
            </div>
            <div class="mt-5">
              <div v-for="(faker, fakerKey) in $_.take($f(), 0)" :key="fakerKey" class="intro-x">
                <div class="box px-5 py-3 mb-3 flex items-center zoom-in">
                  <!-- <div class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                    <img alt="Midone Tailwind HTML Admin Template" :src="faker.photos[0]" />
                  </div> -->
                  <div class="ml-4 mr-auto">
                    <div class="font-medium">
                      {{ faker.users[0].name }}
                    </div>
                    <div class="text-slate-500 text-xs mt-0.5">
                      {{ faker.dates[0] }}
                    </div>
                  </div>
                  <!-- <div
                    :class="{
                      'text-success': faker.trueFalse[0],
                      'text-danger': !faker.trueFalse[0]
                    }"
                  >
                    {{ faker.trueFalse[0] ? '+' : '-' }}${{ faker.totals[0] }}
                  </div> -->
                </div>
              </div>
              <a
                href=""
                class="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                >Xem Thêm</a
              >
            </div>
          </div>
          <!-- END: Transactions -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, inject, onMounted, computed } from 'vue'
import { lastTransaction, importantNote } from '@/api'
import { useUserStore } from '@/stores/user'
import { helper as $h } from '@/utils/helper'
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfoMe)
const importantNotesRef = ref()
const listImportantNote = ref([])
const isLastTransaction = ref([])

const getLastTransaction = async () => {
  let data = await lastTransaction()

  isLastTransaction.value = data
}
const getImportantNotes = async () => {
  let data = await importantNote()
  listImportantNote.value = data
}
provide('bind[importantNotesRef]', (el) => {
  importantNotesRef.value = el
})

const prevImportantNotes = () => {
  const el = importantNotesRef.value
  el.tns.goTo('prev')
}
const nextImportantNotes = () => {
  const el = importantNotesRef.value
  el.tns.goTo('next')
}

onMounted(async () => {
  userStore.setUserInfo()
  getLastTransaction()
  getImportantNotes()
})
</script>
