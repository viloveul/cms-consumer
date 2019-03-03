<template>
  <aside :class="className" v-if="items.length > 0">
    <component
      v-for="(useItem, useIndex) in items"
      v-if="getComponent(useItem) !== false"
      :key="'item-used-' + useIndex"
      :is="getComponent(useItem)"
      :results="useItem.results || []"
      :options="useItem.options || {}"
    />
  </aside>
</template>

<script type="text/javascript">

import Archive from '@/widgets/Archive'
import Menu from '@/widgets/Menu'
import RecentPost from '@/widgets/RecentPost'
import RecentComment from '@/widgets/RecentComment'
import SearchForm from '@/widgets/SearchForm'

export default {
  components: {
    WidgetArchive: Archive,
    WidgetMenu: Menu,
    WidgetSearchForm: SearchForm,
    WidgetRecentPost: RecentPost,
    WidgetRecentComment: RecentComment
  },
  props: {
    type: {
      type: String,
      default: 'sidebar'
    },
    className: {
      type: String,
      default: 'sidebar'
    }
  },
  methods: {
    getComponent (item) {
      let name = 'Widget' + item.name
      if (name in this.$options.components) {
        return name
      } else {
        return false
      }
    }
  },
  computed: {
    items () {
      return this.$store.getters.getWidget(this.type)
    }
  }
}

</script>
