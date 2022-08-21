import { createRouter, createWebHistory } from 'vue-router'

import SideMenu from '../layouts/side-menu/Main.vue'
import Dashboard from '../views/dashboard/Main.vue'

import Login from '../views/login/Main.vue'
import Register from '../views/register/Main.vue'
import ErrorPage from '../views/error-page/Main.vue'
import Error500 from '../views/error-page/500.vue'
//TODO

import Momo from '../views/personal/momo/Main.vue'
import MomoTransaction from '../views/personal/momo/Transaction.vue'
import MomoStatistic from '../views/personal/momo/Statistic.vue'

import ZaloPay from '../views/personal/zalopay/Main.vue'
import ZaloPayTransaction from '../views/personal/zalopay/Transaction.vue'

import Vietcombank from '../views/personal/vietcombank/Main.vue'
import Vietinbank from '../views/personal/vietinbank/Main.vue'
import Acb from '../views/personal/acb/Main.vue'
import TPBank from '../views/personal/tpbank/Main.vue'
import MBBank from '../views/personal/mbbank/Main.vue'

import Pricing from '../views/pricing/Main.vue'
import Deposit from '../views/deposit/Main.vue'

import Profile from '../views/profile/Main.vue'

import AdminUsers from '../views/admin/Users.vue'

const routes = [
  {
    path: '/',
    component: SideMenu,
    children: [
      {
        path: '/',
        name: 'side-menu-dashboard',
        meta: {
          title: 'Trang chủ | ThueApi.Net'
        },
        component: Dashboard
      },
      // {
      //   path: 'admin',
      //   children: [
      //     {
      //       path: 'users',
      //       name: 'side-menu-admin-users',
      //       meta: {
      //         title: 'Tổng quan | ThueApi.Net'
      //       },
      //       component: AdminUsers
      //     }
      //   ]
      // },

      {
        path: 'personal',
        children: [
          {
            meta: {
              title: 'Ví MoMo | ThueApi.Net'
            },
            path: 'momo',
            name: 'side-menu-personal-momo',
            component: Momo
          },

          {
            meta: {
              title: 'Lịch sử giao dịch MoMo | ThueApi.Net'
            },
            path: 'momo/transaction/:id',
            name: 'side-menu-personal-momo-history',
            component: MomoTransaction
          },
          {
            meta: {
              title: 'Thống kê giao dịch MoMo | ThueApi.Net'
            },
            path: 'momo/statistic/:id',
            name: 'side-menu-personal-momo-statistic',
            component: MomoStatistic
          },
          {
            meta: {
              title: 'Ví ZaloPay | ThueApi.Net'
            },
            path: 'zalopay',
            name: 'side-menu-personal-zalopay',
            component: ZaloPay
          },
          {
            meta: {
              title: 'Lịch sử giao dịch ZaloPay | ThueApi.Net'
            },
            path: 'zalopay/transaction/:id',
            name: 'side-menu-personal-zalopay-history',
            component: ZaloPayTransaction
          },
          {
            meta: {
              title: 'VietcomBank | ThueApi.Net'
            },
            path: 'vcb',
            name: 'side-menu-personal-vcb',
            component: Vietcombank
          },
          {
            meta: {
              title: 'VietinBank | ThueApi.Net'
            },
            path: 'vtb',
            name: 'side-menu-personal-vtb',
            component: Vietinbank
          },
          {
            meta: {
              title: 'TPBank | ThueApi.Net'
            },
            path: 'tpb',
            name: 'side-menu-personal-tpb',
            component: TPBank
          },
          {
            meta: {
              title: 'ACB | ThueApi.Net'
            },
            path: 'acb',
            name: 'side-menu-personal-acb',
            component: Acb
          },
          {
            meta: {
              title: 'MBBank | ThueApi.Net'
            },
            path: 'mbb',
            name: 'side-menu-personal-mbb',
            component: MBBank
          }
        ]
      },
      {
        meta: {
          title: 'Bảng giá | ThueApi.Net'
        },
        path: 'pricing',
        name: 'side-menu-pricing',
        component: Pricing
      },
      {
        meta: {
          title: 'Nạp tiền | ThueApi.Net'
        },
        path: 'deposit',
        name: 'side-menu-deposit',
        component: Deposit
      },

      {
        meta: {
          title: 'Thông tin tài khoản | ThueApi.Net'
        },
        path: 'profile',
        name: 'side-menu-profile',
        component: Profile
      }
      //TODO
    ]
  },

  {
    meta: {
      title: 'Đăng nhập | ThueApi.Net'
    },
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    meta: {
      title: 'Đăng ký | ThueApi.Net'
    },
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    meta: {
      title: 'Server Error | ThueApi.Net'
    },
    path: '/500',
    name: 'error-500',
    component: Error500
  },
  {
    meta: {
      title: 'Not Found | ThueApi.Net'
    },
    path: '/error-page',
    name: 'error-page',
    component: ErrorPage
  },
  {
    meta: {
      title: 'Not Found | ThueApi.Net'
    },
    path: '/:pathMatch(.*)*',
    name: 'error-page',
    component: ErrorPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from) => {
  if (
    to.name != 'error-500' &&
    to.name != 'error-page' &&
    to.name != 'login' &&
    to.name != 'register' &&
    (!JSON.parse(localStorage.getItem('userInfo')) || !localStorage.getItem('token'))
  ) {
    if (from.name == 'login' || from.name == 'register') {
      return false
    } else {
      return { replace: true, name: 'login' }
    }
  }
  if (
    (to.name == 'login' || to.name == 'register') &&
    JSON.parse(localStorage.getItem('userInfo')) &&
    localStorage.getItem('token')
  ) {
    return { replace: true, name: 'side-menu-dashboard' }
  }
  // if (to.name == 'side-menu-dashboard' && store.state.user.userInfo.permission > 1) {
  //   return { replace: true, name: 'side-menu-profile' }
  // }
})

router.afterEach((to, from) => {
  document.title = to.meta.title || 'ThueApi'
})

export default router
