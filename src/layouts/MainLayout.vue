<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-gra-02">
      <q-toolbar>
        <q-toolbar-title>
          <router-link class="router-text" to="/">
            <div class="logo">🩸Plasmatch</div>
          </router-link>
        </q-toolbar-title>
        <!-- <q-btn class="q-mr-sm" v-if="isLoggedIn" outline rounded label="LogOut" @click="logout"/> -->
        <!-- <div class="q-pa-md" v-if="isLoggedIn">
          <q-btn-dropdown
            color="primary"
            label="Account Settings"
            @click="settingsOpen = !settingsOpen"
          >
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="row">
                  <div class="text-h6 q-mb-md">Settings</div>
                  <q-btn
                    class="q-ma-xs"
                    v-if="!editingMode"
                    style="width:35px; height:35px"
                    :icon="editingMode ? 'check' : 'edit'"
                    :color="editingMode ? 'green' : 'blue'"
                    @click="editingMode = !editingMode"
                  ></q-btn>
                  <q-btn
                    v-if="editingMode"
                    class="q-ma-xs"
                    style="width:35px; height:35px"
                    icon="check"
                    color="green"
                    @click="(editingMode = !editingMode), updateProfile()"
                  ></q-btn>
                  <q-btn
                    v-if="editingMode"
                    class="q-ma-xs"
                    style="width:35px; height:35px"
                    icon="close"
                    color="red"
                    @click="editingMode = !editingMode"
                  ></q-btn>
                </div>

                <q-toggle label="respecc wahmen?" v-model="respect" />
                <q-toggle label="big brain?" v-model="brain" />
                <div class="q-mt-md q-mb-xs">
                  <input
                    type="text"
                    :value="userEmail"
                    style="font-size:14px; background:#eee; outline:none; border: none; padding: 5px; border-radius:10px"
                    :disabled="editingMode ? false : true"
                  />
                </div>
              </div>

              <q-separator vertical inset class="q-mx-lg" />

               <div class="column items-center">
                <div class="text-subtitle1 q-mt-md q-mb-xs">
                   <input
                    type="text"
                    :value="userName"
                    style="font-size:14px; background:#eee; outline:none; border: none; padding: 5px; border-radius:10px; text-align:center"
                    :disabled="editingMode? false:true"
                  />
                </div>

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  v-close-popup
                  @click="logout"
                />
              </div>
            </div>
          </q-btn-dropdown>
        </div> -->
        <div v-if="isOnLandingPage">
          <router-link class="router-text" to="/DonorRegistration">
            <q-btn
              class="q-mr-sm"
              outline
              rounded
              label="Sign in Donor"
              icon="keyboard_arrow_down"
            />
          </router-link>
          <router-link class="router-text" to="/PatientRegistration">
            <q-btn
              class="q-mr-sm"
              outline
              rounded
              label="Sign Up Patient"
              icon="keyboard_arrow_down"
            />
          </router-link>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container
      id="page-container"
      class="bg-gra-02"
      style="height:100%; min-height:100vh"
    >
      <div
        :class="{
          'section-blur': settingsOpen
        }"
      >
        <transition name="router-anim">
          <router-view />
        </transition>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import router from "src/router";
export default {
  name: "MainLayout",
  data() {
    return {
      settingsOpen: false,

      leftDrawerOpen: false,
      isOnLandingPage: true,

      email: "",
      password: "",
      name: "",

      userName: "",
      userEmail: ""
    };
  },
  updated() {
    console.log(this.$router.currentRoute.name)
    if (this.$router.currentRoute.name === "home")
      this.isOnLandingPage = true
    else
      this.isOnLandingPage = false
  },
  mounted() {
    console.log(this.$router.currentRoute.name)

    if (this.$router.currentRoute.name=== "home")
      this.isOnLandingPage = true
    else
      this.isOnLandingPage = false
  },
  methods: {
    patientSignUp() {
      this.$router.push("PatientRegistration");
    },
    donorSignUp() {
      this.$router.push("DonorRegistration");
    }
  }
};
</script>

<style>
.bg-gra-02 {
  background: -webkit-linear-gradient(left, #e0eff5 0%, #add8e6 100%);
}
.router-anim-enter-active {
  transition: all 0.3s ease-in-out;
}
.router-anim-leave-active {
  transform: scale(1);
}
.router-anim-enter,
.router-anim-leave-to {
  /* transform: translateX(100px); */
  transform: scale(1.1);
  opacity: 0;
}
.logo {
  font-family: "Lobster";
  color: red;
  font-size: 50px;
  transition: 0.1s;
}
.logo:hover {
  font-size: 55px;
  transition: all 0.1s ease-out;
}
.router-text {
  text-decoration: none;
  color: white;
  font-size: 20px;
  transition: 0.1s;
  cursor: pointer;
}
.disabledComponent {
  pointer-events: none;
  opacity: 0.1;
}
.section-blur {
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(4px);
  background-color: rgba(0, 0, 0, 0);
  pointer-events: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: 0.3s;
}

.sign-up-panel {
  border-radius: 20px;
  position: absolute;
  background: white;
  width: 400px;
  z-index: 1;
  right: 0px;
  top: 50px;
}

.sign-up-panel-content {
  padding: 40px;
  color: black;
}

.slide-enter-active {
  transition: all 0.3s;
}
.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  z-index: 1;
}
.slide-enter {
  transform: translateY(-50px);
}
.slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
