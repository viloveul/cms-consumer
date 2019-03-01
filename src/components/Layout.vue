<template>
  <div class="row">
    <div :class="sidebar === true ? 'col-md-8' : 'col-md-12'">
      <slot name="content"></slot>
    </div>
    <div class="col-md-4" v-if="sidebar === true">
      <Widget :className="'sidebar'" :type="'sidebar'" />
    </div>
  </div>
</template>

<script type="text/javascript">

import Widget from '@/components/Widget'

export default {
  props: {
    sidebar: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Widget
  }
}

</script>
