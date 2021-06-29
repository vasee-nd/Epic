<template>
  <v-app>
    <Snackbar />
     <ModalIdle v-if="isIdle" /> 
    <router-view></router-view>
  </v-app>
</template>

<script>
import Snackbar from "@/components/Snackbar";
import ModalIdle from "@/components/ModalIdle";
import { get } from "lodash";

export default {
  name: "App",

  components: {
    Snackbar,
     ModalIdle,
  },

  computed: {
    isIdle() {
      return this.$store.state.idleVue.isIdle && this.$store.getters.loggedIn
    },
    isAuthRequired() {
      return this.$route.matched.some((route) =>
        get(route, "meta.requiresAuth", false)
      );
    },
  },
};
</script>
