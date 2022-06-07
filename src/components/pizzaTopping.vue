<template>
<div>
  <div class="row">
    <div class="col-md-2" v-for="(pizzatop, index) in pizzaTopping" >
      <input type="checkbox"
             :id="pizzatop.id"
             :value="pizzatop.id"
             :disabled="pizzatop.disabled"
             key="'selectedTopping' + pizzatop.id"
             @change="save(pizzatop, index, $event)"
      >
      <label :for="pizzatop.id" class="mx-3 text-info">{{pizzatop.name}}</label>
    </div>
  </div>
  <br>
  <div class="text-info mt-5"> <h5>Selected Pizza Price : <strong>{{ curPrice + sizePrice }} $</strong></h5></div>
  <div class="text-success mt-3"><h2><strong>Total Price </strong>(with 15% VAT) : <strong>{{ VAT }} $</strong></h2></div>
</div>
</template>

<script>
export default {
  name: "pizzaTopping",
  data: () => ({
    pizzaTopping: [
      {
        id: 1,
        value: 1,
        name: "Mushrooms",
        active: false,
      },
      {
        id: 2,
        value: 1,
        name: "Olives",
        active: false,
      },
      {
        id: 3,
        value: 0,
        name: "Tomato",
        active: false,
      },
      {
        id: 4,
        value: 3,
        name: "Tona",
        active: false,
      },
      {
        id: 5,
        value: 3,
        name: "Pineapple",
        active: false,
      },
      {
        id: 6,
        value: 5,
        name: "Seafood",
        active: false,
      },
      {
        id: 7,
        value: 5,
        name: "Pepperoni",
        active: false,
      },
      {
        id: 8,
        value: 1,
        name: "Bacon",
        active: false,
      },
      {
        id: 9,
        value: 0,
        name: "Onion",
        active: false,
      },
      {
        id: 10,
        value: 3,
        name: "Mozzarella",
        active: false,
      },
    ],
    curPrice:0
  }),
  computed: {
    VAT: function () {
      var curVal = (this.curPrice + this.sizePrice) + (this.curPrice + this.sizePrice) * 15 / 100
      return curVal
    },
    sizePrice: function () {
      return this.$store.getters.getPriceSize
    },
  },
  methods: {
    save({ value, id, active }, index, rec) {
      this.$set(this.pizzaTopping[index], 'active', rec.target.checked)

      if (!rec.target.checked) {
        this.curPrice = this.curPrice - value
      }
      this.curPrice = 0
      let selecteds = this.pizzaTopping.filter(i => i.active)
      selecteds.map(i => this.curPrice = this.curPrice + i.value)
      if (selecteds.length > 5) {
        this.pizzaTopping.map((v, i) => {
          if (!v.active) this.$set(this.pizzaTopping[i], 'disabled', true)
        })
      } else {
        this.pizzaTopping.map((v, i) => this.$set(this.pizzaTopping[i], 'disabled', false))
      }
      selecteds.map(i =>  i.id == 8 ? this.$set(this.pizzaTopping[9], 'disabled', true) :
          i.id == 10 ? this.$set(this.pizzaTopping[7], 'disabled', true) : '')

    },
  },
}
</script>

<style scoped>

</style>