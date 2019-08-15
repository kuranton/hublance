<template>
  <div id="app">
    <header class="header">
      <router-link
        :to="{name: 'List'}"
        exact
        class="header__logo">
          <img src="/img/logo.svg" alt="">
          <span>{{ logoName }}</span>
      </router-link>
    
      <navbar></navbar>
    </header>
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar";

  export default {
    name: "App",
    components: {
      Navbar,
    },
    data() {
      return {
        logoName: 'Hublance'
      };
    },
  };
</script>

<style lang="scss">
  @import "assets/scss/blocks/header/header";
  @import "assets/scss/blocks/content";
</style>
