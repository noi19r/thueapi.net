<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Thống Kê</h2>
  </div>
  <div class="intro-y grid grid-cols-12 gap-6 mt-5">
    <div class="col-span-12 lg:col-span-6">
      <!-- BEGIN: Vertical Bar Chart -->
      <PreviewComponent class="intro-y box">
        <div class="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="font-medium text-base mr-auto">Vertical Bar Chart</h2>
        </div>
        <div class="p-5">
          <Preview>
            <VerticalBarChart :height="400" />
          </Preview>
        </div>
      </PreviewComponent>
      <!-- END: Vertical Bar Chart -->
    </div>
    <div class="col-span-12 lg:col-span-6">
      <!-- BEGIN: Donut Chart -->
      <PreviewComponent class="intro-y box">
        <div class="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="font-medium text-base mr-auto">Donut Chart</h2>
        </div>
        <div class="p-5">
          <Preview>
            <DonutChart :height="400" />
          </Preview>
        </div>
      </PreviewComponent>
      <!-- END: Donut Chart -->
    </div>
  </div>
</template>

<script setup>
import VerticalBarChart from '@/components/vertical-bar-chart/Main.vue'
import DonutChart from '@/components/donut-chart/Main.vue'
</script>
