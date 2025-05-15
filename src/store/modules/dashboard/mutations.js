export const SET_DATA = (state, data) => {
  state.STUDENT = data.studentCount?.count || 0;
  state.STAFF = data.accountCount?.count || 0;
  state.BRANCH = data.branchCount?.count || 0;
  state.BOOK = data.bookCount?.count || 0;
  state.CARD = data.studentCardCount?.count || 0;
  state.ATTENDANCE = data.studentAttendanceCount?.count || 0;
};

export const UNSET_DATA = (state, data) => {
  state.ADMIN = 0;
  state.PARTNER = 0;
  state.SUB_PARTNER = 0;
  state.SCHOOL = 0;
  state.SCHOOL = 0;
  state.ORGANIZATION = 0;
  state.PARENT = 0;

  state.STUDENT = 0;
  state.STAFF = 0;
  state.BRANCH = 0;
  state.BOOK = 0;
  state.CARD = 0;
  state.ATTENDANCE = 0;
};
export const PARTNERS_DATA = (state, data) => {
  state.partnersData = data.result;
  state.totalPartners = data.total;
};

export const ORGANIZATION_DATA = (state, data) => {
  state.organizationData = data.result;
  state.totalOrganization = data.total;
};

export const STUDENT_DATA = (state, data) => {
  state.studentData = data.result;
  state.totalStudent = data.total;
};

export const STAFF_DATA = (state, data) => {
  state.staffData = data.result;
  state.totalStaff = data.total;
};
