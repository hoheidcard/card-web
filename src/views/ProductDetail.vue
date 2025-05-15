<template>
  <section class="product-detail" v-if="storeVar.detail">
    <div class="container">
      <div class="card">
        <!-- card left -->
        <div class="product-imgs">
          <div class="img-display">
            <div class="img-showcase">
              <img
                :src="storeVar.detail.productImage[0]?.file"
                alt=""
                id="image"
              />
            </div>
          </div>
          <div class="img-select">
            <div
              class="img-item"
              v-for="(row, i) in storeVar.detail.productImage"
              @click.prevent="setImage(row.file)"
              :key="i"
            >
              <img :src="row.file" alt="" />
            </div>
          </div>
        </div>
        <!-- card right -->
        <div class="product-content">
          <h2 class="product-title">{{ storeVar.detail.title }}</h2>
          <a href="#" class="product-link">{{ storeVar.detail.code }}</a>

          <div class="product-price">
            <p class="last-price">
              Old Price: <span>Rs {{ storeVar.detail.price }}</span>
            </p>
            <p class="new-price">
              New Price:
              <span
                >Rs {{ storeVar.detail.finalPrice }} ({{
                  storeVar.detail.discount
                }}%)</span
              >
            </p>
          </div>

          <div class="product-detail">
            <h2>about this item:</h2>
            <p v-html="storeVar.detail.desc"></p>
            <div v-for="(row, i) in storeVar.detail.productVariant" :key="i">
              <div class="form-item mb-16">
                <div class="title mb-10-i">{{ row.name }}</div>
                <Select
                  v-model="row.modelName"
                  :options="row.list"
                  placeholder="Select "
                ></Select>
              </div>
            </div>
          </div>

          <div class="purchase-info">
            <div class="form-item mb-16">
              <div class="title mb-10-i">Quantity</div>
              <input
                type="number"
                min="1"
                max="10000"
                placeholder="Quantity"
                v-model="formVar.qty"
              />
            </div>
            <button type="button" class="btn" @click.prevent="addToCart">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeMount, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const storeVar = computed(() => store.state.IdCardStock);
const formVar = reactive({
  qty: 1,
});

onBeforeMount(() => {
  if (route.query.id) {
    store.dispatch("IdCardStock/getIdCardStock", { id: route.query.id });
  }
});

const setImage = (img) => {
  const image = document.getElementById("image");
  if (image) {
    image.src = img;
  }
};

const addToCart = () => {
  const productVariant = [];
  console.log(storeVar.value.detail.productVariant);

  storeVar.value.detail.productVariant.forEach((element) => {
    if (element.modelName) {
      const variant = element.list.find(
        (item) => item.name == element.modelName
      );
      if (variant) {
        productVariant.push({
          productVariantId: variant.id,
        });
      }
    }
  });
  if (route.query.id) {
    store.dispatch("Carts/addToCart", {
      settingId: localStorage.getItem("settingId"),
      productId: route.query.id,
      productVariant: productVariant,
      quantity: formVar.qty,
    });
  }
};
</script>

<style></style>
