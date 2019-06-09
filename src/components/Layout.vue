<template>
  <div>
    <div class="row">
      <div :class="sidebar === true ? 'col-sm-8' : 'col-sm-12'">
        <slot name="content"></slot>
      </div>
      <div class="col-sm-4" v-if="sidebar === true">
        <Widget :className="'sidebar'" :type="'sidebar'" />
      </div>
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
