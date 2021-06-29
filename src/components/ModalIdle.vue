<template>
  <v-dialog v-model="dialog" max-width="550">
    <v-card>
      <v-card-title class="headline">
        You have left this browser Idle for 5 minutes.
      </v-card-title>
      <hr />
      <v-card-text>
        {{ time / 1000 }} seconds left before logging out
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
 
<script>
export default {
  data() {
    return {
      dialog: true,
      time: 90 * 1000,
    };
  },

  created() {
    const timerId = setInterval(() => {
      this.time -= 1000;

      if (!this.$store.state.idleVue.isIdle) clearInterval(timerId);

      if (this.time < 1500) {
        this.logout();
        clearInterval(timerId);
      }
    }, 1000);
  },

  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          localStorage.clear();
          this.dialog = false;
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>