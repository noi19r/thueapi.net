<template>
  <!-- BEGIN: Top Bar -->
  <div
    class="top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12"
  >
    <div class="h-full flex items-center">
      <!-- BEGIN: Logo -->
      <a href="/" class="-intro-x hidden md:flex">
        <img alt="Icewall Tailwind HTML Admin Template" class="w-6" src="@/assets/images/logo.svg" />
        <span class="text-white text-lg ml-3"> ThueApi.Net </span>
      </a>
      <!-- END: Logo -->
      <!-- BEGIN: Breadcrumb -->
      <nav aria-label="breadcrumb" class="-intro-x h-full mr-auto">
        <ol class="breadcrumb breadcrumb-light">
          <li class="breadcrumb-item"><a href="#">Application</a></li>
          <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
        </ol>
      </nav>
      <!-- END: Breadcrumb -->
      <!-- BEGIN: Search -->
      <div class="intro-x relative mr-3 sm:mr-6">
        <a class="notification notification--light sm:hidden" href="">
          <SearchIcon class="notification__icon dark:text-slate-500" />
        </a>
      </div>
      <!-- END: Search -->
      <!-- BEGIN: Notifications -->
      <Dropdown class="intro-x mr-4 sm:mr-6">
        <DropdownToggle tag="div" role="button" class="notification notification--bullet cursor-pointer">
          <BellIcon class="notification__icon dark:text-slate-500" />
        </DropdownToggle>
        <DropdownMenu class="notification-content pt-2">
          <DropdownContent tag="div" class="notification-content__box">
            <div class="notification-content__title">Thông báo</div>
            <div
              v-for="(faker, fakerKey) in $_.take($f(), 1)"
              :key="fakerKey"
              class="cursor-pointer relative flex items-center"
              :class="{ 'mt-5': fakerKey }"
            >
              <div class="w-12 h-12 flex-none image-fit mr-1">
                <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" :src="faker.photos[0]" />
                <div class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
              </div>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="javascript:;" class="font-medium truncate mr-5">{{ faker.users[0].name }}</a>
                  <div class="text-xs text-slate-400 ml-auto whitespace-nowrap">
                    {{ faker.times[0] }}
                  </div>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  {{ faker.news[0].shortContent }}
                </div>
              </div>
            </div>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
      <!-- END: Notifications -->
      <!-- BEGIN: Account Menu -->
      <Dropdown id="main-dropdown" class="intro-x w-8 h-8">
        <DropdownToggle
          tag="div"
          role="button"
          class="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
        >
          <img alt="Icewall Tailwind HTML Admin Template" :src="$f()[9].photos[0]" />
        </DropdownToggle>
        <DropdownMenu class="w-56">
          <DropdownContent
            class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
          >
            <DropdownHeader tag="div" class="!font-normal">
              <div class="font-medium">
                {{ userStore.userInfoMe.name }}
              </div>
              <div class="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                Số dư: {{ $h.formatCurrency(userStore.userInfoMe.amount) }} vnđ
              </div>
            </DropdownHeader>
            <DropdownDivider class="border-white/[0.08]" />
            <router-link to="/profile" @click.prevent="hideDropdrop">
              <DropdownItem class="dropdown-item hover:bg-white/5">
                <UserIcon class="w-4 h-4 mr-2" /> Thông tin</DropdownItem
              >
            </router-link>
            <DropdownItem class="dropdown-item hover:bg-white/5">
              <HelpCircleIcon class="w-4 h-4 mr-2" /> Help</DropdownItem
            >
            <DropdownDivider class="border-white/[0.08]" />
            <DropdownItem class="dropdown-item hover:bg-white/5" @click.prevent="logoutWeb">
              <ToggleRightIcon class="w-4 h-4 mr-2" />Đăng xuất</DropdownItem
            >
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
      <!-- END: Account Menu -->
    </div>
  </div>
  <!-- END: Top Bar -->
</template>

<script setup>
import { ref, computed } from 'vue'
import { logout } from '@/api'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { helper as $h } from '@/utils/helper'
const userStore = useUserStore()

const searchDropdown = ref(false)
const showSearchDropdown = () => {
  searchDropdown.value = true
}
const hideSearchDropdown = () => {
  searchDropdown.value = false
}

const hideDropdrop = () => {
  tailwind.Dropdown.getOrCreateInstance(document.querySelector('#main-dropdown')).hide()
}

const logoutWeb = async () => {
  hideDropdrop()

  await logout()
  userStore.clearUser()
  router.push({ name: 'login' })
}
</script>
