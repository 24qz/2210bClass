<template>
  <div>
    <van-search
      v-model="search"
      shape="round"
      input-align="center"
      background="transparent"
      placeholder="搜索你想要的内容"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const search = ref('')
</script>

<style lang="scss" scoped>
.a {
  background-color: transparent;
}
</style>
