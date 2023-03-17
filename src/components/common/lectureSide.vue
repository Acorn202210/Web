<template>
    <div class="col-md-2">
        <a @click="this.$router.push(`/lectureList/front/all`).then(() => this.$router.go(0))">웹프론트엔드</a>
      <br><a @click="this.$router.push(`/lectureList/front/js`).then(() => this.$router.go(0))">javascript</a>
      <br><a @click="this.$router.push(`/lectureList/front/html_css`).then(() => this.$router.go(0))">html/css</a>
      <br><a @click="this.$router.push(`/lectureList/front/react`).then(() => this.$router.go(0))">react</a>
      <br><a @click="this.$router.push(`/lectureList/front/vue`).then(() => this.$router.go(0))">vue</a>
      <br><a @click="this.$router.push(`/lectureList/front/jQuery`).then(() => this.$router.go(0))">jquery</a>
      <br><br><h5><a @click="this.$router.push(`/lectureList/backend/all`).then(() => this.$router.go(0))">웹백엔드</a></h5>
      <a @click="this.$router.push(`/lectureList/backend/java`).then(() => this.$router.go(0))">java</a>
      <br><a @click="this.$router.push(`/lectureList/backend/spring`).then(() => this.$router.go(0))">spring</a>
      <br><a @click="this.$router.push(`/lectureList/backend/springboot`).then(() => this.$router.go(0))">springboot</a>
      <br><br><h5><a @click="this.$router.push(`/lectureList/mobile/all`).then(() => this.$router.go(0))">모바일</a></h5>
      <a @click="this.$router.push(`/lectureList/mobile/kotlin`).then(() => this.$router.go(0))">kotlin</a>
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
  