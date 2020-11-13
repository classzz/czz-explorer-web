<template>
  <!-- 一级标题 -->
  <div class="first-title bb">
    <div class="header-title">{{ headerTitles }}</div>
    <span class="text-more" v-if="more" @click="toMore">查看更多<i class="el-icon-arrow-right"></i></span>
  </div>
  
</template>

<script>
export default {
  props: ["headerTitles",'more'],
  data() {
    return {};
  },
  data(){
    return{
    }
  },
  components: {},
  methods: {
    toMore() {
      this.$emit('click')
    }
  },
  mounted() {},
};
</script>

<style scoped>
/* 一级 title */
.first-title{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-title {
  font-size: 16px;
  padding: 10px 0;
  color: #409eff;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text-more{
  font-size: 12px;
  color: #cec8c8;
}
.text-more i{
  margin-left: 10px;
}
</style>