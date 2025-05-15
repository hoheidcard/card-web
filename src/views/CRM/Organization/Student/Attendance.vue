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
                <div class="sub-title">Attendance : List</div>
                <h5 class="main-title">Attendance</h5>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="searchbar">
              <div class="date-input">
                <input
                  type="date"
                  class="w-12-r-i"
                  v-model="formVar.fromDate"
                  :max="formVar.toDate"
                  @change="getStudent"
                />
                <div class="icon">
                  <icon-calendar></icon-calendar>
                </div>
              </div>
            </div>
            <div class="searchbar">
              <div class="date-input">
                <input
                  type="date"
                  class="w-12-r-i"
                  v-model="formVar.toDate"
                  :max="formVar.maxDate"
                  @change="getStudent"
                />
                <div class="icon">
                  <icon-calendar></icon-calendar>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-body p-16">
          <div class="table-outer">
            <table class="table">
              <thead>
                <th>Date</th>
                <th>Attendance</th>
                <th>Name</th>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in storeVar.attendanceData"
                  :key="index"
                >
                  <td>{{ getDate(item.date) }}</td>
                  <td>
                    {{ item.status }}
                  </td>
                  <td>{{ item.student.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="table-no-data"
            v-if="storeVar.attendanceData?.length <= 0"
          >
            <div>No records Found!</div>
          </div>
          <div class="table-footer" v-if="storeVar.attendanceData?.length > 0">
            <Pagination
              :currentPage="formVar.currentPage"
              :totalItem="storeVar.totalAttendance"
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
import moment from "moment";
import { computed, onBeforeMount, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

/* Constants */
const store = useStore();
const route = useRoute();
const storeVar = computed(() => store.state.OrganizationStudent);

const formVar = reactive({
  submit: false,
  limit: 10,
  offset: 0,
  keyword: "",
  status: "ACTIVE",
  currentPage: 1,
  fromDate: moment().subtract(30, 'days').format("YYYY-MM-DD"),
  toDate: moment().format("YYYY-MM-DD"),
});
/* Constants */

/* Lifecycle/Hooks */
onBeforeMount(() => {
  if (route.query.id) {
    getStudent();
  }
});
/* Lifecycle/Hooks */

/* Search Function */
/* Search Function */
/* Functions/Methods */
function getStudent() {
  store.dispatch("OrganizationStudent/getStudentAttendance", {
    studentId: route.query.id,
    limit: formVar.limit,
    offset: formVar.offset,
    keyword: formVar.keyword,
    fromDate: formVar.fromDate,
    toDate: formVar.toDate,
  });
}
const pageChange = (page) => {
  formVar.currentPage = page;
  formVar.offset = formVar.limit * (page - 1);
  getStudent();
};
function getDate(date) {
  if (date) {
    return moment(date).format("MMM Do YYYY");
  }
  return "-";
}
/* Functions/Methods */
</script>

<style></style>
