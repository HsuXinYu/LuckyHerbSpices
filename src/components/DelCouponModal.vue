<template>
  <div
    id="delCouponModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delCouponModal"
    aria-hidden="true"
    ref="delCouponModal"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delCouponModal" class="modal-title">
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
          是否刪除
          <strong class="text-danger">{{ coupon.title }}</strong>
          優惠券(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteCoupon">
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
  props: ['coupon'],
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    deleteCoupon() {
      console.log(this.coupon.id);
      const couponId = this.coupon.id;
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${
        import.meta.env.VITE_APP_API_PATH
      }/admin/coupon/${couponId}`;
      axios
        .delete(url)
        .then((res) => {
          // console.log(res.data);
          swal('', res.data.message, 'success', { timer: 2000 });
          this.$emit('get-coupon');
          this.hideModal();
        })
        .catch(() => {
          //   console.dir(err);
          //   alert(err.data.message);
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.delCouponModal);
  },
};
</script>
