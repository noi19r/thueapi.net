<template>
  <h2 class="intro-y text-lg font-medium mt-10">Danh Sách Tài Khoản</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
      <div class="flex w-full sm:w-auto">
        <div class="w-48 relative text-slate-500">
          <input type="text" class="form-control w-48 box pr-10" placeholder="Search by invoice..." />
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
        </div>
      </div>
      <div class="hidden xl:block mx-auto text-slate-500">Showing 1 to 10 of 150 entries</div>
      <div class="w-full xl:w-auto flex items-center mt-3 xl:mt-0">
        <button class="btn btn-primary shadow-md mr-2"><PlusIcon class="w-4 h-4 mr-2" />Thêm Tài Khoản</button>
      </div>
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
                <router-link to="/personal/momo/statistic/123918293"
                  ><a class="flex items-center text-primary whitespace-nowrap mr-5" href="javascript:;">
                    <BarChart2Icon class="w-4 h-4 mr-1" /> Thống Kê
                  </a>
                </router-link>
                <router-link :to="{ name: 'side-menu-personal-momo-history', params: { id: item._id } }"
                  ><a class="flex items-center text-primary whitespace-nowrap mr-5" href="javascript:;">
                    <ListIcon class="w-4 h-4 mr-1" /> Lịch Sử
                  </a>
                </router-link>
                <a class="flex items-center text-primary whitespace-nowrap mr-5" href="javascript:;">
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
</template>

<script setup>
import { helper as $h } from '@/utils/helper'
import { ref, onMounted } from 'vue'
import { bankAccount, deleteBankAccount, updateBankAccount } from '@/api'
import { toast } from '../../../plugins/toast'
const deleteConfirmationModal = ref(false)
const isData = ref([])
const isModel = ref('')

const isLogError = ref({
  0: 'Tạm ngưng',
  1: 'Hoạt động',
  2: 'Tài khoản đang bị khoá',
  3: ' Vui lòng đăng nhập lại',
  99: 'Trạng thái chờ OTP'
})
const showModelDelete = async (bankId) => {
  isModel.value = bankId
  deleteConfirmationModal.value = true
}

const confirmDelete = async () => {
  deleteConfirmationModal.value = false
  console.log(isModel.value)
  // await deleteBankAccount(isModel.value)
  toast.success('Xoá tài khoản thành công.')
  getDataMomo()
}

const updateStatus = async (bankId, status) => {
  let isStatus = 0
  if (status != 1 && status != 0) return toast.warning('Không thể thực hiện được')
  if (status == 0) {
    isStatus = 1
  }
  await updateBankAccount(bankId, { status: isStatus })
  toast.success('Thay đổi trạng thái thành công.')
  getDataMomo()
}

const getDataMomo = async () => {
  let data = await bankAccount('momo')
  isData.value = data.list
}
onMounted(() => {
  getDataMomo()
})
</script>
