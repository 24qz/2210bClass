<template>
  <div>
    <video
      style="width: 100%"
      :src="videourl"
      :controls="true"
      :height="211"
      autoplay
      poster="https://gd4.alicdn.com/imgextra/i4/3603079088/O1CN01dczOSM2H0LvTowhkl_!!3603079088.png"
    ></video>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const props = defineProps<{
  videourl: string
}>()
</script>

<style lang="scss" scoped></style>
