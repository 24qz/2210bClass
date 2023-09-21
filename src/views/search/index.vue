<template>
  <div>
    <div style="display: flex; justify-content: space-around; align-items: center">
      <div @click="$router.push('/')">
        <van-icon name="arrow-left" size="20px" />
      </div>
      <div style="width: 78%">
        <van-search
          @blur="onSearchinp"
          v-model="seSearch"
          shape="round"
          placeholder="搜索你想要的内容"
        />
      </div>
      <div>取消</div>
    </div>

    <div v-if="!showflag && !$route.query.id" style="padding: 0.5rem">
      <h4>热门搜索</h4>
      <div class="tagList">
        <div
          class="tagitem"
          v-for="(item, index) in tagList"
          :key="index"
          @click="onHistorySearch(item.name)"
        >
          {{ item.name }}
        </div>
      </div>

      <div style="display: flex; justify-content: space-between">
        <span style="font-weight: 700">历史搜索</span>
        <span @click="delItem">清空</span>
      </div>
      <div class="tagList">
        <div
          class="tagitem"
          v-for="(item, index) in store.searchList"
          :key="index"
          @click="onHistorySearch(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <div v-else>
      <van-tabs v-model:active="activeName" border @click-tab="onClickTab">
        <van-tab title="课程" name="课程">
          <van-dropdown-menu ref="menuRef">
            <van-dropdown-item v-model="value" :options="options" @change="onChange" />
            <van-dropdown-item v-model="value1" :options="optionstwo" @change="onChange1" />
            <van-dropdown-item title="筛选">
              <div>
                <div style="display: flex; height: calc(100vh - 96px)">
                  <van-sidebar v-model="labelactive">
                    <van-sidebar-item title="全部分类" />
                    <van-sidebar-item
                      v-for="(item, index) in labelList"
                      :key="index"
                      :title="item.name"
                    />
                  </van-sidebar>

                  <div style="margin-top: 1rem">
                    <div class="cy-cateitem">不限</div>
                    <div
                      class="cy-cateitem"
                      v-for="(item, index) in childList"
                      :key="index"
                      @click="onscreen(item.id as string)"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                </div>
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>

          <div style="padding: 0 1rem">
            <van-pull-refresh v-model="refreshing1" @refresh="onRefresh1">
              <van-list
                v-model:loading="loading1"
                :finished="finished1"
                finished-text="没有更多了"
                @load="onLoad1"
              >
                <cy-orderItem
                  v-for="(item, index) in SearchDataList"
                  :key="index"
                  :list="item"
                  :flag="false"
                ></cy-orderItem>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab title="文章" name="文章">
          <van-dropdown-menu ref="menuRef">
            <van-dropdown-item v-model="articlevalue" :options="options" @change="articleChange" />
            <van-dropdown-item title="筛选">
              <div>
                <div style="display: flex; height: calc(100vh - 96px)">
                  <van-sidebar v-model="labelactive">
                    <van-sidebar-item title="全部分类" />
                    <van-sidebar-item
                      v-for="(item, index) in labelList"
                      :key="index"
                      :title="item.name"
                    />
                  </van-sidebar>

                  <div style="margin-top: 1rem">
                    <div class="cy-cateitem">不限</div>
                    <div
                      class="cy-cateitem"
                      v-for="(item, index) in childList"
                      :key="index"
                      @click="articlescreen(item.id as string)"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                </div>
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <CyItem
                v-for="(item, index) in SearchDataList"
                :key="index"
                :list="item"
                @click="$router.push(`/pages/article/details?id=${item.id}`)"
              ></CyItem>
            </van-list>
          </van-pull-refresh>
        </van-tab>

        <van-tab title="问答" name="问答"
          ><van-dropdown-menu ref="menuRef">
            <van-dropdown-item v-model="questvalue" :options="options" @change="questChange" />
            <van-dropdown-item title="筛选">
              <div>
                <div style="display: flex; height: calc(100vh - 96px)">
                  <van-sidebar v-model="labelactive">
                    <van-sidebar-item title="全部分类" />
                    <van-sidebar-item
                      v-for="(item, index) in labelList"
                      :key="index"
                      :title="item.name"
                    />
                  </van-sidebar>

                  <div style="margin-top: 1rem">
                    <div class="cy-cateitem">不限</div>
                    <div
                      class="cy-cateitem"
                      v-for="(item, index) in childList"
                      :key="index"
                      @click="questscreen(item.id as string)"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                </div>
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
          <van-pull-refresh v-model="refreshing2" @refresh="onRefresh2">
            <van-list
              v-model:loading="loading2"
              :finished="finished2"
              finished-text="没有更多了"
              @load="onLoad2"
            >
              <QuestItem
                v-for="(item, index) in SearchDataList"
                :key="index"
                :list="item"
              ></QuestItem>
            </van-list> </van-pull-refresh
        ></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLabelList, getarticleSearch, getcourseSearch, getquestionSearch } from '@/servers/home'
import type { packagelist } from '@/types/course'
import type { getlabel, questDetail } from '@/types/home'
import { ref, computed } from 'vue'
import { useSearchStore } from '@/stores/search'
const store = useSearchStore()
const activeName = ref('课程')
const seSearch = ref('')
const value = ref('')
const value1 = ref('')
const articlevalue = ref('')
const questvalue = ref('')
const showflag = ref(false)
const options = [
  { text: '综合排序', value: '' },
  { text: '最新排序', value: 'new' },
  { text: '热门排序', value: 'hot' }
]
const optionstwo = [
  { text: '全部课程', value: '' },
  { text: '付费课程', value: 0 },
  { text: '免费课程', value: 1 }
]
const tagList = [
  { name: 'Java' },
  { name: 'Python' },
  { name: 'Vue.js' },
  { name: 'React' },
  { name: 'SpringBoot' },
  { name: 'SpringClound' }
]
const setList = ref({
  categoryId: '',
  content: '',
  current: 1,
  isFree: '',
  labelId: '',
  size: 10,
  sort: ''
})
const menuRef = ref(1)

const SearchDataList = ref<packagelist[] & questDetail[]>()
const labelactive = ref(0)
const labelList = ref<getlabel[]>([])
const searchName = ref('')
const getLabel = async () => {
  let res = await getLabelList()

  labelList.value = res.data
}
getLabel()

const childList = computed(() => {
  return labelList.value[labelactive.value]?.labelList
})

const getSearch = async () => {
  let res = await getcourseSearch(setList.value)
  // console.log(res)
  SearchDataList.value = res.data.records
}
getSearch()

const getArticleSearch = async () => {
  let res = await getarticleSearch(setList.value)
  // console.log(res)
  SearchDataList.value = res.data.records
}
getArticleSearch()

const getQuest = async () => {
  let res = await getquestionSearch(setList.value)
  // console.log(res)
  SearchDataList.value = res.data.records
}
getQuest()

const onClickTab = (e: any) => {
  // console.log(e.name)
  searchName.value = e.name
  if (e.name == '课程') {
    getSearch()
  } else if (e.name == '文章') {
    getArticleSearch()
  } else if (e.name == '问答') {
    getQuest()
  }
}

console.log(store.searchList)

const onSearchinp = () => {
  if (seSearch.value == '') return false
  showflag.value = true
  store.setinp(seSearch.value)
  setList.value.content = seSearch.value
  if (searchName.value == '课程') {
    getSearch()
  } else if (searchName.value == '文章') {
    getArticleSearch()
  } else if (searchName.value == '问答') {
    getQuest()
  }
}

const onHistorySearch = (e: string) => {
  seSearch.value = e
  showflag.value = true
  store.setinp(e)
}
const delItem = () => {
  store.delSearchList()
}

const onChange = (e: string) => {
  // console.log(e)
  setList.value.sort = e
  getSearch()
}

const onChange1 = (e: string) => {
  // console.log(e)
  setList.value.isFree = e
  getSearch()
}

const onscreen = (e: string) => {
  // console.log(e)
  setList.value.labelId = e
  getSearch()
}

const loading1 = ref(false)
const finished1 = ref(false)
const refreshing1 = ref(false)

const onLoad1 = async () => {
  let res = await getcourseSearch(setList.value)
  if (refreshing1.value) {
    SearchDataList.value = []
    refreshing1.value = false
  }

  SearchDataList.value!.push(...res.data.records)

  if (SearchDataList.value!.length >= res.data.total) {
    finished1.value = true
  } else {
    setList.value.current++
    loading1.value = false
  }
}

const onRefresh1 = () => {
  // 清空列表数据
  finished1.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading1.value = true
  setList.value.current = 1

  onLoad1()
}

const articleChange = (e: string) => {
  console.log(e)
  setList.value.sort = e
  getArticleSearch()
}

const articlescreen = (e: string) => {
  // console.log(e)
  setList.value.labelId = e
  getArticleSearch()
}

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const onLoad = async () => {
  let res = await getarticleSearch(setList.value)
  if (refreshing.value) {
    SearchDataList.value = []
    refreshing.value = false
  }

  SearchDataList.value!.push(...res.data.records)

  if (SearchDataList.value!.length >= res.data.total) {
    finished.value = true
  } else {
    setList.value.current++
    loading.value = false
  }
}

const onRefresh = () => {
  // 清空列表数据
  finished.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  setList.value.current = 1

  onLoad()
}

const questChange = (e: string) => {
  console.log(e)
  setList.value.sort = e
  getQuest()
}

const questscreen = (e: string) => {
  // console.log(e)
  setList.value.labelId = e
  getQuest()
}

const loading2 = ref(false)
const finished2 = ref(false)
const refreshing2 = ref(false)

const onLoad2 = async () => {
  let res = await getquestionSearch(setList.value)
  if (refreshing2.value) {
    SearchDataList.value = []
    refreshing2.value = false
  }

  SearchDataList.value!.push(...res.data.records)

  if (SearchDataList.value!.length >= res.data.total) {
    finished2.value = true
  } else {
    setList.value.current++
    loading2.value = false
  }
}

const onRefresh2 = () => {
  // 清空列表数据
  finished2.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading2.value = true
  setList.value.current = 1

  onLoad2()
}
</script>

<style lang="scss" scoped>
::v-deep() {
  .van-tab--active {
    color: #007aff;
  }
  .van-dropdown-menu__bar {
    box-shadow: none;
  }
  .van-nav-bar {
    background: #345dc2;
  }
  .van-nav-bar__title {
    color: white;
  }
  .van-sidebar-item {
    height: 74px;
    line-height: 35px;
  }
  .van-sidebar {
    box-sizing: border-box;
    width: 200px;
    text-align: center;
  }
  .van-sidebar-item--select {
    color: #345dc2;
  }
}

.cy-cateitem {
  float: left;
  font-size: 12px;
  line-height: 30px;
  border: 1px solid #999;
  border-radius: 15px;
  min-width: 80px;
  text-align: center;
  padding: 0 2px;
  margin: 7px 2px;
}
.tagitem {
  font-size: 12px;
  color: #999;
  border: 0.5px solid #999;
  border-radius: 4px;
  padding: 3px 7px;
  margin: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tagList {
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 30px;
  display: flex;
}
</style>
