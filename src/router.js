import { createRouter, createWebHistory } from "vue-router";
import { getStorage } from "./common";
import { PROFILE_KEY } from "./common/constants";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: () => import("./pages/Home.vue"),
            meta: { requiresAuth: true, isAdmin: true },
        },
        {
            path: "/user/:id",
            component: () => import("./pages/UserDetail.vue"),
            meta: { requiresAuth: true, isAdmin: true },
        },
        {
            path: "/login",
            component: () => import("./pages/Login.vue"),
            meta: { requiresAuth: false, isAdmin: false },
        },
        {
            path: "/game",
            component: () => import("./pages/Game.vue"),
            meta: { requiresAuth: true, isAdmin: true },
        },
        {
            path: "/game/:code",
            component: () => import("./pages/GameControll.vue"),
            meta: { requiresAuth: true, isAdmin: true },
        },
        {
            path: "/setting",
            component: () => import("./pages/SettingPage.vue"),
            meta: { requiresAuth: true, isAdmin: true },
        },
        {
            path: "/request-money",
            component: () => import("./pages/RequestMoney.vue"),
            meta: { requiresAuth: true, isAdmin: true },
        },
        {
            path: "/profile",
            component: () => import("./pages/Profile.vue"),
            meta: { requiresAuth: true, isAdmin: true },
        },
        {
            path: "/:pathMatch(.*)*",
            component: () => import("./pages/404.vue"),
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const profile = getStorage(PROFILE_KEY);

    if (to.matched.some((record) => record.meta.requiresAuth) && !profile)
        next({ path: "/login" });

    if (to.matched.some((record) => record.meta.isAdmin) && profile.role !== "admin")
        next({ path: "/" });

    return next();
});

export default router;