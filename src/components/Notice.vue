<template>
  <div>
	  <div v-for="user in users.data" :key="user">  
		<div v-if="user">{{ user.notiNum}}</div></div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Notice',
	  data(){
      return{
        users:{}
      }
	  },
    created(){
      var vm = this;
      axios.get("http://localhost:9000/project/api/notice/list")
      .then(function(response){
        console.log(response.data);
        vm.users = response.data.body;
      })
      .catch(function(error){
        console.log(error);
      })
    }
}
</script>

<style>

</style>