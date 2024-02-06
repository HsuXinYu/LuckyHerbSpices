<template>
  <div>
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
  </div>
</template>

<script>
import cartStore from '@/stores/cartStore';
import { mapActions, mapState } from 'pinia';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(cartStore, ['cartList', 'total', 'final_total']),
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'removeFromCart', 'updateCart']),
  },
  mounted() {
    this.getCart();
  },
};
</script>
