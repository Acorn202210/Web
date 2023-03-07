<template>
    <div class="wrapper">
        <div class="container"></div>
      <h1>{{ detail.title }}</h1>
      <div>
        <img :src="`http://localhost:9000/project/api/lecture/${detail.lecNum}/image?lecNum=${detail.lecNum}`" style="width: 350px; height: 350px;">
      </div>
      <p>{{ detail.describe }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LectureDetail',
    data() {
      return {
        detail: {},
      };
    },
    created() {
      axios
        .get(`http://localhost:9000/project/api/lecture/${this.$route.params.lecNum}/lecture-one`)
        .then(response => {
          console.log(response.data.body);
          this.detail = response.data.body;
        })
        .catch(error => {
          console.error(error);
        });
    },
  };
  </script>