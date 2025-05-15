<template>
  <section class="policy-page privacy-policy">
    <div class="container">
      <div class="bread-crumb">
        <div class="content">
          <h4 class="title">Privacy Policy</h4>
          <div class="path">
            <router-link to="/">Home</router-link>
            >>
            <div class="text">Privacy Policy</div>
          </div>
        </div>
      </div>
      <div class="main-card">
        <!-- <div class="card-header">
          <div class="left">
            <div class="icon">
              <icon-help></icon-help>
            </div>
            Privacy Policy
          </div>
        </div> -->
        <div class="card-body">
          <div v-html="storeVar.desc"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

/* Constants */
const store = useStore();
const storeVar = computed(() => store.state.Page);
/* Constants */

/* Lifecycle/Hooks */
onBeforeMount(() => {
  store.dispatch("Page/getPageDetails", { id: 2 });
});
/* Lifecycle/Hooks */

/* Search Function */
/* Search Function */

/* Functions/Methods */
/* Functions/Methods */
/* Validation */
</script>

<style></style>
