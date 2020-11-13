<template>
  <div class="czz-address">
    <Header :heights="'180px'" />
    <div class="pcContent pc-card mt2">
      <addressTem :msgObj="addressInfo" />
      <transactionInfo :walletInfo="address" ref="pcaddressRef" />
    </div>
    <div class="web-block">
      <div class="mt2"></div>
      <titles :headerTitles="'Address'" />
      <webSecTitle
        :titleName="'address'"
        :titleVal="`${addressInfo.address}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="'Total Balance'"
        :titleVal="`${addressInfo.balance ? addressInfo.balance : '--'}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="'Total Revenue'"
        :titleVal="`${addressInfo.totalInput ? addressInfo.totalInput : '--'}`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="'Total Sent'"
        :titleVal="`${
          addressInfo.totalOutput ? addressInfo.totalOutput : '--'
        }`"
        :cellTo="false"
        :isOmit="false"
      />
      <czzCell
        :titleName="'Transaction Counts'"
        :titleVal="`${addressInfo.txCount ? addressInfo.txCount : '--'}`"
        :cellTo="false"
        :isOmit="false"
      />
      <div class="mt2"></div>
      <titles :headerTitles="'Transaction Information'" />
      <transactionInfo :walletInfo="address" ref="addressRef" />
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
import { transactions, search, acsearch } from "./../api/api";
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
    };
  },
  methods: {
    async search() {
      try {
        let res = await acsearch({ address: this.address });
        res.address = this.address;
        this.addressInfo = res;
        this.addressInfo.address = this.address;
        this.$refs.addressRef.wallet();
        this.$refs.pcaddressRef.wallet();
      } catch (err) {
        this.addressInfo = {
          address: this.address,
        };
      }
    },
  },
  mounted() {
    this.address = this.$route.query.address;
    this.addressInfo = {
      address: this.address,
    };
    this.search();
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