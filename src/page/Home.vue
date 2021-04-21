<template>
  <div>
    <Header h2Title home/>
    <div class="main">
      <homeList :objData="headersInfo" />
      <homeListCont
        :home-block-table="latestBlock"
        :transaction-table="transactionTable"
        :dh-list="dhList"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./../components/header";
import homeList from "./../components/homeList";
import homeListCont from "./../components/homeListCont";
import Footer from "./../components/footer";
import { difficulty, latestHeight, blocks, transactions, transactions_dhlist } from "./../api/api";
export default {
  data() {
    return {
      lan: this.$getLanguage(),
      headersInfo: {}, // hash Rate 的数据
      latestBlock: [],
      transactionTable: [
        {
          transactionHash:
            "e70fb770f6660ef8db3ddbab0df88f1c22069659d078cb97aa211bffa72d8b97",
          block: "805139",
          time: "2020-10-28 07:37:23",
          from: "coinbase",
          to: "-",
          state: "0/14",
          fees: 0,
        },
      ],
    };
  },
  components: {
    Footer,
    Header,
    homeList,
    homeListCont,
  },
  methods: {
    async difficulty() {
      let { items, criteria } = await difficulty();
      let headersInfo = items[0];
      headersInfo.difficulty = this.$toCurrencyString(headersInfo.difficulty);
      headersInfo.hashRate = this.$toCurrencyString(headersInfo.hashRate);
      this.headersInfo = headersInfo;
    },
    async latestHeight() {
      let res = await latestHeight();
      if (!this.headersInfo.height || res.height != this.headersInfo.height) {
        this.difficulty();
        this.blocks();
        this.transactions()
      }
      this.clearHomeTime = setTimeout(() => {
        this.latestHeight();
      }, 5000);
    },

    async dhList() {
      let res = await transactions_dhlist();
      this.dhList = res.items;
    },

    async blocks() {
      let { items: res } = await blocks();
      res.forEach((item) => (item.time = this.$format(item.createdTime)));
      this.latestBlock = res;
      console.log(this.latestBlock);
    },

    async transactions() {
      let { items: res } = await transactions();
      res.forEach((item) => (item.time = this.$format(item.createdTime)));
      this.transactionTable = res;
    },
  },
  mounted() {
    this.difficulty();
    this.latestHeight();
    this.blocks();
    this.transactions();
    this.dhList();
  },
  destroyed() {
    clearTimeout(this.clearHomeTime);
  },
};
</script>

<style scoped>
</style>