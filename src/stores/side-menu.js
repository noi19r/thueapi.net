import { defineStore } from 'pinia'
import { deepClone } from '@/utils/deepClone'

let user = JSON.parse(localStorage.getItem('userInfo')) || {}

const thisMenu = [
  {
    icon: 'HomeIcon',
    pageName: 'side-menu-dashboard',
    title: 'Dashboard',
    subMenu: [
      {
        icon: '',
        pageName: 'side-menu-dashboard',
        title: 'Dashboard'
      }
    ]
  },
  {
    icon: 'BoxIcon',
    pageName: 'side-menu-personal',
    title: 'Tích Hợp',
    subMenu: [
      {
        icon: '',
        pageName: 'side-menu-personal-momo',
        title: 'Momo'
      },
      {
        icon: '',
        pageName: 'side-menu-personal-zalopay',
        title: 'ZaloPay'
      },
      {
        icon: '',
        pageName: 'side-menu-personal-vcb',
        title: 'Vietcombank'
      },
      {
        icon: '',
        pageName: 'side-menu-personal-vtb',
        title: 'Viettinbank'
      },
      {
        icon: '',
        pageName: 'side-menu-personal-mbb',
        title: 'MBBank'
      },
      {
        icon: '',
        pageName: 'side-menu-personal-acb',
        title: 'ACB'
      },
      {
        icon: '',
        pageName: 'side-menu-personal-tpb',
        title: 'TPBank'
      }
    ]
  },
  'devider',
  {
    icon: 'DatabaseIcon',
    pageName: 'side-menu-pricing',
    title: 'Bảng Giá'
  },
  {
    icon: 'DollarSignIcon',
    pageName: 'side-menu-deposit',
    title: 'Nạp Tiền'
  },
  'devider',
  {
    icon: 'UserIcon',
    pageName: 'side-menu-profile',
    title: 'Hồ Sơ'
  }
]

// if (user?.roles && user?.roles.sort()[0] == 'admin') {
//   thisMenu.unshift({
//     icon: 'HomeIcon',
//     pageName: 'side-menu-admin',
//     title: 'ADMIN',
//     subMenu: [
//       {
//         icon: '',
//         pageName: 'side-menu-admin-users',
//         title: 'Thành Viên'
//       }
//     ]
//   })
// }

export const useSideMenuStore = defineStore('sideMenu', {
  state: () => ({
    menu: thisMenu
  })
})
