import { createWebHistory, createRouter } from "vue-router";

import Faq from './components/faq/Faq.vue';
import Login from './components/user/Login.vue';
import Updateform from './components/faq/Updateform.vue';
import Insertform from './components/faq/Insertform.vue';
import Notice from './components/notice/Notice.vue';
import NoticeDetail from './components/notice/detail';
import Qna from './components/qna/Qna.vue';
import Front from './components/lecture/Front.vue';
import Backend from './components/lecture/Backend.vue';
import Mobile from './components/lecture/Mobile.vue';
import LectureDetail from './components/lecture/LectureDetail.vue'


// let path2 = '/' + window.location.host;
// console.log(path2);


const routes = [
    {
        path: '/',
        redirect: '/home',
        
    },
    {
        path: "/faq",
        component: Faq,
    },
    {
        path: "/updateform/:num",
        component: Updateform,
    },
    {
        path: "/insertform",
        component: Insertform,
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
        path: "/lectureDetail/:lecNum",
        component: LectureDetail
    },
    {
        path: "/notice",
        component: Notice,
    },
    {
        path: "/notice/:notiNum",
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