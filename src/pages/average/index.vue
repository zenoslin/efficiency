<template>
  <div class="counter-warp">
    <div v-for="(item, index) in personInfo" :key="index">
      用户{{index + 1}}消费金额：<input type="text" v-model="item.cost"/>
    </div>
    <div>
      实际支付金额：<input type="text" v-model="realCost" />
    </div>
    <div v-for="(item, index) in costInfo" :key="index">
      用户{{index + 1}}需要支付金额：{{item.cost}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Average',
  data() {
    return {
      personInfo: [{ cost: 11 }, { cost: 11 }, { cost: 11 }],
      realCost: 0,
      costInfo: []
    };
  },
  watch: {
    realCost: {
      immediate: true,
      handler(newVal) {
        this.averageCost();
      }
    }
  },
  methods: {
    averageCost() {
      let total = 0;
      this.personInfo.map(item => {
        total = total + item.cost;
      });
      console.log('total', total);
      for (let i = 0; i < this.personInfo.length; i++) {
        this.costInfo[i] = {};
        this.costInfo[i].cost =
          this.personInfo[i].cost / total * parseInt(this.realCost);
        console.log('costInfo', this.costInfo);
      }
    }
  }
};
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
</style>
