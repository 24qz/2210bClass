<template>
  <div style="background-color: #f8f9fb; height: 100vh">
    <cy-tap title="个人资料"></cy-tap>

    <div class="cy-user-cell">
      <span>头像</span>
      <span style="display: flex; justify-content: space-between; align-items: center">
        <div class="cy-my-svg">
          <img style="width: 100%; height: 100%" :src="store.userList?.userInfo.imageUrl" alt="" />
        </div>
        <div>
          <van-icon name="arrow" />
        </div>
      </span>
    </div>

    <div class="cy-user-cellno">
      <div>用户名</div>
      <div style="color: #9d9b9b">
        <span style="margin-right: 0.3rem">
          {{ store.userList?.userInfo.username }}
        </span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="cy-user-cellno">
      <div>手机号</div>
      <div style="color: #9d9b9b">
        <span style="margin-right: 0.3rem">
          {{ store.userList?.userInfo.mobile }}
        </span>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="cy-user-cell">
      <div>昵称</div>
      <div style="color: #9d9b9b">
        <span style="margin-right: 0.3rem">
          {{ store.userList?.userInfo.nickName }}
        </span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="cy-user-cellno">
      <div>性别</div>
      <div style="color: #9d9b9b">
        <span style="margin-right: 0.3rem">
          {{ store.userList?.userInfo.sex == 1 ? '男' : '女' }}
        </span>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="cy-user-loginout" @click="loginout">退出登录</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { getLoginOut } from '@/servers/user'
import { showConfirmDialog } from 'vant'
import router from '@/router'
const store = useCounterStore()

const loginout = () => {
  showConfirmDialog({
    title: '确定退出登录？',
    message: '退出后不会删除任何历史数据'
  })
    .then(async () => {
      await getLoginOut(store.userList?.access_token!)
      router.push('/pages/my/my')
      store.setLoginOut()
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar__arrow {
    font-size: 20px;
    color: #686767;
  }
}
.cy-user-cell {
  margin-top: 10px;
  border-bottom: 1px solid #e9e3e3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: white;
}
.cy-user-cellno {
  border-bottom: 1px solid #e9e3e3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: white;
}
.cy-my-svg {
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 10px;
}

.cy-user-loginout {
  margin-top: 15px;
  width: 100%;
  background-color: white;
  text-align: center;
  line-height: 50px;
  height: 50px;
}
</style>
