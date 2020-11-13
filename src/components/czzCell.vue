<template>
  <div class="czz-cell" @click="cellclick">
    <div class="czz-cell-title">
      <span class="custom-title">{{ titleName }}</span>
    </div>
    <div :class="cellTo? 'blue1 czz-cell-value' : 'czz-cell-value'">
      <span :class="isOmit? 'omit': ''">{{ titleVal }}</span>
    </div>
    <i class="el-icon-arrow-right" v-show="cellTo"></i>
  </div>
</template>

<script>
export default {
  props: {
    titleName: {
      type: String,
      default: "单元格",
    },
    titleVal: {
      type: String,
      default: "",
    },
    cellTo: {
        type:Boolean,
        default: false
    },
    isOmit: {
      type: Boolean,
      default: true
    }
  },
  methods: {
      cellclick() {
          this.$emit('click')
      }
  }
};
</script>

<style scoped>
.czz-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
  align-items: center;
}
.czz-cell-title,
.czz-cell-value {
  flex: 1;
}
.custom-title {
  margin-right: 4px;
  vertical-align: middle;
  font-size: 16px;
}
.czz-cell-value {
  position: relative;
  overflow: hidden;
  color: #969799;
  text-align: right;
  vertical-align: middle;
  word-wrap: break-word;
}
</style>