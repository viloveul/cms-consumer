<template>
  <div :class="containerClasses">
    <div class="navmenu-wrapper" v-if="menus.length > 0">
      <Menu
        :items="menus"
        :class="'navmenu'"
        :key="menuKey"
        v-on:open-menu="menuOpened = true"
        v-on:close-menu="menuOpened = false"
      >
      </Menu>
      <div class="navmenu-shadow" v-if="menuOpened === true" v-on:click="closeMenu"></div>
    </div>
    <div class="alert alert-danger" v-for="(error, index) in errors" :key="index">
      {{ error }}
      <span class="close" v-on:click="handleDeleteError(index)">&times;</span>
    </div>
    <transition name="fade">
      <router-view :key="$route.fullPath"></router-view>
    </transition>
    <Profile />
  </div>
</template>

<script type="text/javascript">

import Profile from '@/components/Profile'
import Menu from '@/components/Menu'

export default {
  components: {
    Profile,
    Menu
  },
  async mounted () {
    let defaults = [
      {
        label: 'Home',
        url: '/'
      },
      {
        label: 'Blog',
        url: '/blog'
      }
    ]
    this.menus = await this.$store.dispatch('fetchOption', {name: 'menu-navmenu'}) || defaults
    await this.$store.dispatch('fetchOption', {name: 'brand'})
    await this.$store.dispatch('fetchOption', {name: 'description'})
    await this.$store.dispatch('fetchWidget', {type: 'sidebar'})
    await this.$store.dispatch('fetchOption', {name: 'contents'})
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
    },
    closeMenu () {
      this.menuKey = 'navmenu' + Math.random()
      this.menuOpened = false
    }
  },
  data () {
    return {
      menus: [],
      menuKey: 'navmenu',
      menuOpened: false
    }
  }
}

</script>
