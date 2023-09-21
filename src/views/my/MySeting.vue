<template>
  <div style="padding-top: 3rem">
    <cy-tap title="设置"></cy-tap>
    <div style="height: 0.5rem; background-color: #f8f9fb"></div>
    <div class="cy-set-item">
      <span>允许非WIFI网络播放</span>
      <span>
        <van-switch v-model="onechecked" active-color="#345dc2" inactive-color="#dcdee0" />
      </span>
    </div>

    <van-divider />
    <div class="cy-set-item">
      <span>允许非WIFI网络缓存</span>
      <span>
        <van-switch v-model="twochecked" active-color="#345dc2" inactive-color="#dcdee0" />
      </span>
    </div>
    <van-divider />

    <div class="cy-set-item">
      <span>视频自动连续播放</span>
      <span>
        <van-switch v-model="threechecked" active-color="#345dc2" inactive-color="#dcdee0" />
      </span>
    </div>
    <div style="height: 0.5rem; background-color: #f8f9fb"></div>

    <div class="cy-set-item" @click="clear">
      <span>清除应用缓存</span>
      <span>{{ iten }}KB </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showConfirmDialog } from 'vant'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const iten = ref(1)
const onechecked = ref(false)
const twochecked = ref(false)
const threechecked = ref(false)

const clear = () => {
  showConfirmDialog({
    title: '您确定清除应用缓存吗?',
    message: '(该操作不会删除缓存课程)'
  })
    .then(() => {
      iten.value = 0
      onechecked.value = false
      twochecked.value = false
      threechecked.value = false
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<style lang="scss" scoped>
.cy-set-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px 0 15px;
}
</style>
