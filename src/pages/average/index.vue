<template>
  <div class="average">
    <div class="flex justify-center">
      <div class="average-icon night_fade"></div>
    </div>
    <div class="flex padding justify-center">
      <div class="average-name">拼单计算器</div>
    </div>
    <div class="width90">
      <div v-for="(item, index) in personInfo" :key="index" class="flex">
        <div class="flex-sub margin-xs inputcard-name">
          <p>
            <span class="text-icon night_fade"></span>
            用户{{index + 1}}
          </p>
        </div>
        <div class="flex-treble margin-xs solid inputcard-right">
          <input class="inputcard-right-input" type="digit" v-model="item.cost" placeholder="请输入金额" />
        </div>
      </div>
    </div>
    <div class="flex padding justify-around">
      <div class="average-btn-person night_fade" @click="handleDecrease">
        <div class="btn-text-decrease">-</div>
      </div>
      <div class="average-btn-person night_fade" @click="handleIncrease">
        <div class="btn-text-increase">+</div>
      </div>
    </div>
    <div class="width90">
      <div class="flex">
        <div class="flex-sub margin-xs inputcard-name">
          <p>
            <span class="text-icon night_fade"></span>
            支出
          </p>
        </div>
        <div class="flex-treble margin-xs solid inputcard-right">
          <input class="inputcard-right-input" type="digit" v-model="realCost" placeholder="请输入金额" />
        </div>
      </div>
    </div>
    <div class="flex margin-xs padding justify-center">
      <button class="average-btn-confirm night_fade" @click="averageCost">计算</button>
    </div>
    <div class="width90">
      <div v-for="(item, index) in costInfo" :key="index" class="flex justify-center">
        <div class="inputcard-name">
          <p>
            <span class="text-icon night_fade"></span>
            用户{{index + 1}}应支付¥{{item.cost}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Average',
  data() {
    return {
      personInfo: [{ cost: '' }, { cost: '' }, { cost: '' }],
      realCost: '',
      costInfo: []
    };
  },
  methods: {
    handleIncrease() {
      this.personInfo.push({ cost: '' });
    },
    handleDecrease() {
      if (this.personInfo.length <= 1) return;
      this.personInfo.pop();
    },
    averageCost() {
      let total = 0;
      let arr = [];
      this.personInfo.map(item => {
        total = total + parseInt(item.cost);
      });
      console.log('total', total);
      for (let i = 0; i < this.personInfo.length; i++) {
        arr[i] = {};
        arr[i].cost = this.getCostStr(
          parseInt(this.personInfo[i].cost) / total * parseInt(this.realCost)
        );
      }
      this.costInfo = arr;
      console.log(this.costInfo);
    },
    getCostStr(num) {
      if (typeof num !== 'number') return `请输入金额`;
      return `${num.toFixed(2)}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.average {
  min-height: 100vh;
  background: #fff;
  &-icon {
    width: vw(128);
    height: vw(128);
    border-radius: 50%;
  }
  &-name {
    font-size: vw(26);
    color: #aaa;
  }
}
.inputcard {
  &-name {
    padding: vw(6);
    text-align: center;
    font-size: vw(30);
    line-height: vw(60);
    color: #a18cd1;
  }
  &-right {
    position: relative;
    padding: vw(6);
    text-align: center;
    border-radius: vw(36);
    color: #a18cd1;
    &-input {
      width: 100%;
      @include abs_both_middle();
    }
  }
}
.text-icon {
  width: vw(30);
  height: vw(30);
  position: relative;
  float: left;
  margin: vw(12) auto auto vw(10);
  border-radius: 50%;
}
.average-btn {
  &-person {
    width: vw(80);
    height: vw(80);
    border-radius: 50%;
    border: 0;
    position: relative;
  }
  &-confirm {
    width: vw(300);
    height: vw(80);
    font-size: vw(30);
    color: #fff;
    border-radius: vw(40);
    border: 0;
  }
}
.width90 {
  margin-left: 5%;
  margin-right: 5%;
}
.btn-text-increase {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate3d(-50%, -50%, 0);
  font-size: vw(80);
  color: #fff;
}
.btn-text-decrease {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate3d(-50%, -50%, 0);
  font-size: vw(80);
  color: #fff;
}
</style>
