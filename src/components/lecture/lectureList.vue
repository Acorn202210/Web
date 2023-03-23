<template>
  <div class="wrapper">
    <div class="sub-tit-box">
      <div class="container">
        <h3 class="sub-tit" v-if="smallCategory !== 'all'">{{ smallCategory }}</h3>
        <h3 class="sub-tit" v-if="smallCategory === 'all'">{{ largeCategory }}</h3>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <lectureSide/>
        <div class="col-md-8 col-lg-9">
          <div class="row">
            <div class="col-12">
              <div class="d-flex justify-content-end mb-3" v-if="$store.getters.isManager == 'Y'">
                <a class="new-btn btn btn-sm" @click="this.$router.push(`/lectureUploadForm`)">등록</a>
              </div>
            </div>
            <div class="col-6 col-md-4 col-lg-3" v-for="lectureList in list.data" :key="lectureList.lecNum">
              <div class="card mb-3">
                <a @click="this.$router.push(`/lectureDetail/${lectureList.lecNum}`)">
                  <div class="img-wrapper">
                    <img :src="`/project/api/lecture/${lectureList.imageNum}/image?imageNum=${lectureList.imageNum}`">
                  </div>
                </a>
                <div class="card-body">
                  <div>
                    <h5>{{ lectureList.title }}</h5>
                    <p><strong>Teacher.</strong>{{ lectureList.teacher }}</p>
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

                <li v-for="i in 5" :key="i"
                  :class="['page-item', list.currentPage == i + list.startPageNum - 1 ? 'active' : '']">
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
      </div>
    </div>
  </div>
  </div>
</template>


    
<script>
import axios from 'axios';
import lectureSide from '../common/lectureSide.vue';

export default {
  name: 'lectureList',
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
      largeCategory: this.$route.params.largeCategory,
      smallCategory: this.$route.params.smallCategory,
      updateId: '',
      serviceYnCode: '',
    };
  },
  components: {
    lectureSide,
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const url = '/project/api/lecture/lectureList';
      const data = {
        limit: 8,
        largeCategory: this.largeCategory,
        smallCategory: this.smallCategory,
      };
      axios
        .get(url, { params: data })
        .then((response) => {
          this.list = response.data.body;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    paging(currentPage) {
      var vm = this;
      const url = '/project/api/lecture/lectureList';
      const data = {
        limit: 8,
        currentPage: currentPage,
        largeCategory: vm.largeCategory,
        smallCategory: vm.smallCategory,
      };
      axios
        .get(url, { params: data })
        .then((response) => {
          vm.list = response.data.body;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    $route(to) {
      this.largeCategory = to.params.largeCategory;
      this.smallCategory = to.params.smallCategory;
      this.getList();
    },
  },
};
</script>


  <style>
  @import '../../assets/css/lecture.css'
  </style>
    