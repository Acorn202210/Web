<template>
    <div>
      <h1>{{ detail.title }}</h1>
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
        .get(`http://localhost:9000/project/api/lecture/${this.$route.params.lecNum}/lectureOne`)
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