<template>
  <div class="block-detail">
    <Header :heights="'180px'" />
    <div class="pcContent pc-card mt2">
      <pcBlockCont
        :msgArray="detailInfo"
        :search="searchInfo"
        @toPreviouseBlock="toPreviouseBlock"
        @toAddress="toAddress"
      />
      <transactionInfo :height="heightId" ref="tranRef"/>
    </div>
    <div class="web-block">
      <div class="mt2"></div>
      <titles :headerTitles="'Block'" />
      <czzCell
        :titleName="'Block Height'"
        :titleVal="`${searchInfo.height}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="'Size'"
        :titleVal="`${searchInfo.size} Bytes`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="'Rewards'"
        :titleVal="`${searchInfo.reward}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="'State'"
        :titleVal="
          searchInfo.state >= 14 ? 'Confirmed' : `${searchInfo.state}/14`
        "
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="'Transaction Counts'"
        :titleVal="`${detailInfo.length}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="'Time'"
        :titleVal="searchInfo.time"
        :cellTo="false"
        :isOmit="false"
      />
      
      <czzCell
        :titleName="'Nbits'"
        :titleVal="`${searchInfo.bits}`"
        :cellTo="false"
        :isOmit="false"
      />
      <webSecTitle
        :titleName="'Block Hash'"
        :titleVal="`${searchInfo.hash}`"
        :isOmit="false"
      />
      <template v-if="!searchInfo.previousblockhash">
        <czzCell
          :titleName="'Previous Block Hash'"
          :titleVal="'--'"
          :isOmit="false"
        />
      </template>
      <template v-if="searchInfo.previousblockhash">
        <webSecTitle
          :titleName="'Previous Block Hash'"
          :titleVal="searchInfo.previousblockhash"
          @click="toPreviouseBlock"
          :cellTo="true"
          :isOmit="false"
        />
      </template>
      <template v-if="!searchInfo.minerAddress">
        <czzCell
          :titleName="'Mined By'"
          :titleVal="'--'"
          :isOmit="false"
        />
      </template>
      <template v-if="searchInfo.minerAddress">
        <webSecTitle
          :titleName="'Mined By'"
          :titleVal="searchInfo.minerAddress"
          @click="toAddress"
          :cellTo="true"
          :isOmit="false"
        />
      </template>
      <div class="mt2"></div>
      
      <transactionInfo :height="heightId" ref="transRef"/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./../components/header";
import Footer from "./../components/footer";
import pcBlockCont from "./../components/pcBlockCont";
import transactionInfo from "./../components/transactionInfo";
import czzCell from "./../components/czzCell";
import titles from "./../components/titles";
import webSecTitle from "./../components/webSecTtitle";
import { transactions, search, latestHeight } from "./../api/api";

export default {
  components: {
    Footer,
    Header,
    pcBlockCont,
    transactionInfo,
    czzCell,
    titles,
    webSecTitle,
  },
  data() {
    return {
      heightId: "",
      detailInfo: [], // 详情数据
      searchInfo: {},
      params: {},
      latesIndex: 0,
    };
  },
  methods: {
    async transactions() {
      let { items } = await transactions({ blockHeight: this.heightId });
      this.detailInfo = items;
      // status 展示的数据
    },

    toPreviouseBlock() {
      if (!this.searchInfo.previousblockhash) return;
      this.heightId -= 1;
      this.search();
      this.transactions();
    },

    toAddress() {
      if (!this.searchInfo.minerAddress) return;
      this.$router.push({
        path: "/address",
        query: { address: this.searchInfo.minerAddress },
      });
    },

    // 搜索
    async search() {
      let res = await search({ height: this.heightId });
      res.time = this.$format(res.createdTime);
      this.searchInfo = res;
      this.searchInfo = Object.assign(this.searchInfo, {
        state: this.latesIndex - this.heightId,
      });
      this.$refs.transRef.getTransaction()
      this.$refs.tranRef.getTransaction()
    },
    async latestHeight() {
      let res = await latestHeight();
      this.latesIndex = res.height;
      this.transactions();
      this.search();
    },
  },
  mounted() {
    this.heightId = this.$route.query.height;
    if (!this.heightId) {
      this.$message.error("信息错误，请稍后重试");
      return this.$router.go(-1);
    }
    this.params = { height: this.heightId };
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