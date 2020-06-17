<template>
  <div class="home">
    <div class="flex justify-around">
      <div class="block flex justify-start">
        <input v-model="filter" type="text">
      </div>
      <div class="block flex justify-start">
      </div>
    </div>
    <div class="flex justify-around">
      <div class="list block flex justify-start">
        <div class="flex" v-for="(item, index) in compItems" :key="index">
          <span @click="moveToRight(item.id)" class="action">+</span>
          <HomeItem :item="item"/>
        </div>
      </div>
      <div class="list block flex justify-start">
        <div class="flex" v-for="(item, index) in rightItems" :key="index">
          <span @click="moveToLeft(index)" class="action">-</span>
          <HomeItem :item="item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import moment from 'moment'
import HomeItem from '../components/HomeItem'

export default {
  name: 'Home',
  data () {
    return {
      filter: ''
    }
  },
  components: {
    HomeItem
  },
  computed: {
    ...mapState({
      items: 'items',
      rightItems: 'rightItems'
    }),
    compItems () {
      return this.items.filter(item =>
        `${item.name} ${item.items.map(value => value.name).join(' ')}`
          .indexOf(this.filter) > -1
      )
        .sort((a, b) => {
          const re = new RegExp(`${this.filter}`, 'g')
          a = (`${a.name} ${a.items.map(value => value.name).join(' ')}`.match(re) || []).length
          b = (`${b.name} ${b.items.map(value => value.name).join(' ')}`.match(re) || []).length
          return a - b
        })
    }
  },
  methods: {
    ...mapMutations([
      'setOneItemHistory',
      'addItem',
      'addRightItem',
      'deleteItem',
      'deleteRightItem',
      'setItems'
    ]),
    moveToRight (id) {
      const index = this.items.findIndex(item => item.id === id)
      this.addRightItem(this.items[index])
      this.setOneItemHistory({
        ...this.items[index],
        hasAdd: true,
        date: moment().format()
      })
      this.deleteItem(index)
    },
    moveToLeft (index) {
      this.addItem(this.rightItems[index])
      this.setOneItemHistory({
        ...this.rightItems[index],
        hasAdd: false,
        date: moment().format()
      })
      this.deleteRightItem(index)
    }
  }
}
</script>
<style lang="scss">
  .flex {
    display: flex;
  }
  .items-center {
    align-items: center
  }
  .justify-around {
    justify-content: space-around;
  }
  .justify-start {
    justify-content: flex-start;
  }
  .search {
    width: 100%;
  }
  .block {
    flex-direction: column;
    width: 47%;
  }
  .list {
    height: calc(100vh - 116px);
    overflow: auto;
  }
  .action {
    padding-right: 10px;
    cursor: pointer;
    font-size: 20px;
  }
</style>
