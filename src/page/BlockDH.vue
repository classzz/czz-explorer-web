<template>
  <div class="block-dh">
    <Header :heights="heightTitle" />
    <homeList :isShow="false" :objData="headersInfo" />
    <div class="mt2 pcContent block-dh-table">
      <el-table
        v-loading = "loading"
        :data="blockDHList"
        stripe
        style="width: 100%"
        :header-cell-style="{
          borderBottom: '1px solid #409eff',
          color: '#409eff',
        }"
      >
        <el-table-column prop="time" :label="$t('blockDh.date')"></el-table-column>
        <el-table-column prop="difficulty" :label="$t('blockDh.difficulty')"></el-table-column>
        <el-table-column
          prop="hashRate"
          :label="$t('blockDh.networkHash')"
        ></el-table-column>
      </el-table>
      <div
        style="
          display: flex;
          justify-content: flex-end;
          margin: 20px auto 0;
        "
      >
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
      <el-collapse v-model="index" v-loading="loading" accordion>
        <template v-for="(item, i) in blockDHList">
          <el-collapse-item :name="i" :key="`${i}`">
            <template slot="title">
              <ul class="block-dh-ul block-dh-ul-title">
                <li class="czz-name">{{$t('blockDh.networkHash')}}</li>
                <li class="czz-value blue1">
                  {{ item.hashRate }}
                </li>
              </ul>
            </template>
            <ul class="block-dh-ul">
              <li class="czz-name">{{$t('blockDh.difficulty')}}</li>
              <li class="czz-value blue1">
                {{ item.difficulty }}
              </li>
            </ul>
            <ul class="block-dh-ul">
              <li class="czz-name">{{$t('blockDh.date')}}</li>
              <li class="czz-value blue1">
                {{ item.time }}
              </li>
            </ul>
          </el-collapse-item>
        </template>
      </el-collapse>
      <div
        style="
          display: flex;
          justify-content: flex-end;
          margin: 20px auto 0;
        "
      >
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
import { difficulty, latestHeight } from "./../api/api";
export default {
  components: {
    Footer,
    Header,
    homeList,
  },
  data() {
    return {
      index: 0,
      heightTitle: "180px",
      loading: false,
      blockDHList: [],
      headersInfo: {},
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
    async latestHeight() {
      let res = await latestHeight();
      if (!this.headersInfo.height || res.height != this.headersInfo.height) {
        this.difficulty();
        this.pagination.page = 1;
        this.difficultyTable();
      }
      this.clearHomeTime = setTimeout(() => {
        this.latestHeight();
      }, 5000);
    },
    async difficultyTable() {
      this.loading = true
      let { items, criteria, totalCount } = await difficulty({
        page: this.pagination.page,
        limit: 20,
      });
      items.forEach((item) => (item.time = this.$format(item.createdTime)));
      this.blockDHList = items;
      this.loading = false
      this.pagination.total = totalCount;
    },
    handleCurrentChange(el) {
      this.pagination.page = el;
      this.difficultyTable();
    },
  },
  mounted() {
    this.difficulty();
    this.latestHeight();
    this.difficultyTable();
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