<template>
  <div class="col-md-2">
    <h5><a :class="{ 'bold-link': activeLink === 'front-all' }" @click="setActiveLink('front-all')">웹프론트엔드</a></h5>
    <br><a :class="{ 'bold-link': activeLink === 'front-js' }" @click="setActiveLink('front-js')">javascript</a>
    <br><a :class="{ 'bold-link': activeLink === 'front-html-css' }" @click="setActiveLink('front-html_css')">html/css</a>
    <br><a :class="{ 'bold-link': activeLink === 'front-react' }" @click="setActiveLink('front-react')">react</a>
    <br><a :class="{ 'bold-link': activeLink === 'front-vue' }" @click="setActiveLink('front-vue')">vue</a>
    <br><a :class="{ 'bold-link': activeLink === 'front-jQuery' }" @click="setActiveLink('front-jquery')">jquery</a>
    <br><br><h5><a :class="{ 'bold-link': activeLink === 'backend-all' }" @click="setActiveLink('backend-all')">웹백엔드</a></h5>
    <a :class="{ 'bold-link': activeLink === 'backend-java' }" @click="setActiveLink('backend-java')">java</a>
    <br><a :class="{ 'bold-link': activeLink === 'backend-spring' }" @click="setActiveLink('backend-spring')">spring</a>
    <br><a :class="{ 'bold-link': activeLink === 'backend-springboot' }" @click="setActiveLink('backend-springboot')">springboot</a>
    <br><br><h5><a :class="{ 'bold-link': activeLink === 'mobile-all' }" @click="setActiveLink('mobile-all')">모바일</a></h5>
    <a :class="{ 'bold-link': activeLink === 'mobile-kotlin' }" @click="setActiveLink('mobile-kotlin')">kotlin</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeLink: ''
      }
    },
    methods: {
      setActiveLink(link) {
        this.activeLink = link
        this.$router.push(`/lectureList/${link.replace('-', '/')}`)
      }
    },
    mounted() {
    }
  }
</script>
  
<style>
  .bold-link {
    font-weight: bold;
  }
</style>
  