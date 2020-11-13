<template>
  <div class="mt2">
    <pcSecTitle
      :imgs="'8.jpg'"
      :czzName="'Address'"
      :czzVal="`${msgObj.address}`"
    />
    <ul class="sec-content">
      <li>
        <div class="sec-name">Total Balance</div>
        <div class="sec-val">{{ msgObj.balance ? msgObj.balance: '--'}}</div>
      </li>
      <li>
        <div class="sec-name">Total Revenue</div>
        <div class="sec-val">{{ msgObj.totalInput? `${msgObj.totalInput} CZZ`: '--' }} </div>
      </li>
      <li>
        <div class="sec-name">Total Sent</div>
        <div class="sec-val">{{ msgObj.totalOutput? `${msgObj.totalOutput} CZZ` : '--' }} </div>
      </li>
      <li>
        <div class="sec-name">Transaction Counts</div>
        <div class="sec-val">{{msgObj.txCount? msgObj.txCount : '--'}}</div>
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
      msgObj: {
          type: Object,
          default: {}
      }
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