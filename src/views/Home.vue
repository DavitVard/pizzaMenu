<template>
  <div class="home">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <i class="fa fa-codepen fa-lg"></i>
          </a>
        </div>
      </div>
    </nav>
    <vueStepper v-model="steps">
    </vueStepper>

  </div>
</template>

<script>

import vueStepper from '@/components/orderBlock.vue'

export default {
  name: 'Home',
  components: {
    vueStepper
  },
  data: () => ({ steps: [
      { label: 'step1' },
      { label: 'step2' },
      { label: 'step3' },
    ]})
}
</script>
<style lang="css">

</style>