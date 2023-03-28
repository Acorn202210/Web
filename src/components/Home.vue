<template>
  <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <img src="../assets/img/banner01.png" class="d-block w-100" >
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img src="../assets/img/banner02.png" class="d-block w-100" >
        </div>
        <div class="carousel-item">
          <img src="../assets/img/banner03.png" class="d-block w-100" >
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  <div class="container">
    <div class="wrap">
      <ul>
        <p class="mt-3"><a @click="this.$router.push(`/lectureList/front/all`)">프론트 강의</a></p>
        <li v-for="tmp in front.data" :key="tmp.lecNum">
          <div class="contain mb-3">
            <a @click="this.$router.push(`/lectureDetail/${tmp.lecNum}`)">
              <img class="home-img" :src="`/plec/api/lecture/${tmp.imageNum}/image?imageNum=${tmp.imageNum}`">
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div class="wrap">
      <ul>
        <p><a @click="this.$router.push(`/lectureList/backend/all`)">백엔드 강의</a></p>
        <li v-for="tmp in back.data" :key="tmp.lecNum">
          <div class="contain mb-3">
            <a @click="this.$router.push(`/lectureDetail/${tmp.lecNum}`)">
              <img class="home-img" :src="`/plec/api/lecture/${tmp.imageNum}/image?imageNum=${tmp.imageNum}`">
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div class="wrap">
      <ul>
        <p><a @click="this.$router.push(`/lectureList/mobile/all`)">모바일 강의</a></p>
        <li v-for="tmp in mobile.data" :key="tmp.lecNum">
          <div class="contain mb-3">
            <a @click="this.$router.push(`/lectureDetail/${tmp.lecNum}`)">
              <img class="home-img" :src="`/plec/api/lecture/${tmp.imageNum}/image?imageNum=${tmp.imageNum}`">
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      front: {
        data: [],
      },
      back:{
        data:[]
      },
      mobile:{
        data:[]
      }
    };
  },
  created() {
    var vm = this;
    var url = '/plec/api/lecture/lectureList';
    const data = {
      limit: 5,
      largeCategory: 'front',
      smallCategory: 'all'
    }
    axios.get(url, { params: data })
      .then(function (response) {
        console.log(response.data);
        vm.front = response.data.body;
      })
      .catch(function (error) {
        console.log(error);
      });
    
    const data2 = {
      limit: 5,
      largeCategory: 'backend',
      smallCategory: 'all'
    }
    axios.get(url, { params: data2 })
      .then(function (response) {
        console.log(response.data);
        vm.back = response.data.body;
      })
      .catch(function (error) {
        console.log(error);
      })

    const data3 = {
      limit: 5,
      largeCategory: 'mobile',
      smallCategory: 'all'
    }
    axios.get(url, { params: data3 })
      .then(function (response) {
        console.log(response.data);
        vm.mobile = response.data.body;
      })
      .catch(function (error) {
        console.log(error);
      })
  },
  
}
</script>
  
<style>
@import '../assets/css/lecture.css'
</style>