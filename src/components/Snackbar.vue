<template>
  <v-snackbar v-model="show" :color="color" timeout="3000">
    {{message}}
    <v-btn text color="accent" @click.native="show = false"></v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      color:'',
      message: ''
    }
  },
 created: function () {
    this.$store.watch(state => state.snackbar.message, () => {
      const msg = this.$store.state.snackbar.message
      if (msg !== '') {
        this.show = true
        this.message = this.$store.state.snackbar.message
        this.color = this.$store.state.snackbar.color
        this.$store.commit('snackbar/setSnack', '')
      }
    })
  }
}
</script>