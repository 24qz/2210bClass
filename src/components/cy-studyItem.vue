<template>
  <div v-if="list" style="padding: 1rem">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="cy-stydyItemPage"
      @click="$router.push(`/pages/course/course-play?id=${item.id}`)"
    >
      <div style="width: 65%">
        <div>
          <span style="font-weight: 700; font-size: 14px">{{ item.title }}</span>
        </div>
        <div style="margin-top: 1.2rem">
          <span style="color: #959da5; font-size: 14px">已学{{ item.percent }}%</span>
          <div class="mar">
            <van-progress
              :percentage="item.percent"
              stroke-width="2"
              color="#345dc2"
              :show-pivot="false"
            />
          </div>
        </div>
      </div>

      <div class="cy-studyimg">
        <img
          style="width: 100%; height: 100%"
          :src="
            item.mainImage.indexOf('http')
              ? 'http://m.mengxuegu.com' + item.mainImage
              : item.mainImage
          "
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StudyList } from '@/types/user'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps<{
  list: StudyList[]
}>()
</script>

<style lang="scss" scoped>
.cy-stydyItemPage {
  padding: 10px 0;
  display: flex;
}
.mar {
  margin-top: 5px;
}
.cy-studyimg {
  overflow: hidden;
  margin-left: 10px;
  width: 122px;
  height: 75px;
  border-radius: 5px;
}
</style>
