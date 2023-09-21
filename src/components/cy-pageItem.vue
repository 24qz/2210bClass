<template>
  <div>
    <div class="tag">{{ list.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps<{
  list: { id: string; name: string }
}>()
</script>

<style lang="scss" scoped>
.tag {
  float: left;
  height: 20px;
  padding: 0 8px;
  line-height: 20px;
  font-size: 12px;
  color: #007aff;
  background-color: #fff;
  border-width: 1px;
  border-style: solid;
  border-color: #007aff;
  border-radius: 15px;
  margin-right: 6px;
  font-size: 12px;
}
</style>
