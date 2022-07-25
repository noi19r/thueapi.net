import { defineStore } from 'pinia'

export const useSideMenuStore = defineStore('sideMenu', {
  state: () => ({
    menu: [
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
  })
})
