<template>
  <div>
    <!-- 購物車 -->
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th class="text-end">單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cartList">
          <tr v-for="item in cartList" :key="item.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="removeFromCart(item.id)"
              >
                <!-- <i class="fas fa-spinner fa-pulse"></i> -->
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <!-- <div class="text-success">已套用優惠券</div> -->
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    v-model.number="item.qty"
                    @blur="updateCart(item)"
                  />
                  <span class="input-group-text" id="basic-addon2">{{
                    item.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              {{ item.product.price }}
              <!-- <small class="text-success">折扣價：</small> -->
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ total }}</td>
        </tr>
        <tr>
          <!-- <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ }}</td> -->
        </tr>
      </tfoot>
    </table>
    <div class="text-end">
      <button
        type="button"
        class="btn btn-outline-danger"
        @click="removeFromCart('all')"
      >
        清空購物車
      </button>
    </div>
    <!-- 購買人資訊 -->
    <VForm
      class="col-md-6 m-auto"
      v-slot="{ errors }"
      @submit="onSubmit"
      ref="form"
    >
      <!-- {{ errors }} -->
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <VField
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="請輸入 Email"
          rules="email|required"
          :class="{ 'is-invalid': errors['email'] }"
          v-model="user.email"
        ></VField>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <VField
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          placeholder="請輸入姓名"
          rules="required"
          :class="{ 'is-invalid': errors['姓名'] }"
          v-model="user.name"
        ></VField>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <VField
          id="tel"
          name="電話"
          type="tel"
          class="form-control"
          placeholder="請輸入電話"
          :rules="isTel"
          :class="{ 'is-invalid': errors['電話'] }"
          v-model="user.tel"
        ></VField>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <VField
          id="address"
          name="地址"
          type="text"
          class="form-control"
          placeholder="請輸入地址"
          rules="required"
          :class="{ 'is-invalid': errors['地址'] }"
          v-model="user.address"
        ></VField>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="message"
        ></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </VForm>
  </div>
</template>

<script>
import axios from 'axios';
import cartStore from '@/stores/cartStore';
import { mapState, mapActions } from 'pinia';
import swal from 'sweetalert';
import {
  Form as VForm,
  Field as VField,
  ErrorMessage,
  defineRule,
  configure,
} from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

export default {
  data() {
    return {
      user: {
        email: '',
        name: '',
        tel: '',
        address: '',
      },
      message: '',
    };
  },
  components: { VForm, VField, ErrorMessage },
  computed: {
    ...mapState(cartStore, ['cartList', 'total', 'final_total']),
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'removeFromCart', 'updateCart']),
    isTel(value) {
      // eslint-disable-next-line operator-linebreak
      const phoneNumber =
        /(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}|09\d{2}(\d{6}|-\d{3}-\d{3})/;

      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
    onSubmit() {
      if (this.cartList.length === 0) {
        swal('', '購物車內無商品', 'warning');
      } else {
        // console.log(this.user, this.message);
        const order = { user: this.user, message: this.message };
        // console.log(order);
        const url = `${import.meta.env.VITE_APP_API_URL}/api/${
          import.meta.env.VITE_APP_API_PATH
        }/order`;

        axios
          .post(url, { data: order })
          .then((res) => {
            // console.log(res.data);
            this.$refs.form.resetForm();
            swal('', res.data.message, 'success', { timer: 2000 });
            this.getCart();
          })
          .catch(() => {
            // console.dir(err);
          });
      }
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
