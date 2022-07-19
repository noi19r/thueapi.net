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
            <th class="whitespace-nowrap">Số Dư</th>

            <th class="text-center whitespace-nowrap">Ngày Hết Hạn</th>
            <th class="text-center whitespace-nowrap">Trạng Thái</th>
            <th class="text-center whitespace-nowrap">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(faker, fakerKey) in $_.take($f(), 9)" :key="fakerKey" class="intro-x">
            <td class="w-40 !py-4">
              <div class="font-medium decoration-dotted whitespace-nowrap">
                {{ '036' + faker.totals[0] + '8075' }}
              </div>
              <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">{{ faker.users[0].name }}</div>
            </td>
            <td class="w-40">
              <div class="pr-16">${{ faker.totals[0] + ',000,00' }}</div>
            </td>

            <td class="text-center">
              <div class="whitespace-nowrap">20/06/2022 12:13</div>
              <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">20/01/2022 12:13</div>
            </td>
            <td class="text-center">
              <div
                class="whitespace-nowrap"
                :class="{
                  'text-success': faker.trueFalse[0],
                  'text-danger': !faker.trueFalse[0]
                }"
              >
                {{ faker.trueFalse[0] ? 'Hoạt động' : 'Hết thời gian truy cập. Vui lòng đăng nhập lại!' }}
              </div>
            </td>
            <td class="table-report__action">
              <div class="flex justify-center items-center">
                <router-link to="/personal/momo/statistic/123918293"
                  ><a class="flex items-center text-primary whitespace-nowrap mr-5" href="javascript:;">
                    <BarChart2Icon class="w-4 h-4 mr-1" /> Thống Kê
                  </a>
                </router-link>
                <router-link to="/personal/momo/transaction/123918293"
                  ><a class="flex items-center text-primary whitespace-nowrap mr-5" href="javascript:;">
                    <ListIcon class="w-4 h-4 mr-1" /> Lịch Sử
                  </a>
                </router-link>
                <a class="flex items-center text-primary whitespace-nowrap mr-5" href="javascript:;">
                  <DollarSignIcon class="w-4 h-4 mr-1" /> Chuyển Tiền
                </a>
                <a v-if="faker.trueFalse[0]" class="flex items-center whitespace-nowrap mr-5" href="javascript:;">
                  <ToggleLeftIcon class="w-4 h-4 mr-1" />
                  Tạm Ngưng
                </a>
                <a v-else class="flex items-center text-primary whitespace-nowrap mr-5" href="javascript:;">
                  <ToggleRightIcon class="w-4 h-4 mr-1" />
                  Kích Hoạt
                </a>
                <a
                  class="flex items-center text-danger whitespace-nowrap"
                  href="javascript:;"
                  @click="deleteConfirmationModal = true"
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
        <div class="text-3xl mt-5">Are you sure?</div>
        <div class="text-slate-500 mt-2">
          Do you really want to delete these records? <br />This process cannot be undone.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" @click="deleteConfirmationModal = false" class="btn btn-outline-secondary w-24 mr-1">
          Cancel
        </button>
        <button type="button" class="btn btn-danger w-24">Delete</button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->
</template>

<script setup>
import { ref } from 'vue'

const deleteConfirmationModal = ref(false)
</script>
