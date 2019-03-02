<template>
  <ul :class="container" v-if="items.length > 0">
    <li v-for="(item, index) in items" :key="'menu-item-lvl' + lvl + '-' + index">
      <span
        :class="'carret'"
        v-if="item.children !== undefined && item.children.length !== 0"
        v-on:click.prevent="triggerMenu(index)">
        {{ opened === index && closeAll === false ? '-' : '+' }}
      </span>
      <a href="#" v-on:click.prevent="clickMenu(item.url)">
        {{ item.label }}
      </a>
      <menu-item
        v-if="item.children !== undefined && item.children.length !== 0 && (opened === index || forceShow === true)"
        v-on:menu-click="handleCollapse"
        :container="container + '-child' + (opened === index && closeAll === false ? ' open' : '')"
        :items="item.children" :lvl="lvl + 1"
        :closeAll="opened != index"
        :forceShow="forceShow"
      />
    </li>
  </ul>
</template>

<script type="text/javascript">

export default {
  name: 'menu-item',
  props: {
    container: {
      type: String,
      default: 'navmenu'
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    lvl: {
      type: Number,
      default: 1
    },
    closeAll: {
      type: Boolean,
      default: false
    },
    forceShow: {
      type: Boolean,
      default: false
    }
  },
  updated () {
    if (this.closeAll === true) {
      this.opened = -1
    }
  },
  methods: {
    async handleCollapse () {
      await this.$emit('menu-click')
      this.opened = -1
    },
    async triggerMenu (index) {
      if (this.opened === index) {
        this.opened = -1
      } else {
        this.opened = index
      }
    },
    async clickMenu (url) {
      this.handleCollapse()
      if (url.search(/^https?:\/\//) !== -1) {
        window.location.href = url
      } else {
        await this.$router.push(url)
      }
    }
  },
  data () {
    return {
      opened: -1
    }
  }
}

</script>
