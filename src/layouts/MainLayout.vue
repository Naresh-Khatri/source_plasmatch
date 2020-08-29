<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          Todo List
        </q-toolbar-title>
        <!-- <q-btn class="q-mr-sm" v-if="isLoggedIn" outline rounded label="LogOut" @click="logout"/> -->
        <div class="q-pa-md" v-if="isLoggedIn">
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

              <!-- <div class="column items-center">
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
              </div> -->
            </div>
          </q-btn-dropdown>
        </div>

        <q-btn
          class="q-mr-sm"
          outline
          rounded
          label="Sign Up Patient"
          icon="keyboard_arrow_down"
          @click="signUpPatientOpen = !signUpPatientOpen, signUpDonorOpen = false"
        /><q-btn
          class="q-mr-sm"
          outline
          rounded
          label="Sign in Donor"
          icon="keyboard_arrow_down"
          @click="signUpDonorOpen = !signUpDonorOpen, signUpPatientOpen = false"
        />

        <!-- <q-btn class="q-mr-sm" outline rounded label="sign up" icon='keyboard_arrow_down' @click='signUpOpen = !signUpOpen, signInOpen = false'/> -->
        <transition name="slide">
          <div
            class="q-mr-sm sign-up-panel sign-up-panel-content"
            v-if="signUpPatientOpen"
          >
            <div class="text-h4">
              Sign In Form
            </div>
            <q-input filled label="Email" v-model="email" />
            <q-input
              class="q-mt-xs"
              filled
              type="password"
              label="password"
              v-model="password"
            />
            <q-btn color="primary" label="Sign up Patient!" @click="signIn" />
          </div>
        </transition>
        <transition name="slide">
          <div
            class="q-mr-sm sign-up-panel sign-up-panel-content"
            v-if="signUpDonorOpen"
          >
            <div class="text-h4">
              Sign In Form
            </div>
            <q-input filled label="Email" v-model="email" />
            <q-input
              class="q-mt-xs"
              filled
              type="password"
              label="password"
              v-model="password"
            />
            <q-btn color="primary" label="Sign up Donor!" @click="signIn" />
          </div>
        </transition>
        <!-- <transition  name='slide'>
           <div class='q-mr-sm sign-up-panel sign-up-panel-content' v-if='signUpOpen'>
             <div class='text-h4'>
               Sign Up Form
             </div>
               <q-input filled  label="Email" />
               <q-input class='q-mt-xs' filled  label="name" />
               <q-input class='q-mt-xs' filled  label="password" />
           </div>
           </transition> -->
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->
    <q-page-container id="page-container">
      <div :class="{ 'section-blur': settingsOpen || signUpDonorOpen || signUpPatientOpen }">
        <transition name="router-anim">
        <router-view />
        </transition>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false,
      settingsOpen: false,
      signInOpen: false,
      signUpDonorOpen: false,
      signUpPatientOpen: false,
      isLoggedIn: false,
      editingMode: false,

      email: "",
      password: "",
      name: "",

      userName: "",
      userEmail: ""
    };
  }
};
</script>

<style>
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
