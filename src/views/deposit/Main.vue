<template>
  <h2 class="intro-y text-2xl font-medium mt-10 text-center mr-auto">Nạp Tiền</h2>

  <!-- BEGIN: Pricing Content -->
  <div class="flex mt-10">
    <div class="flex flex-col lg:flex-row">
      <div class="intro-y flex justify-center flex-col flex-1 text-center sm:px-10 lg:px-5 pb-10 lg:pb-0">
        <div class="font-medium text-2xl">Hướng dẫn nạp tiền</div>
        <div class="mt-3 lg:text-justify text-slate-600 dark:text-slate-500">
          <p class="text-danger text-2lg">
            <span class="mx-1 text-primary"> • </span>Vui lòng nhập đúng nội dung để nạp tiền tự động.
          </p>
          <p class="mt-2 text-primary">
            <span class="mx-1 text-primary"> • </span>
            Sau khi kiểm tra, hệ thống sẽ hiển thị xác nhận và cộng tiền vào tài khoản cho quý khách.
            <br />
          </p>
        </div>
      </div>
      <div class="intro-y flex-1 box py-10 lg:ml-5 mb-5 lg:mb-0">
        <img :src="'https://quan.thueapi.com/images/banks/acb.png'" class="block w-20 h-20 text-primary mx-auto" />
        <div class="text-xl font-medium text-center mt-5">ACB</div>
        <div class="text-slate-600 dark:text-slate-500 text-center mt-5 font-medium">
          Chủ tài khoản:<span class="mx-1 text-primary">DANG QUANG LOI</span>
        </div>
        <div class="text-slate-600 dark:text-slate-500 text-center mt-2 font-medium">
          Số tài khoản:<span class="mx-1 text-primary">1982391238</span>
        </div>
        <div class="text-slate-500 px-10 text-center mx-auto mt-2 font-medium">
          Nội dung: <span class="text-danger">19823791</span>
        </div>

        <div class="flex justify-center mt-2">
          <div class="w-64 h-64 float-left image-fit mx-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              :src="'https://img.vietqr.io/image/vietinbank-113366668888-qr_only.jpg?amount=790000&addInfo=dong%20qop%20quy%20vac%20xin&accountName=Quy%20Vac%20Xin%20Covid'"
              data-action="zoom"
              class="w-full rounded-md"
            />
          </div>
        </div>
      </div>
      <div class="intro-y flex-1 box py-10 lg:ml-5">
        <img :src="'https://quan.thueapi.com/images/banks/momo.png'" class="block w-20 h-20 text-primary mx-auto" />
        <div class="text-xl font-medium text-center mt-5">Ví MoMo</div>
        <div class="text-slate-600 dark:text-slate-500 text-center mt-5 font-medium">
          Chủ tài khoản:<span class="mx-1 text-primary">DANG QUANG LOI</span>
        </div>
        <div class="text-slate-600 dark:text-slate-500 text-center mt-2 font-medium">
          Số tài khoản:<span class="mx-1 text-primary">1982391238</span>
        </div>
        <div class="text-slate-500 px-10 text-center mx-auto mt-2 font-medium">
          Nội dung: <span class="text-danger">19823791</span>
        </div>
        <div class="flex justify-center mt-2">
          <div class="w-64 h-64 float-left image-fit mx-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              :src="'https://img.vietqr.io/image/vietinbank-113366668888-qr_only.jpg?amount=790000&addInfo=dong%20qop%20quy%20vac%20xin&accountName=Quy%20Vac%20Xin%20Covid'"
              data-action="zoom"
              class="w-full rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- END: Pricing Content -->
</template>
