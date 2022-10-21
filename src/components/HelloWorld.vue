<template>
  <BasicContainer v-if="list.length !== 0" :list="list"></BasicContainer>
</template>

<script>
import axios from 'axios'
import BasicContainer from '@/components/BasicContainer'
export default {
  name: 'Search',
  components: {
    BasicContainer,
  },
  data() {
    return {
      response: {},
      // 搜索结果
      list: [],
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 发送搜索列表请求
    getList() {
      axios
        .get(
          'https://www.fastmock.site/mock/5dc392f72cc08313cf050989ca22dfb8/tiktok/api/list',
          {
            params: {
              // 搜索词
              keyword: '',
              // 分页个数
              pageSize: 999,
              // 页码
              page: 1,
            },
          }
        )
        .then(response => {
          if (response && response.data.status === 0) {
            this.response = response.data;
            this.list = response.data.list;
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
<style></style>
