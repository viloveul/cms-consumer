<template>
  <ul v-if="items.length > 0">
    <li v-for="(item, index) in items" :key="'menu-item-lvl' + lvl + '-' + index">
      <span
        :class="'carret'"
        v-if="item.children !== undefined && item.children.length !== 0"
        v-on:click.prevent="triggerMenu(index)"
      >
        {{ opened === index && closeAll === false ? '-' : '+' }}
      </span>
      <a href="#" v-on:click.prevent="clickMenu(item.url)">
        {{ item.label }}
      </a>
      <menu-item
        v-if="item.children !== undefined && item.children.length !== 0 && opened === index"
        v-on:menu-collapse="handleCollapse"
        :class="'child-menu' + (opened === index && closeAll === false ? ' open' : '')"
        :items="item.children" :lvl="lvl + 1"
        :closeAll="opened != index"
      />
    </li>
  </ul>
</template>

<script type="text/javascript">

export default {
  name: 'menu-item',
  props: {
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
    }
  },
  updated () {
    if (this.closeAll === true) {
      this.opened = -1
    }
  },
  methods: {
    async handleCollapse () {
      await this.$emit('close-menu')
      await this.$emit('menu-collapse')
      this.opened = -1
    },
    async triggerMenu (index) {
      if (this.opened === index) {
        this.opened = -1
      } else {
        this.opened = index
      }
      if (this.opened === -1) {
        this.$emit('close-menu')
      } else {
        this.$emit('open-menu')
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
