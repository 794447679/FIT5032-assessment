<script setup>

import MainPage from './components/MainPage.vue'
import LoginPage from './components/LoginPage.vue'
import BHeader from "@/components/Bheader.vue"
</script>

<template>
  <BHeader />

  <div class="main-wrapper">
    <router-view />
  </div>
</template>

<style scoped>
.content-area {
  padding-top: 60px; 
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }


}


</style>
