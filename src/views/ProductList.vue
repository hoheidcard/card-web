<template>
  <section class="cards-list-page">
    <div class="container">
      <div class="table-card card">
        <div class="table-header">
          <div class="left">
            <div class="title-row">
              <div class="icon">
                <icon-help></icon-help>
              </div>
              <div class="titles">
                <div class="sub-title">Product : List</div>
                <h5 class="main-title">Product List</h5>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="searchbar">
              <input
                type="text"
                v-model="formVar.keyword"
                placeholder="Search here"
              />
              <div class="icon">
                <icon-search></icon-search>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="cards-wrapper">
            <div class="cards-section">
              <div class="cards-list">
                <div
                  class="card"
                  v-for="(item, index) in storeVar.data"
                  :key="index"
                >
                  <div class="img">
                    <img :src="item.productImage[0].file" alt="" />
                  </div>
                  <div class="info">
                    <h5 class="title">{{ item.title }}</h5>
                    <div class="price">
                      <div class="current-price">₹{{ item.finalPrice }}</div>
                      <div class="actual-price">₹{{ item.price }}</div>
                      <div class="off">{{ item.discount }}% Off</div>
                    </div>
                    <router-link
                      :to="{
                        path: '/crm/product-detail',
                        query: { id: item.id },
                      }"
                      class="btn white-btn w-100"
                    >
                      View Detail
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-body p-16">
          <div class="table-outer"></div>
          <div class="table-no-data" v-if="storeVar.data?.length <= 0">
            <div>No records Found!</div>
          </div>
          <div class="table-footer" v-if="storeVar.data?.length > 0">
            <Pagination
              :currentPage="formVar.currentPage"
              :totalItem="storeVar.total"
              :itemsPerPage="formVar.limit"
              @update:currentPage="pageChange($event)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeMount, reactive, watch } from "vue";
import { useStore } from "vuex";

/* Constants */
const store = useStore();
const storeVar = computed(() => store.state.IdCardStock);

const formVar = reactive({
  limit: 24,
  offset: 0,
  keyword: "",
  status: "ACTIVE",
  changeStatus: null,
  currentPage: 1,

  typingTimer: null,
  typingDelay: 500,
});
/* Constants */

/* Lifecycle/Hooks */
onBeforeMount(() => {
  getIdCardStocks();
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
      getIdCardStocks();
    }, formVar.typingDelay);
  }
);
/* Search Function */

/* Functions/Methods */
function getIdCardStocks() {
  store.dispatch("IdCardStock/getIdCardStocksByStatus", {
    limit: formVar.limit,
    offset: formVar.offset,
    keyword: formVar.keyword,
    status: formVar.status,
  });
}
const pageChange = (page) => {
  formVar.currentPage = page;
  formVar.offset = formVar.limit * (page - 1);
  getIdCardStocks();
};
/* Functions/Methods */
/* Validation */
/* Validation */
</script>

<style></style>
