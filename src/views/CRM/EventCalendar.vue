<template>
  <div class="event-calendar-section">
    <div class="container calender-box flex gap-10">
      <div class="card">
        <div class="top-row">
          <div class="left">
            <!-- <div class="date-input w-10-r">
              <Select
                v-model="formVar.eventFor"
                :options="eventForOption"
                @selected="flterEvent"
                placeholder="Select"
              ></Select>
            </div> -->
            <div class="arrows">
              <div class="icon" @click="previousMounth()">
                <icon-left-arrow></icon-left-arrow>
              </div>
              <div class="icon" @click="nextMounth()">
                <icon-right-arrow></icon-right-arrow>
              </div>
            </div>
          </div>
          <div class="right">
            <!-- <div class="icons">
              <div class="icon tooltip-wrapper" @click.prevent="openAddModal()">
                <icon-plus></icon-plus>
                <div class="tooltip">Create Event</div>
              </div>
            </div> -->
            <div class="btns">
              <button
                type="button"
                v-for="item in typeList"
                :key="item"
                :class="`btn ${typeIndex === item ? 'active' : ''}`"
                @click="onTypeChange(item)"
              >
                {{ moment(inputDate).format("MMMM yyyy") }}
              </button>
            </div>
          </div>
        </div>
        <div class="calendar-content">
          <ul :class="typeIndex" class="main-list">
            <li
              class="main-list-item"
              :class="
                moment().format('YYYY-MM-DD') == item.date ? 'current' : ''
              "
              v-for="item in gridList"
              :key="item.time"
            >
              <div class="main-list-time">
                {{ item.time }}
              </div>
              <ul class="sub-list">
                <li
                  class="sub-list-item"
                  v-for="event in checkKeyInEventList(item.date)"
                  :key="event.title"
                  @click.prevent="openEventModal(event)"
                >
                  <div class="event-badge">
                    {{ event.title }}
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="right-container w-40">
        <div class="card">
          <div class="top-row">
            <div class="apt-btn">
              <div class="icon">Event List</div>
              <!-- <div class="icon">
                Add Appointment
                <icon-add></icon-add>
              </div> -->
            </div>
          </div>
          <div class="tabs"></div>
          <div class="patient-list">
            <div
              class="list-item"
              v-for="(item, index) in storeVar2.eventData"
              :key="index"
            >
              <div
                class="p-info-card card1 pointer"
                @click="openEventModal(item)"
              >
                <div class="top">
                  <div class="p-img">
                    <!-- <img src="/src/assets/images/png/user.png" alt="" /> -->
                  </div>
                  <div class="p-info">
                    <div class="name">
                      <strong>{{ item.title }}</strong>
                    </div>
                    <div class="about">
                      <span>{{ getDate(item.eventDate) }}</span>
                    </div>
                    <div class="p-id">
                      {{ getTime(item.fromTime) }} - {{ getTime(item.toTime) }}
                    </div>
                  </div>
                </div>
                <!-- <div class="message">
                  <router-link
                    :to="`/new-prescription?pid=${item.patientDetail?.id}&aid=${item.id}`"
                    class="span">Prescription</router-link>
                  <router-link :to="`/patient/profile?id=${item.patientDetail?.id}`" class="span">Profile</router-link>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //modals -->
    <Modal
      v-model:show="eventVar.eventModal"
      class="event-modal"
      headerClasses="header-bg"
    >
      <template v-slot:header>
        <div class="title" showHeader="true">Details</div>
        <div class="close-btn" @click.prevent="eventVar.eventModal = false">
          <icon-cross></icon-cross>
        </div>
      </template>
      <div class="event-details">
        <div class="data">
          <div class="title">Title :</div>
          <div class="val">{{ formVar.eventTitle }}</div>
        </div>
        <div class="data">
          <div class="title">Description :</div>
          <div class="val">{{ formVar.eventDesc }}</div>
        </div>
        <div class="data">
          <div class="title">Date :</div>
          <div class="val">{{ getDate(formVar.evntDate) }}</div>
        </div>
        <div class="data">
          <div class="title">Time :</div>
          <div class="val">
            {{ getTime(formVar.evtFromTime) }} to
            {{ getTime(formVar.evtToTime) }}
          </div>
        </div>
        <div class="data">
          <div class="title">Event For :</div>
          <div class="val">
            {{ formVar.type === "UPPER" ? formVar.eventFor : formVar.type }}
          </div>
        </div>
      </div>
      <!-- <div class="modal-footer">
        <div class="btns">
          <div class="btn red-btn" @click.prevent="deleteToggle()">Delete</div>
          <div class="btn white-btn" @click.prevent="editToggle()">Edit</div>
        </div>
      </div> -->
    </Modal>
    <Modal
      v-model:show="storeVar2.confirmModal"
      class="confirm-modal"
      headerClasses="header-bg"
    >
      <div class="delete-icon">
        <img src="/images/png/delete.png" alt="" />
      </div>
      <h4 class="text-gree">Are you sure want to Delete?</h4>
      <div class="modal-footer">
        <div class="btns">
          <div
            class="btn red-btn"
            @click.prevent="storeVar2.confirmModal = false"
          >
            Cancel
          </div>
          <div class="btn white-btn" @click="deleteEvent()">Delete</div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import moment from "moment";
import {
  computed,
  getCurrentInstance,
  onBeforeMount,
  reactive,
  ref,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const storeVar2 = computed(() => store.state.Event);

/** Constants **/
const eventForOption = [
  { id: "SCHOOL", name: "SCHOOL" },
  { id: "ORGANIZATION", name: "ORGANIZATION" },
  { id: "PARTNER", name: "PARTNER" },
  { id: "SUB PARTNER", name: "SUB PARTNER" },
];
const tab = [];
const eventVar = reactive({
  createModal: false,
  eventModal: false,
  confirmModal: false,
  tab: 1,
  timePicker: "00:00",
});
const formVar = reactive({
  submit: false,
  limit: 10,
  offset: 0,
  keyword: "",
  editMode: false,
  school: null,
  allSchoolStatus: false,
  title: null,
  desc: null,
  eventDate: null,
  fromTime: "00:00",
  toTime: "00:00",
  eventFor: "SCHOOL",
  all: false,
  eventIds: null,

  fromDate: null,
  toDate: null,
  for: eventForOption[0],

  eventTitle: null,
  eventDesc: null,
  evntDate: null,
  evtFromTime: null,
  evtToTime: null,
  evtFor: null,
  eventId: null,
  type: null,
});

// const props = defineProps({
//   date: {
//     type: Date,
//     required: true,
//   },
//   eventList: {
//     type: Array,
//     required: true,
//     default: [
//       { date: '2024-03-11 01:05:00.000000', name: 'Testt' }
//     ]
//   },
// });

const instance = getCurrentInstance();
const gridList = ref([]);
const inputDate = ref(null);
// const typeList = ["Day", "Week", "Month"];
const typeList = ["Month"];
const typeIndex = ref("Month");

let startOfDay = moment(inputDate).startOf(typeIndex.value);
let endOfDay = moment(inputDate).endOf(typeIndex.value);
/** Constants **/

/** Lifecycle/Hooks **/
onBeforeMount(() => {
  inputDate.value = moment().format("YYYY-MM-DD");
  generateGridList();
  getEvent();
});
/** Lifecycle/Hooks **/

/** Functions/Methods **/
const onDateChange = () => {
  instance.emit("update:changeDate", {
    date: inputDate.value,
    type: typeIndex.value,
  });
};
function nextMounth() {
  inputDate.value = moment(startOfDay).add(32, "days").format("YYYY-MM-DD");
  generateGridList();
  getEvent();
}
function previousMounth() {
  inputDate.value = moment(endOfDay).subtract(32, "days").format("YYYY-MM-DD");
  generateGridList();
  getEvent();
}
function openEventModal(item) {
  eventVar.eventModal = true;
  formVar.eventTitle = item.title;
  formVar.eventDesc = item.desc;
  formVar.evntDate = item.eventDate;
  formVar.evtFromTime = item.fromTime;
  formVar.evtToTime = item.toTime;
  formVar.evtFor = item.eventFor;
  formVar.eventId = item.id;
  formVar.type = item.type;

  formVar.title = item.title;
  formVar.desc = item.desc;
  formVar.eventDate = item.eventDate;
  formVar.fromTime = item.fromTime;
  formVar.toTime = item.toTime;
  formVar.eventFor = item.eventFor;
  formVar.all = item.all;
}

const onTypeChange = (type) => {
  if (type !== typeIndex.value) {
    typeIndex.value = type;
    onDateChange();
    generateGridList();
  }
};
function getDate(date) {
  if (date) {
    return moment(date).format("MMM Do YYYY");
  }
}
function getTime(time) {
  if (time) {
    return moment(time, "HH:mm:ss").format("hh:mm A");
  }
}
const checkKeyInEventList = (key) => {
  if (key) {
    if (typeIndex.value === "Day") {
      return storeVar2.value.eventData.filter(
        (item) =>
          moment(item.eventDate).format("YYYY-MM-DD hh:mm A").toString() === key
      );
    } else {
      return storeVar2.value.eventData.filter(
        (item) => moment(item.eventDate).format("YYYY-MM-DD").toString() === key
      );
    }
  }
};

const generateGridList = () => {
  startOfDay = moment(inputDate.value).startOf(typeIndex.value);
  endOfDay = moment(inputDate.value).endOf(typeIndex.value);

  // Create an array to store the intervals
  const intervals = [];
  let currentInterval = startOfDay.clone();
  while (currentInterval <= endOfDay) {
    // if (typeIndex.value === "Day") {
    //   intervals.push({
    //     time: currentInterval.format("HH:mm A"),
    //     date: currentInterval.format("YYYY-MM-DD hh:mm A"),
    //   });
    //   currentInterval.add(5, "minutes");
    // }
    if (typeIndex.value === "Week" || typeIndex.value === "Month") {
      intervals.push({
        time:
          typeIndex.value === "Month"
            ? currentInterval.format("DD")
            : currentInterval.format("ddd"),
        date: currentInterval.format("YYYY-MM-DD"),
      });
      currentInterval.add(1, "day");
    }
  }
  gridList.value = intervals;
};

function getEvent() {
  store.dispatch("Event/getEvents", {
    id: route.query.id,
    limit: formVar.limit,
    offset: formVar.offset,
    keyword: formVar.keyword,
    fromDate: moment(startOfDay).format("YYYY-MM-DD"),
    toDate: moment(endOfDay).format("YYYY-MM-DD"),
    eventFor: formVar.for?.id,
  });
}

function deleteEvent() {
  store.dispatch("Event/deleteEvent", { id: formVar.eventId });
}
/** Functions/Methods **/

/** Validation **/
/** Validation **/
</script>

<style lang="scss">
.event-calendar {
  .btn {
    padding: 1px 1px;
    background-color: azure;
  }

  .active {
    background-color: tomato !important;
  }
}
</style>
