<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Lịch Sử Giao Dịch</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <router-link to="/personal/momo"> <button class="btn btn-primary shadow-md mr-2">Trở Lại</button></router-link>
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <div class="flex mt-5 sm:mt-0">
        <button id="tabulator-print" class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2" @click="onPrint">
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button>
        <Dropdown class="w-1/2 sm:w-auto">
          <DropdownToggle class="btn btn-outline-secondary w-full sm:w-auto">
            <FileTextIcon class="w-4 h-4 mr-2" /> Xuất
            <ChevronDownIcon class="w-4 h-4 ml-auto sm:ml-2" />
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent>
              <DropdownItem @click="onExportCsv"> <FileTextIcon class="w-4 h-4 mr-2" /> Dạng CSV </DropdownItem>
              <DropdownItem @click="onExportJson"> <FileTextIcon class="w-4 h-4 mr-2" /> Dạng JSON </DropdownItem>
              <DropdownItem @click="onExportXlsx"> <FileTextIcon class="w-4 h-4 mr-2" /> Dạng XLSX </DropdownItem>
              <DropdownItem @click="onExportHtml"> <FileTextIcon class="w-4 h-4 mr-2" /> Dạng HTML </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator" ref="tableRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import xlsx from 'xlsx'
import { createIcons, icons } from 'lucide'
import Tabulator from 'tabulator-tables'
import dom from '@left4code/tw-starter/dist/js/dom'
import { helper as $h } from '@/utils/helper'
import router from '@/router'
import { dateFilter } from '@/global-components/litepicker/index'

const tableRef = ref()
const tabulator = ref()

const salesReportFilter = ref()

const imageAssets = import.meta.globEager(`/src/assets/images/*.{jpg,jpeg,png,svg}`)
const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    ajaxURL: `/api/admin/users`,
    ajaxConfig: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    },
    ajaxFiltering: true,
    ajaxSorting: false,
    printAsHtml: true,
    printStyled: true,

    pagination: 'remote',
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 30, 40],
    layout: 'fitColumns',
    responsiveLayout: 'collapse',
    placeholder: 'Không tìm thấy lịch sử nào',
    localized: function (e, t) {
      t.pagination.page_size = 'Hiển thị'
    },
    columns: [
      {
        formatter: 'responsiveCollapse',
        width: 40,
        minWidth: 30,
        hozAlign: 'center',
        resizable: false,
        headerSort: false
      },
      // For HTML table
      {
        responsive: 0,
        title: 'Thông Tin',
        minWidth: 200,
        field: 'name',

        vertAlign: 'middle',
        print: false,
        download: false
      },
      {
        title: 'Liên Hệ',
        minWidth: 200,
        field: 'name',
        vertAlign: 'middle',
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().email}</div>
                <div class="text-slate-500 text-xs whitespace-nowrap">${cell.getData().phone}</div>
              </div>`
        }
      },

      {
        title: 'Số Dư',
        minWidth: 200,
        field: 'amount',

        hozAlign: 'center',
        vertAlign: 'middle',
        print: false,
        download: false,
        formatter(cell) {
          return `<div class="flex items-center lg:justify-center text-success">
              ${$h.formatCurrency(cell.getData().amount)}
              </div>`
        }
      },
      {
        title: 'Telegram',
        minWidth: 200,

        hozAlign: 'center',
        vertAlign: 'middle',
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().telegram?.username || 'Chưa có thông tin'
                }</div>
                <div class="text-slate-500 text-xs whitespace-nowrap">${cell.getData().telegram?.id || ''}</div>
              </div>`
        }
      },
      {
        title: '2FA',
        minWidth: 200,
        field: 'is2FA',
        hozAlign: 'center',
        vertAlign: 'middle',
        print: false,
        download: false,
        formatter(cell) {
          return cell.getData().is2FA ? 'Bật' : 'Tắt'
        }
      },
      {
        title: 'Trạng Thái',
        minWidth: 500,
        field: 'block',
        hozAlign: 'center',
        vertAlign: 'middle',
        print: false,
        download: false,
        formatter(cell) {
          return cell.getData().block ? 'Tạm Khoá' : 'Bình Thường'
        }
      },
      {
        title: 'Ngày Tạo',
        minWidth: 200,
        field: 'createdAt',
        responsive: 1,
        headerHozAlign: 'center',
        hozAlign: 'center',
        vertAlign: 'middle',
        print: false,
        download: false,
        formatter(cell) {
          return `<div class="flex lg:justify-center items-center">
                ${$h.formatDate(cell.getData().createdAt, 'DD/MM/YYYY HH:mm')}
              </div>`
        }
      },

      // For print format
      {
        title: 'PRODUCT NAME',
        field: 'name',
        visible: false,
        print: true,
        download: true
      },
      {
        title: 'CATEGORY',
        field: 'category',
        visible: false,
        print: true,
        download: true
      },
      {
        title: 'REMAINING STOCK',
        field: 'remaining_stock',
        visible: false,
        print: true,
        download: true
      },
      {
        title: 'STATUS',
        field: 'status',
        visible: false,
        print: true,
        download: true,
        formatterPrint(cell) {
          return cell.getValue() ? 'Active' : 'Inactive'
        }
      },
      {
        title: 'IMAGE 1',
        field: 'images',
        visible: false,
        print: true,
        download: true,
        formatterPrint(cell) {
          return cell.getValue()[0]
        }
      },
      {
        title: 'IMAGE 2',
        field: 'images',
        visible: false,
        print: true,
        download: true,
        formatterPrint(cell) {
          return cell.getValue()[1]
        }
      },
      {
        title: 'IMAGE 3',
        field: 'images',
        visible: false,
        print: true,
        download: true,
        formatterPrint(cell) {
          return cell.getValue()[2]
        }
      }
    ],
    renderComplete() {
      createIcons({
        icons,
        'stroke-width': 1.5,
        nameAttr: 'data-lucide'
      })
    }
  })
}

// Redraw table onresize
const reInitOnResizeWindow = () => {
  window.addEventListener('resize', () => {
    tabulator.value.redraw()
    createIcons({
      icons,
      'stroke-width': 1.5,
      nameAttr: 'data-lucide'
    })
  })
}

// Filter function
const onFilter = () => {
  tabulator.value.setFilter('comment', 'like', 'a')
}

// On reset filter
const onResetFilter = () => {
  filter.type = ''

  onFilter()
}

// Export
const onExportCsv = () => {
  tabulator.value.download('csv', 'data.csv')
}

const onExportJson = () => {
  tabulator.value.download('json', 'data.json')
}

const onExportXlsx = () => {
  const win = window
  win.XLSX = xlsx
  tabulator.value.download('xlsx', 'data.xlsx', {
    sheetName: 'Products'
  })
}

const onExportHtml = () => {
  tabulator.value.download('html', 'data.html', {
    style: true
  })
}

// Print
const onPrint = () => {
  tabulator.value.print()
}

onMounted(() => {
  initTabulator()
  reInitOnResizeWindow()
})
</script>
