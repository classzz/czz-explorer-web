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
    <el-table-column prop="height" label="Block Height">
      <template slot-scope="scope">
        <div style="color: #409eff; cursor: pointer" @click="toBlockDetails(scope.row.height)">
          {{ scope.row.height }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="minerAddress" label="Minner" :show-overflow-tooltip="true">
      <template slot-scope="scope">
        <div style="color: #409eff; cursor: pointer"  @click="toAddress(scope.row.minerAddress)">
          {{ scope.row.minerAddress? scope.row.minerAddress: '--' }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="size" label="Size(Bytes)"></el-table-column>
    <el-table-column prop="reward" label="Rewards(CZZ)"> </el-table-column>
    <el-table-column prop="state" label="State">
      <template slot-scope="scope">
        {{(page> 1 || scope.$index >= 14) ? 'Confirmed' : `${scope.$index}/14`}}
      </template>
    </el-table-column>
    <el-table-column prop="time" label="Time"> </el-table-column>
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