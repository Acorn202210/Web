import { createWebHistory, createRouter } from "vue-router";
import Notice from './components/notice/Notice.vue';
import Qna from './components/Qna.vue';
import Front from './components/lecture/Front.vue';
import Backend from './components/lecture/Backend.vue';
import Mobile from './components/lecture/Mobile.vue';
import LectureDetail from './components/lecture/LectureDetail.vue'
import LectureUploadForm from './components/lecture/LectureUploadForm.vue'
import Login from './components/user/Login.vue'


const routes = [
    {
        path: '/',
        redirect: '/home',
        
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
        path: "/lectureUploadForm",
        component: LectureUploadForm
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
