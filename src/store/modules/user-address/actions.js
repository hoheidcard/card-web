import { errorHandler, successHandler } from "../../../services/_helper";
import { apiServices } from "../../../services/api.service";

export const getAddress = async ({ commit }, { accountId }) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.getAddress(accountId).then(
    (response) => {
      commit("SET_LOADER", false, { root: true });
      commit("SET_DATA", response.data);
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorHandler(error.response);
    }
  );
};

export const createAddress = async (
  { commit },
  { accountId, address, name, phone, altPhone, city, state, pincode }
) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices
    .createAddress(
      accountId,
      address,
      name,
      phone,
      altPhone,
      city,
      state,
      pincode
    )
    .then(
      (response) => {
        commit("SET_LOADER", false, { root: true });
        commit("ADD_DATA", {
          id: response.data.id,
          accountId,
          address,
          name,
          phone,
          altPhone,
          city,
          state,
          pincode,
        });
        successHandler("Address created successfully!");
      },
      (error) => {
        commit("SET_LOADER", false, { root: true });
        errorHandler(error.response);
      }
    );
};

export const updateAddress = async (
  { commit },
  { id, accountId, address, name, phone, altPhone, city, state, pincode }
) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices
    .updateAddress(
      id,
      accountId,
      address,
      name,
      phone,
      altPhone,
      city,
      state,
      pincode
    )
    .then(
      (response) => {
        commit("SET_LOADER", false, { root: true });
        commit("UPDATE_DATA", {
          id,
          accountId,
          address,
          name,
          phone,
          altPhone,
          city,
          state,
          pincode,
        });
        successHandler("Address updated successfully!");
      },
      (error) => {
        commit("SET_LOADER", false, { root: true });
        errorHandler(error.response);
      }
    );
};

export const updateActiveAddress = async (
  { commit, state },
  { id, accountId, status }
) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.updateActiveAddress(id, accountId, status).then(
    (response) => {
      state.statusModal = false;
      commit("SET_LOADER", false, { root: true });
      commit("UPDATE_STATUS", { id, status: "ACTIVE" });
      successHandler("Address status updated successfully!");
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorHandler(error.response);
    }
  );
};

export const deleteActiveAddress = async (
  { commit, state },
  { id, accountId }
) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.deleteAddress(id, accountId).then(
    (response) => {
      state.statusModal = false;
      commit("SET_LOADER", false, { root: true });
      commit("UPDATE_STATUS", { id, status: "DELETED" });
      successHandler("Address deleted successfully!");
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorHandler(error.response);
    }
  );
};
