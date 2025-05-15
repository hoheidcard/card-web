import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // Login
  {
    meta: {
      title: "Login Layout",
      requiresAuth: false,
    },
    path: "/login-layout",
    redirect: "/login-type",
    name: "login layout",
    component: () =>
      import(
        /* webpackChunkName: "Login Layout" */ "../views/auth/LoginLayout.vue"
      ),
    children: [
      {
        meta: {
          title: "Forgot Password",
          requiresAuth: false,
        },
        path: "/forgot",
        name: "forgot-password",
        component: () =>
          import(
            /* webpackChunkName: "Forgot Password" */ "../views/auth/Forgot.vue"
          ),
      },
      {
        meta: {
          title: "Password Login",
          requiresAuth: false,
        },
        path: "/login",
        name: "login",
        component: () =>
          import(
            /* webpackChunkName: "Password Login" */ "../views/auth/PasswordLogin.vue"
          ),
      },
      {
        meta: {
          title: "Otp Login",
          requiresAuth: false,
        },
        path: "/otp-login",
        name: "otp-login",
        component: () =>
          import(
            /* webpackChunkName: "Otp Login" */ "../views/auth/OtpLogin.vue"
          ),
      },
    ],
  },
  //Dashboard Layout
  {
    meta: {
      title: "Dashboard Layout CRM",
      requiresAuth: true,
    },
    path: "/",
    redirect: "/crm/dashboard",
    name: "dashboard layout crm",
    component: () =>
      import(
        /* webpackChunkName: "Dashboard Layout CRM" */ "../views/CRM/DashboardLayoutCRM.vue"
      ),
    children: [
      {
        meta: {
          title: "CRM Dashboard",
          requiresAuth: true,
        },
        path: "/crm/dashboard",
        name: "crm dashboard",
        component: () =>
          import(
            /* webpackChunkName: "CRM Dashboard" */ "../views/CRM/Dashboard.vue"
          ),
      },
      //My Profile section start
      {
        meta: {
          title: "CRM Profile Layout",
          requiresAuth: true,
        },
        path: "/crm/profile-layout",
        redirect: "/crm/profile",
        name: "crm profile layout",
        component: () =>
          import(
            /* webpackChunkName: "CRM Profile Layout" */ "../views/CRM/Profile/ProfileLayout.vue"
          ),
        children: [
          {
            meta: {
              title: "CRM Profile",
              requiresAuth: true,
            },
            path: "/crm/profile",
            name: "crm profile",
            component: () =>
              import(
                /* webpackChunkName: "CRM Profile" */ "../views/CRM/Profile/Profile.vue"
              ),
          },
          {
            meta: {
              title: "CRM Permission",
              requiresAuth: true,
            },
            path: "/crm/permission",
            name: "crm permission",
            component: () =>
              import(
                /* webpackChunkName: "CRM Permission" */ "../views/CRM/Profile/Permission.vue"
              ),
          },
          {
            meta: {
              title: "CRM Password Reset",
              requiresAuth: true,
            },
            path: "/crm/password-reset",
            name: "crm password reset",
            component: () =>
              import(
                /* webpackChunkName: "CRM Password Reset" */ "../views/CRM/Profile/PassReset.vue"
              ),
          },
        ],
      },
      //Organization pages
      //Student
      {
        meta: {
          title: "CRM Students",
          requiresAuth: true,
        },
        path: "/crm/students",
        name: "crm students",
        component: () =>
          import(
            /* webpackChunkName: "CRM Students" */ "../views/CRM/Organization/Students/Students.vue"
          ),
      },
      {
        meta: {
          title: "CRM Add Student",
          requiresAuth: true,
        },
        path: "/crm/add-student",
        name: "crm add student",
        component: () =>
          import(
            /* webpackChunkName: "CRM Add Student" */ "../views/CRM/Organization/Students/AddStudent.vue"
          ),
      },
      {
        meta: {
          title: "CRM Event Calendar",
          requiresAuth: true,
        },
        path: "/crm/event-calendar",
        name: "crm event calendar",
        component: () =>
          import(
            /* webpackChunkName: "CRM Event Calendar" */ "../views/CRM/EventCalendar.vue"
          ),
      },
      {
        meta: {
          title: "CRM Notice Calendar",
          requiresAuth: true,
        },
        path: "/crm/notice-calendar",
        name: "crm notice calendar",
        component: () =>
          import(
            /* webpackChunkName: "CRM Notice Calendar" */ "../views/CRM/NoticeCalendar.vue"
          ),
      },
      {
        meta: {
          title: "CRM FAQ",
          requiresAuth: true,
        },
        path: "/crm/faq",
        name: "CRM FAQ",
        component: () =>
          import(/* webpackChunkName: "CRM FAQ" */ "../views/FAQ.vue"),
      },
      {
        meta: {
          title: "Delivery Partner",
          requiresAuth: true,
        },
        path: "/crm/delivery-partners",
        name: "delivery-partners",
        component: () =>
          import(
            /* webpackChunkName: "delivery-partners" */ "../views/DeliveryPartner.vue"
          ),
      },
      {
        meta: {
          title: "Product List",
          requiresAuth: true,
        },
        path: "/crm/product-list",
        name: "product-list",
        component: () =>
          import(
            /* webpackChunkName: "product-list" */ "../views/ProductList.vue"
          ),
      },
      {
        meta: {
          title: "Product Detail",
          requiresAuth: true,
        },
        path: "/crm/product-detail",
        name: "product-Detail",
        component: () =>
          import(
            /* webpackChunkName: "product-Detail" */ "../views/ProductDetail.vue"
          ),
      },
      {
        meta: {
          title: "Category List",
          requiresAuth: true,
        },
        path: "/crm/category-list",
        name: "Category-list",
        component: () =>
          import(
            /* webpackChunkName: "Category-list" */ "../views/Category.vue"
          ),
      },
      {
        meta: {
          title: "Carts List",
          requiresAuth: true,
        },
        path: "/crm/carts-list",
        name: "Carts-list",
        component: () =>
          import(/* webpackChunkName: "Carts-list" */ "../views/Carts.vue"),
      },
      {
        meta: {
          title: "Address List",
          requiresAuth: true,
        },
        path: "/crm/address-list",
        name: "Address-list",
        component: () =>
          import(/* webpackChunkName: "Address-list" */ "../views/Address.vue"),
      },
      {
        meta: {
          title: "Cart List",
          requiresAuth: true,
        },
        path: "/crm/cart",
        name: "Cart-list",
        component: () =>
          import(/* webpackChunkName: "Cart-list" */ "../views/Cart.vue"),
      },
      {
        meta: {
          title: "Editor",
          requiresAuth: false,
        },
        path: "/crm/editor",
        name: "editor",
        component: () =>
          import(/* webpackChunkName: "editor" */ "../views/Editor.vue"),
      },

      {
        meta: {
          title: "Order List",
          requiresAuth: true,
        },
        path: "/crm/order-list",
        name: "order-list",
        component: () =>
          import(/* webpackChunkName: "order-list" */ "../views/OrderList.vue"),
      },
      {
        meta: {
          title: "CRM Privacy Policy",
          requiresAuth: true,
        },
        path: "/crm/privacy-policy",
        name: "CRM Privacy Policy",
        component: () =>
          import(
            /* webpackChunkName: "CRM Privacy Policy" */ "../views/PolicyPages/PrivacyPolicy.vue"
          ),
      },
      {
        meta: {
          title: "CRM Terms",
          requiresAuth: true,
        },
        path: "/crm/terms",
        name: "CRM Terms",
        component: () =>
          import(
            /* webpackChunkName: "CRM Terms" */ "../views/PolicyPages/Terms.vue"
          ),
      },
      {
        meta: {
          title: "CRM Contact",
          requiresAuth: true,
        },
        path: "/crm/contact",
        name: "CRM Contact",
        component: () =>
          import(/* webpackChunkName: "CRM Contact" */ "../views/Contact.vue"),
      },
      {
        meta: {
          title: "CRM Designation List",
          requiresAuth: true,
        },
        path: "/crm/designation",
        name: "CRM Designation List",
        component: () =>
          import(
            /* webpackChunkName: "CRM Designation List" */ "../views/CRM/Designation/DesignationList.vue"
          ),
      },
      {
        meta: {
          title: "CRM Staff List",
          requiresAuth: true,
        },
        path: "/crm/staff",
        name: "CRM Staff List",
        component: () =>
          import(
            /* webpackChunkName: "CRM Staff List" */ "../views/CRM/Staff/StaffList.vue"
          ),
      },
      {
        meta: {
          title: "CRM Staff Permission",
          requiresAuth: true,
        },
        path: "/crm/staff-permission",
        name: "CRM Staff Permission",
        component: () =>
          import(
            /* webpackChunkName: "CRM Staff Permission" */ "../views/CRM/Staff/StaffPermission.vue"
          ),
      },

      // start organization
      {
        meta: {
          title: "Setting Organization Layout",
          requiresAuth: true,
        },
        path: "/crm/organization-layout",
        redirect: "/crm/organization/setting/class-list",
        name: "Setting Organization layout",
        component: () =>
          import(
            /* webpackChunkName: "Setting Organization Layout" */ "../views/CRM/Organization/Settings/BranchLayout.vue"
          ),
        children: [
          {
            meta: {
              title: "Organization Class List",
              requiresAuth: true,
            },
            path: "/crm/organization/setting/class-list",
            name: "Organization Class List",
            component: () =>
              import(
                /* webpackChunkName: "Organization Class List" */ "../views/CRM/Organization/Settings/ClassList.vue"
              ),
          },
          {
            meta: {
              title: "Organization Division List",
              requiresAuth: true,
            },
            path: "/crm/organization/setting/division-list",
            name: "Organization Division list",
            component: () =>
              import(
                /* webpackChunkName: "Organization Division List" */ "../views/CRM/Organization/Settings/DivisionList.vue"
              ),
          },
          {
            meta: {
              title: "Organization Category",
              requiresAuth: true,
            },
            path: "/crm/organization/setting/books-category",
            name: "Organization Category",
            component: () =>
              import(
                /* webpackChunkName: "Organization Category" */ "../views/CRM/Organization/Settings/BookCategoryList.vue"
              ),
          },
          {
            meta: {
              title: "Organization department",
              requiresAuth: true,
            },
            path: "/crm/organization/setting/department",
            name: "Organization department",
            component: () =>
              import(
                /* webpackChunkName: "Organization department" */ "../views/CRM/Organization/Settings/DepartmentList.vue"
              ),
          },
          {
            meta: {
              title: "Organization designation",
              requiresAuth: true,
            },
            path: "/crm/organization/setting/designation",
            name: "Organization designation",
            component: () =>
              import(
                /* webpackChunkName: "Organization Designation" */ "../views/CRM/Organization/Settings/DesignationList.vue"
              ),
          },
          {
            meta: {
              title: "Organization house zone",
              requiresAuth: true,
            },
            path: "/crm/organization/setting/house-zone",
            name: "Organization house zone",
            component: () =>
              import(
                /* webpackChunkName: "Organization house zone" */ "../views/CRM/Organization/Settings/HouseZoneList.vue"
              ),
          },
          {
            meta: {
              title: "Organization Subject",
              requiresAuth: true,
            },
            path: "/crm/organization/setting/subject",
            name: "Organization Subject",
            component: () =>
              import(
                /* webpackChunkName: "Organization Subject" */ "../views/CRM/Organization/Settings/SubjectList.vue"
              ),
          },
          {
            meta: {
              title: "Organization Permission",
              requiresAuth: true,
            },
            path: "/crm/organization/setting/permission",
            name: "Organization permission",
            component: () =>
              import(
                /* webpackChunkName: "Organization Permission" */ "../views/CRM/Organization/Settings/OrgPermission.vue"
              ),
          },
          {
            meta: {
              title: "Organization CSV Download",
              requiresAuth: true,
            },
            path: "/crm/organization/setting/csv-download",
            name: "Organization CSV Download",
            component: () =>
              import(
                /* webpackChunkName: "Organization CSV Download" */ "../views/CRM/Organization/Settings/DownloadCsvPermission.vue"
              ),
          },
          {
            meta: {
              title: "Organization staff CSV Download",
              requiresAuth: true,
            },
            path: "/crm/organization/setting/staff-csv-download",
            name: "Organization staff CSV Download",
            component: () =>
              import(
                /* webpackChunkName: "Organization staff CSV Download" */ "../views/CRM/Organization/Settings/DownloadCsvStaffPermission.vue"
              ),
          },
        ],
      },
      {
        meta: {
          title: "Organization List",
          requiresAuth: true,
        },
        path: "/crm/organization-list",
        name: "Organization List",
        component: () =>
          import(
            /* webpackChunkName: "Organization List" */ "../views/CRM/Organization/List.vue"
          ),
      },
      {
        meta: {
          title: "Create Organization",
          requiresAuth: true,
        },
        path: "/crm/add-organization",
        name: "Create Organization",
        component: () =>
          import(
            /* webpackChunkName: "Create Organization" */ "../views/CRM/Organization/Add.vue"
          ),
      },
      {
        meta: {
          title: "Edit Organization",
          requiresAuth: true,
        },
        path: "/crm/edit-organization",
        name: "Edit Organization",
        component: () =>
          import(
            /* webpackChunkName: "Edit Organization" */ "../views/CRM/Organization/Edit.vue"
          ),
      },
      {
        meta: {
          title: "Attendance Student Organization",
          requiresAuth: true,
        },
        path: "/crm/attendance-student-organization",
        name: "Edit Attendance Student Organization",
        component: () =>
          import(
            /* webpackChunkName: "Attendance Student Organization" */ "../views/CRM/Organization/Student/Attendance.vue"
          ),
      },
      {
        meta: {
          title: "Organization My branch",
          requiresAuth: true,
        },
        path: "/crm/organization/my-branch",
        name: "Organization My branch",
        component: () =>
          import(
            /* webpackChunkName: "Organization My branch" */ "../views/CRM/Organization/Branch/MyBranchList.vue"
          ),
      },
      {
        meta: {
          title: "Organization My student",
          requiresAuth: true,
        },
        path: "/crm/organization/my-student",
        name: "Organization My student",
        component: () =>
          import(
            /* webpackChunkName: "My Organization student" */ "../views/CRM/Organization/Student/MyStudentList.vue"
          ),
      },
      {
        meta: {
          title: "Organization Student Profile",
          requiresAuth: true,
        },
        path: "/crm/organization/student-profile",
        name: "Organization student profile",
        component: () =>
          import(
            /* webpackChunkName: "Organization Student Profile" */ "../views/CRM/Organization/Student/StudentDetails.vue"
          ),
      },
      {
        meta: {
          title: "Organization student by class div",
          requiresAuth: true,
        },
        path: "/crm/organization/students-by-class-section",
        name: "Organization student by class div",
        component: () =>
          import(
            /* webpackChunkName: "Organization student by class div" */ "../views/CRM/Organization/Student/StudentByClassDiv.vue"
          ),
      },
      {
        meta: {
          title: "Organization create student",
          requiresAuth: true,
        },
        path: "/crm/organization/create-my-student",
        name: "Organization create student",
        component: () =>
          import(
            /* webpackChunkName: "Organization create student" */ "../views/CRM/Organization/Student/AddStudent.vue"
          ),
      },
      {
        meta: {
          title: "Organization update student",
          requiresAuth: true,
        },
        path: "/crm/organization/update-my-student",
        name: "Organization update student",
        component: () =>
          import(
            /* webpackChunkName: "Organization update student" */ "../views/CRM/Organization/Student/EditStudent.vue"
          ),
      },
      {
        meta: {
          title: "Organization import student",
          requiresAuth: true,
        },
        path: "/crm/organization/import-student",
        name: "Organization import student",
        component: () =>
          import(
            /* webpackChunkName: "Organization import student" */ "../views/CRM/Organization/Student/Import.vue"
          ),
      },
      {
        meta: {
          title: "Organization student id card",
          requiresAuth: false,
        },
        path: "/crm/organization/student-id-card",
        name: "Organization student id card",
        component: () =>
          import(
            /* webpackChunkName: "Organization student id card" */ "../views/CRM/Organization/Student/IdCardList.vue"
          ),
      },
      {
        meta: {
          title: "Organization Final student id card",
          requiresAuth: false,
        },
        path: "/crm/organization/final-student-id-card",
        name: "Organization final student id card",
        component: () =>
          import(
            /* webpackChunkName: "Organization final student id card" */ "../views/CRM/Organization/Student/FinalIdCardList.vue"
          ),
      },
      {
        meta: {
          title: "Organization Final staff id card",
          requiresAuth: false,
        },
        path: "/crm/organization/final-staff-id-card",
        name: "Organization final staff id card",
        component: () =>
          import(
            /* webpackChunkName: "Organization final staff id card" */ "../views/CRM/Organization/Staff/FinalIdCardList.vue"
          ),
      },
      {
        meta: {
          title: "Organization Final student card",
          requiresAuth: false,
        },
        path: "/crm/organization/final-student-card",
        name: "Organization final student card",
        component: () =>
          import(
            /* webpackChunkName: "Organization final student card" */ "../views/CRM/Organization/Student/FinalIdCard.vue"
          ),
      },
      {
        meta: {
          title: "Organization Final staff card",
          requiresAuth: false,
        },
        path: "/crm/organization/final-staff-card",
        name: "Organization final staff card",
        component: () =>
          import(
            /* webpackChunkName: "Organization final staff card" */ "../views/CRM/Organization/Staff/FinalIdCard.vue"
          ),
      },

      {
        meta: {
          title: "CRM Organization Library",
          requiresAuth: true,
        },
        path: "/crm/organization/library",
        name: "CRM Organization Library",
        component: () =>
          import(
            /* webpackChunkName: "CRM Organization Library" */ "../views/CRM/Organization/Library/MyBookList.vue"
          ),
      },
      {
        meta: {
          title: "Organization My Staff",
          requiresAuth: true,
        },
        path: "/crm/organization/my-staff",
        name: "Organization My Staff",
        component: () =>
          import(
            /* webpackChunkName: "CRM My Staff" */ "../views/CRM/Organization/Staff/MyStaffList.vue"
          ),
      },
      {
        meta: {
          title: "Organization Import My Staff",
          requiresAuth: true,
        },
        path: "/crm/organization/import-staff",
        name: "Organization Import My Staff",
        component: () =>
          import(
            /* webpackChunkName: "Organization Import My Staff" */ "../views/CRM/Organization/Staff/Import.vue"
          ),
      },
      {
        meta: {
          title: "Organization Add Staff",
          requiresAuth: true,
        },
        path: "/crm/organization/add-staff",
        name: "CRM Organization Staff",
        component: () =>
          import(
            /* webpackChunkName: "Organization Add Staff" */ "../views/CRM/Organization/Staff/AddStaff.vue"
          ),
      },
      {
        meta: {
          title: "Organization Staff Profile Layout",
          requiresAuth: true,
        },
        path: "/crm/organization-staff-profile-layout",
        redirect: "/crm/organization-staff-profile",
        name: "Organization staff profile layout",
        component: () =>
          import(
            /* webpackChunkName: "Staff Profile Layout" */ "../views/CRM/Organization/Staff/Profile/StaffProfileLayout.vue"
          ),
        children: [
          {
            meta: {
              title: "Organization Staff Profile",
              requiresAuth: true,
            },
            path: "/crm/organization-staff-profile",
            name: "Organization crm Staff Profile",
            component: () =>
              import(
                /* webpackChunkName: "Organization Staff Profile" */ "../views/CRM/Organization/Staff/Profile/StaffProfile.vue"
              ),
          },
          {
            meta: {
              title: "Organization Staff Class",
              requiresAuth: true,
            },
            path: "/crm/organization-staff-class",
            name: "Organization Staff Class",
            component: () =>
              import(
                /* webpackChunkName: "Organization Staff Class" */ "../views/CRM/Organization/Staff/Profile/StaffClass.vue"
              ),
          },
          {
            meta: {
              title: "Organization Staff Class Students",
              requiresAuth: true,
            },
            path: "/crm/organization-staff-class-students",
            name: "Organization Staff Class Students",
            component: () =>
              import(
                /* webpackChunkName: "Organization Staff Class" */ "../views/CRM/Organization/Staff/Profile/StaffStudents.vue"
              ),
          },
          {
            meta: {
              title: "Organization Staff Department",
              requiresAuth: true,
            },
            path: "/crm/organization-staff-department",
            name: "Organization Staff Department",
            component: () =>
              import(
                /* webpackChunkName: "Organization Staff Department" */ "../views/CRM/Organization/Staff/Profile/StaffDepartment.vue"
              ),
          },
          {
            meta: {
              title: "Organization Staff Division",
              requiresAuth: true,
            },
            path: "/crm/organization-staff-division",
            name: "Organization Staff Division",
            component: () =>
              import(
                /* webpackChunkName: "CRM Organization Division" */ "../views/CRM/Organization/Staff/Profile/StaffDivision.vue"
              ),
          },
          {
            meta: {
              title: "CRM Staff Subject",
              requiresAuth: true,
            },
            path: "/crm/organization-staff-subject",
            name: "organization Staff Subject",
            component: () =>
              import(
                /* webpackChunkName: "Organization Staff Subject" */ "../views/CRM/Organization/Staff/Profile/StaffSubject.vue"
              ),
          },
          {
            meta: {
              title: "Organization Staff Documents",
              requiresAuth: true,
            },
            path: "/crm/organization-staff-Documents",
            name: "Organization Staff Documents",
            component: () =>
              import(
                /* webpackChunkName: "Organization Staff Documents" */ "../views/CRM/Organization/Staff/Profile/StaffDocuments.vue"
              ),
          },
          {
            meta: {
              title: "Organization Staff Time Table",
              requiresAuth: true,
            },
            path: "/crm/organization-staff-time-table",
            name: "Organization Staff time table",
            component: () =>
              import(
                /* webpackChunkName: "Organization Staff Documents" */ "../views/CRM/Organization/Staff/Profile/StaffTimeTable.vue"
              ),
          },
        ],
      },
      // end of organization
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !localStorage.getItem("accessToken")) {
    next("login");
  } else {
    next();
  }
});
export default router;
