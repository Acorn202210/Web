import { createWebHistory, createRouter } from "vue-router";
import Faq from './components/Faq.vue';
import Notice from './components/Notice.vue';
import Qna from './components/Qna.vue';
import Lecture from './components/Lecture.vue';

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
        path: "/lecture",
        component: Lecture
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
