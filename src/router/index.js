import Vue from "vue";
import VueRouter from "vue-router";
import Router from "vue-router";
import layout from "../layout";
import PageNotFound from "@/pages/PageNotFound";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);
Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "/conditions",
    component: layout,
  },
 
  {
    path: "/file",
    component: layout,
    meta: {
      requiresAuth: true,
      // allowedRoles: ["admin"],
      requiresAgreement: true,
    },
    children: [
      {
        path: "",
        name: "FileList",
        component: () => import("@/pages/manage/file/FileList"),
      },
      {
        path: "/new-file",
        name: "AddFile",
        component: () => import("@/pages/manage/file/AddFile"),
      },
    ],
  },
  {
    path: "/schema",
    component: layout,
    meta: {
      requiresAuth: true,
   
      requiresAgreement: true,
    },
    children: [
      {
        path: "",
        name: "Schema",
        component: () => import("@/pages/manage/treatment/index"),
      },
    ],
  },
  {
    path: "/manage",
    component: layout,
    meta: {
      requiresAuth: true,
      requiresAgreement: true,
    },
    children: [
      {
        path: "",
        name: "Manage",
        component: () => import("@/pages/manage/index"),
      },
    ],
  },
  {
    path: "/conditions",
    component: layout,
    meta: {
      requiresAuth: true,
      requiresAgreement: true,
    },
    children: [
      {
        path: "",
        name: "Condition",
        component: () => import("@/pages/dashboard/index"),
      },
      {
        path: "",
        name: "Profile",
        component: () => import("@/pages/profile-page/Profile"),
      },
    ],
  },
  {
    path: "/:condition/treatments",
    component: layout,
    meta: {
      requiresAuth: true,
      requiresAgreement: true,
    },
    children: [
      {
        path: "",
        name: "Treatment",
        component: () => import("@/pages/patient/index"),
      },
    ],
  },
  {
    path: "/:condition/treatments/:treatment/patientList",
    component: layout,
    meta: {
      requiresAuth: true,
      requiresAgreement: true,
    },
    children: [
      {
        path: "",
        name: "PatientList",
        component: () => import("@/pages/patient/index"),
      },
    ],
  },
  {
    path: "/:condition/treatments/:treatment/newPatient",
    component: layout,
    meta: {
      requiresAuth: true,
      requiresAgreement: true,
    },
    children: [
      {
        path: "",
        name: "NewPatient",
        component: () => import("@/new-components/pages/PatientDetail"),
      },
    ],
  },
  {
    path: "/:condition/treatments/:treatment/patientStatus/:mrn",
    component: layout,
    meta: {
      requiresAuth: true,
      requiresAgreement: true,
    },
    children: [
      {
        path: "",
        name: "EditPatient",
        component: () => import("@/new-components/pages/PatientDetail"),
      },
    ],
  },

  {
    path: "/user",
    component: layout,
    children: [
      {
        path: "profile",
        name: "profile",
        meta: {
          requiresAuth: true,
          requiresAgreement: true,
        },
        component: () => import("@/pages/user/profile"),
      },
      {
        path: "terms-and-condition",
        name: "acceptedTermsAndCondition",
        meta: {
          requiresAuth: true,
          requiresPasswordChange: true,
        },
        component: () => import("@/pages/Agreement"),
      },
    ],
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
