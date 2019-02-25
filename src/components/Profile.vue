<template>
  <div id="profile" v-if="isLogged === true">
    <span class="open-handler" v-on:click="triggerState" v-if="this.opened === false">
      <i class="glyphicon glyphicon-user"></i>
    </span>
    <div id="profile-box" v-if="this.opened === true">
      <img :src="me.picture" class="thumbnail" />
      <h4>{{ me.name }}</h4>
      <ul>
        <li>
          <a :href="getDashboardUrl()">Dashboard</a>
        </li>
        <li>
          <a href="#" v-on:click.prevent="handleLogout">Logout</a>
        </li>
      </ul>
      <span class="close-handler" v-on:click="triggerState">
        <i class="glyphicon glyphicon-remove-sign"></i>
      </span>
    </div>
  </div>
</template>

<script type="text/javascript">

import config from '@/common/config'

export default {
  computed: {
    me () {
      return this.$store.getters.getMe()
    },
    isLogged () {
      return this.me.id !== 0
    }
  },
  methods: {
    ...config,
    async handleLogout () {
      await this.$store.dispatch('clearToken')
    },
    triggerState () {
      this.opened = !this.opened
    }
  },
  data () {
    return {
      opened: false
    }
  }
}

</script>
