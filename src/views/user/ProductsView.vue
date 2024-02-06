<template>
  <!-- 產品列表 -->
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td style="width: 200px">
          <img
            style="
              height: 100px;
              background-size: cover;
              background-position: center;
            "
            :src="product.imageUrl"
            alt="主圖"
          />
        </td>
        <td>{{ product.title }}</td>
        <td>
          <!-- <div class="h5">{{ product.price }} 元</div> -->
          <del class="h6">原價 {{ product.origin_price }} 元</del>
          <div class="h5">現在只要 {{ product.price }} 元</div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click.prevent="getProductDetail(product.id)"
            >
              <!-- <i class="fas fa-spinner fa-pulse"></i> -->
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click.prevent="addToCart(product.id)"
            >
              <!-- <i class="fas fa-spinner fa-pulse"></i> -->
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal
    ref="modal"
    :productDetail="productDetail"
    v-model:value="getProductDetail"
  ></ProductModal>
</template>

<script>
import axios from 'axios';
import ProductModal from '@/components/ProductModal.vue';
import cartStore from '@/stores/cartStore';
import { mapActions } from 'pinia';

export default {
  data() {
    return {
      pagination: {},
      products: [],
      productDetail: {},
    };
  },
  components: {
    ProductModal,
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'addToCart']),
    getProduct() {
      // console.log(import.meta.env);
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${
        import.meta.env.VITE_APP_API_PATH
      }/products`;

      axios
        .get(url)
        .then((res) => {
          // console.log(res.data);
          this.pagination = res.data.pagination;
          this.products = res.data.products;
        })
        .catch(() => {
          // console.dir(err);
        });
    },
    getProductDetail(productId) {
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${
        import.meta.env.VITE_APP_API_PATH
      }/product/${productId}`;

      axios
        .get(url)
        .then((res) => {
          // console.log(res.data);
          this.productDetail = res.data.product;
          this.qty = 1;
          this.$refs.modal.openModal();
        })
        .catch(() => {
          // console.dir(err);
        });
    },
  },
  mounted() {
    // this.isLoading = true;
    this.getProduct();
  },
};
</script>

<style scoped></style>
