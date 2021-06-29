import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/plugins/vuetify";
// import './plugins/vuetify'
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./styles/global.scss";
import store from "./store/index";
import "babel-polyfill";
import IdleVue from "idle-vue";
import dateUtils from "@/utils/dateUtils";
// Vue.use(require('vue-moment'));

const eventsEmitter = new Vue();

Vue.use(IdleVue, {
  eventsEmitter,
  store,
  idleTime: 5 * 60 * 1000,
  startAtIdle: false,
});

Vue.config.productionTip = false;
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         // this route requires auth, check if logged in
//         // if not, redirect to login page.
//         if (!store.getters.loggedIn) {
//             next({
//                 name: 'Login',
//             })
//         } else {
//             const roleBasedRoute = to.matched.find(record => record.meta.allowedRoles);
//             if (roleBasedRoute) {
//                 const allowedRoles = roleBasedRoute.meta.allowedRoles;
//                 const userRole = store.getters.userRole;
//                 if (allowedRoles.includes(userRole)) {
//                     next();
//                 } else {
//                     next({ name: "PageNotFound" })
//                 }
//             } else {
//                 // if(to.matched.some(record => record.meta.requiresAgreement)){
//                 //     if(!store.getters.agreementAccepted){
//                 //         next({
//                 //             name: 'acceptedTermsAndCondition',
//                 //         })
//                 //     }else{
//                 //         next();
//                 //     }
//                 // }else{
//                     next();
//                 // }
//             }
//         }
//     } else {
//         next() // make sure to always call next()!
//     }
// })
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: "Login",
      });
    } else {
      const roleBasedRoute = to.matched.find(
        (record) => record.meta.allowedRoles
      );
      if (roleBasedRoute) {
        const allowedRoles = roleBasedRoute.meta.allowedRoles;
        const userRole = store.getters.userRole;
        if (allowedRoles.includes(userRole)) {
          if (!store.getters.changePassword) {
            next({
              name: "changePassword",
            });
          } else {
            if (to.matched.some((record) => record.meta.requiresAgreement)) {
              if (!store.getters.agreementAccepted) {
                next({
                  name: "acceptedTermsAndCondition",
                });
              } else {
                next();
              }
            }
            next();
          }
        } else {
          next({ name: "PageNotFound" });
        }
      } else {
        if (!store.getters.changePassword) {
          next({
            name: "changePassword",
          });
        } else {
          if (to.matched.some((record) => record.meta.requiresAgreement)) {
            if (!store.getters.agreementAccepted) {
              next({
                name: "acceptedTermsAndCondition",
              });
            } else {
              next();
            }
          } else {
            next();
          }
        }
      }
    }
  } else {
    next(); // make sure to always call next()!
  }
});

Vue.filter("formatDate", (value) => dateUtils.millisToFormattedDate(value));
Vue.filter("formatTime", (value) => dateUtils.millisToFormattedTime(value));
Vue.use(vuetify);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
