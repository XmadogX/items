<template>
  <div>
    <div class="flex items-center" style="text-align: left;">
      <span @click="visibleItems=!visibleItems" style="cursor:pointer" class="material-icons">
        {{visibleItems?'expand_more':'chevron_left'}}
      </span>
      {{item.name}}
    </div>
    <ul v-if="visibleItems">
      <li v-for="(list, index) in item.items" :key="index">
        {{list.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      visibleItems: false
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
  }
}
</script>
