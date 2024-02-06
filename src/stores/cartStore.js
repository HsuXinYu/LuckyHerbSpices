import { defineStore } from 'pinia';
import axios from 'axios';

export default defineStore('cartStore', {
  state: () => ({
    cartList: [],
    total: 0,
    final_total: 0,
  }),
  actions: {
    getCart() {
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${
        import.meta.env.VITE_APP_API_PATH
      }/cart`;

      axios
        .get(url)
        .then((res) => {
          // console.log(res.data.data);
          this.cartList = res.data.data.carts;
          this.total = res.data.data.total;
          this.final_total = res.data.data.final_total;
        })
        .catch(() => {});
    },
    addToCart(productId, qty = 1) {
      // console.log(productId, qty);
      const cart = { product_id: productId, qty };
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${
        import.meta.env.VITE_APP_API_PATH
      }/cart`;

      axios
        .post(url, { data: cart })
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          this.getCart();
        })
        .catch(() => {
          // console.dir(err);
        });
    },
    removeFromCart(productId) {
      // console.log(productId);

      if (productId === 'all') {
        const url = `${import.meta.env.VITE_APP_API_URL}/api/${
          import.meta.env.VITE_APP_API_PATH
        }/carts`;

        axios
          .delete(url)
          .then((res) => {
            alert(res.data.message);
            this.getCart();
          })
          .catch(() => {
            // console.dir(err);
          });
      } else {
        const url = `${import.meta.env.VITE_APP_API_URL}/api/${
          import.meta.env.VITE_APP_API_PATH
        }/cart/${productId}`;

        axios
          .delete(url)
          .then((res) => {
            // console.log(res.data);
            alert(res.data.message);
            this.getCart();
          })
          .catch(() => {
            // console.dir(err);
          });
      }
    },
    updateCart(item) {
      // console.log(item);
      const cart = {
        product_id: item.product.id,
        qty: item.qty,
      };
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${
        import.meta.env.VITE_APP_API_PATH
      }/cart/${item.id}`;

      axios
        .put(url, {
          data: cart,
        })
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          this.getCart();
        })
        .catch(() => {
          // console.dir(err);
        });
    },
  },
});
