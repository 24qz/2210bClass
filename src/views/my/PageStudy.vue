<template>
  <div style="padding-top: 3rem">
    <cy-tap title="我的学习"></cy-tap>
    <studyitem :list="list!"></studyitem>
  </div>
</template>

<script setup lang="ts">
import { getstudyList } from '@/servers/order'
import type { StudyList } from '@/types/user'
import studyitem from '@/components/cy-studyItem.vue'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
const list = ref<StudyList[]>()
onMounted(() => {
  const getdata = async () => {
    let res = await getstudyList()
    list.value = res.data
  }
  getdata()
})
</script>

<style lang="scss" scoped></style>
