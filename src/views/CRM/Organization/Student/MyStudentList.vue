<template>
  <section class="faq-page">
    <div class="container">
      <div class="table-card card">
        <div class="table-header">
          <div class="left">
            <div class="title-row">
              <div class="icon">
                <icon-help></icon-help>
              </div>
              <div class="titles">
                <div class="sub-title">Student : List</div>
                <h5 class="main-title">Student</h5>
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
            <div class="icons">
              <router-link
                :to="
                  '/crm/organization/import-student?id=' +
                  formVar.organizationId +
                  '&settingId=' +
                  formVar.organizationSettingId
                "
                class="icon tooltip-wrapper"
              >
                <icon-download class=""></icon-download>
                <div class="tooltip">Import List</div>
              </router-link>
            </div>
            <!-- <div class="searchbar">
              <div class="select-dropdown">
                <select name="" id="" v-model="formVar.status" @change="statusChangeSearch">
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="PENDING">PENDING</option>
                  <option value="DEACTIVE">DEACTIVE</option>
                </select>
              </div>
            </div> -->
            <div class="icons">
              <div
                class="icon tooltip-wrapper"
                @click.prevent="
                  navigate(
                    formVar.organizationId,
                    formVar.organizationSettingId,
                    '/crm/organization/create-my-student'
                  )
                "
              >
                <icon-plus></icon-plus>
                <div class="tooltip">Add Student</div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-body p-16">
          <div class="table-outer">
            <table class="table">
              <thead>
                <th>Image</th>
                <th>SR No.</th>
                <th>S. Name</th>
                <th>F. Name</th>
                <th>Class-Section</th>
                <th>Photo Number</th>
                <th>Status</th>
                <th class="text-center">Action</th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in storeVar.studentData" :key="index">
                  <td>
                    <div class="zoom-image" v-if="item.profile">
                      <img :src="`${item.profile}?width=200`" alt="" />
                    </div>
                  </td>
                  <td>{{ item.srNo }}</td>
                  <td class="text-primary">
                    <router-link
                      :to="{
                        path: '/crm/organization/student-profile',
                        query: {
                          studentId: item.id,
                          id: formVar.organizationId,
                          settingId: formVar.organizationSettingId,
                        },
                      }"
                    >
                      {{ item.name }}
                    </router-link>
                  </td>
                  <td>{{ item.fatherName }}</td>
                  <td>{{ item.classList?.name }}-{{ item.classDiv?.name }}</td>
                  <td>{{ item.photoNumber }}</td>
                  <td>
                    <div
                      v-if="item.status === 'ACTIVE'"
                      class="badge success-badge"
                    >
                      {{ item.status }}
                    </div>
                    <div
                      v-if="item.status === 'PENDING'"
                      class="badge warning-badge"
                    >
                      {{ item.status }}
                    </div>
                    <div
                      v-if="item.status === 'DEACTIVE'"
                      class="badge danger-badge"
                    >
                      {{ item.status }}
                    </div>
                  </td>
                  <td>
                    <div class="option-btns">
                      <div
                        class="icon tooltip-wrapper"
                        @click="
                          navigate(
                            item.id,
                            formVar.organizationSettingId,
                            '/crm/organization/update-my-student'
                          )
                        "
                      >
                        <icon-edit></icon-edit>
                        <div class="tooltip">Edit</div>
                      </div>
                      <router-link
                        class="icon tooltip-wrapper"
                        :to="{
                          path: '/crm/organization/final-student-card',
                          query: { id: item.id, status: 'Class' },
                        }"
                      >
                        <icon-card></icon-card>
                        <div class="tooltip">Student</div>
                      </router-link>
                      <router-link
                        class="icon tooltip-wrapper"
                        :to="{
                          path: '/crm/organization/final-student-card',
                          query: { id: item.id, status: 'Parent' },
                        }"
                      >
                        <icon-card></icon-card>
                        <div class="tooltip">Parent</div>
                      </router-link>
                      <router-link
                        class="icon tooltip-wrapper"
                        :to="{
                          path: '/crm/organization/final-student-card',
                          query: { id: item.id, status: 'House' },
                        }"
                      >
                        <icon-card></icon-card>
                        <div class="tooltip">House</div>
                      </router-link>
                      <!-- <div class="icon tooltip-wrapper" @click.prevent="navigate(item.accountId, '/crm/staff-permission')">
                        <icon-permission></icon-permission>
                        <div class="tooltip">Permission</div>
                      </div> -->
                      <div
                        class="icon tooltip-wrapper"
                        @click.prevent="openStatusModal(item.id, item.status)"
                      >
                        <icon-status></icon-status>
                        <div class="tooltip">Change Status</div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-no-data" v-if="storeVar.studentData?.length <= 0">
            <div>No records Found!</div>
          </div>
          <div class="table-footer" v-if="storeVar.studentData?.length > 0">
            <Pagination
              :currentPage="formVar.currentPage"
              :totalItem="storeVar.totalStudent"
              :itemsPerPage="formVar.limit"
              @update:currentPage="pageChange($event)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Status Modal -->
    <Modal
      v-model:show="storeVar.statusModal"
      class="status-modal"
      headerClasses="header-bg"
    >
      <template v-slot:header>
        <div class="title" showHeader="true">Change Status</div>
        <div class="close-btn" @click.prevent="storeVar.statusModal = false">
          <icon-cross></icon-cross>
        </div>
      </template>
      <div class="status-row">
        <label for="approve" class="data">
          <input
            type="radio"
            v-model="formVar.changeStatus"
            value="ACTIVE"
            id="approve"
            name="status"
          />
          <div class="data-inner approve-card">
            <icon-success></icon-success>
            <div class="title">ACTIVE</div>
          </div>
        </label>
        <label for="pending" class="data">
          <input
            type="radio"
            v-model="formVar.changeStatus"
            value="PENDING"
            id="pending"
            name="status"
          />
          <div class="data-inner pending-card">
            <icon-warning></icon-warning>
            <div class="title">PENDING</div>
          </div>
        </label>
        <label for="block" class="data">
          <input
            type="radio"
            v-model="formVar.changeStatus"
            value="DEACTIVE"
            id="block"
            name="status"
          />
          <div class="data-inner block-card">
            <icon-block></icon-block>
            <div class="title">DEACTIVE</div>
          </div>
        </label>
      </div>
      <div class="modal-footer">
        <div class="btns">
          <div
            class="btn red-btn"
            @click.prevent="storeVar.statusModal = false"
          >
            Cancel
          </div>
          <div class="btn white-btn" @click="submitStatus">Submit</div>
        </div>
      </div>
    </Modal>
  </section>
</template>

<script setup>
import moment from "moment";
import { computed, onBeforeMount, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

/* Constants */
const store = useStore();
const route = useRoute();
const router = useRouter();
const storeVar = computed(() => store.state.OrganizationStudent);

const formVar = reactive({
  submit: false,
  limit: 10,
  offset: 0,
  keyword: "",
  status: "ACTIVE",
  currentPage: 1,
  editMode: false,

  typingTimer: null,
  typingDelay: 500,

  organizationId: null,
  studentId: null,
  organizationSettingId: null,
  changeStatus: null,
});
/* Constants */

/* Lifecycle/Hooks */
onBeforeMount(() => {
  if (route.query.id) {
    formVar.organizationId = route.query.id;
    formVar.organizationSettingId = route.query.settingId;
    getStudent();
  }
});
/* Lifecycle/Hooks */

/* Search Function */
watch(
  () => formVar.keyword,
  () => {
    clearTimeout(formVar.typingTimer);
    formVar.typingTimer = setTimeout(() => {
      formVar.limit = 10;
      formVar.offset = 0;
      formVar.currentPage = 1;
      getStudent();
    }, formVar.typingDelay);
  }
);
/* Search Function */
/* Functions/Methods */
function getStudent() {
  store.dispatch("OrganizationStudent/getStudent", {
    limit: formVar.limit,
    offset: formVar.offset,
    keyword: formVar.keyword,
    organizationDetailId: formVar.organizationId,
  });
}

function openStatusModal(id, status) {
  formVar.changeStatus = status;
  formVar.studentId = id;
  storeVar.value.statusModal = true;
}

function submitStatus() {
  store.dispatch("OrganizationStudent/updateStudentStatus", {
    id: formVar.studentId,
    status: formVar.changeStatus,
  });
}
const pageChange = (page) => {
  formVar.currentPage = page;
  formVar.offset = formVar.limit * (page - 1);
  getStudent();
};
function statusChangeSearch() {
  getStudent();
}
function getDate(date) {
  if (date) {
    return moment(date).format("MMM Do YYYY");
  }
  return "-";
}
function navigate(id, settingId, link) {
  router.push({ path: link, query: { id, settingId } });
}

/* Functions/Methods */
</script>

<style></style>
