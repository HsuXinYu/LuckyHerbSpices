import{L as i}from"./index-I6cWyZY8.js";import{a as e,s as c}from"./sweetalert.min-cx6vSVxL.js";const u=i("cartStore",{state:()=>({cartList:[],total:0,final_total:0,isLoading:!1}),actions:{getCart(){e.get("https://vue3-course-api.hexschool.io/v2/api/lucky_herb_spices/cart").then(t=>{this.cartList=t.data.data.carts,this.total=t.data.data.total,this.final_total=t.data.data.final_total}).catch(()=>{})},addToCart(a,t=1){this.isLoading=!0;const s={product_id:a,qty:t};e.post("https://vue3-course-api.hexschool.io/v2/api/lucky_herb_spices/cart",{data:s}).then(r=>{this.isLoading=!1,c("",r.data.message,"success",{timer:2e3}),this.getCart()}).catch(()=>{})},removeFromCart(a){if(a==="all")e.delete("https://vue3-course-api.hexschool.io/v2/api/lucky_herb_spices/carts").then(s=>{c("",s.data.message,"success",{timer:2e3}),this.getCart()}).catch(()=>{});else{const t=`https://vue3-course-api.hexschool.io/v2/api/lucky_herb_spices/cart/${a}`;e.delete(t).then(s=>{c("",s.data.message,"success",{timer:2e3}),this.getCart()}).catch(()=>{})}},updateCart(a){const t={product_id:a.product.id,qty:a.qty},s=`https://vue3-course-api.hexschool.io/v2/api/lucky_herb_spices/cart/${a.id}`;e.put(s,{data:t}).then(o=>{c("",o.data.message,"success",{timer:2e3}),this.getCart()}).catch(()=>{})}}});export{u as c};