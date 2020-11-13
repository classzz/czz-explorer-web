<template>
  <div>
    <pcSecTitle :imgs="'5.jpg'" :czzName="'Transaction Hash'" :czzVal="'f07326cf3a3308c88a7e8073d78037b0c21fd82ba1a556c06fcfc24bba33bac4'" />
    <ul class="sec-content">
      <li>
        <div class="sec-name">Block Height</div>
        <div class="sec-val blue1 head" @click="toBlockDetails(msgInfo.blockHeight)">{{msgInfo.blockHeight}}</div>
      </li>
      <li>
        <div class="sec-name">State</div>
        <div class="sec-val">{{msgInfo.state >= 14? 'Confirmed': `${msgInfo.state}/14`}}</div>
      </li>
      <li>
        <div class="sec-name">Fees</div>
        <div class="sec-val">{{msgInfo.transFees}}</div>
      </li>
      <li>
        <div class="sec-name">Time</div>
        <div class="sec-val">{{msgInfo.time}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import pcSecTitle from "./pcSecTitle";
export default {
  components: {
    pcSecTitle,
  },
  props: {
    msgInfo:{
      type: Object,
      default: {}
    }
  },
  methods: {
    toBlockDetails(height) {
      if(!height) return;
      this.$router.push({ path: "/blockDetails", query: { height } });
    },
  }
};
</script>

<style scoped>
.sec-content li {
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 10px 10px;
}
.sec-content li:nth-child(2n) {
  background: #eee;
}
.sec-content li .sec-name {
  width: 200px;
}
</style>