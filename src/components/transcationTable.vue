<template>
  <el-table
    :data="transactionTable"
    stripe
    style="width: 100%"
    :header-cell-style="{
      borderBottom: '1px solid #409eff',
      color: '#409eff',
    }"
  >
    <el-table-column prop="txid" :label="$t('home.Transacitons.hash')" :show-overflow-tooltip="true">
      <template slot-scope="scope">
        <div style="color: #409eff; cursor: pointer" @click="toTransactionHash(scope.row.txid)">
          {{ scope.row.txid }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="blockHeight" :label="$t('home.Transacitons.block')" :show-overflow-tooltip="true">
        <template slot-scope="scope">
        <div style="color: #409eff; cursor: pointer" @click="toBlockDetails(scope.row.blockHeight)">
          {{ scope.row.blockHeight }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="time" :label="$t('home.Transacitons.time')"></el-table-column>
    <el-table-column prop="'coinbase'" :label="$t('home.Transacitons.from')"> 
      <template>{{$t('home.Transacitons.coinbase')}}</template>
    </el-table-column>
    <el-table-column prop="to" :label="$t('home.Transacitons.to')">
      <template>
        --
      </template>
    </el-table-column>
    <el-table-column prop="state" :label="$t('home.Transacitons.state')">
      <template slot-scope="scope">
        {{(scope.$index >= 14) ? $t('home.blocks.confirmed') : `${scope.$index}/14`}}
      </template>
    </el-table-column>
    <el-table-column prop="transFees" :label="$t('home.Transacitons.fees')"> </el-table-column>
  </el-table>
</template>

<script>
export default {
    props: ['transactionTable'],
    methods: {
    toBlockDetails(height) {
      if (!height) return;
      this.$router.push({ path: "blockDetails", query: { height } });
    },
    toTransactionHash(hash) {
      if(!hash) return;
      this.$router.push({ path:'/transactionHash', query: { transHash: hash } });
    },
  },
}
</script>

<style>

</style>