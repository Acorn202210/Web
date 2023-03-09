import { createWebHistory, createRouter } from "vue-router";
import Faq from './components/faq/Faq.vue';
import FaqUpdateform from './components/faq/FaqUpdateform.vue';
import FaqInsertform from './components/faq/FaqInsertform.vue';
import Login from './components/user/login.vue';
import Signup from './components/user/signup.vue';
import UserList from './components/user/userList.vue';
import Notice from './components/notice/Notice.vue';
import NoticeDetail from './components/notice/detail';
import NoticeInsert from './components/notice/insert';
import Qna from './components/qna/Qna.vue';
import QnaFree from './components/qna_free/QnaFree.vue';
import QnaFreeDetail from './components/qna_free/detail.vue';
import QnaFreeInsertform from './components/qna_free/QnaFreeInsertform.vue';
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
        path: "/qnafree/:freeQuestionNum",
        component: QnaFreeDetail
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
        component: Notice,
    },
    {
        path: "/notice/:notiNum",
        component: NoticeDetail
    },
    {
        path:"/notice/insert",
        component: NoticeInsert
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
    {
        path: "/signup",
        component: Signup
    },
    {
        path: "/manager",
        component: UserList,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;