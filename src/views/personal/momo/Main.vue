<template>
  <h2 class="intro-y text-lg font-medium mt-10">Danh Sách Tài Khoản</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
      <div class="flex w-full sm:w-auto">
        <div class="w-48 relative text-slate-500">
          <input type="text" class="form-control w-48 box pr-10" placeholder="Search..." />
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
        </div>
      </div>
      <!-- <div class="hidden xl:block mx-auto text-slate-500">Showing 1 to 10 of 150 entries</div> -->
      <div class="hidden xl:block mx-auto text-slate-500"></div>
      <div @click.prevent="headerFooterModalPreview = true" class="w-full xl:w-auto flex items-center mt-3 xl:mt-0">
        <button class="btn btn-primary shadow-md mr-2"><PlusIcon class="w-4 h-4 mr-2" />Thêm Tài Khoản</button>
      </div>
      <!-- BEGIN: Modal Content -->
      <Modal :show="headerFooterModalPreview" @hidden="headerFooterModalPreview = false">
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">Thêm Tài Khoản</h2>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
          <div class="col-span-12">
            <label for="modal-form-1" class="form-label">Số điện thoại</label>
            <input type="text" class="form-control" v-model="formWallet.phone" :disabled="Boolean(formWallet._id)" />
          </div>
          <div class="col-span-12 sm:col-span-6" v-if="formWallet._id">
            <label for="modal-form-1" class="form-label">Mật khẩu</label>
            <input type="text" class="form-control" v-model="formWallet.password" />
          </div>
          <div class="col-span-12 sm:col-span-6" v-if="formWallet._id">
            <label for="modal-form-1" class="form-label">OTP</label>
            <input type="text" class="form-control" v-model="formWallet.otp" />
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" @click.prevent="cancelModel" class="btn btn-outline-secondary w-20 mr-1">Huỷ</button>
          <button v-if="!formWallet._id" type="button" @click.prevent="getOTPWallet" class="btn btn-primary w-20">
            Lấy OTP
          </button>
          <button v-else type="button" @click.prevent="confirmOTPWallet" class="btn btn-primary w-30">Xác nhận</button>
        </ModalFooter>
      </Modal>
      <!-- END: Modal Content -->
      <!-- BEGIN: Modal Transfer -->
      <Modal :show="headerFooterModalTransfer" @hidden="headerFooterModalTransfer = false">
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">Thêm Tài Khoản</h2>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
          <div
            class="col-span-12"
            :class="{
              'sm:col-span-6': formTransferWallet.NAME
            }"
          >
            <label for="modal-form-1" class="form-label">Số điện thoại người nhận</label>
            <input
              type="text"
              class="form-control"
              v-model="formTransferWallet.numberPhone"
              :disabled="Boolean(formTransferWallet.NAME)"
            />
          </div>
          <div class="col-span-12 sm:col-span-6" v-if="formTransferWallet.NAME">
            <label for="modal-form-1" class="form-label">Tên người nhận:</label>
            <input type="text" class="form-control" v-model="formTransferWallet.NAME" disabled />
          </div>
          <div class="col-span-12 sm:col-span-6" v-if="formTransferWallet.NAME">
            <label for="modal-form-1" class="form-label">Số tiền</label>
            <input type="number" class="form-control" min="100" max="20000000" v-model="formTransferWallet.amount" />
          </div>
          <div class="col-span-12 sm:col-span-6" v-if="formTransferWallet.NAME">
            <label for="modal-form-1" class="form-label">Nội dung</label>
            <input type="text" class="form-control" v-model="formTransferWallet.comment" />
          </div>
          <div class="col-span-12 sm:col-span-6" v-if="formTransferWallet.NAME">
            <label for="modal-form-1" class="form-label">Mật khẩu</label>
            <input type="text" class="form-control" v-model="formTransferWallet.password" />
          </div>
          <div class="col-span-12 sm:col-span-6" v-if="formTransferWallet.NAME && userStore.userInfoMe.is2FA">
            <label for="modal-form-1" class="form-label">OTP</label>
            <input type="text" class="form-control" v-model="formTransferWallet.otp" />
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" @click.prevent="cancelModelTransfer" class="btn btn-outline-secondary w-20 mr-1">
            Huỷ
          </button>
          <button
            v-if="!formTransferWallet.NAME"
            type="button"
            @click.prevent="checkNameTransferWallet"
            class="btn btn-primary w-30"
          >
            Kiểm Tra
          </button>
          <button v-else type="button" @click.prevent="confirmTransferWallet" class="btn btn-primary w-30">
            Chuyển tiền
          </button>
        </ModalFooter>
      </Modal>
      <!-- END: Modal Transfer -->
    </div>
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
      <table class="table table-report -mt-2">
        <thead>
          <tr>
            <th class="whitespace-nowrap">Thông Tin</th>
            <th class="text-center whitespace-nowrap">Số Dư</th>

            <th class="text-center whitespace-nowrap">Ngày Hết Hạn</th>
            <th class="text-center whitespace-nowrap">Trạng Thái</th>
            <th class="text-center whitespace-nowrap">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, itemKey) in isData" :key="itemKey" class="intro-x">
            <td class="whitespace-nowrap !py-4 pr-20">
              <div class="font-medium decoration-dotted whitespace-nowrap">
                {{ item.phone }}
              </div>
              <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">{{ item.name }}</div>
            </td>
            <td class="whitespace-nowrap font-medium text-center text-primary">
              {{ $h.formatCurrency(item.balance) }} vnđ
            </td>

            <td class="text-center">
              <div class="whitespace-nowrap">{{ $h.formatDate(item.decks.expired, 'DD/MM/YYYY HH:mm') }}</div>
              <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                {{ $h.formatDate(item.createdAt, 'DD/MM/YYYY HH:mm') }}
              </div>
            </td>
            <td class="text-center">
              <div
                class="whitespace-nowrap"
                :class="{
                  'text-success': item.status == 1,
                  'text-danger': item.status != 1
                }"
              >
                {{ isLogError[item.status] }}
              </div>
            </td>
            <td class="table-report__action">
              <div class="flex justify-center items-center">
                <!-- <router-link v-if="item.status == 1" to="/personal/momo/statistic/123918293"
                  ><a class="flex items-center text-primary whitespace-nowrap mr-5" href="javascript:;">
                    <BarChart2Icon class="w-4 h-4 mr-1" /> Thống Kê
                  </a>
                </router-link> -->
                <router-link
                  v-if="item.status == 1"
                  :to="{ name: 'side-menu-personal-momo-history', params: { id: item._id } }"
                  ><a class="flex items-center text-primary whitespace-nowrap mr-5" href="javascript:;">
                    <ListIcon class="w-4 h-4 mr-1" /> Lịch Sử
                  </a>
                </router-link>
                <a
                  v-if="item.status == 1"
                  class="flex items-center text-primary whitespace-nowrap mr-5"
                  href="javascript:;"
                  @click.prevent="showModelTransfer(item._id)"
                >
                  <DollarSignIcon class="w-4 h-4 mr-1" /> Chuyển Tiền
                </a>
                <a
                  v-if="item.status == 1"
                  class="flex items-center whitespace-nowrap mr-5 font-medium"
                  href="javascript:;"
                  @click.prevent="updateStatus(item._id, item.status)"
                >
                  <ToggleLeftIcon class="w-4 h-4 mr-1" />
                  Tạm Ngưng
                </a>
                <a
                  v-else-if="item.status == 0"
                  class="flex items-center text-primary whitespace-nowrap mr-5 font-medium"
                  href="javascript:;"
                  @click.prevent="updateStatus(item._id, item.status)"
                >
                  <ToggleRightIcon class="w-4 h-4 mr-1" />
                  Kích Hoạt
                </a>
                <a
                  class="flex items-center text-primary whitespace-nowrap mr-5"
                  href="javascript:;"
                  @click.prevent="showModelExtend(item._id, item.phone)"
                >
                  <DollarSignIcon class="w-4 h-4 mr-1" /> Gia Hạn
                </a>
                <a
                  class="flex items-center text-danger whitespace-nowrap"
                  href="javascript:;"
                  @click="showModelDelete(item._id)"
                >
                  <Trash2Icon class="w-4 h-4 mr-1" />
                  Xoá
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- END: Data List -->
  </div>
  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Bạn có chắc không?</div>
        <div class="text-slate-500 mt-2">
          Bạn có chắc là muốn xoá tài khoản này không? <br />Không thể hoàn tác khi xác nhận.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" @click="deleteConfirmationModal = false" class="btn btn-outline-secondary w-24 mr-1">
          Huỷ
        </button>
        <button @click.prevent="confirmDelete" type="button" class="btn btn-danger w-24">Xác Nhận</button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->

  <!-- BEGIN: Modal Content -->
  <Modal :show="isModelExtend" @hidden="isModelExtend = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Gia hạn sử dụng</h2>
    </ModalHeader>
    <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
      <div class="col-span-12 sm:col-span-6">
        <label for="modal-form-6" class="form-label">Ví Momo: </label>
        <input type="text" class="form-control text-primary" :value="formExtend.phone" disabled />
      </div>
      <div class="col-span-12 sm:col-span-6">
        <label for="modal-form-6" class="form-label">Thời hạn</label>
        <select v-model="formExtend.period" class="form-select">
          <option value="1">1 tháng</option>
          <option value="2">2 tháng</option>
          <option value="3">3 tháng</option>
          <option value="6">6 tháng</option>
        </select>
      </div>
    </ModalBody>
    <ModalFooter>
      <button type="button" @click="isModelExtend = false" class="btn btn-outline-secondary w-20 mr-1">Huỷ</button>
      <button type="button" class="btn btn-primary w-25" @click.prevent="confirmExtend">Gia hạn</button>
    </ModalFooter>
  </Modal>
  <!-- END: Modal Content -->
</template>

<script setup>
import { helper as $h } from '@/utils/helper'
import { ref, onMounted } from 'vue'
import {
  bankAccount,
  deleteBankAccount,
  updateBankAccount,
  getOTP,
  confirmOTP,
  checkNameTranfer,
  tranferWallet,
  deckExtend
} from '@/api'
import { toast } from '../../../plugins/toast'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const headerFooterModalTransfer = ref(false)
const deleteConfirmationModal = ref(false)
const headerFooterModalPreview = ref(false)
const formWallet = ref({
  phone: '',
  password: '',
  otp: '',
  _id: ''
})

const formTransferWallet = ref({
  numberPhone: '',
  amount: 100,
  comment: '',
  otp: '',
  password: '',
  NAME: '',
  _id: ''
})

const formExtend = ref({
  _id: '',
  period: 1,
  phone: ''
})
const isModelExtend = ref(false)

const isData = ref([])
const isModel = ref('')

const isLogError = ref({
  0: 'Tạm ngưng',
  1: 'Hoạt động',
  2: 'Tài khoản đang bị khoá',
  3: ' Vui lòng đăng nhập lại',
  99: 'Trạng thái chờ OTP'
})

const showModelTransfer = (id) => {
  formTransferWallet.value._id = id
  headerFooterModalTransfer.value = true
}

const showModelDelete = async (bankId) => {
  isModel.value = bankId
  deleteConfirmationModal.value = true
}

const confirmDelete = async () => {
  deleteConfirmationModal.value = false

  await deleteBankAccount(isModel.value)
  toast.success('Xoá tài khoản thành công.')
  getDataAccount()
}

const updateStatus = async (bankId, status) => {
  let isStatus = 0
  if (status != 1 && status != 0) return toast.warning('Không thể thực hiện được')
  if (status == 0) {
    isStatus = 1
  }
  await updateBankAccount(bankId, { status: isStatus })
  toast.success('Thay đổi trạng thái thành công.')
  getDataAccount()
}

const cancelModel = () => {
  formWallet.value = {
    phone: '',
    password: '',
    otp: '',
    _id: ''
  }
  headerFooterModalPreview.value = false
}
const cancelModelTransfer = () => {
  formTransferWallet.value = {
    numberPhone: '',
    amount: 100,
    comment: '',
    otp: '',
    password: '',
    NAME: '',
    _id: ''
  }
  headerFooterModalTransfer.value = false
}
const getDataAccount = async () => {
  let data = await bankAccount('momo')
  isData.value = data.list
}
const getOTPWallet = async () => {
  let data = await getOTP('momo', {
    phone: formWallet.value.phone
  })
  formWallet.value._id = data._id
  toast.success('Gửi mã xác nhận thành công.')
  getDataAccount()
}

const confirmOTPWallet = async () => {
  await confirmOTP('momo', formWallet.value)
  cancelModel()
  toast.success('Thêm tài khoản thành công.')
  getDataAccount()
}

const checkNameTransferWallet = async () => {
  let data = await checkNameTranfer('momo', {
    _id: formTransferWallet.value._id,
    numberPhone: formTransferWallet.value.numberPhone
  })
  formTransferWallet.value.NAME = data.NAME
}

const showModelExtend = (bankId, phone) => {
  formExtend.value = {
    _id: bankId,
    period: 1,
    phone: phone
  }
  isModelExtend.value = true
}

const confirmExtend = async () => {
  isModelExtend.value = false
  await deckExtend(formExtend.value._id, { period: formExtend.value.period })
  getDataAccount()
  toast.success('Gia hạn thành công.')
}

const confirmTransferWallet = async () => {
  let data = {
    ...formTransferWallet.value
  }
  if (!userStore.userInfoMe.is2FA) delete data.otp

  await tranferWallet('momo', data)
  cancelModelTransfer()
  toast.success('Chuyển tiền thành công.')
}

onMounted(() => {
  getDataAccount()
})
</script>
