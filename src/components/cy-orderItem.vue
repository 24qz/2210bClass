<template>
  <div>
    <div :class="flag ? 'cy-it1' : 'cy-it'">
      <div :class="flag ? 'cy-it-img' : 'cy-it-img1'">
        <span class="time">{{ list?.totalTime }}</span>
        <img
          style="width: 100%; height: 100%"
          :src="
            list?.mainImage?.indexOf('http')
              ? 'http://m.mengxuegu.com' + list?.mainImage
              : list?.mainImage
          "
          alt=""
        />
      </div>
      <div :class="flag ? 'cy-it-right' : 'cy-it-right1'">
        <p style="font-size: 14px; font-weight: 700">{{ list?.title }}</p>
        <p style="color: #999; display: inline-block; margin-top: 0.5rem; font-size: 12px">
          <i class="iconfont my"></i> {{ list?.nickName }}
        </p>
        <p style="font-size: 12px">
          <span style="color: #fb6932"
            ><i class="iconfont money"></i>{{ list?.priceDiscount }} &nbsp;</span
          >
          <i class="iconfont video"></i> {{ list?.studyTotal }} 人在学
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { courseList, myOrder } from '@/types/user'
import { concalMyOrder } from '@/servers/order'
import type { packagelist } from '@/types/course'
// const emit = defineEmits<{
//   (e: 'on-concal', id: string): void
//   (e: 'on-del', id: string): void
// }>()

const props = defineProps<{
  list: packagelist
  flag: boolean
}>()

// const concal = (id: string) => {
//   emit('on-concal', id)
// }

// const del = (id: string) => {
//   emit('on-del', id)
// }
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont'; /* Project id 2590034 */
  src:
    url('//at.alicdn.com/t/c/font_2590034_8xzqq9m3g9t.woff2?t=1694403989024') format('woff2'),
    url('//at.alicdn.com/t/c/font_2590034_8xzqq9m3g9t.woff?t=1694403989024') format('woff'),
    url('//at.alicdn.com/t/c/font_2590034_8xzqq9m3g9t.ttf?t=1694403989024') format('truetype');
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 12px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}

.my::before {
  content: '\e8a0';
}
.money::before {
  content: '\e6ab';
}
.video::before {
  content: '\e624';
}
.cy-it {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #e2e1e1;
}
.cy-it1 {
  display: inline-block;
  width: 155px;
  // padding: 0 5px;
  height: 90%;
  margin-right: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.cy-it-img1 {
  position: relative;
  width: 145px;
  height: 80px;
  border-radius: 5px;

  overflow: hidden;
  .time {
    position: absolute;
    bottom: 2px;
    right: 2px;
    font-size: 11px;
    box-sizing: border-box;
    color: #fff;
    background: rgba(51, 51, 51, 0.4);
    border-radius: 10px;
    padding: 0 4px;
  }
}
.cy-it-img {
  position: relative;
  width: 100%;
  height: 80px;
  border-radius: 5px;

  overflow: hidden;
  .time {
    position: absolute;
    bottom: 2px;
    right: 2px;
    font-size: 11px;
    color: #fff;
    box-sizing: border-box;
    background: rgba(51, 51, 51, 0.4);
    border-radius: 10px;
    padding: 0 4px;
  }
}
.cy-it-right {
  // width: 50%;
  margin-left: 10px;
  // margin-top: 10px;
}
.cy-it-right1 {
  width: 50%;
  margin-left: 10px;
  // margin-top: 10px;
}
</style>
