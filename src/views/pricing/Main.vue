<template>
  <h2 class="intro-y text-lg font-medium mt-10">Bảng Giá Cổng Thanh Toán</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <table class="table table-report -mt-3">
        <thead>
          <tr>
            <th class="whitespace-nowrap">Cổng Thanh Toán</th>

            <th class="whitespace-nowrap">Giá</th>
            <th class="text-center whitespace-nowrap">Trạng Thái</th>
            <th class="text-center whitespace-nowrap">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(price, priceKey) in priceListData" :key="priceKey" class="intro-x">
            <td class="!py-2">
              <div class="flex items-center">
                <div class="w-10 h-10 image-fit zoom-in">
                  <Tippy
                    tag="img"
                    alt="Midone - HTML Admin Template"
                    class="rounded-lg border-1 border-white shadow-md tooltip"
                    :src="$f()[9].photos[0]"
                    :content="`Tài Khoản Cá Nhân`"
                  />
                </div>

                <a class="font-medium whitespace-nowrap ml-4">{{ price.name }}</a>
              </div>
            </td>

            <td>
              <div class="font-medium flex items-center mr-3">{{ $h.formatCurrency(price.amount) }} vnđ</div>
            </td>
            <td class="w-20 whitespace-nowrap">
              <div
                class="flex items-center justify-center"
                :class="{
                  'text-success': price.status,
                  'text-danger': !price.status
                }"
              >
                <CheckCircleIcon v-if="price.status" class="w-4 h-4 mr-2" />
                <AlertCircleIcon v-else class="w-4 h-4 mr-2" />
                {{ price.status ? 'Hoạt động' : 'Bảo Trì' }}
              </div>
            </td>
            <td class="table-report__action w-56">
              <div class="flex justify-center items-center">
                <button class="flex items-center text-primary" @click="dataModel(price.type, price.amount, price.name)">
                  <CreditCardIcon class="w-4 h-4 mr-1" /> Nâng Cấp
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- END: Data List -->
  </div>
  <!-- BEGIN: Modal Content -->
  <Modal :show="modelUpgradeDeck" @hidden="modelUpgradeDeck = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Nâng cấp sử dụng</h2>
    </ModalHeader>
    <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
      <div class="col-span-12 text-center">
        <!-- <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" /> -->
        <div class="text-3xl mt-2 text-primary">{{ dateUpgrade.name }}</div>
      </div>

      <div class="col-span-12 sm:col-span-6">
        <label for="modal-form-6" class="form-label">Thời hạn</label>
        <select v-model="dateUpgrade.period" class="form-select">
          <option value="1">1 tháng</option>
          <option value="2">2 tháng</option>
          <option value="3">3 tháng</option>
          <option value="6">6 tháng</option>
        </select>
      </div>
      <div class="col-span-12 sm:col-span-6">
        <label for="modal-form-5" class="form-label">Thành tiền</label>
        <input
          type="text"
          class="form-control"
          :value="`${$h.formatCurrency(dateUpgrade.price * dateUpgrade.period)} vnđ`"
          disabled
        />
      </div>
    </ModalBody>
    <ModalFooter>
      <button type="button" @click="modelUpgradeDeck = false" class="btn btn-outline-secondary w-20 mr-1">Huỷ</button>
      <button type="button" class="btn btn-primary w-25" @click.prevent="submitUpgrade">Nâng cấp</button>
    </ModalFooter>
  </Modal>
  <!-- END: Modal Content -->
</template>

<script setup>
import { ref, onMounted, reactive, toRaw } from 'vue'
import { priceList, deckUpgrade } from '@/api'
import { helper as $h } from '@/utils/helper'
import { toast } from '../../plugins/toast'
import { useUserStore } from '@/stores/user'
const deleteConfirmationModal = ref(false)
const modelUpgradeDeck = ref(false)
const priceListData = ref([])
const userStore = useUserStore()

const getPriceList = async () => {
  let result = await priceList()
  priceListData.value = result.list
}

const dataModel = (type, price, name) => {
  dateUpgrade.period = 1
  dateUpgrade.type = type
  dateUpgrade.price = price
  dateUpgrade.name = name
  modelUpgradeDeck.value = true
}
const submitUpgrade = async () => {
  modelUpgradeDeck.value = false
  let data = toRaw(dateUpgrade)
  await deckUpgrade({
    period: data.period,
    type: data.type
  })
  toast.success('Nâng cấp gói thành công.')
  userStore.setUserInfo()
}
const dateUpgrade = reactive({
  period: 1,
  type: '',
  price: 1000,
  name: ''
})
onMounted(() => {
  userStore.setUserInfo()
  getPriceList()
})
</script>
