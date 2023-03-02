import { createWebHistory, createRouter } from "vue-router";
import Faq from './components/Faq.vue';

const routes = [
    {
        path: '/',
        redirect: '/home',
        
    },
    {
        path: "/faq",
        component: Faq
    },
    {
        path: "/home",
        component: () => import('@/components/Home.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
