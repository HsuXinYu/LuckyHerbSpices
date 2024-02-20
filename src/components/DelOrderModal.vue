<template>
  <div
    id="delOrderModal"
    ref="delOrderModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delOrderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delOrderModalLabel" class="modal-title">
            <span>刪除訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除編號
          <strong class="text-danger">{{ order.id }}</strong>
          訂單(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteOrder">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Modal from 'bootstrap/js/dist/modal';
import swal from 'sweetalert';

export default {
  props: ['order'],
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    deleteOrder() {
      // console.log(this.order.id);
      const orderId = this.order.id;
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${
        import.meta.env.VITE_APP_API_PATH
      }/admin/order/${orderId}`;

      axios
        .delete(url)
        .then((res) => {
          // console.log(res.data);
          swal('', res.data.message, 'success', { timer: 2000 });
          this.$emit('get-order');
          this.hideModal();
        })
        .catch(() => {
          //   console.dir(err);
          //   alert(err.data.message);
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.delOrderModal);
  },
};
</script>
