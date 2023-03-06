import { createWebHistory, createRouter } from "vue-router";
import Faq from './components/Faq.vue';
import Notice from './components/notice/notice.vue';
import NoticeDetail from './components/notice/detail';
import Qna from './components/Qna.vue';
import Front from './components/Front.vue';
import Backend from './components/Backend.vue';
import Mobile from './components/Mobile.vue';
import Login from './components/user/login.vue';

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
        path: "/notice/detail",
        component: NoticeDetail
    },
    {
        path: "/qna",
        component: Qna
    },
    {
        path: "/home",
        component: () => import('@/components/Home.vue')
    },
    {
        path: "/login",
        component: Login
    },
   
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
