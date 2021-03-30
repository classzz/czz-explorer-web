<template>
  <div class="block-detail">
    <Header :heights="'180px'" />
    <div class="pcContent pc-card mt2">
      <transactionHash :msgInfo="transInfo" :hashId="hashId" />
      <transactionInfo
        :transactionsList="detailInfo"
        :hash="hashId"
        ref="pchashRef"
      />
      <transactionChange :hashId="hashId" :dhItems="dhItems" />
    </div>
    <div class="web-block">
      <div class="mt2"></div>
      <titles :headerTitles="$t('home.Transacitons.hash')" />
      <czzCell
        :titleName="$t('home.blocks.blockHash')"
        :titleVal="`${transInfo.blockHeight}`"
        @click="toBlockDetails(transInfo.blockHeight)"
        cellTo
        :isOmit="false"
      />
      <czzCell
        :titleName="$t('home.Transacitons.state')"
        :titleVal="
          transInfo.state >= 14
            ? $t('home.blocks.confirmed')
            : `${transInfo.state}/14`
        "
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="$t('home.Transacitons.fees')"
        :titleVal="`${transInfo.transFees}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="$t('home.Transacitons.time')"
        :titleVal="transInfo.time"
        :cellTo="false"
        :isOmit="false"
      />
      <webSecTitle
        :titleName="$t('home.Transacitons.hash')"
        :titleVal="hashId"
        :cellTo="false"
        :isOmit="false"
      />
      <div class="mt2"></div>
      <!-- <titles :headerTitles="'Transaction Information'" /> -->
      <transactionInfo
        :transactionsList="detailInfo"
        :hash="hashId"
        ref="hashRef"
      />
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "./../components/header";
import Footer from "./../components/footer";
import transactionHash from "./../components/transactionHash";
import transactionInfo from "./../components/transactionInfo";
import transactionChange from "./../components/transactionChange";
import czzCell from "./../components/czzCell";
import titles from "./../components/titles";
import webSecTitle from "./../components/webSecTtitle";
import { latestHeight, transactions, transactions_dh } from "./../api/api";
export default {
  components: {
    Footer,
    Header,
    transactionHash,
    transactionInfo,
    transactionChange,
    czzCell,
    titles,
    webSecTitle,
  },
  data() {
    return {
      hashId: "",
      latesIndex: 0,
      transInfo: {},
      detailInfo: [],
      dhItems: [],
    };
  },
  methods: {
    toBlockDetails(height) {
      if (!height) return;
      this.$router.push({ path: "/blockDetails", query: { height } });
    },
    async latestHeight() {
      let res = await latestHeight();
      this.latesIndex = res.height;
      this.transactions();
    },
    async transactions() {
      let { items } = await transactions({ transHash: this.hashId });
      let itemInfo = items[0];
      itemInfo.time = this.$format(itemInfo.createdTime);
      itemInfo.state = this.latesIndex - itemInfo.blockHeight;
      this.transInfo = itemInfo;
      this.getList(items);
      // this.$refs.pchashRef.getTransaction()
      // this.$refs.hashRef.getTransaction()
    },

    getList(arr) {
      arr.forEach((item, i) => {
        item.time = this.$format(item.createdTime);
        item.in = [];
        item.vin.forEach((itm, k) => {
          if (itm.value) {
            item.in.push({
              val: itm.address,
              no: `-${itm.value}`,
            });
          }
        });
        item.out = [];
        item.vout.forEach((it, j) => {
          if (it.value) {
            item.out.push({
              no: `+${it.value}`,
              val: `${it.scriptPubKey.addresses[0]}`,
            });
          }
        });
      });
      this.detailInfo = arr;
    },
    async getTransDH() {
      let post = {
        page: 1,
        limit: 5,
        txhash: this.hashId,
      };
      let result = await transactions_dh(post);
      console.log(result.items);
      this.dhItems = result.items;
    },
  },
  mounted() {
    this.hashId = this.$route.query.transHash;
    this.latestHeight();
    this.getTransDH();
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