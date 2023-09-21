<template>
  <div style="background-color: #f8f9fb; height: 100vh; padding-top: 3rem">
    <cy-tap title="意见反馈"></cy-tap>

    <div class="cy-feed-page">
      <div style="margin: 0px 1.3rem">
        <van-radio-group v-model="checked" direction="horizontal" @change="onchange">
          <van-radio name="1" icon-size="16px">内容意见</van-radio>
          <van-radio name="2" icon-size="16px">产品建议</van-radio>
          <van-radio name="3" icon-size="16px">其他</van-radio>
        </van-radio-group>
      </div>

      <div style="border: 1px solid #ccc; margin-top: 1rem">
        <van-field
          border
          v-model="message"
          rows="5"
          autosize
          type="textarea"
          placeholder="请填写具体内容帮助我们了解您的意见和建议"
        />
      </div>
      <input type="text" v-model="qq" class="cy-feed-inp" placeholder="填写您的QQ" />
      <input type="text" v-model="weixin" class="cy-feed-inp" placeholder="填写您的微信" />
      <van-button type="primary" block style="margin-top: 1rem" @click="onfoodback"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { getfeedback } from '@/servers/course'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const checked = ref('1')
const message = ref('')
const qq = ref('')
const weixin = ref('')

const onchange = () => {
  console.log(checked.value)
}

const onfoodback = async () => {
  let res = await getfeedback({
    content: message.value,
    qq: qq.value,
    weixin: weixin.value,
    type: checked.value
  })
  console.log(res)
}
</script>

<style lang="scss" scoped>
.cy-feed-page {
  padding: 15px;
}
.van-cell {
  background-color: transparent;
}
.cy-feed-inp {
  width: 95%;
  border: 1px solid #e9e9e9;
  margin-top: 15px;
  padding: 5px;
  height: 30px;
}
</style>
