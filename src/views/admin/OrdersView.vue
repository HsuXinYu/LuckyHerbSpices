<template>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">訂單編號</th>
        <th>訂單狀態</th>
        <th>訂單金額</th>
        <th>購買人姓名</th>
        <th>購買人地址</th>
        <th>購買人電話</th>
        <th>購買人信箱</th>
        <th>購買詳情</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.id }}</td>
        <td>
          <span class="text-success" v-if="order.is_paid">已付款</span>
          <span class="text-danger" v-else>尚未付款</span>
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
            查看
          </button>
        </td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-primary btn-sm">
              編輯
            </button>
            <button
              id="showDelModalBtn"
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click.prevent="showModal('del', order)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <OrderModal ref="ordermodal"></OrderModal>
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
      orders: [],
      event: '',
      order: {},
      products: {
        product: {},
        qty: 0,
        total: 0,
        final_total: 0,
      },
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
          loader.hide();
        })
        .catch(() => {
          swal('', '伺服器無法連線', 'warning', { timer: 2000 });
        });
    },
    showModal(event, order) {
      this.event = event;

      if (event === 'check') {
        this.$refs.ordermodal.openModal();
      } else if (event === 'del') {
        this.order = order;
        this.$refs.delmodal.openModal();
      }
    },
  },
  mounted() {
    // 取得token並檢查用戶資料是否正確;
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hexToken='))
      ?.split('=')[1];
    // console.log(document.cookie, token);
    axios.defaults.headers.common.Authorization = token;

    // 取得所有訂單
    this.getOrder();
  },
};
</script>
