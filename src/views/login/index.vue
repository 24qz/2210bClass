<template>
  <div>
    <div style="padding: 1rem"><van-icon name="cross" /></div>
    <div style="padding: 1.6rem">
      <h3>欢迎回来!</h3>
      <div class="cy-login-inp">
        <p>手机号码</p>
        <input
          v-model="setCode.mobile"
          style="margin-top: 0.5rem"
          type="text"
          placeholder="请输入手机号码"
        />
      </div>
      <div class="cy-login-codeinp">
        <p>验证码</p>
        <div style="display: flex; justify-content: space-between">
          <div>
            <input
              v-model="phonecode"
              style="margin-top: 0.5rem"
              type="text"
              placeholder="请输入手机验证码"
            />
          </div>
          <div>
            <button class="cy-login-codebtn" @click="onCode">
              {{ n < 60 ? `${n}s` : '获取验证码' }}
            </button>
          </div>
        </div>
      </div>
      <van-button
        @click="onLogin"
        type="primary"
        style="background-color: #345dc2; width: 100%; margin-top: 1.5rem"
        >登录</van-button
      >
    </div>
    <div style="padding-top: 65vw; padding-left: 9vw; font-size: 12px">
      <van-checkbox checked-color="#345dc2" icon-size="16px" v-model="assage"
        >请认真阅读并同意<span style="color: #40a2ff"
          >《用户服务隐私》《隐私权政策》</span
        ></van-checkbox
      >
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { code, user } from '@/types/user'
import { getcode, getLogin } from '@/servers/user'
import { showDialog, showToast } from 'vant'
import { useCounterStore } from '@/stores/counter'
import router from '@/router'
const store = useCounterStore()
const assage = ref(false)
const phonecode = ref('')
const setCode = ref<code>({
  mobile: '17605943201',
  templateCode: 'MSM_1999123123'
})
const userInfoList = ref<user>()
const regMobile = /^1[356789]\d{9}$/ //验证手机号码11位数字开头为一
let n = ref(60)

const getCaptcha = async () => {
  const timer = setInterval(() => {
    if (n.value === 0) {
      clearInterval(timer)
    } else {
      n.value--
    }
  }, 1000)
}

const onCode = async () => {
  if (n.value < 60) {
    showDialog({
      title: '提示',
      message: `请在${n.value}秒后重试`
    }).then(() => {
      // on close
    })
  } else {
    getCaptcha()
    try {
      await getcode(setCode.value)
      showToast('发送成功')
    } catch (error) {
      showToast('发送失败')
    }
  }
}

const onLogin = async () => {
  if (!assage.value) return showToast('请阅读并同意用户服务级隐私协议')
  if (!regMobile.test(setCode.value.mobile) || phonecode.value == '')
    return showToast('请输入有效手机号码')
  try {
    let res = await getLogin({ mobile: setCode.value.mobile, code: phonecode.value })
    console.log(res)
    userInfoList.value = res.data
    store.setUser(res.data)
    showToast('登录成功')
    router.push('/pages/my/my')
  } catch (error) {
    showToast('登录失败')
  }
}
</script>

<style lang="scss" scoped>
.cy-login-inp {
  font-size: 12px;
  margin-top: 50px;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #f8f6fc;
}
.cy-login-codeinp {
  height: 52px;
  font-size: 12px;
  margin-top: 25px;
  border-radius: 5px;
  padding: 10px 0 0 10px;
  background-color: #f8f6fc;
}

.cy-login-codebtn {
  padding: 5px 7px;
  border: 0;
  color: white;
  border-radius: 5px;
  font-size: 12px;
  background-color: #345dc2;
}
</style>
