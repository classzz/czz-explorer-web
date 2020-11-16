<template>
  <div class="czz-address">
    <Header :heights="'180px'" />
    <div class="pcContent pc-card mt2">
      <addressTem :msgObj="addressInfo" />
      <transactionInfo :transactionsList="detailInfo" :walletInfo="address" ref="pcaddressRef" />
    </div>
    <div class="web-block">
      <div class="mt2"></div>
      <titles :headerTitles="$t('home.address')" />
      <webSecTitle
        :titleName="$t('home.addressInfo.address')"
        :titleVal="`${addressInfo.address}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="$t('home.addressInfo.balance')"
        :titleVal="`${addressInfo.balance ? addressInfo.balance : '--'}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="$t('home.addressInfo.revenue')"
        :titleVal="`${addressInfo.totalInput ? addressInfo.totalInput : '--'}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="$t('home.addressInfo.sent')"
        :titleVal="`${
          addressInfo.totalOutput ? addressInfo.totalOutput : '--'
        }`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="$t('home.addressInfo.counts')"
        :titleVal="`${addressInfo.txCount ? addressInfo.txCount : '--'}`"
        :cellTo="false"
        :isOmit="false"
      />
      <div class="mt2"></div>
      <transactionInfo :walletInfo="address" :transactionsList="detailInfo" ref="addressRef" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./../components/header";
import Footer from "./../components/footer";
import addressTem from "./../components/address";
import transactionInfo from "./../components/transactionInfo";
import czzCell from "./../components/czzCell";
import titles from "./../components/titles";
import webSecTitle from "./../components/webSecTtitle";
import { transactions, search, acsearch,wallet } from "./../api/api";
export default {
  watch: {
    $route(to, from) {
      if (to.query.address !== from.query.address) {
        this.address = to.query.address;
        this.addressInfo = {
          address: this.address,
        };
        this.$backtop();
        this.search();
      }
    },
  },
  components: {
    addressTem,
    Footer,
    Header,
    transactionInfo,
    czzCell,
    titles,
    webSecTitle,
  },
  data() {
    return {
      addressInfo: {},
      address: "",
      detailInfo: []
    };
  },
  methods: {
    async search() {
      try {
        let res = await acsearch({ address: this.address });
        res.address = this.address;
        this.addressInfo = res;
        this.addressInfo.address = this.address;
        // this.$refs.addressRef.wallet();
        // this.$refs.pcaddressRef.wallet();
      } catch (err) {
        this.addressInfo = {
          address: this.address,
        };
      }
    },
    async wallet() {
      this.loading = true
      let {items:res} = await wallet({address: this.address})
      res.forEach((item,i) => {
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
      this.detailInfo = res
    },
  },
  mounted() {
    this.address = this.$route.query.address;
    this.addressInfo = {
      address: this.address,
    };
    this.search();
    this.wallet()
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