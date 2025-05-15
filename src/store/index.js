import { createStore } from "vuex";

import * as actions from "./notification/actions";
import * as getters from "./notification/getters";
import * as mutations from "./notification/mutations";
import state from "./notification/state";

import { Auth } from "./modules/auth";
import { Designation } from "./modules/designation";
import { Alert } from "./modules/error-success";
import { Faqs } from "./modules/faq";
import { Feedback } from "./modules/feedback";
import { Organization } from "./modules/organization";
import { OrganizationBranch } from "./modules/organization-branch";
import { OrganizationLibrary } from "./modules/organization-library";
import { OrganizationSettings } from "./modules/organization-settings";
import { OrganizationStaff } from "./modules/organization-staff";
import { OrganizationStudent } from "./modules/organization-student";
import { Page } from "./modules/page";
import { Partners } from "./modules/partner";
import { SubPartners } from "./modules/partner-sub";
import { Dashboard } from "./modules/dashboard";
import { Staff } from "./modules/staff";
import { DefaultSetting } from "./modules/default-setting";
import { Admin } from "./modules/admin";
import { Event } from "./modules/event";

import { CardOrder } from "./modules/card-orders";
import { DeliveryPartner } from "./modules/delivery-partner";
import { IdCardStock } from "./modules/id-card-stock";
import { Category } from "./modules/category";
import { Carts } from "./modules/carts";
import { UserAddress } from "./modules/user-address";

export default createStore({
  state,
  getters,
  mutations,
  actions,

  modules: {
    Auth,
    Alert,
    Page,
    Staff,
    Faqs,
    Feedback,
    Designation,
    Organization,
    OrganizationBranch,
    OrganizationSettings,
    OrganizationStaff,
    OrganizationStudent,
    OrganizationLibrary,
    Partners,
    SubPartners,
    Dashboard,
    DefaultSetting,
    Admin,
    Event,
    DeliveryPartner,
    IdCardStock,
    CardOrder,
    Category,
    Carts,
    UserAddress
  },
});
