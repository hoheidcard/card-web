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
                <div class="sub-title">Address : List</div>
                <h5 class="main-title">Address List</h5>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="icons">
              <div class="icon tooltip-wrapper" @click.prevent="openAddModal">
                <icon-plus></icon-plus>
                <div class="tooltip">Add Address</div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-body p-16">
          <div class="table-outer">
            <table class="table">
              <thead>
                <th>#</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Status</th>
                <th class="text-center">Action</th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in storeVar.data" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.address }}</td>
                  <td>{{ item.phone }}</td>
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
                        @click="openEditModal(item)"
                      >
                        <icon-edit></icon-edit>
                        <div class="tooltip">Edit</div>
                      </div>
                      <div
                        class="icon tooltip-wrapper"
                        @click.prevent="openStatusModal(item.id, item.status)"
                      >
                        <icon-setting></icon-setting>
                        <div class="tooltip">Status Change</div>
                      </div>
                      <div
                        class="icon tooltip-wrapper"
                        @click="deleteStatus(item.id)"
                      >
                        <icon-delete></icon-delete>
                        <div class="tooltip">Delete</div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-no-data" v-if="storeVar.data?.length <= 0">
            <div>No records Found!</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Faq Add Modal  -->
    <Modal
      v-model:show="storeVar.addModal"
      class="faq-modal"
      headerClasses="header-bg"
    >
      <template v-slot:header>
        <div class="title" showHeader="true">
          {{ formVar.editMode ? "Update Address" : "Add Address" }}
        </div>
        <div class="close-btn" @click.prevent="storeVar.addModal = false">
          <icon-cross></icon-cross>
        </div>
      </template>
      <form class="form mb-16">
        <div class="form-item mb-16">
          <div class="title">Name</div>
          <input type="text" v-model="formVar.name" placeholder="Enter Name" />
          <div class="err-msg" v-if="formVar.submit && nameValid">
            {{ nameValid }}
          </div>
        </div>
        <div class="form-item mb-16">
          <div class="title">Phone</div>
          <input
            type="text"
            v-model="formVar.phone"
            @keydown="isNumber"
            maxlength="10"
          />
          <div class="err-msg" v-if="formVar.submit && phoneValid">
            {{ phoneValid }}
          </div>
        </div>
        <div class="form-item mb-16">
          <div class="title">Alt phone</div>
          <input
            type="text"
            v-model="formVar.altPhone"
            @keydown="isNumber"
            maxlength="10"
          />
          <div class="err-msg" v-if="formVar.submit && altPhoneValid">
            {{ altPhoneValid }}
          </div>
        </div>
        <div class="form-item mb-16">
          <div class="title">State</div>
          <input type="text" v-model="formVar.state" />
          <div class="err-msg" v-if="formVar.submit && stateValid">
            {{ stateValid }}
          </div>
        </div>
        <div class="form-item mb-16">
          <div class="title">City</div>
          <input type="text" v-model="formVar.city" />
          <div class="err-msg" v-if="formVar.submit && cityValid">
            {{ cityValid }}
          </div>
        </div>
        <div class="form-item mb-16">
          <div class="title">Pincode</div>
          <input
            type="text"
            v-model="formVar.pincode"
            @keydown="isNumber"
            maxlength="6"
          />
          <div class="err-msg" v-if="formVar.submit && pincodeValid">
            {{ pincodeValid }}
          </div>
        </div>
        <div class="form-item mb-16">
          <div class="title">Address</div>
          <textarea
            type="text"
            rows="5"
            v-model="formVar.address"
            placeholder="Enter Address"
          ></textarea>
        </div>
      </form>
      <div class="modal-footer">
        <div class="btns">
          <div class="btn red-btn" @click.prevent="storeVar.addModal = false">
            Cancel
          </div>
          <div class="btn white-btn" @click="addAddress">Submit</div>
        </div>
      </div>
    </Modal>

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
import { computed, onBeforeMount, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/* Constants */
const store = useStore();
const router = useRouter();
const storeVar = computed(() => store.state.UserAddress);

const formVar = reactive({
  submit: false,
  limit: 10,
  offset: 0,
  keyword: "",
  status: "ACTIVE",
  changeStatus: null,
  currentPage: 1,
  editMode: false,

  typingTimer: null,
  typingDelay: 500,

  id: null,
  accountId: localStorage.getItem("orgAccountId"),
  address: null,
  name: null,
  phone: null,
  altPhone: null,
  city: null,
  state: null,
  pincode: null,
});
/* Constants */

/* Lifecycle/Hooks */
onBeforeMount(() => {
  getAddress();
});
/* Lifecycle/Hooks */

/* Functions/Methods */
function getAddress() {
  store.dispatch("UserAddress/getAddress", {
    accountId: formVar.accountId,
  });
}
function openAddModal() {
  storeVar.value.addModal = true;
  formVar.editMode = false;
  formVar.id = null;

  formVar.address = null;
  formVar.name = null;
  formVar.phone = null;
  formVar.altPhone = null;
  formVar.city = null;
  formVar.state = null;
  formVar.pincode = null;
}
function openEditModal(item) {
  storeVar.value.addModal = true;
  formVar.editMode = true;
  formVar.id = item.id;

  formVar.address = item.address;
  formVar.name = item.name;
  formVar.phone = item.phone;
  formVar.altPhone = item.altPhone;
  formVar.city = item.city;
  formVar.state = item.state;
  formVar.pincode = item.pincode;
}
function openStatusModal(id, status) {
  formVar.changeStatus = status;
  formVar.id = id;
  storeVar.value.statusModal = true;
}

function deleteModal(id) {
  formVar.id = id;
  storeVar.value.imageModal = true;
}

function addAddress() {
  if (
    nameValid.value ||
    addressValid.value ||
    stateValid.value ||
    cityValid.value ||
    pincodeValid.value ||
    altPhoneValid.value ||
    phoneValid.value
  ) {
    formVar.submit = true;
    return;
  }
  formVar.submit = false;
  if (!formVar.editMode) {
    store.dispatch("UserAddress/createAddress", {
      accountId: formVar.accountId,
      address: formVar.address,
      name: formVar.name,
      phone: formVar.phone,
      altPhone: formVar.altPhone,
      city: formVar.city,
      state: formVar.state,
      pincode: formVar.pincode,
    });
  } else {
    store.dispatch("UserAddress/updateAddress", {
      id: formVar.id,
      accountId: formVar.accountId,
      address: formVar.address,
      name: formVar.name,
      phone: formVar.phone,
      altPhone: formVar.altPhone,
      city: formVar.city,
      state: formVar.state,
      pincode: formVar.pincode,
    });
  }
}
function submitStatus() {
  console.log(formVar.id);
  if (formVar.id) {
    store.dispatch("UserAddress/updateActiveAddress", {
      id: formVar.id,
      accountId: formVar.accountId,
      status: formVar.changeStatus,
    });
  }
}

function deleteStatus(id) {
  store.dispatch("UserAddress/deleteActiveAddress", {
    id: id,
    accountId: formVar.accountId,
  });
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

const nameValid = computed(() => {
  if (!formVar.name) {
    return "Please Enter title";
  }
});

const stateValid = computed(() => {
  if (!formVar.state) {
    return "Please Enter state";
  }
});

const cityValid = computed(() => {
  if (!formVar.city) {
    return "Please Enter city";
  }
});
const addressValid = computed(() => {
  if (!formVar.address) {
    return "Please Enter address";
  }
});
const altPhoneValid = computed(() => {
  if (!formVar.altPhone) {
    return "Please Enter alt. phone";
  }
});
const phoneValid = computed(() => {
  if (!formVar.phone) {
    return "Please Enter phone number";
  }
});
const pincodeValid = computed(() => {
  if (!formVar.pincode) {
    return "Please Enter pincode";
  }
});
</script>

<style></style>
