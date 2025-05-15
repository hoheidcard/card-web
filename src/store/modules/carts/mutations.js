export const SET_DATA = (state, data) => {
  state.data = data.result;
  state.total = data.total;
};
export const SET_DETAIL = (state, data) => {
  state.detail = data;
};

export const SET_CART_DETAIL = (state, data) => {
  console.log(data);
  state.amount = data.amount;
  state.discount = data.discount;
  state.result = data.result;
  state.shippingCost = data.shippingCost;
  state.totalAmount = data.totalAmount;
  state.total = data.total;
};

export const ADD_DATA = (state, data) => {
  if (state.data?.length < 10) {
    state.data.push(data);
  }
  state.total = state.total + 1;
};
export const UPDATE_DATA = (state, data) => {
  const objIndex = state.data.findIndex((obj) => obj.id === data.id);
  if (objIndex >= 0) {
    state.data[objIndex].title = data.title;
  }
};
export const UPDATE_IMAGE = (state, data) => {
  const objIndex = state.data.findIndex((obj) => obj.id === data.id);
  if (objIndex >= 0) {
    state.data[objIndex].image = data.image;
  }
};
export const UPDATE_STATUS = (state, data) => {
  const objIndex = state.data.findIndex((obj) => obj.id === data.id);
  if (objIndex >= 0) {
    state.data[objIndex].status = data.status;
    state.data[objIndex].sgst = data.sgst;
    state.data[objIndex].cgst = data.cgst;
    state.data[objIndex].igst = data.igst;
  }
};

export const CANCELLED_STATUS = (state, data) => {
  const objIndex = state.data.findIndex((obj) => obj.id === data.id);
  if (objIndex >= 0) {
    state.data[objIndex].status = data.status;
  }
  state.statusModal=false
};

export const INCREASE_QTY = (state, data) => {
  const objIndex = state.result.findIndex((obj) => obj.id === data.id);
  if (objIndex >= 0) {
    state.result[objIndex].quantity += 1;
  }
};

export const DECREASE_QTY = (state, data) => {
  const objIndex = state.result.findIndex((obj) => obj.id === data.id);
  if (objIndex >= 0) {
    state.result[objIndex].quantity -= 1;
  }
};

export const REMOVE_CART = (state, data) => {
  const objIndex = state.result.findIndex((obj) => obj.id === data.id);
  if (objIndex >= 0) {
    state.result.splice(objIndex, 1);
  }
};
