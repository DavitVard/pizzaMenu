<template>
  <div class="container">
    <form >
      <h2>Contact Us</h2>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="first">First Name</label>
            <input type="text" class="form-control" placeholder="" id="first" v-model="name">
          </div>
        </div>
        <!--  col-md-6   -->
        <div class="col-md-6">
          <div class="form-group">
            <label for="Adress">Adress</label>
            <input type="text" class="form-control" placeholder="" id="Adress" v-model="adress">
          </div>
        </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" class="form-control" id="phone" placeholder="" v-model="phone">
          </div>
        </div>

      </div>

      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "customerDetails",
  data: () =>({
    name:'',
    adress:'',
    phone:''
  }),
  methods: {
    checkForm: function (e) {
      if (this.name.length && this.adress.length && this.phone.length){
        this.$store.commit('setStatusButton',true)
      }else  this.$store.commit('setStatusButton',false)
    }
  },
  watch:{
    'name': function () {
      this.checkForm()
    },
    'adress': function () {
      this.checkForm()
    },
    'phone': function () {
      this.checkForm()
    },
  }
}
</script>

