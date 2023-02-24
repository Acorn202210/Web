import { createWebHistory, createRouter } from "vue-router";
import Faq from './components/Faq.vue';

const routes = [
    {
        path: "/faq",
        component: Faq,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
