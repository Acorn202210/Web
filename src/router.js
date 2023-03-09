import { createWebHistory, createRouter } from "vue-router";
import Faq from './components/faq/Faq.vue';
import Login from './components/user/Login.vue';
import FaqUpdateform from './components/faq/FaqUpdateform.vue';
import FaqInsertform from './components/faq/FaqInsertform.vue';
import Notice from './components/notice/Notice.vue';
import Qna from './components/qna/Qna.vue';
import QnaFree from './components/qna_free/QnaFree.vue';
import QnaFreeInsertform from './components/qna_free/QnaFreeInsertform.vue';
import QnaFreeUpdateform from './components/qna_free/QnaFreeUpdateform.vue';
import Front from './components/lecture/Front.vue';
import Backend from './components/lecture/Backend.vue';
import Mobile from './components/lecture/Mobile.vue';
import LectureDetail from './components/lecture/LectureDetail.vue'

const routes = [
    {
        path: '/',
        redirect: '/home',
        
    },
    {
        path: "/qnafree",
        component: QnaFree
    },
    {
        path: "/qnafreeupdateform",
        component: QnaFreeUpdateform
    },
    {
        path: "/qnafreeinsertform",
        component: QnaFreeInsertform
    },
    {
        path: "/faq",
        component: Faq,
    },
    {
        path: "/faqupdateform/:num",
        component: FaqUpdateform,
    },
    {
        path: "/faqinsertform",
        component: FaqInsertform,
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
        component: Notice
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