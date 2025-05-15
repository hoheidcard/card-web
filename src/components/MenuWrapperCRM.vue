<template>
  <section
    :class="`menu-wrapper ${
      storeVar.sidebarVisible ? 'desk-view' : 'desk-none'
    }`"
  >
    <div class="close-icon" @click.prevent="toggleSidebar">X</div>
    <div class="container">
      <div class="menu-list" @click.prevent="toggleSidebar">
        <router-link
          :to="`/crm/dashboard?id=${formVar.id}&settingId=${formVar.settingId}&accountId=${formVar.orgAccountId}`"
          class="menu-list-item"
        >
          <div class="menu-list-title">Dashboard</div>
        </router-link>
        <router-link
          :to="`/crm/organization/my-student?id=${formVar.id}&settingId=${formVar.settingId}&accountId=${formVar.orgAccountId}`"
          class="menu-list-item"
        >
          <div class="menu-list-title">Students</div>
        </router-link>
        <router-link
          v-if="formVar.type === 'MAIN' && formVar.settingType === 'MULTI'"
          :to="`/crm/organization/my-branch?id=${formVar.id}&settingId=${formVar.settingId}&accountId=${formVar.orgAccountId}`"
          class="menu-list-item"
        >
          <div class="menu-list-title">Branch</div>
        </router-link>
        <router-link
          :to="`/crm/organization/my-staff?id=${formVar.id}&settingId=${formVar.settingId}&accountId=${formVar.orgAccountId}`"
          class="menu-list-item"
        >
          <div class="menu-list-title">Staff</div>
        </router-link>
        <router-link
          :to="`/crm/organization/library?id=${formVar.id}&settingId=${formVar.settingId}&accountId=${formVar.orgAccountId}`"
          class="menu-list-item"
        >
          <div class="menu-list-title">Library</div>
        </router-link>
        <!-- <router-link to="/crm/event-calendar" class="menu-list-item">
          <div class="menu-list-title">Events</div>
        </router-link> -->
        <router-link
          :to="`/crm/notice-calendar?id=${formVar.id}&settingId=${formVar.settingId}&accountId=${formVar.orgAccountId}`"
          class="menu-list-item"
        >
          <div class="menu-list-title">Notice</div>
        </router-link>
        <router-link
          :to="`/crm/event-calendar?id=${formVar.id}&settingId=${formVar.settingId}&accountId=${formVar.orgAccountId}`"
          class="menu-list-item"
        >
          <div class="menu-list-title">Notifications</div>
        </router-link>
        <div class="menu-list-item">
          <div class="menu-list-title">
            Orders & Products
            <icon-down-single-arrow></icon-down-single-arrow>
          </div>
          <div class="sub-list">
            <router-link to="/crm/order-list" class="sub-list-item main-item">
              <div class="sub-list-title">Orders</div>
            </router-link>
            <router-link to="/crm/carts-list" class="sub-list-item main-item">
              <div class="sub-list-title">Other Orders</div>
            </router-link>
            <router-link to="/crm/address-list" class="sub-list-item main-item">
              <div class="sub-list-title">Address Orders</div>
            </router-link>
            <router-link to="/crm/cart" class="sub-list-item main-item">
              <div class="sub-list-title">Carts</div>
            </router-link>
            <router-link
              to="/crm/category-list"
              class="sub-list-item main-item"
            >
              <div class="sub-list-title">Products</div>
            </router-link>
          </div>
        </div>

        <router-link
          :to="`/crm/organization/setting/class-list?id=${formVar.id}&settingId=${formVar.settingId}&accountId=${formVar.orgAccountId}`"
          class="menu-list-item"
        >
          <div class="menu-list-title">Settings</div>
        </router-link>
        <router-link to="/crm/faq" class="menu-list-item">
          <div class="menu-list-title">Faqs</div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";

/* Constants */
const store = useStore();
const storeVar = computed(() => store.state.Auth);

// const
const formVar = reactive({
  agentList: false,
  cardList: false,
  id: localStorage.getItem("id"),
  settingId: localStorage.getItem("settingId"),
  roles: localStorage.getItem("roles"),
  orgAccountId: localStorage.getItem("orgAccountId"),
  type: localStorage.getItem("type"),
  settingType: localStorage.getItem("settingType"),
});
// const

// function
function toggleSidebar() {
  storeVar.value.sidebarVisible = !storeVar.value.sidebarVisible;
}
// function
</script>

<style></style>
