<template>
  <div
    id="productModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ productDetail.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="hideModal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="productDetail.imageUrl" alt="主圖" />
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{
                productDetail.category
              }}</span>
              <p>商品描述：{{ productDetail.description }}</p>
              <p>商品內容：{{ productDetail.content }}</p>
              <!-- <div class="h5">{{ productDetail.price }} 元</div> -->
              <del class="h6">原價 {{ productDetail.origin_price }} 元</del>
              <div class="h5">現在只要 {{ productDetail.price }} 元</div>
              <div>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    v-model="qty"
                  />
                  <button
                    type="button"
                    class="btn btn-primary"
                    @blur.prevent="addToCart(productDetail.id, qty)"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import cartStore from '@/stores/cartStore';
import { mapActions } from 'pinia';

export default {
  props: ['productDetail'],
  data() {
    return {
      modal: '',
      qty: 1,
    };
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.qty = 1;
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
