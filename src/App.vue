<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/history">History</router-link> |
      <router-link to="/history/add-on">Add-on history</router-link> |
      <router-link to="/history/delete">Delete history</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.actionItems()
  },
  methods: {
    ...mapActions([
      'actionItems'
    ])
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
