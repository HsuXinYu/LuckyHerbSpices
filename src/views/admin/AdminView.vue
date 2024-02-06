<template>
  <h1>這是後台頁面</h1>
  <AsidebarComponent></AsidebarComponent>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios';
import AsidebarComponent from '@/components/AsidebarComponent.vue';

export default {
  components: {
    AsidebarComponent,
  },
  methods: {
    checkAdmin() {
      const url = `${import.meta.env.VITE_APP_API_URL}/api/user/check`;

      axios
        .post(url)
        .then(() => {
          // console.log(res.data);
        })
        .catch((err) => {
          // console.dir(err);
          alert(err.response.data.message);
          this.$router.push('/login');
        });
    },
  },
  mounted() {
    // 取得token並檢查用戶資料是否正確;
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hexToken='))
      ?.split('=')[1];
    // console.log(document.cookie, token);
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
};
</script>
