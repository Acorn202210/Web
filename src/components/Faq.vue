<template>
	<div>
	  <div v-for="user in users.body.data" :key="user">
		{{ user.question}}
	  </div>
	  <div>{{users.content}}</div>
	  <div>{{users.body.totalPage}}</div>
	  <div>{{users.body.currentPage}}</div>
	  <div>{{users.body.limit}}</div>
	</div>
  </template>
  <script>
  import axios from 'axios';
  export default {
	  name: 'Faq',
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
  }
  </script>
  <style>
  </style>