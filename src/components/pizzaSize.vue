<template>
<div>
  <select class="form-control"  v-model="selectedSize" @change="save()" placeholder="select">
    <option v-for="pizzaSizes in pizzaSizes" :value="pizzaSizes.value"
    >{{pizzaSizes.name}} - {{pizzaSizes.value}} $</option>
  </select>
</div>
</template>

<script>
export default {
  name: "pizzaSize",
  data: () => ({
    selectedSize:null,
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
  }),
  methods:{
    save(){
      this.$store.commit('setPriceSize',this.selectedSize)
    }
  }
}
</script>

<style scoped>

</style>