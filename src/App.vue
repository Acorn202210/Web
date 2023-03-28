<template>
  
  <div class="wrapper" id="App">
    <Header/>
      <router-view></router-view>
    </div>
  <Footer/>
  
</template>

<script>
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'

export default {
  name: 'App',
  data(){
    return{
      users: []
      
    }
  }, 
  created() {

  },

  methods:{
    
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    document.title = 'plec';
  }
  
  
}
</script>

<style>

</style>