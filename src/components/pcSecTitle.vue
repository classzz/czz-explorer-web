<template>
  <div class="sce-title bb">
    <!-- <img :src="imgInfo" v-if="imgs"/> -->
    <div class="imgInfo" :style="{backgroundImage: `url(/static/img/${imgs})`}"></div>
    <div class="czz-name">{{ czzName }}</div>
    <div class="val">{{ czzVal }}</div>
  </div>
</template>

<script>
export default {
  props: {
    imgs: {
      type: String,
      default: "",
    },
    czzName: {
      type: String,
      default: "",
    },
    czzVal: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      imgInfo: ''
    };
  },
  mounted(){
    console.log(this.imgs)
    // this.imgInfo = require(`${this.imgs}`)
  }
  // data() {
  //   return {
  //     imgList: ["../assets/1.jpg"],
  //     imgInfo: require(this.imgs)
  //   };
  // },
};
</script>

<style scoped>
.sce-title {
  display: flex;
  height: 60px;
  align-items: center;
  font-size: 18px;
}
.sce-title .imgInfo {
  width: 24px;
  height: 18px;
  margin-right: 10px;
  /* background: url('./../assets/1.jpg'); */
  background-size: cover;
}
.sce-title .czz-name {
  color: #409eff;
  margin-right: 10px;
}
</style>