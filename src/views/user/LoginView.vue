<template>
  <div class="row justify-content-center">
    <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
    <div class="col-8">
      <form id="form" class="form-signin">
        <div class="form-floating mb-3">
          <input
            type="email"
            id="username"
            class="form-control"
            placeholder="name@example.com"
            v-model="username"
            required
            autofocus
          />
          <label for="username">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
            placeholder="Password"
            required
          />
          <label for="password">Password</label>
        </div>
        <button
          type="button"
          id="login"
          class="btn btn-lg btn-primary w-100 mt-3"
          @click="login"
        >
          登入
        </button>
      </form>
    </div>
  </div>
  <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      // console.log(this.username, this.password);
      const user = { username: this.username, password: this.password };

      const url = `${import.meta.env.VITE_APP_API_URL}/admin/signin`;

      axios
        .post(url, user)
        .then((res) => {
          // console.log(res);
          const { token, expired } = res.data;
          // console.log(token, expired);
          document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
          this.$router.push('admin/my-products');
        })
        .catch(() => {
          // console.dir(err);
          // alert('登入失敗');
        });
    },
  },
};
</script>
