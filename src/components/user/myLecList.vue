<template>
    <div class="sub-tit-box">
        <div class="container">
            <h3 class="sub-tit">나의 강의실</h3>
        </div>
    </div>
    <div class="container">
        <div class="mb-4">
            <a @click="$router.push('/my-lec-list')" class="fw-bold me-3">수강 중인 강의</a>
            <a @click="$router.push('/my-complete-lec-list')">수강 완료한 강의</a>
        </div>
        <h4>수강 중인 강의</h4>
        <div class="row">
            <div class="col-6 col-md-4 col-lg-2 mt-3" v-for="tmp in myLec.lectureData" :key="tmp.imageNum">
                <a :href="`/lectureDetail/${tmp.lecNum}`">
                    <img class="myLecList-img" :src="`/project/api/lecture/${tmp.imageNum}/image?imageNum=${tmp.imageNum}`">
                </a>
            </div>
        </div>
    </div>
    <nav class="mt-5">
        <ul class="pagination justify-content-center">
            <li class="page-item" v-if="myLec.startPageNum != 1">
                <a class="page-link new-page-link" @click="paging(myLec.startPageNum - 1)">
                    <span aria-hidden="true">&lt;</span>
                </a>
            </li>

            <li v-for="i in 5" :key="i"
                :class="['page-item', myLec.currentPage == i + myLec.startPageNum - 1 ? 'active' : '']">
                <a class="page-link new-page-link" v-if="i + myLec.startPageNum - 1 <= myLec.endPageNum"
                    @click="paging(i + myLec.startPageNum - 1)">{{ i + myLec.startPageNum - 1 }}</a>
            </li>

            <li class="page-item" v-if="myLec.endPageNum < myLec.totalPage">
                <a class="page-link new-page-link" @click="paging(myLec.endPageNum + 1)">
                    <span aria-hidden="true">&gt;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
  
<script>
import axios from 'axios';
export default {
    name: 'myPage',
    data() {
        return {
            myLec: {}
        }
    },
    created() {
        var vm = this;
        var url = "/project/api/users/my-lecture-list";
        axios.get(url)
            .then(function (response) {
                vm.myLec = response.data.body;
                console.log(vm.myLec);
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    methods: {
        paging: function (currentPage) {
            var vm = this;
            var url = "/project/api/users/my-lecture-list";
            const data = {
                currentPage: currentPage
            }
            axios.get(url, { params: data })
                .then(function (response) {
                    vm.myLec = response.data.body;
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
    }
}
</script>
<style></style>