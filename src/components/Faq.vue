<template>
	<div>
	  <div v-for="user in users.data" :key="user">  
		<div v-if="user">{{ user.question}}</div></div>
		<div>{{ users }}</div>
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
	  name: 'Faq',
	  data(){
		  return{
			paging:[],
			  users: []
		  }
	  },
	  created() {
	  var vm = this;
	  axios.get('http://localhost:9000/project/api/faq/Faqlist')
		.then(function(response) {
		  console.log(response);
		  vm.users = response.data.body;
		})
		.catch(function(error) {
		  console.log(error);
		})
	},
  }
  </script>
  
  <style>
  </style>