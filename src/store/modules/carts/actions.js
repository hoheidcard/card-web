import { errorHandler, successHandler } from "../../../services/_helper";
import { apiServices } from "../../../services/api.service";

export const all = async (
  { commit },
  {
    limit,
    offset,
    keyword,
    status,
    paymentStatus,
    paymentMode,
    fromDate,
    toDate,
  }
) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices
    .getCarts(
      limit,
      offset,
      keyword,
      status,
      paymentStatus,
      paymentMode,
      fromDate,
      toDate
    )
    .then(
      (response) => {
        console.log(response);
        commit("SET_LOADER", false, { root: true });
        commit("SET_DATA", response.data);
      },
      (error) => {
        commit("SET_LOADER", false, { root: true });
        errorHandler(error.response);
      }
    );
};

export const getCartList = async ({ commit }, { settingId }) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.getCartList(settingId).then(
    (response) => {
      commit("SET_LOADER", false, { root: true });
      commit("SET_CART_DETAIL", response.data);
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      commit("SET_CART_DETAIL", {
        amount: 0,
        discount: 0,
        result: [],
        shippingCost: 0,
        totalAmount: 0,
        total: 0,
      });
      errorHandler(error.response);
    }
  );
};

export const increase = async ({ commit }, { id }) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.increase(id).then(
    (response) => {
      commit("SET_LOADER", false, { root: true });
      commit("INCREASE_QTY", { id });
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorHandler(error.response);
    }
  );
};

export const decrease = async ({ commit }, { id }) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.decrease(id).then(
    (response) => {
      commit("SET_LOADER", false, { root: true });
      commit("DECREASE_QTY", { id });
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorHandler(error.response);
    }
  );
};

export const removeCart = async ({ commit }, { id }) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.removeCart(id).then(
    (response) => {
      commit("SET_LOADER", false, { root: true });
      commit("REMOVE_CART", { id });
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorHandler(error.response);
    }
  );
};

export const addToCart = async (
  { commit },
  { settingId, productId, productVariant, quantity }
) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices
    .addToCart(settingId, productId, productVariant, quantity)
    .then(
      (response) => {
        commit("SET_LOADER", false, { root: true });
        commit("SET_DETAIL", response.data);
        successHandler("Added in cart successfully!");
      },
      (error) => {
        commit("SET_LOADER", false, { root: true });
        commit("SET_DETAIL", null);
        errorHandler(error.response);
      }
    );
};

export const placeOrder = async (
  { commit },
  { settingId, accountId, mode }
) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.placeOrder(settingId, accountId, mode).then(
    (response) => {
      commit("SET_LOADER", false, { root: true });
      commit("SET_DETAIL", response.data);
      successHandler("Order placed successfully!");
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      commit("SET_DETAIL", null);
      errorHandler(error.response);
    }
  );
};

export const cancelOrder = async ({ commit }, { id, reason }) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.cancelOrder(id, reason).then(
    (response) => {
      commit("SET_LOADER", false, { root: true });
      commit("CANCELLED_STATUS", { id, status: 'CANCELLED' });
      successHandler("Order cancelled successfully!");
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorHandler(error.response);
    }
  );
};

export const invoice = async ({ commit, state }, { id }) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.getInvoice(id).then(
    (response) => {
      state.addModal = false;
      commit("SET_LOADER", false, { root: true });
      successHandler("Invoiced downloaded successfully!");
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorHandler(error.response);
    }
  );
};

export const status = async (
  { commit, state },
  { id, status, cgst, igst, sgst, shipping }
) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices
    .updateCartStatus(id, status, cgst, igst, sgst, shipping)
    .then(
      (response) => {
        state.statusModal = false;
        commit("SET_LOADER", false, { root: true });
        commit("UPDATE_STATUS", { id, status, cgst, igst, sgst });
        successHandler("Order status updated successfully!");
      },
      (error) => {
        commit("SET_LOADER", false, { root: true });
        errorHandler(error.response);
      }
    );
};

export const downloadInvoice = async ({ commit }, { id }) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.downloadInvoice(id).then(
    (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      // state.confirmModal = false;
      commit("SET_LOADER", false, { root: true });
      // successHandler("Order submitted. Thank You.");
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorMessage("Try after some time!");
    }
  );
};
