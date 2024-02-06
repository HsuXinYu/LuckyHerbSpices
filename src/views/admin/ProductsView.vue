<template>
  <div class="text-end mt-4">
    <button
      id="postProductBtn"
      type="button"
      class="btn btn-primary"
      @click="showModal('post')"
    >
      建立新的產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th>產品主圖</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td>
          <img style="width: 200px" :src="product.imageUrl" alt="主圖" />
        </td>
        <td class="text-end">{{ product.origin_price }}</td>
        <td class="text-end">{{ product.price }}</td>
        <td>
          <span class="text-success" v-if="product.is_enabled">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="showModal('edit', product)"
            >
              編輯
            </button>
            <button
              id="showDelModalBtn"
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="showModal('del', product)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pagination: {},
      products: [],
    };
  },
  methods: {
    getProduct(page = 1) {
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${
        import.meta.env.VITE_APP_API_PATH
      }/admin/products/?page=${page}`;

      axios
        .get(url)
        .then((res) => {
          // console.log(res.data);
          this.pagination = res.data.pagination;
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    // 取得所有產品
    this.getProduct();

    // 建立modal實體
    // postModal = new bootstrap.Modal('#productModal');
    // delModal = new bootstrap.Modal('#delProductModal');
  },
};
</script>
