<template>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>訂單編號</th>
        <th>訂單狀態</th>
        <th>訂單金額</th>
        <th>購買人姓名</th>
        <th>購買人地址</th>
        <th>購買人電話</th>
        <th>購買人信箱</th>
        <th colspan="2">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.num }}{{ order.id }}</td>
        <td>
          <span class="text-success" v-if="order.is_paid">已付款</span>
          <span class="text-danger" v-else>尚未付款</span>
          <button
            type="button"
            class="btn badge bg-primary rounded-pill"
            @click.prevent="editOrder(order)"
          >
            變更狀態
          </button>
        </td>
        <td class="text-end">{{ order.total }}</td>
        <td>{{ order.user.name }}</td>
        <td>{{ order.user.address }}</td>
        <td>{{ order.user.tel }}</td>
        <td>{{ order.user.email }}</td>
        <td>
          <button
            type="button"
            class="btn btn-outline-primary btn-sm"
            @click.prevent="showModal('check', order)"
          >
            查看購買明細
          </button>
        </td>
        <td>
          <button
            id="showDelModalBtn"
            type="button"
            class="btn btn-outline-danger btn-sm"
            @click.prevent="showModal('del', order)"
          >
            刪除該筆訂單
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <OrderModal ref="ordermodal" :order="order" :products="products"></OrderModal>
  <DelOrderModal
    ref="delmodal"
    :order="order"
    @get-order="getOrder"
  ></DelOrderModal>
  <PaginationComponent
    :view="view"
    :pagination="pagination"
    @get-order="getOrder"
  ></PaginationComponent>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import OrderModal from '@/components/OrderModal.vue';
import DelOrderModal from '@/components/DelOrderModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  data() {
    return {
      view: 'order',
      orders: {},
      event: '',
      order: {},
      products: {},
      pagination: {},
    };
  },
  components: {
    OrderModal,
    DelOrderModal,
    PaginationComponent,
  },
  methods: {
    getOrder(page = 1) {
      const loader = this.$loading.show();
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${
        import.meta.env.VITE_APP_API_PATH
      }/admin/orders/?page=${page}`;

      axios
        .get(url)
        .then((res) => {
          // console.log(res.data);
          this.pagination = res.data.pagination;
          this.orders = res.data.orders;
        })
        .catch((err) => {
          swal('', err.response.data.message, 'warning', { timer: 2000 });
        })
        .finally(() => {
          loader.hide();
        });
    },
    editOrder(order) {
      const tmplateOrder = { ...order };
      tmplateOrder.is_paid = !tmplateOrder.is_paid;
      const orderId = order.id;
      // console.log(tmplateOrder);

      const url = `${import.meta.env.VITE_APP_API_URL}/api/${
        import.meta.env.VITE_APP_API_PATH
      }/admin/order/${orderId}`;

      axios
        .put(url, { data: tmplateOrder })
        .then((res) => {
          // console.log(res.data);
          swal('', res.data.message, 'success', { timer: 2000 });
          this.getOrder();
        })
        .catch(() => {
          swal('', '伺服器無法連線', 'warning', { timer: 2000 });
        });
    },
    showModal(event, order) {
      // console.log(order);
      this.event = event;
      this.order = order;

      if (event === 'check') {
        this.products = Object.values(order.products);
        this.$refs.ordermodal.openModal();
      } else if (event === 'del') {
        this.$refs.delmodal.openModal();
      }
    },
  },
  mounted() {
    // 取得所有訂單
    this.getOrder();
  },
};
</script>
