<template>
  <div
    id="postCouponModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="postCouponModal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>{{ event === 'post' ? '新增優惠券' : '編輯優惠券' }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div>
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="tempCoupon.title"
                />
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="code" class="form-label">代碼</label>
                  <input
                    id="code"
                    type="text"
                    class="form-control"
                    placeholder="請輸入代碼"
                    v-model="tempCoupon.code"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="percent" class="form-label">折扣</label>
                  <input
                    id="percent"
                    type="number"
                    min="50"
                    max="95"
                    class="form-control"
                    placeholder="請選擇折扣率 50~95"
                    onkeypress="return false;"
                    v-model.number="tempCoupon.percent"
                  />
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="due_date" class="form-label">到期日</label>
                  <input
                    id="due_date"
                    type="date"
                    class="form-control"
                    min="2024-01-01"
                    max="2050-12-31"
                    v-model="tempCoupon.due_date"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <div class="form-check mt-5">
                    <input
                      id="is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempCoupon.is_enabled"
                      checked
                    />
                    <label for="is_enabled" class="form-check-label"
                      >是否啟用</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="processEvent"
          >
            確認
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
  props: ['event', 'coupon'],
  data() {
    return {
      tempCoupon: {},
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    processEvent() {
      if (this.event === 'post') {
        this.postCoupon();
      } else if (this.event === 'edit') {
        this.editCoupon();
      }
    },
    postCoupon() {
      const coupon = { ...this.tempCoupon };
      coupon.due_date = Date.parse(coupon.due_date);
      // console.log(this.tempCoupon, coupon);
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${
        import.meta.env.VITE_APP_API_PATH
      }/admin/coupon`;

      axios
        .post(url, { data: coupon })
        .then((res) => {
          // console.log(res.data);
          swal('', res.data.message, 'success', { timer: 2000 });
          // 觸發父元件方法
          this.$emit('get-coupon');
          this.hideModal();
        })
        .catch(() => {
          // console.dir(err);
        });
    },
    editCoupon() {
      const couponId = this.tempCoupon.id;
      const coupon = { ...this.tempCoupon };
      coupon.due_date = Date.parse(coupon.due_date);
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${
        import.meta.env.VITE_APP_API_PATH
      }/admin/coupon/${couponId}`;

      axios
        .put(url, {
          data: coupon,
        })
        .then((res) => {
          // console.log(res.data);
          swal('', res.data.message, 'success', { timer: 2000 });
          // 觸發父元件方法
          this.$emit('get-coupon');
          this.hideModal();
        })
        .catch(() => {
          // console.dir(err);
        });
    },
  },
  watch: {
    coupon(newCoupon) {
      this.tempCoupon = { ...newCoupon };
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.postCouponModal);
  },
};
</script>
