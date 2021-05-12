<template>
  <div>
    <div class="pc-content-cart pcContent">
      <div class="home-list-cont">
        <el-menu
          :default-active="tableIndex"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#409eff"
          @select="handleSelect"
        >
          <el-menu-item index="1"
            ><img src="./../assets/4.jpg" class="list-cont-img" />{{$t('home.latestBlock')}}</el-menu-item
          >
          <el-menu-item index="2"
            ><img src="./../assets/2.jpg" class="list-cont-img" />{{$t('home.latestTransaciton')}}</el-menu-item
          >
        </el-menu>
      </div>
      <div class="table-cont">
        <template v-if="tableIndex == 1">
          <blockTable :block-table="homeBlockTable" />
          <div class="get-more">
            <el-button type="text" @click="toLatestBlock">{{$t('home.Transacitons.more')}}</el-button>
          </div>
        </template>
        <template v-if="tableIndex == 2">
          <transcationTable :transaction-table="transactionTable" />
          <div class="get-more">
            <el-button type="text" @click="toLatestTransaction">{{$t('home.Transacitons.more')}}</el-button>
          </div>
        </template>
      </div>
    </div>
    <div class="web-content-cart">
      <titles :header-titles="$t('home.latestBlock')" :more="true" @click="toLatestBlock"/>
      <template v-for="(item, j) in homeBlockTable">
        <czzCell
          :titleName="$t('home.blocks.blockHeight')"
          :titleVal="`${item.height}`"
          :key="`${j}`"
          cellTo
          v-if="j <= 10"
          @click="toBlockDetails(item.height)"
        />
      </template>
      <titles :header-titles="$t('home.latestTransaciton')" :more="true" @click="toLatestTransaction"/>
      <template v-for="(item, i) in transactionTable">
        <czzCell
          :titleName="$t('home.Transacitons.hash')"
          :titleVal="item.txid"
          :key="item.id"
          cellTo
          v-if="i <= 10"
          @click="toTransactionHash(item.txid)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import titles from "./titles";
import blockTable from "./blockTable";
import transcationTable from "./transcationTable";
import transactionChange from "./transactionChange";
import czzCell from "./czzCell";
export default {
  props: ["homeBlockTable", "transactionTable", "dhList"],
  data() {
    return {
      blockTables: this.homeBlockTable || [],
      tableIndex: "1",
      transactionTables: this.transactionTable || [],
      sasa: 123,
    };
  },

  methods: {
    handleSelect(el) {
      this.tableIndex = el;
    },
    toBlockDetails(height) {
      if(!height) return;
      this.$router.push({ path: "/blockDetails", query: { height } });
    },
    toTransactionHash(hash) {
      if(!hash) return;
      this.$router.push({ path:'/transactionHash', query: { transHash: hash } });
    },
    toLatestBlock() {
      this.$router.push({ path:'/latestBlock' });
    },
    toLatestTransaction() {
      this.$router.push({ path:'/latestTransaction' });
    }    ,
    toLatestDhList() {
      this.$router.push({ path:'/latestDhList' });
    }
  },
  mounted() {
    console.log(this.homeBlockTable);
  },
  components: {
    titles,
    blockTable,
    transcationTable,
    transactionChange,
    czzCell,
  },
};
</script>

<style scoped>
/*  */
.pc-content-cart {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: block;
}
.web-content-cart {
  display: none;
}
.table-cont {
  padding: 20px;
}
.home-list-cont {
  margin-top: 30px;
}
.list-cont-img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  display: initial;
}
.get-more{
display:flex; 
align-items: flex-end; 
justify-content: flex-end; 
margin-top:10px
}
@media screen and (max-width: 960px) {
  .pc-content-cart {
    display: none;
  }
  .web-content-cart {
    display: block;
    margin: 0 15px;
  }
}
</style>