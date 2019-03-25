<template>
  <div>
    <form class="form-horizontal" v-on:submit.prevent="handleSubmit">
      <div class="form-group" v-if="notLogin === true">
        <label class="control-label col-md-2">Name</label>
        <div class="col-md-6">
          <input type="text" v-model="name" class="form-control input-sm">
        </div>
      </div>
      <div class="form-group" v-if="notLogin === true">
        <label class="control-label col-md-2">Email</label>
        <div class="col-md-6">
          <input type="text" v-model="email" class="form-control input-sm">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-md-2">Website</label>
        <div class="col-md-6">
          <input type="text" v-model="website" class="form-control input-sm">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-md-2">Message</label>
        <div class="col-md-10">
          <textarea v-model="content" class="form-control input-sm"></textarea>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-10 col-md-offset-2">
          <button type="submit" class="btn btn-sm btn-primary">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script type="text/javascript">

export default {
  props: {
    post_id: {
      type: String,
      required: true
    }
  },
  methods: {
    async handleSubmit () {
      await this.$store.dispatch('resetErrors')
      await this.$store.dispatch('sendComment', {
        post_id: this.post_id,
        name: this.name,
        email: this.email,
        website: this.website,
        content: this.content
      })
      this.content = ''
      this.$emit('sent')
    }
  },
  mounted () {
    this.name = this.me.name
    this.email = this.me.email
  },
  computed: {
    notLogin () {
      return this.me.id === 0
    },
    me () {
      return this.$store.getters.getMe()
    }
  },
  data () {
    return {
      name: '',
      email: '',
      website: '',
      content: ''
    }
  }
}

</script>
