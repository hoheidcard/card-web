<template>
  <section class="faq-page">
    <!-- <div class="container"> -->
    <div class="table-card card">
      <div class="table-header">
        <div class="left">
          <div class="title-row">
            <div class="icon">
              <icon-partner></icon-partner>
            </div>
            <div class="titles">
              <div class="sub-title">Students : List</div>
              <h5 class="main-title">Our Students</h5>
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
          <div class="searchbar">
            <div class="select-dropdown">
              <select
                name=""
                id=""
                v-model="formVar.status"
                @change="statusChangeSearch"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="PENDING">PENDING</option>
                <option value="DEACTIVE">DEACTIVE</option>
              </select>
            </div>
          </div>
          <!-- <div class="icons">
              <div class="icon tooltip-wrapper" @click.prevent="navigate(null, '/crm/add-partners')">
                <icon-plus></icon-plus>
                <div class="tooltip">Add Partners</div>
              </div>
            </div> -->
        </div>
      </div>
      <div class="table-body p-16">
        <div class="table-outer">
          <table class="table">
            <thead>
              <!-- <th></th> -->
              <th>Image</th>
              <th>SR No.</th>
              <th>S. Name</th>
              <th>F. Name</th>
              <th>Class-Section</th>
              <th>School</th>
              <th>Status</th>
              <th class="text-center">Action</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in storeVar.studentData" :key="index">
                <!-- <td>
                    <input type="checkbox" @change="selectStudents(item.id)" />
                  </td> -->
                <td>
                  <div class="zoom-image" v-if="item.profile">
                    <img :src="`${item.profile}?width=200`" alt="" />
                  </div>
                </td>
                <td>{{ item.srNo }}</td>
                <td class="text-primary">
                  <router-link
                    v-if="item.organizationDetail?.account.roles === 'SCHOOL'"
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
                  <router-link
                    v-if="item.organizationDetail?.account.roles === 'SCHOOL'"
                    :to="{
                      path: '/crm/college/student-profile',
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
                <td>{{ item.organizationDetail?.name }}</td>
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
                      v-if="item.organizationDetail?.account.roles === 'SCHOOL'"
                      @click="
                        navigaters(
                          item.id,
                          item.settingId,
                          '/crm/organization/update-my-student'
                        )
                      "
                    >
                      <icon-edit></icon-edit>
                      <div class="tooltip">Edit</div>
                    </div>
                    <div
                      class="icon tooltip-wrapper"
                      v-if="item.organizationDetail?.account.roles === 'SCHOOL'"
                      @click="
                        navigaters(
                          item.id,
                          item.settingId,
                          '/crm/college/update-my-student'
                        )
                      "
                    >
                      <icon-edit></icon-edit>
                      <div class="tooltip">Edit</div>
                    </div>
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
    <!-- </div> -->

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

const props = defineProps({
  fromDate: {
    type: String,
    default: true,
  },
  toDate: {
    type: String,
    required: true,
  },
  all: {
    type: String,
    required: true,
  },
});

/* Constants */
const store = useStore();
const route = useRoute();
const router = useRouter();
const storeVar = computed(() => store.state.Dashboard);

const formVar = reactive({
  submit: false,
  limit: 10,
  offset: 0,
  keyword: "",
  status: "ACTIVE",
  roles: "STUDENT",
  currentPage: 1,
  editMode: false,

  typingTimer: null,
  typingDelay: 500,

  id: null,
  partnersAccountId: null,
  changeStatus: null,
});
/* Constants */

/* Lifecycle/Hooks */
onBeforeMount(() => {
  getStudents();
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
      getStudents();
    }, formVar.typingDelay);
  }
);
/* Search Function */
/* Functions/Methods */
function getStudents() {
  store.dispatch("Dashboard/getStudents", {
    limit: formVar.limit,
    offset: formVar.offset,
    keyword: formVar.keyword,
    status: formVar.status,
    fromDate: props.fromDate,
    toDate: props.toDate,
    roles: "STUDENT",
    all: props.all,
  });
}
function openStatusModal(id, status) {
  formVar.changeStatus = status;
  formVar.id = id;
  storeVar.value.statusModal = true;
}
function submitStatus() {
  store.dispatch("OrganizationStudent/updateStudentStatus", {
    id: formVar.id,
    status: formVar.changeStatus,
  });
  storeVar.value.statusModal = false;
}
const pageChange = (page) => {
  formVar.currentPage = page;
  formVar.offset = formVar.limit * (page - 1);
  getStudents();
};
function statusChangeSearch() {
  getStudents();
}

function navigate(id, link) {
  router.push({ path: link, query: { id } });
}
function navigaters(id, settingId, link) {
  router.push({ path: link, query: { id, settingId } });
}
function getDate(date) {
  if (date) {
    return moment(date).format("MMM Do YYYY");
  }
  return "-";
}
/* Functions/Methods */
/* Validation */

/* Validation */
</script>

<style></style>
