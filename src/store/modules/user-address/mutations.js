export const SET_DATA = (state, data) => {
  state.data = data.result;
  state.total = data.count;
};
export const SET_DETAIL = (state, data) => {
  state.detail = data;
};
export const ADD_DATA = (state, data) => {
  state.addModal = false;
  if (state.data?.length < 10) {
    state.data.push(data);
  }
  state.total = state.total + 1;
};
export const UPDATE_DATA = (state, data) => {
  const objIndex = state.data.findIndex((obj) => obj.id === data.id);
  if (objIndex >= 0) {
    state.data[objIndex].address = data.address;
    state.data[objIndex].name = data.name;
    state.data[objIndex].phone = data.phone;
    state.data[objIndex].altPhone = data.altPhone;
    state.data[objIndex].city = data.city;
    state.data[objIndex].state = data.state;
    state.data[objIndex].pincod = data.pincod;
  }
  state.addModal = false;
};
export const UPDATE_STATUS = (state, data) => {
  const objIndex = state.data.findIndex((obj) => obj.id === data.id);
  if (objIndex >= 0) {
    state.data[objIndex].status = data.status;
  }
};
