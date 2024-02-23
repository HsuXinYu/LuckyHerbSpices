<template>
  <h1>這是後台頁面</h1>
  <AsidebarComponent></AsidebarComponent>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios';
import AsidebarComponent from '@/components/AsidebarComponent.vue';
import swal from 'sweetalert';

export default {
  components: {
    AsidebarComponent,
  },
  methods: {
    checkAdmin() {
      // 取得token並檢查用戶資料是否正確;
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('hexToken='))
        ?.split('=')[1];
      // console.log(document.cookie, token);
      axios.defaults.headers.common.Authorization = token;

      if (token) {
        const url = `${import.meta.env.VITE_APP_API_URL}/api/user/check`;

        axios
          .post(url)
          .then(() => {
            // console.log(res.data);
            this.$router.push('/admin/my-products');
          })
          .catch((err) => {
            // console.dir(err);
            swal('', err.response.data.message, 'warning', { timer: 2000 });
            this.$router.push('/login');
          });
      } else {
        swal('', '請先登入', 'warning', { timer: 2000 });
        this.$router.push('/login');
      }
    },
    // signout() {
    //   document.cookie = 'hexToken=;expires=;';
    //   swal('', '您已登出', 'success', { timer: 2000 });
    //   this.$router.push('/login');
    // },
  },
  mounted() {
    this.checkAdmin();
  },
};
</script>
