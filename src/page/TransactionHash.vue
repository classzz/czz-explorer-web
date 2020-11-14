<template>
  <div class="block-detail">
    <Header :heights="'180px'" />
    <div class="pcContent pc-card mt2">
      <transactionHash :msgInfo="transInfo"/>
      <transactionInfo :hash="hashId" ref="pchashRef"/>
    </div>
    <div class="web-block">
      <div class="mt2"></div>
      <titles :headerTitles="'Transaction Hash'" />
      <czzCell
        :titleName="'Block Height'"
        :titleVal="`${transInfo.blockHeight}`"
        @click="toBlockDetails(transInfo.blockHeight)"
        cellTo
        :isOmit="false"
      />
      <czzCell
        :titleName="'State'"
        :titleVal="transInfo.state >= 14? 'Confirmed': `${transInfo.state}/14`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="'Fees'"
        :titleVal="`${transInfo.transFees}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="'Time'"
        :titleVal="transInfo.time"
        :cellTo="false"
        :isOmit="false"
      />
      <webSecTitle
        :titleName="'Transaction Hash'"
        :titleVal="hashId"
        :cellTo="false"
        :isOmit="false"
      />
      <div class="mt2"></div>
      <!-- <titles :headerTitles="'Transaction Information'" /> -->
      <transactionInfo :hash="hashId" ref="hashRef"/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./../components/header";
import Footer from "./../components/footer";
import transactionHash from "./../components/transactionHash";
import transactionInfo from "./../components/transactionInfo";
import czzCell from "./../components/czzCell";
import titles from "./../components/titles";
import webSecTitle from "./../components/webSecTtitle";
import { latestHeight, transactions } from "./../api/api";
export default {
  components: {
    Footer,
    Header,
    transactionHash,
    transactionInfo,
    czzCell,
    titles,
    webSecTitle,
  },
  data() {
    return {
      hashId: '',
      latesIndex: 0,
      transInfo: {}
    }
  },
  methods: {
    toBlockDetails(height) {
      if(!height) return;
      this.$router.push({ path: "/blockDetails", query: { height } });
    },
    async latestHeight() {
      let res = await latestHeight();
      this.latesIndex = res.height;
      this.transactions();
    },
    async transactions() {
      let { items } = await transactions({ transHash: this.hashId });
      let itemInfo = items[0]
      itemInfo.time = this.$format(itemInfo.createdTime);
      itemInfo.state = this.latesIndex - itemInfo.blockHeight
      this.transInfo = itemInfo;
      this.$refs.pchashRef.getTransaction()
      this.$refs.hashRef.getTransaction()
    },
  },
  mounted() {
    this.hashId = this.$route.query.transHash
    this.latestHeight();
  },
};
</script>

<style scoped>
/*  */
.pc-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 10px;
  display: block;
}
.web-block {
  display: none;
  margin: 0 15px;
}
@media screen and (max-width: 960px) {
  .web-block {
    display: block;
  }
  .pc-card {
    display: none;
  }
  .czz-fee-table {
    padding-top: 10px;
  }
  .table-header li {
    display: flex;
    align-items: center;
    padding: 10px 10px;
  }
  .table-header li div {
    width: 33.3%;
  }
  .table-header li div:nth-child(2) {
    text-align: center;
  }
  .table-header li div:last-child {
    text-align: right;
  }
  .add-fee {
    color: #409eff;
  }
  .sub-fee {
    color: #f56c6c;
  }
}
</style>