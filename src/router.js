import { createWebHistory, createRouter } from "vue-router";
import Faq from './components/Faq.vue';
import Notice from './components/Notice.vue';
import Qna from './components/Qna.vue';
import Front from './components/Front.vue';
import Backend from './components/Backend.vue';
import Mobile from './components/Mobile.vue';

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
        path: "/front",
        component: Front
    },
    {
        path: "/backend",
        component: Backend
    },
    {
        path: "/mobile",
        component: Mobile
    },
    {
        path: "/notice",
        component: Notice
    },
    {
        path: "/qna",
        component: Qna
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
