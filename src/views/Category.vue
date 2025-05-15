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
                <div class="sub-title">Category : List</div>
                <h5 class="main-title">Category List</h5>
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
                    <img :src="`${item.image}`" alt="" />
                  </div>
                  <div class="info">
                    <h5 class="title">{{ item.title }}</h5>
                    <router-link
                      :to="{
                        path: '/crm/product-list',
                        query: { id: item.id },
                      }"
                      class="btn white-btn w-100"
                      >Products</router-link
                    >
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
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/* Constants */
const store = useStore();
const router = useRouter();
const storeVar = computed(() => store.state.Category);

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
  getCategory();
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
      getCategory();
    }, formVar.typingDelay);
  }
);
/* Search Function */

/* Functions/Methods */
function getCategory() {
  store.dispatch("Category/getCategoryByStatus", {
    limit: formVar.limit,
    offset: formVar.offset,
    keyword: formVar.keyword,
    status: formVar.status,
  });
}
function openAddModal() {
  storeVar.value.addModal = true;
  formVar.editMode = false;
  formVar.id = null;
  formVar.title = null;
  formVar.desc = null;
}
function openEditModal(item) {
  storeVar.value.addModal = true;
  formVar.editMode = true;
  formVar.id = item.id;
  formVar.title = item.title;
  formVar.desc = item.desc;
}
function openStatusModal(id, status) {
  formVar.changeStatus = status;
  formVar.id = id;
  storeVar.value.statusModal = true;
}

function openImageModal(id, image) {
  formVar.file = image;
  formVar.id = id;
  storeVar.value.imageModal = true;
}

function addCategory() {
  if (titleValid.value) {
    formVar.submit = true;
    return;
  }
  formVar.submit = false;
  if (!formVar.editMode) {
    store.dispatch("Category/createCategory", {
      title: formVar.title,
      desc: formVar.desc,
    });
  } else {
    store.dispatch("Category/updateCategory", {
      id: formVar.id,
      title: formVar.title,
      desc: formVar.desc,
    });
  }
}
function submitStatus() {
  if (formVar.id && formVar.changeStatus) {
    store.dispatch("Category/updateCategorytatus", {
      id: formVar.id,
      status: formVar.changeStatus,
    });
  }
}
function submitImage() {
  if (formVar.id && formVar.file) {
    store.dispatch("Category/updateCategoryImage", {
      id: formVar.id,
      file: formVar.file,
    });
  }
}
const pageChange = (page) => {
  formVar.currentPage = page;
  formVar.offset = formVar.limit * (page - 1);
  getCategory();
};
function statusChangeSearch() {
  getCategory();
}

function openUpload1() {
  document.getElementById("file-field1").click();
}
function updatePreview1(e) {
  var reader,
    files = e.target.files;
  reader = new FileReader();
  reader.onload = (e) => {
    formVar.image = e.target.result;
  };
  reader.readAsDataURL(files[0]);
  formVar.file = files[0];
}

function navigate(id, link) {
  router.push({ path: link, query: { id: id } });
}
/* Functions/Methods */
/* Validation */
const titleValid = computed(() => {
  if (!formVar.title) {
    return "Please Enter title";
  }
});
</script>

<style></style>
