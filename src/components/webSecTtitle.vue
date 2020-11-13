<template>
  <div>
    <div class="czz-list" @click="cellclick">
      <div class="czz-title-cont">
        <div class="czz-title">{{ titleName }}</div>
        <div v-if="titleVal" :class="cellTo? 'blue1 czz-content' : 'czz-content'">{{ titleVal }}</div>
        <ul class="web-for-list" v-if="arrCont.length > 0">
          <li class="czz-content content-li" v-for="(item,i) in arrCont" :key="`${i}`">
            <div class="web-show blue1 head" @click.stop="titleClick(item.val)">{{item.val}}</div>
            <div class="web-fee blue1">{{item.no}}</div>
          </li>
        </ul>
      </div>
      <div class="czz-icon" v-if="cellTo">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
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
      type: Boolean,
      default: false,
    },
    arrCont: {
      type: Array,
      default: ()=>[]
    }
  },
  methods: {
      cellclick() {
          this.$emit('click')
      },
      titleClick(val) {
        this.$emit('clicks',val)
      }
  }
};
</script>

<style scoped>
.czz-list {
  display: flex;
  padding: 5px 0;
  align-self: center;
  justify-content: space-between;
  align-items: center;
}
.czz-title-cont {
  flex: 1;
}
.czz-icon {
  padding-left: 10px;
}
.czz-title {
  font-size: 16px;
  color: #323233;
  padding-bottom: 10px;
}
.czz-content {
  font-size: 17px;
  color: #969799;
  word-wrap: break-word;
  word-break: break-all;
  padding-bottom: 7px;
}
.content-li{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content-li .web-show{
  flex: 3;
}
.content-li .web-fee{
  margin-left: 10px;
  flex: 1;
  text-align: right;
}
</style>