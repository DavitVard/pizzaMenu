<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("https://www.w3schools.com/w3images/pizza.jpg");
  background-size: cover;

  height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1em;

  .progress {
    position: absolute;
    top: 2em;
    height: 5px;
    margin: 0;
    box-shadow: none;
    background-color: #cdcdcd;

    .progress-bar {
      background-color: #28a745;
    }
  }

  .step {
    text-align: center;
    z-index: 2;

    .step-number {
      background-color: #cdcdcd;
      padding: 0.5em;
      color: white;
      border-radius: 2em;

      background-size: 0% 0%;
      background-position: center;
      background-image: radial-gradient(circle at center, #ffac31 50%, transparent 50%);
      background-repeat: no-repeat;
    }

    &.current {
      .step-number {
        background-size: 200% 200%;
        transition: all .4s .5s;
      }
    }

    &.done {
      .step-number { background-color: #28a745; }
    }
    .step-label {
      padding-top: 5px;
    }
  }
}
</style>
