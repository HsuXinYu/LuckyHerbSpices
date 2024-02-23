<template>
  <div class="text-end mt-4">
    <button
      id="postProductBtn"
      type="button"
      class="btn btn-primary"
      @click.prevent="showModal('post')"
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
              @click.prevent="showModal('edit', product)"
            >
              編輯
            </button>
            <button
              id="showDelModalBtn"
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click.prevent="showModal('del', product)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <PostProductModal
    ref="postmodal"
    :event="event"
    @get-product="getProduct"
    :product="product"
  ></PostProductModal>
  <DelProductModal ref="delmodal" @get-product="getProduct" :product="product">
  </DelProductModal>
  <PaginationComponent
    :view="view"
    :pagination="pagination"
    @get-product="getProduct"
  ></PaginationComponent>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import PostProductModal from '@/components/PostProductModal.vue';
import DelProductModal from '@/components/DelProductModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  data() {
    return {
      view: 'product',
      products: [],
      event: '',
      product: {},
      pagination: {},
    };
  },
  components: {
    PostProductModal,
    DelProductModal,
    PaginationComponent,
  },
  methods: {
    getProduct(page = 1) {
      const loader = this.$loading.show();
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
          swal('', err.response.data.message, 'warning', { timer: 2000 });
        })
        .finally(() => {
          loader.hide();
        });
    },
    showModal(event, product) {
      this.event = event;

      if (event === 'post') {
        this.product = {};
        this.$refs.postmodal.openModal();
      } else if (event === 'edit') {
        this.product = product;
        this.$refs.postmodal.openModal();
      } else if (event === 'del') {
        this.product = product;
        this.$refs.delmodal.openModal();
      }
    },
  },
  mounted() {
    // 取得所有產品
    this.getProduct();
  },
};
</script>
