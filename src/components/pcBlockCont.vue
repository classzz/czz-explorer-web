<template>
  <div class="mt2">
    <pcSecTitle
      :imgs="'4.jpg'"
      :czzName="'Block'"
      :czzVal="`${search.height}`"
    />
    
    <ul class="sec-content">
      <li>
        <div class="sec-name">Block Height</div>
        <div class="sec-val">{{ search.height }}</div>
      </li>
      <li>
        <div class="sec-name">Size</div>
        <div class="sec-val">{{ search.size }} Bytes</div>
      </li>
      <li>
        <div class="sec-name">Rewards</div>
        <div class="sec-val">{{ search.reward }} CZZ</div>
      </li>
      <li>
        <div class="sec-name">State</div>
        <div class="sec-val">{{search.state >= 14? 'Confirmed': `${search.state}/14`}}</div>
      </li>
      <li>
        <div class="sec-name">Transaction Counts</div>
        <div class="sec-val">{{msgArray.length}}</div>
      </li>
      <li>
        <div class="sec-name">Time</div>
        <div class="sec-val">{{ search.time }}</div>
      </li>
      <li>
        <div class="sec-name">Block Hash</div>
        <div class="sec-val">{{ search.hash }}</div>
      </li>
      <li>
        <div class="sec-name">Nbits</div>
        <div class="sec-val">
          {{ search.bits }}
        </div>
      </li>
      <li>
        <div class="sec-name">Previous Block Hash</div>
        <div class="sec-val blue1 head" @click="toPreviousBlock">{{ search.previousblockhash? search.previousblockhash : '--' }}</div>
      </li>
      <li>
        <div class="sec-name">Mined By</div>
        <div class="sec-val blue1 head" @click="toAddress">{{search.minerAddress ? search.minerAddress: '--'}}</div>
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
    imgs: require(`./../assets/1.jpg`),
    msgArray: {
      type: Array,
      default: [],
    },
    search: {
      type: Object,
      default: {},
    },
  },
  methods: {
    toPreviousBlock() {
      console.log('eeee')
      this.$emit('toPreviouseBlock','')
    },
    toAddress() {
      this.$emit('toAddress','')
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