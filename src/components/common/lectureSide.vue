<template>
    <div class="col-md-2">
        <a @click="this.$router.push(`/lectureList/front/all`)">웹프론트엔드</a>
      <br><a @click="this.$router.push(`/lectureList/front/js`)">javascript</a>
      <br><a @click="this.$router.push(`/lectureList/front/html_css`)">html/css</a>
      <br><a @click="this.$router.push(`/lectureList/front/react`)">react</a>
      <br><a @click="this.$router.push(`/lectureList/front/vue`)">vue</a>
      <br><a @click="this.$router.push(`/lectureList/front/jQuery`)">jquery</a>
      <br><br><h5><a @click="this.$router.push(`/lectureList/backend/all`)">웹백엔드</a></h5>
      <a @click="this.$router.push(`/lectureList/backend/java`)">java</a>
      <br><a @click="this.$router.push(`/lectureList/backend/spring`)">spring</a>
      <br><a @click="this.$router.push(`/lectureList/backend/springboot`)">springboot</a>
      <br><br><h5><a @click="this.$router.push(`/lectureList/mobile/all`)">모바일</a></h5>
      <a @click="this.$router.push(`/lectureList/mobile/kotlin`)">kotlin</a>
  </div>
  </template>
  
  <script>
  export default {
    mounted() {

    }
  }
  </script>
  
  <style>
  
  </style>
  