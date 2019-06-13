<template>
  <div :class="'wrapper'">
    <header class="main-header" v-if="menus.length > 0">
      <div :class="'menu'" :rel="'menu'">
        <div :class="'container'">
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
      </div>
      <div :class="'container'">
        <div :class="'col-sm-6'">
          <h1 :class="'site-title'" :rel="'title'">
            <router-link :to="'/'">{{ options.brand }}</router-link>
          </h1>
          <p :class="'site-description'" :rel="'description'">{{ options.description }}</p>
        </div>
        <div :class="'col-sm-6'">
          <Search :class="'search'" :rel="'search-form'"></Search>
        </div>
      </div>
    </header>
    <div :class="'main-content'">
      <div :class="'container'" v-if="errors.length > 0">
        <div class="alert alert-danger" v-for="(error, index) in errors" :key="index">
          {{ error }}
          <span class="close" v-on:click="handleDeleteError(index)">&times;</span>
        </div>
      </div>
      <transition name="fade">
        <router-view :key="$route.fullPath"></router-view>
      </transition>
    </div>
    <footer :class="'main-footer'">
      <div :class="'container'">
        <div class="credit">
          <p>Powered by <a href="https://www.viloveul.com/" target="_blank"><abbr title="Viloveul">Viloveul.com</abbr></a></p>
        </div>
      </div>
    </footer>
    <Profile></Profile>
  </div>
</template>

<script type="text/javascript">

import Profile from '@/components/Profile'
import Search from '@/components/Search'
import Menu from '@/components/Menu'

export default {
  components: {
    Profile,
    Search,
    Menu
  },
  async mounted () {
    await this.$store.dispatch('loadMenus', {name: 'navmenu'})
    await this.$store.dispatch('loadWidgets', {type: 'sidebar'})
    await this.$store.dispatch('loadOptions')
    await this.$store.dispatch('fetchMe')
  },
  computed: {
    errors () {
      return this.$store.getters.getErrors()
    },
    options () {
      return this.$store.getters.getOptions()
    },
    menus () {
      return this.$store.getters.getMenus()
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
      menuKey: 'navmenu',
      menuOpened: false
    }
  }
}

</script>
