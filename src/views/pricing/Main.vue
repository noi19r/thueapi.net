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
          <tr v-for="(faker, fakerKey) in $_.take($f(), 7)" :key="fakerKey" class="intro-x">
            <td class="!py-2">
              <div class="flex items-center">
                <div class="w-10 h-10 image-fit zoom-in">
                  <Tippy
                    tag="img"
                    alt="Midone - HTML Admin Template"
                    class="rounded-lg border-1 border-white shadow-md tooltip"
                    :src="faker.images[0]"
                    :content="`Tài Khoản Cá Nhân`"
                  />
                </div>

                <a href="" class="font-medium whitespace-nowrap ml-4">{{ faker.products[0].name }}</a>
              </div>
            </td>

            <td>
              <div class="text-slate-500 flex items-center mr-3">{{ faker.totals[0] }},000 vnđ</div>
            </td>
            <td class="w-20 whitespace-nowrap">
              <div
                class="flex items-center justify-center"
                :class="{
                  'text-success': faker.trueFalse[0],
                  'text-danger': !faker.trueFalse[0]
                }"
              >
                <CheckCircleIcon v-if="faker.trueFalse[0]" class="w-4 h-4 mr-2" />
                <AlertCircleIcon v-else class="w-4 h-4 mr-2" />
                {{ faker.trueFalse[0] ? 'Hoạt động' : 'Bảo Trì' }}
              </div>
            </td>
            <td class="table-report__action w-56">
              <div class="flex justify-center items-center">
                <button class="flex items-center text-primary" @click="deleteConfirmationModal = true">
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
