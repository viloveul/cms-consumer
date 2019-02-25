<template>
  <div :class="containerClasses">
    <div class="navmenu-wrapper" v-if="menus.length > 0">
      <Menu :items="menus" :container="'navmenu'" />
    </div>
    <div class="alert alert-danger" v-for="(error, index) in errors" :key="index">
      {{ error }}
      <span class="close" v-on:click="handleDeleteError(index)">&times;</span>
    </div>
    <div class="row" v-if="$route.path !== '/'">
      <div class="col-md-8">
        <transition name="fade">
          <router-view :key="$route.fullPath"></router-view>
        </transition>
      </div>
      <div class="col-md-4">
        <Widget :className="'sidebar'" :type="'sidebar'" />
      </div>
    </div>
    <transition name="fade" v-else>
      <router-view :key="$route.fullPath"></router-view>
    </transition>
    <Profile />
  </div>
</template>

<script type="text/javascript">

import Profile from '@/components/Profile'
import Widget from '@/components/Widget'
import Menu from '@/components/Menu'

export default {
  components: {
    Profile,
    Widget,
    Menu
  },
  async mounted () {
    this.menus = await this.$store.dispatch('fetchOption', {name: 'menu-navmenu'}) || []
    await this.$store.dispatch('fetchWidget', {type: 'sidebar'})
    await this.$store.dispatch('fetchOption', {name: 'contents'})
    await this.$store.dispatch('syncFeatures')
    await this.$store.dispatch('fetchMe')
  },
  computed: {
    containerClasses () {
      return this.$store.getters.getContainerClasses()
    },
    errors () {
      return this.$store.getters.getErrors()
    }
  },
  methods: {
    handleDeleteError (index) {
      this.errors.splice(index, 1)
    }
  },
  data () {
    return {
      menus: []
    }
  }
}

</script>
