<template>
  <section class="cart-detail">
    <div class="container">
      <div class="table-card card">
        <div class="table-header">
          <div class="left">
            <div class="title-row">
              <div class="icon">
                <icon-help></icon-help>
              </div>
              <div class="titles">
                <div class="sub-title">Shopping Cart: List</div>
                <h5 class="main-title">Shopping Cart</h5>
              </div>
            </div>
          </div>
        </div>
        <div
          class="shopping-cart"
          v-if="storeVar.result && storeVar.result.length > 0"
        >
          <div class="column-labels">
            <label class="product-image">Image</label>
            <label class="product-details">Product</label>
            <label class="product-price">&nbsp;</label>
            <label class="product-quantity">Quantity</label>
            <label class="product-removal">Remove</label>
            <label class="product-line-price">&nbsp;</label>
          </div>

          <div
            class="product"
            v-for="(item, index) in storeVar.result"
            :key="index"
          >
            <div class="product-image">
              <img :src="item.idCardsStock.productImage[0]?.file" />
            </div>
            <div class="product-details">
              <div class="product-title">
                <b>{{ item.idCardsStock.title }}</b>
              </div>
              <p class="product-description">
                <span v-for="(row, i) in item.cartProductVariant" :key="i">
                  <div>
                    {{ row.productVariant.type }}: {{ row.productVariant.name }}
                  </div>
                </span>
              </p>
            </div>
            <div class="product-price">
              &nbsp;
              <!-- {{ item.idCardsStock.price }}
              <span style="color: darkolivegreen;">({{ item.idCardsStock.discount }}% off)</span> -->
            </div>
            <div class="product-quantity">
              <div class="option-btns">
                <div
                  class="icon tooltip-wrapper"
                  @click.prevent="increase(item.id, item.quantity)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus-square"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
                    />
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                    />
                  </svg>
                  <div class="tooltip">INCREASE</div>
                </div>
              </div>
              &nbsp; &nbsp; &nbsp;
              <div>
                <b> {{ item.quantity }} </b>
              </div>
              &nbsp; &nbsp; &nbsp;
              <div class="option-btns">
                <div
                  class="icon tooltip-wrapper"
                  @click.prevent="decrease(item.id, item.quantity)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-dash-square"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
                    />
                    <path
                      d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"
                    />
                  </svg>
                  <div class="tooltip">DECREASE</div>
                </div>
              </div>
            </div>
            <div class="product-removal">
              <div class="option-btns">
                <div
                  class="icon tooltip-wrapper"
                  @click.prevent="remove(item.id)"
                >
                  <icon-delete></icon-delete>
                  <div class="tooltip">REMOVE</div>
                </div>
              </div>
            </div>
            <!-- <div class="product-line-price">
              {{ item.idCardsStock.finalPrice * item.quantity }}
            </div> -->
          </div>

          <!-- <div class="totals">
            <div class="totals-item">
              <label>Subtotal</label>
              <div class="totals-value" id="cart-subtotal">
                Rs. {{ storeVar.amount }}
              </div>
            </div>
            <div class="totals-item">
              <label>Discount</label>
              <div class="totals-value" id="cart-subtotal">
                Rs. {{ storeVar.discount }}
              </div>
            </div>
            <div class="totals-item">
              <label>CGST</label>
              <div class="totals-value">
                {{ storeVar.result[0]?.cart.cgst }}%
              </div>
            </div>
            <div class="totals-item">
              <label>IGST</label>
              <div class="totals-value">
                {{ storeVar.result[0]?.cart.igst }}%
              </div>
            </div>
            <div class="totals-item">
              <label>SGST</label>
              <div class="totals-value">
                {{ storeVar.result[0]?.cart.sgst }}%
              </div>
            </div>
            <div class="totals-item">
              <label>Shipping</label>
              <div class="totals-value" id="cart-shipping">
                Rs. {{ storeVar.shippingCost }}
              </div>
            </div>
            <div class="totals-item totals-item-total">
              <label>Grand Total</label>
              <div class="totals-value" id="cart-total">
                Rs. {{ storeVar.totalAmount }}
              </div>
            </div>
          </div> -->

          <div class="btns">
            <div class="btn primary-btn" @click.prevent="placeORder">
              Place Order
            </div>
          </div>
        </div>
        <div v-else class="table-no-data">Empty Cart</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import moment from "moment";
import { computed, onBeforeMount, reactive, watch } from "vue";
import { useStore } from "vuex";
/* Constants */
const store = useStore();
const storeVar = computed(() => store.state.Carts);

const formVar = reactive({
  submit: false,

  detailsModal: false,
  orderDetails: null,

  sgst: 0,
  cgst: 0,
  igst: 0,
  shipping: 0,
});
/* Constants */

/* Lifecycle/Hooks */
onBeforeMount(() => {
  getOrders();
});
/* Lifecycle/Hooks */

/* Search Function */
watch(
  () => formVar.keyword,
  () => {
    clearTimeout(formVar.typingTimer);
    // Start a new timer
    formVar.typingTimer = setTimeout(() => {
      formVar.limit = 10;
      formVar.offset = 0;
      formVar.currentPage = 1;
      getOrders();
    }, formVar.typingDelay);
  }
);
/* Search Function */

/* Functions/Methods */
function getOrders() {
  store.dispatch("Carts/getCartList", {
    settingId: localStorage.getItem("settingId"),
  });
}

function increase(id) {
  store.dispatch("Carts/increase", {
    id,
  });
}
function remove(id) {
  store.dispatch("Carts/removeCart", {
    id,
  });
}

function decrease(id, qty) {
  console.log(qty);
  if (qty >= 2) {
    store.dispatch("Carts/decrease", {
      id,
    });
  }
}

function placeORder() {
  store.dispatch("Carts/placeOrder", {
    settingId: localStorage.getItem("settingId"),
    accountId: localStorage.getItem("orgAccountId"),
    mode: "COD",
  });
}

function getDate(date) {
  if (date) {
    return moment(date).format("MMM Do YYYY");
  }
  return "-";
}
/* Functions/Methods */
/* Validation */
function isNumber(e) {
  let char = String.fromCharCode(e.keyCode);
  // Allow numbers (0-9), the backspace key (keyCode 8), tab key (keyCode 9), number pad keys (keyCode 96-105),
  // left arrow (keyCode 37), and right arrow (keyCode 39)
  if (
    /^[0-9]+$/.test(char) ||
    e.keyCode === 8 ||
    e.keyCode === 9 ||
    e.keyCode === 37 ||
    e.keyCode === 39 ||
    (e.keyCode >= 96 && e.keyCode <= 105)
  ) {
    return true;
  } else {
    e.preventDefault();
  }
}
</script>

<style lang="scss"></style>
