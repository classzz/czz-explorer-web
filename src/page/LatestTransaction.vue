<template>
  <div class="block-dh">
    <Header :heights="heightTitle" />
    <div class="mt2 pcContent block-dh-table">
      <transcationTable :transaction-table="transactionTable" :page="pagination.page" />
      <div class="web-pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pagination.total"
          :page-size="pagination.limit"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <div class="webContern mt2">
      <titles :headerTitles="'All Transactions'" />
      <el-collapse v-model="index" v-loading="loading" accordion>
        <template v-for="(item, i) in transactionTable">
          <el-collapse-item :name="i" :key="`${i}`">
            <template slot="title">
              <ul class="block-dh-ul block-dh-ul-title">
                <li class="czz-name">Transaction Hash</li>
                <li class="czz-value blue1 omit">
                  <!-- item.txid {{  }}-->
                  <span @click.stop="toBlockDetails(item.txid)" class="omit">FFEWDSAFAEWW</span>
                </li>
              </ul>
            </template>
            <ul class="block-dh-ul">
              <li class="czz-name">Block</li>
              <li class="czz-value blue1">
                <span @click.stop="toBlockDetails(item.blockHeight)">{{ item.blockHeight }}</span>
              </li>
            </ul>
            <ul class="block-dh-ul">
              <li class="czz-name">Time</li>
              <li class="czz-value">
                {{ item.time }}
              </li>
            </ul>
            <ul class="block-dh-ul">
              <li class="czz-name">State</li>
              <li class="czz-value">
                {{(pagination.page> 1 || i>= 14) ? 'Confirmed' : `${i}/14`}}
              </li>
            </ul>
            <ul class="block-dh-ul">
              <li class="czz-name">Fees</li>
              <li class="czz-value">
                {{ item.transFees }}
              </li>
            </ul>
          </el-collapse-item>
        </template>
      </el-collapse>
      <div class="web-pagination">
        <el-pagination
          background
          small
          layout="prev, pager, next"
          :total="pagination.total"
          :page-size="pagination.limit"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./../components/header";
import Footer from "./../components/footer";
import homeList from "./../components/homeList";
import transcationTable from "./../components/transcationTable";
import titles from "./../components/titles";
import { transactions, latestHeight,difficulty } from "./../api/api";
export default {
  components: {
    Footer,
    Header,
    homeList,
    transcationTable,
    titles,
  },
  data() {
    return {
      headersInfo: {},
      index: 0,
      heightTitle: "180px",
      loading: false,
      transactionTable: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 20,
      },
    };
  },
  methods: {
    async difficulty() {
      let { items, criteria } = await difficulty();
      let headersInfo = items[0];
      headersInfo.difficulty = this.$toCurrencyString(headersInfo.difficulty);
      headersInfo.hashRate = this.$toCurrencyString(headersInfo.hashRate);
      this.headersInfo = headersInfo;
    },
    async transactions() {
      let { items: res, totalCount } = await transactions({
        page: this.pagination.page,
        limit: 20,
      });
      res.forEach((item) => (item.time = this.$format(item.createdTime)));
      this.transactionTable = res;
      this.pagination.total = totalCount;
    },

    async latestHeight() {
      let res = await latestHeight();
      if (!this.headersInfo.height || res.height != this.headersInfo.height) {
        this.pagination.page = 1
        this.transactions();
      }
      this.clearHomeTime = setTimeout(() => {
        this.latestHeight();
      }, 5000);
    },
    handleCurrentChange(el) {
      this.pagination.page = el;
      this.transactions();
    },
    toBlockDetails(height) {
      if (!height) return;
      this.$router.push({ path: "/blockDetails", query: { height } });
    },
  },
  mounted() {
    this.difficulty()
    this.latestHeight();
    this.transactions();
  },
};
</script>


<style>
.block-dh .webContern {
  display: none;
}
.block-dh .block-dh-table {
  display: block;
}
.block-dh .el-collapse-item__header {
  height: initial;
  line-height: 1.5;
}
.block-dh .block-dh-ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
  padding-right: 13px;
}
.block-dh .block-dh-ul-title {
  padding-right: 0;
  width: 690px;
}
.block-dh .block-dh-ul li {
  flex: 1;
}
.web-pagination {
  display: flex;
  justify-content: flex-end;
  margin: 20px auto 0;
}
@media screen and (max-width: 960px) {
  .block-dh .block-dh-table {
    display: none;
  }
  .block-dh .webContern {
    margin: 0 15px;
    display: block;
  }
}
</style>

<style scoped>
</style>