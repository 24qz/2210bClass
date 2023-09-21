<template>
  <div style="padding-top: 3rem">
    <cytap title="我的订单"></cytap>
    <div v-for="(item, index) in list" :key="index" style="padding: 0.3rem">
      <div style="color: #333; font-size: 12px">
        {{ item?.createDate }} 订单号：{{ item?.orderId }}
      </div>
      <cy-orderItem
        @click="$router.push(`/pages/course/course-details?id=${item.id}`)"
        v-for="(it, ind) in item.courseList"
        :key="ind"
        :list="it"
        :flag="false"
      ></cy-orderItem>
      <div style="padding: 0.5rem 0.5rem">
        <div style="text-align: right">
          <span style="font-size: 12px"> 实付：</span
          ><span style="color: red">￥{{ item?.priceDiscount }}</span>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.5rem;
          "
        >
          <div style="font-size: 12px" :class="item?.status == 1 ? 'red' : 'grey'">
            {{ item?.status == 1 ? '待支付' : item?.status == 2 ? '交易成功' : '交易关闭' }}
          </div>
          <div v-if="item?.status != 2">
            <van-button
              size="small"
              style="margin-right: 0.2rem"
              v-if="item?.status == 1"
              @click="onConcal(item?.orderId)"
            >
              取消订单
            </van-button>
            <van-button
              size="small"
              style="margin-right: 0.2rem"
              v-if="item?.status == 3"
              @click="onDel(item?.orderId)"
            >
              删除订单
            </van-button>
            <van-button
              v-if="item?.status == 1"
              type="danger"
              size="small"
              @click="$router.push(`/pages/order/order-pay?price=${item?.priceDiscount}`)"
              >立即支付</van-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cytap from '@/components/cy-tap.vue'
import { ref, reactive, watch, computed } from 'vue'
import type { courseList, myOrder } from '@/types/user'
import { useRouter, useRoute } from 'vue-router'
import { getMyOrder, concalMyOrder, delMyOrder } from '@/servers/order'
import { showConfirmDialog } from 'vant'

const list = ref<myOrder[]>()
const getData = async () => {
  let res = await getMyOrder()
  console.log(res)
  list.value = res.data
}
getData()

const onConcal = async (id: string) => {
  showConfirmDialog({
    title: '',
    message: '确定取消该订单记录？'
  })
    .then(async () => {
      await concalMyOrder(id)
      getData()
    })
    .catch(() => {
      getData()
    })
}

const onDel = async (id: string) => {
  showConfirmDialog({
    title: '',
    message: '确定删除该订单记录？'
  })
    .then(async () => {
      await delMyOrder(id)
      getData()
    })
    .catch(() => {
      getData()
    })
}
</script>

<style lang="scss" scoped>
.red {
  color: red;
}
.grey {
  color: #959da5;
}
</style>
