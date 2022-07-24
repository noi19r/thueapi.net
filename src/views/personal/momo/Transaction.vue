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
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Loại</label>
          <select
            id="tabulator-html-filter-field"
            v-model="filter.field"
            class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
          >
            <option value="">Tất cả</option>
            <option value="1">Nhận tiền</option>
            <option value="-1">Chuyển tiền</option>
          </select>
        </div>

        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="flex-none mr-2">Tên/ Số điện thoại/ Nội dung</label>
          <input
            id="tabulator-html-filter-value"
            v-model="filter.value"
            type="text"
            class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
            placeholder="Search..."
          />
        </div>
        <div class="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
          <CalendarIcon class="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0" />
          <Litepicker
            v-model="salesReportFilter"
            :options="{
              autoApply: false,
              singleMode: false,
              numberOfColumns: 2,
              numberOfMonths: 2,
              showWeekNumbers: true,
              startDate: filter.start,
              endDate: filter.end,
              format: 'D MM, YYYY',
              lang: 'vi-VN',
              dropdowns: {
                minYear: 1990,
                maxYear: null,
                months: true,
                years: true
              }
            }"
            class="form-control sm:w-56 box pl-10"
          />
        </div>
        <div class="mt-2 xl:mt-0">
          <button id="tabulator-html-filter-go" type="button" class="btn btn-primary w-full sm:w-16" @click="onFilter">
            Tìm
          </button>
          <button
            id="tabulator-html-filter-reset"
            type="button"
            class="btn btn-secondary w-full sm:w-20 mt-2 sm:mt-0 sm:ml-1"
            @click="onResetFilter"
          >
            Xoá lọc
          </button>
        </div>
      </form>
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

const tableRef = ref()
const tabulator = ref()
const filter = reactive({
  field: '',
  type: 'like',
  value: '',
  start: new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime(),
  end: new Date().getTime()
})

const salesReportFilter = ref()

const imageAssets = import.meta.globEager(`/src/assets/images/*.{jpg,jpeg,png,svg}`)
const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    ajaxURL: '/api/bank/momo/transaction',

    ajaxRequesting: (url, params, data) => {},
    ajaxConfig: {
      data: {
        _id: '62c8317c915ff02f251907b2'
      },
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    },
    ajaxFiltering: true,
    ajaxSorting: true,
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
        title: 'Mã Giao Dịch',
        minWidth: 200,
        field: 'id',

        vertAlign: 'middle',
        print: false,
        download: false
      },
      {
        title: 'Thông Tin',
        minWidth: 200,
        field: 'name',
        vertAlign: 'middle',
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().name}</div>
                <div class="text-slate-500 text-xs whitespace-nowrap">${cell.getData().category}</div>
              </div>`
        }
      },

      {
        title: 'Số Tiền',
        minWidth: 200,
        field: 'images',

        hozAlign: 'center',
        vertAlign: 'middle',
        print: false,
        download: false,
        formatter(cell) {
          return `<div class="flex items-center lg:justify-center ${
            cell.getData().status ? 'text-success' : 'text-danger'
          }">
              ${cell.getData().status ? cell.getData().remaining_stock : cell.getData().remaining_stock * -1}
              </div>`
        }
      },
      {
        title: 'Số Dư',
        minWidth: 200,
        field: 'remaining_stock',
        hozAlign: 'center',
        vertAlign: 'middle',
        print: false,
        download: false
      },
      {
        title: 'Nội Dung',
        minWidth: 200,
        field: 'category',
        hozAlign: 'center',
        vertAlign: 'middle',
        print: false,
        download: false
      },
      {
        title: 'Thời Gian',
        minWidth: 200,
        field: 'time',
        responsive: 1,
        headerHozAlign: 'center',
        hozAlign: 'center',
        vertAlign: 'middle',
        print: false,
        download: false,
        formatter() {
          return `<div class="flex lg:justify-center items-center">
                10:12 - 12/12/2022
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
  tabulator.value.setFilter(filter.field, filter.type, filter.value)
}

// On reset filter
const onResetFilter = () => {
  filter.field = 'name'
  filter.type = 'like'
  filter.value = ''
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
