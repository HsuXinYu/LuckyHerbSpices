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
            <span>購買商品明細</span>
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
          <thead>
            <tr>
              <th width="100">項次</th>
              <th width="100">類別</th>
              <th width="100">名稱</th>
              <th width="100" class="text-center">單價</th>
              <th width="100" class="text-center">數量</th>
              <th width="100" class="text-center">金額</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product">
              <td>{{ product.product.num }}</td>
              <td>{{ product.product.category }}</td>
              <td>{{ product.product.title }}</td>
              <td class="text-end">{{ product.product.price }}</td>
              <td class="text-center">{{ product.qty }}</td>
              <td class="text-end">{{ product.total }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-start">總金額</td>
              <td colspan="3" class="text-end">
                {{ order.total }}
              </td>
            </tr>
          </tbody>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['products', 'order'],
  data() {
    return {
      modal: '',
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
