<template>
  <div class="container">

    <div>
      <a href="/lectureUploadForm">강의 등록</a>
    </div>
    <div class="row">
      <div class="col-6 col-md-4 col-lg-3" v-for="front in list.data" :key="front.lecNum">
        <div class="card mb-3">
          <a :href="`/lectureDetail/${front.lecNum}`">
            <div class="img-wrapper">
              <img :src="`/project/api/lecture/${front.imageNum}/image?lecNum=${front.imageNum}`">
            </div>
          </a>
          <div class="card-body">
            <h5>{{ front.title }}</h5>
            <p><strong>{{ front.teacher }}</strong></p>
          </div>
        </div>
      </div>
    </div>
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" v-if="list.startPageNum != 1">
          <a class="page-link new-page-link" @click="paging(list.startPageNum - 1)">
            <span aria-hidden="true">&lt;</span>
          </a>
        </li>

        <li v-for="i in 5" :key="i" class="page-item ${list.pageNum eq i ? 'active' : '' }">
          <a class="page-link new-page-link" v-if="i + list.startPageNum - 1 <= list.endPageNum"
            @click="paging(i + list.startPageNum - 1)">{{ i + list.startPageNum - 1 }}</a>
        </li>

        <li class="page-item" v-if="list.endPageNum < list.totalPage">
          <a class="page-link new-page-link" @click="paging(list.endPageNum + 1)">
            <span aria-hidden="true">&gt;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: 'front',
  data() {
    return {
      list: {
        data: [],
      },
      lecNum: '',
      teacher: '',
      lecWriter: '',
      title: '',
      describe: '',
      videoPath: '',
      viewCount: '',
      userRegdate: '',
      largeCategory: 'front',
      smallCategory: 'all',
      updateId: '',
      serviceYnCode: '',
    };
  },
  created() {
    var vm = this;
    var url = '/project/api/lecture/lectureList';
    const data = {
      limit: 5,
      largeCategory: vm.largeCategory,
      smallCategory: vm.smallCategory
    }
    axios.get(url, { params: data })
      .then(function (response) {
        console.log(response.data);
        vm.list = response.data.body;
      })
      .catch(function (error) {
        console.log(error);
      })
  },
  methods: {
    paging: function (currentPage) {
      const url = '/project/api/lecture/lectureList';
      const data = {
        limit: 5,
        currentPage: currentPage,
        largeCategory: this.largeCategory,
        smallCategory: this.smallCategory,
      };
      axios.get(url, { params: data })
        .then(response => {
          this.list = response.data.body;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
}
</script>
<style>
@import '../../assets/css/lecture.css'
</style>
  