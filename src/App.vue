<template>
  <div id="q-app">
    <transition name="router-anim">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>

<style scoped>
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
</style>>
