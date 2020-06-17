<template>
  <div class="about">
    <table style="width: 100%;">
      <thead>
        <tr>
          <th>
            Id
          </th>
          <th>
            Name
          </th>
          <th>
            Action
          </th>
          <th>
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in compHistory" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.hasAdd?'Add':'Delete'}}</td>
          <td>{{item.date}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    compHistory () {
      return this.history.filter(item => {
        switch (this.$route.path) {
          case '/history/add-on':
            return item.hasAdd
          case '/history/delete':
            return !item.hasAdd
          default:
            return true
        }
      })
    },
    ...mapState({
      history: 'history'
    })
  }
}
</script>
<style lang="scss">
  .about {
    height: calc(100vh - 95px);
    overflow: auto;
  }
</style>
