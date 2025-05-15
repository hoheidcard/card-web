import { errorHandler } from "../../../services/_helper";
import { apiServices } from "../../../services/api.service";

export const getPageDetails = async ({ commit }, { id }) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.getPageDetails(id).then(
    (response) => {
      commit("SET_LOADER", false, { root: true });
      commit("PAGE_DETAILS", response.data);
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorHandler(error.response);
    }
  );
};
