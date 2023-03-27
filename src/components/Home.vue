<template>
  <div class="visual-bg">
    <div class="container hero">
      <div class="row">
        <div class="col-12 col-xl-6 ">
          <h1 style="color:white">Programing Lecture Homepage</h1>
          <p class="mt-2" style="color:white">Acorn 2조</p>
          <!-- <button class="btn btn-light btn-lg action-button" type="button">Learn More</button> -->
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="wrap">
      <ul>
        <p class="mt-3">프론트 강의</p>
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
        <p>백엔드 강의</p>
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
        <p>모바일 강의</p>
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