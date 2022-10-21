<template>
  <div class="container" ref="container">
    <!-- 搜索框 -->
    <div class="search-input">
      <el-input v-model="input" clearable placeholder="请输入内容回车搜索，空值默认搜索全部" @keyup.enter.native="search"></el-input>
      <el-button type="primary" @click="search">search</el-button>
    </div>
    <!-- 内容区 -->
    <div class="box" ref="box">
      <el-card class="box-card" v-for="(item, index) in showList" :key="index">
        <p class="box-title">{{ item.title }}</p>
        <p class="box-content">{{ item.content }}</p>
      </el-card>
      <div class="box-loading" v-if="loading" v-loading="loading"></div>
      <div class="box-result" v-show="!loading && showList.length === 0">查无结果</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicContainer',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      input: '', // 搜索框输入内容
      result: [], // 查询结果
      showList: [], // 显示的列表
      loading: false, // 加载状态
      pageIndex: 1, // 当前页码
      pageSize: 10, // 每页显示条数
    };
  },
  mounted() {
    // 首次加载所有数据
    this.search();
    this.$nextTick(() => {
      // 监听滚动事件
      window.addEventListener('scroll', this.handleScroll, true);
    });
    
  },
  methods: {
    // 查找
    search() {
      // 初始化查找结果
      this.init();
      // 根据input的值，查找list中的title与content中是否包含input的值
      this.result = this.list.filter(item => {
        return item.title.includes(this.input) || item.content.includes(this.input);
      });
      // 获取数据
      this.getData();
    },
    // 获取数据
    getData() {
      // loading打开
      this.loading = true;
      // 为了体现加载中的状态，手动延迟0.5s
      setTimeout(() => {
        // 根据当前页码，计算出需要展示的数据
        const start = (this.pageIndex - 1) * this.pageSize;
        const end = this.pageIndex * this.pageSize;
        this.showList = [...this.showList, ...this.result.slice(start, end)];
        // 关闭loading
        this.loading = false;
        console.log('showlist', this.showList);
        console.log('result', this.result);
      }, 500);
    },
    // 懒加载
    lazyLoading() {
      if (this.loading) return; // 防止重复加载
      // 只要总条数大于当前页码*每页条数，就继续加载
      if (this.result.length > this.pageSize * this.pageIndex) {
        this.pageIndex++;
        // 获取数据
        this.getData()
      }
    },
    // 滚动事件
    handleScroll() {
      // 获取滚动条距离底部的距离
      const bottom = this.$refs.box.getBoundingClientRect().bottom;
      // 获取可视区域高度
      const clientHeight = document.documentElement.clientHeight;
      if (bottom <= clientHeight) {
        // 滚动条到底部，加载更多
        this.lazyLoading();
      }
    },
    // 初始化数据
    init() {
      this.result = [];
      this.showList = [];
      this.loading = false;
      this.pageIndex = 1;
    },
  },
};
</script>
<style>
.container {
  /* padding: 50%; */
}

.box {
  margin-top: 20px;
}

.search-input {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-card {
  margin-bottom: 20px;
}

.box-title {
  text-align: left;
  font-size: 20px;
  font-weight: bold;
}

.box-content {
  text-align: left;
  font-size: 16px;
  color: #606266;
}

.box-loading {
  width: 100%;
  height: 50px;
}
</style>