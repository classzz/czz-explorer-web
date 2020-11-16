<template>
  <el-table
    :data="blockTable"
    stripe
    style="width: 100%"
    :header-cell-style="{
      borderBottom: '1px solid #409eff',
      color: '#409eff',
    }"
  >
    <el-table-column prop="height" :label="$t('home.blocks.blockHeight')">
      <template slot-scope="scope">
        <div style="color: #409eff; cursor: pointer" @click="toBlockDetails(scope.row.height)">
          {{ scope.row.height }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="minerAddress" :label="$t('home.blocks.minner')" :show-overflow-tooltip="true">
      <template slot-scope="scope">
        <div style="color: #409eff; cursor: pointer"  @click="toAddress(scope.row.minerAddress)">
          {{ scope.row.minerAddress? scope.row.minerAddress: '--' }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="size" :label="$t('home.blocks.size')"></el-table-column>
    <el-table-column prop="reward" :label="$t('home.blocks.reward')"> </el-table-column>
    <el-table-column prop="state" :label="$t('home.blocks.state')">
      <template slot-scope="scope">
        {{(page> 1 || scope.$index >= 14) ? $t('home.blocks.confirmed') : `${scope.$index}/14`}}
      </template>
    </el-table-column>
    <el-table-column prop="time" :label="$t('home.blocks.time')"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    blockTable:{
      type: Array,
      default: []
    },
    page: {
      type: Number,
      default: 1
    }
  },
  methods: {
    toBlockDetails(height) {
      if (!height) return;
      this.$router.push({ path: "/blockDetails", query: { height } });
    },
    toAddress(address) {
       if (!address) return;
      this.$router.push({
        path: "/address",
        query: { address: address },
      });
    }
  },
};
</script>

<style>
</style>