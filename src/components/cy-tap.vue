<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
  </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const props = defineProps<{
  title: string
}>()

const onClickLeft = () => history.back()
const onClickRight = () => showToast('按钮')
</script>

<style lang="scss" scoped></style>
