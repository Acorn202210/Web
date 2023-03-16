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
        <p class="mt-3">프론트 강의</p>
        <div class="row">
        <div class="col-3" v-for="tmp in front.data" :key="tmp.lecNum">
            <div class="card mb-3" >
            <a :href="`/lectureDetail/${tmp.lecNum}`">
                <div class="img-wrapper" style="width:100%">
                <img :src="`/project/api/lecture/${tmp.imageNum}/image?imageNum=${tmp.imageNum}`">
                </div>
            </a>
            </div>
        </div>
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
    };
  },
  created() {
    var vm = this;
    var url = '/project/api/lecture/lectureList';
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
      })
  },
  }
  </script>
  
  <style>
  @import '../assets/css/lecture.css'
  </style>