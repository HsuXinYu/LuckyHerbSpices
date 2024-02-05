<template>
  <h1>這是前台頁面</h1>
  <NavbarComponent></NavbarComponent>
  <RouterView></RouterView>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';

export default {
  components: {
    NavbarComponent,
  },
};
</script>
