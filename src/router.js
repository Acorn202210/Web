import { createWebHistory, createRouter } from "vue-router";
import Faq from './components/faq/Faq.vue';
import FaqUpdateform from './components/faq/FaqUpdateform.vue';
import FaqInsertform from './components/faq/FaqInsertform.vue';
import Login from './components/user/login.vue';
import Signup from './components/user/signup.vue';
import UserList from './components/user/userList.vue';
import MyPage from './components/user/myPage.vue';
import PwdUpdate from './components/user/pwdUpdate.vue';
import UserUpdate from './components/user/update.vue';
import Notice from './components/notice/Notice.vue';
import NoticeDetail from './components/notice/detail';
import NoticeInsert from './components/notice/insert';
import NoticeUpdate from './components/notice/update';
import Qna from './components/qna/Qna.vue';
import qnainsertform from './components/qna/qnainsertform.vue';
import QnaDetail from './components/qna/QnaDetail.vue';
import QnaUpdate from './components/qna/QnaUpdate.vue'
import QnaFree from './components/qna_free/QnaFree.vue';
import QnaFreeDetail from './components/qna_free/detail.vue';
import QnaFreeInsert from './components/qna_free/insert.vue';
import QnaFreeUpdate from './components/qna_free/update.vue';
import Front from './components/lecture/Front.vue';
import Backend from './components/lecture/Backend.vue';
import Mobile from './components/lecture/Mobile.vue';
import LectureDetail from './components/lecture/LectureDetail.vue'
import LectureUploadForm from './components/lecture/LectureUploadForm.vue'

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
        path: "/qnafree/insert",
        component: QnaFreeInsert
    },
    {
        path: "/qnafree/update/:freeQuestionNum",
        component: QnaFreeUpdate
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
        path: "/lectureUploadForm",
        component: LectureUploadForm
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
        path:"/notice/update",
        component: NoticeUpdate
    },
    {
        path: "/qna",
        component: Qna
    },
    {
        path: "/qna-insertform",
        component: qnainsertform,
    },
    {
        path: "/qna/:boardQuestionNum",
        component: QnaDetail,
    },
    {
        path: "/qnaupdate/:boardQuestionNum",
        component: QnaUpdate,
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
    {
        path: "/my-page",
        component: MyPage,
    }, 
    {
        path: "/pwd-update",
        component: PwdUpdate,
    },
    {
        path: "/user-update",
        component: UserUpdate,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;