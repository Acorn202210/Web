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
import axios from 'axios';

export default {
  name: 'App',
  data(){
    return{
      users: []
      
    }
  }, 
  created() {
    var vm = this;
    axios.get('http://localhost:9000/project/api/faq/Faqlist')
      .then(function(response) {
        console.log(response);
        vm.users = response.data;
      })
      .catch(function(error) {
        console.log(error);
      })
  },

  methods:{
    
  },
  components: {
    Header,
    Footer
  },
  
  
}
</script>

<style>

</style>
