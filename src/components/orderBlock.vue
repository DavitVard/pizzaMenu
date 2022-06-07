<template id="vue-stepper">
<div>
<div class="flex-container container">
  <div class="progress" :style="pBarSize">
    <div class="progress-bar"
         role="progressbar"
         aria-valuenow="60"
         aria-valuemin="0"
         aria-valuemax="100"
         :style="progress">
    </div>
  </div>
  <div class="step"
       v-for="(step, i) in steps"
       :key="i"
       :class="{ done: step.number < currentStep, current: step.number === currentStep }">
    <div class="step-number"
         :id="'step-'+step.number"
         v-on:click="moveStep(step.number)">
      <i v-if="step.number < currentStep" class="fa fa-check"></i>
      <span v-else>{{step.number}}</span>
    </div>
    <div class="step-label">{{step.label}}</div>
  </div>
</div>
<div class="container">
  <slot name="test">

  </slot>
  <div class="jumbotron" slot="test">
    <div class="parrentSteps">
      <div v-if="currentStep ==1">
        <h1 class="text-warning mb-5">Select pizza size</h1>
        <pizza-size></pizza-size>
      </div>
      <div v-if="currentStep ==2">
        <h1 class="text-warning mb-5">Select pizza topping</h1>
        <div>
          <pizza-topping></pizza-topping>
        </div>
      </div>
      <div v-if="currentStep ==3">
          <customer-details></customer-details>
      </div>
      <div v-if="currentStep == 4">
        <div class="card_one">
          <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
            <i class="checkmark checked">✓</i>
          </div>
          <h1>Success</h1>
          <p>Thank you! Your order was successfully submitted!</p>
        </div>
      </div>
    </div>

  </div>
  <div class="col-sm-12" v-if="currentStep > 0 && currentStep <= steps.length">
    <button v-if="currentStep > 1"
            v-on:click="moveStep(currentStep-1)"
            class="btn btn_orange mx-3"
            role="button"><i class="fa fa-chevron-left" aria-hidden="true"></i> Back</button>
    <button v-if="currentStep < steps.length"
            v-on:click="moveStep(currentStep+1)"
            :disabled="$store.getters.getPriceSize == 0"
            class="btn btn-success pull-right"
            role="button">Next <i class="fa fa-chevron-right" aria-hidden="true"></i></button>
    <button v-else-if="currentStep == steps.length"
            :disabled="!$store.getters.orderButton"
            v-on:click="finalize"
            class="btn btn-success pull-right"
            role="button">Submit</button>
  </div>
  <div v-else>
    <button v-on:click="moveStep(1)"
            class="btn btn-success pull-right"
            role="button">Order Again <i class="fa fa-refresh" aria-hidden="true"></i></button>
  </div>
</div>
</div>
</template>
<script>

import customerDetails from '@/components/customerDetails.vue'
import pizzaSize from '@/components/pizzaSize.vue'
import pizzaTopping from '@/components/pizzaTopping.vue'

export default {
  name: 'orderBlock',
  components:{
    customerDetails,
    pizzaSize,
    pizzaTopping
  },
  props: { value: Array },
  metods:{},
  data: () => ({
    steps: [],
    pBarSize: '',
    currentStep: 1,
    selectedSize:null,
    selectedTopping:[],
    pizzaSizes:[
      {
        value: 5,
        name: "small"
      },
      {
        value: 10,
        name: "medium"
      },
      {
        value: 15,
        name: "large"
      },
      {
        value: 20,
        name: "extra large"
      },
    ],
    pizzaTopping:[
      {
        id:1,
        value: 1,
        name: "Mushrooms"
      },
      {
        id:2,
        value: 1,
        name: "Olives"
      },
      {
        id:3,
        value: 0,
        name: "Tomato"
      },
      {
        id:4,
        value: 3,
        name: "Tona"
      },
      {
        id:5,
        value: 3,
        name: "Pineapple"
      },
      {
        id:6,
        value: 5,
        name: "Seafood"
      },
      {
        id:7,
        value: 5,
        name: "Pepperoni"
      },
      {
        id:8,
        value: 1,
        name: "Bacon"
      },
      {
        id:9,
        value: 0,
        name: "Onion"
      },
      {
        id:10,
        value: 3,
        name: "Mozzarella"
      },

    ]
  }),
  mounted() {
    if (!this.value || this.value.length == 0) {
      return;
    }

    this.steps = this.value
        .map((s, i) => ({ number: i+1, selected: false, ...s}) );

    this.steps[0].selected = true;

    this.$nextTick(() => {
      this.calculateBarPosition();
    });

    window.addEventListener('resize', this.calculateBarPosition);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateBarPosition);
  },
  computed: {
    progress() {
      if (this.currentStep > this.steps.length) {
        return `width: 100%`;
      }
      const first = document.getElementById('step-1');
      const current = document.getElementById(`step-${this.currentStep}`);
      if (first && current) {
        const delta = current.getBoundingClientRect().right -first.getBoundingClientRect().right;
        return `width: ${delta}px;`;
      }
    }
  },
  methods: {
    moveStep(stepNumber) {
      this.currentStep = stepNumber;
    },
    calculateBarPosition() {
      let docEl = document.documentElement;
      const first = document.getElementById('step-1');
      let rect = first.getBoundingClientRect();
      const offset = rect.left + (window.pageXOffset || docEl.scrollLeft || 0);
      const top = rect.top + rect.height/2 - 2;
      this.pBarSize = `left: ${offset}px; right: ${offset}px; top: ${top}px`;
    },
    finalize() {
      this.currentStep += 1;
    }
  }
}
</script>


<style scoped lang="scss">
.btn_orange{
  background-color: #ff7413 !important;
}
h1 {
  color: #88B04B;
  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 10px;
}
p {
  color: #404F5E;
  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  font-size:20px;
  margin: 0;
}
.checked {
  color: #9ABC66;
  font-size: 100px;
  line-height: 200px;
  margin-left:-15px;
}
.card_one {
  background: white;
  padding: 60px;
  border-radius: 4px;
  box-shadow: 0 2px 3px #C8D0D8;
  display: inline-block;
  margin: 0 auto;
}

.parrentSteps{
  opacity: 1 !important;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
