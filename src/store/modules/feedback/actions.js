import { errorHandler, successHandler } from "../../../services/_helper";
import { apiServices } from "../../../services/api.service";

export const getFeedback = async (
  { commit, dispatch },
  { limit, offset, keyword, status }
) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.getFeedback(limit, offset, keyword, status).then(
    (response) => {
      commit("SET_LOADER", false, { root: true });
      commit("FEEDBACK_DATA", response.data);
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorHandler(error.response);
    }
  );
};

export const updateFaq = async ({ commit, state }, { id, answer }) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.updateFaq(id, answer).then(
    (response) => {
      state.faqModal = false;
      commit("SET_LOADER", false, { root: true });
      successHandler("Update Successfully");
      commit("UPDATE_FAQ_DATA", response.data);
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorHandler(error.response);
    }
  );
};

export const updateFeedbackStatus = async (
  { commit, state },
  { id, status }
) => {
  commit("SET_LOADER", true, { root: true });
  await apiServices.updateFeedbackStatus(id, status).then(
    (response) => {
      state.statusModal = false;
      commit("SET_LOADER", false, { root: true });
      successHandler("Update Successfully");
      commit("UPDATE_FEEDBACK_STATUS", { id, status });
    },
    (error) => {
      commit("SET_LOADER", false, { root: true });
      errorHandler(error.response);
    }
  );
};
