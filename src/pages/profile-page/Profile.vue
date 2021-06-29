<template>
  <v-container id="user-profile" fluid tag="section">
    <!-- -----------TABS------------- -->
    <v-tabs
      v-model="tabs"
      background-color="#ff8080"
      centered
      dark
      icons-and-text
    >
      <v-tab @click="showProfileCard">
        Profile
        <v-icon>mdi-account</v-icon>
      </v-tab>

      <v-tab @click="showPasswordCard">
        Change Password
        <v-icon>mdi-pencil</v-icon>
      </v-tab>
    </v-tabs>

    <!-- --------------------User Profile Card-------------------------- -->
    <v-card justify="center" class="profile_card" v-if="profile">
      <v-card-title class="d-felx justify-center"
        ><b>Update Profile</b></v-card-title
      >
      <v-row justify="center">
        <v-col cols="12" md="8">
          <base-material-card class="our_list">
            <v-form>
              <v-container class="py-0">
                <center>
                  <v-avatar color="#EF515B" size="56"
                    ><v-icon size="30" color="white"
                      >mdi-account-circle</v-icon
                    ></v-avatar
                  >
                </center>
                <center>
                  <v-title
                    class="title text-capitalize"
                    v-if="userRole === 'admin'"
                  >
                    {{ userName }}</v-title
                  >
                </center>

                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field label="Company" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field class="purple-input" label="User Name" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field label="Email Address" class="purple-input" />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field label="First Name" class="purple-input" />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field label="Last Name" class="purple-input" />
                  </v-col>

                  <v-col cols="12" md="7" class="text-right">
                    <v-btn
                      @click="AddProfile()"
                      color="#fff"
                      style="background-color: #ef515b"
                      outlined
                      text
                      >Update</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </base-material-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- ---------------------- Change Password Card  ---------------------- -->
    <v-card
      justify="center"
      class="password_card"
      id="pass_id"
      v-if="changePassword"
    >
      <v-card-title class="d-felx justify-center"
        ><b>Change Password</b></v-card-title
      >
      <v-row justify="center">
        <v-col cols="12" md="8">
          <base-material-card class="our_list">
            <v-form>
              <v-container class="py-0">
                <center>
                  <v-avatar color="#EF515B" size="56"
                    ><v-icon size="30" color="white"
                      >mdi-account-circle</v-icon
                    ></v-avatar
                  >
                </center>
                <center>
                  <v-title
                    class="title text-capitalize"
                    v-if="userRole === 'admin'"
                  >
                    {{ userName }}</v-title
                  >
                </center>

                <v-row>
                  <v-col cols="12" md="4"> </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      class="purple-input"
                      label="New Password "
                      prepend-inner-icon="mdi-pencil"
                    />

                    <v-text-field
                      class="purple-input"
                      label="Confirm Password "
                      prepend-inner-icon="mdi-pencil"
                    />
                  </v-col>

                  <v-col cols="12" md="7" class="text-right">
                    <v-btn
                      @click="changepsw()"
                      color="#fff"
                      style="background-color: #ef515b"
                      outlined
                      text
                      >Submit</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </base-material-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "app-header",
  computed: {
    ...mapGetters(["userRole", "userName"]),
  },
  data() {
    return {
      profile: false,
      changePassword: false,
      drawer: false,
      group: null,
      msg: null,
      options: [{ text: "Profile", method: "profile" }],
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    showProfileCard() {
      this.profile = true;
      this.changePassword = false;
    },
    showPasswordCard() {
      this.changePassword = true;
      this.profile = false;
    },
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          localStorage.clear();
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    routeTo(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style type="text/css">
.deep-purple--text {
  color: #ef515b !important;
  caret-color: #ef515b !important;
}
.cp {
  cursor: pointer !important;
}
.myvform {
  display: none;
}
/* .password_card{
  display: none;
} */
.our_list {
  background-image: linear-gradient(
    -90deg,
    rgb(247, 191, 191),
    rgb(247, 140, 140)
  );
}
</style>
