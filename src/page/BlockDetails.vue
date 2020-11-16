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
      <transactionInfo :height="heightId" :transactionsList="detailInfo" ref="tranRef"/>
    </div>
    <div class="web-block">
      <div class="mt2"></div>
      <titles :headerTitles="$t('home.Transacitons.block')" />
      <czzCell
        :titleName="$t('home.blocks.blockHeight')"
        :titleVal="`${searchInfo.height}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="$t('home.blocks.size')"
        :titleVal="`${searchInfo.size} Bytes`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="$t('home.blocks.reward')"
        :titleVal="`${searchInfo.reward}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="$t('home.blocks.state')"
        :titleVal="
          searchInfo.state >= 14 ? $t('home.blocks.confirmed') : `${searchInfo.state}/14`
        "
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="$t('home.blocks.transactionCount')"
        :titleVal="`${detailInfo.length}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="$t('home.blocks.time')"
        :titleVal="searchInfo.time"
        :cellTo="false"
        :isOmit="false"
      />
      
      <czzCell
        :titleName="$t('home.blocks.nbits')"
        :titleVal="`${searchInfo.bits}`"
        :cellTo="false"
        :isOmit="false"
      />
      <webSecTitle
        :titleName="$t('home.blocks.blockHash')"
        :titleVal="`${searchInfo.hash}`"
        :isOmit="false"
      />
      <template v-if="!searchInfo.previousblockhash">
        <czzCell
          :titleName="$t('home.blocks.previousBlock')"
          :titleVal="'--'"
          :isOmit="false"
        />
      </template>
      <template v-if="searchInfo.previousblockhash">
        <webSecTitle
          :titleName="$t('home.blocks.previousBlock')"
          :titleVal="searchInfo.previousblockhash"
          @click="toPreviouseBlock"
          :cellTo="true"
          :isOmit="false"
        />
      </template>
      <template v-if="!searchInfo.minerAddress">
        <czzCell
          :titleName="$t('home.blocks.minedBy')"
          :titleVal="'--'"
          :isOmit="false"
        />
      </template>
      <template v-if="searchInfo.minerAddress">
        <webSecTitle
          :titleName="$t('home.blocks.minedBy')"
          :titleVal="searchInfo.minerAddress"
          @click="toAddress"
          :cellTo="true"
          :isOmit="false"
        />
      </template>
      <div class="mt2"></div>
      
      <transactionInfo :height="heightId" :transactionsList="detailInfo" ref="transRef"/>
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
      width: 960
    };
  },
  methods: {
    async transactions() {
      let { items } = await transactions({ blockHeight: this.heightId });
      items.forEach((item,i) => {
        item.time = this.$format(item.createdTime);
        item.in = [];
        item.vin.forEach((itm,k) => {
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
      // this.$refs.transRef.getTransaction()
      // this.$refs.tranRef.getTransaction()
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
    // this.width = document.body.clientWidth
    // console.log(width);
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