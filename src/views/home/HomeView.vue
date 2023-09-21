<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route @change="onChange">
      <van-tabbar-item v-for="(item, index) in tarList" :key="index" :to="item.path">
        <span>{{ item.label }}</span>
        <template #icon="props">
          <img :src="props.active ? item.selIcon : item.icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRoute()
let active = ref(0)
const tarList = [
  {
    path: '/',
    label: '首页',
    icon: 'http://m.mengxuegu.com/static/tab/index.png',
    selIcon: 'http://m.mengxuegu.com/static/tab/index-active.png'
  },
  {
    path: '/pages/category/category',
    label: '分类',
    icon: 'http://m.mengxuegu.com/static/tab/category.png',
    selIcon: 'http://m.mengxuegu.com/static/tab/category-active.png'
  },
  {
    path: '/pages/article/article',
    label: '阅读',
    icon: '	http://m.mengxuegu.com/static/tab/article.png',
    selIcon: 'http://m.mengxuegu.com/static/tab/article-active.png'
  },
  {
    path: '/pages/question/question',
    label: '问答',
    icon: 'http://m.mengxuegu.com/static/tab/question.png',
    selIcon: '	http://m.mengxuegu.com/static/tab/question-active.png'
  },
  {
    path: '/pages/my/my',
    label: '我的',
    icon: 'http://m.mengxuegu.com/static/tab/my.png',
    selIcon: 'http://m.mengxuegu.com/static/tab/my-active.png'
  }
]

console.log(route.path)

const onChange = (index: number) => {
  active.value = index
}
</script>

<style lang="scss" scoped></style>
