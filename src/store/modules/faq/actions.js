import { errorHandler } from "../../../services/_helper";
import { apiServices } from "../../../services/api.service";

export const getFaq = async (
  { commit, dispatch },
  { limit, offset, keyword, status }
) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.getFaq(limit, offset, keyword, status).then(
    (response) => {
      commit("SET_LOADER", false, { root: true });
      commit("FAQ_DATA", response.data);
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorHandler(error.response);
    }
  );
};
