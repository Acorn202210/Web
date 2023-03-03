<template>
	<div>
	  <div v-for="front in list.body.data" :key="front">  {{ front.list}}</div>
	  <div>{{list.body}}</div>
	  <div>{{list.body.totalPage}}</div>
	  <div>{{list.body.currentPage}}</div>
	  <div>{{list.body.limit}}</div>
	</div>
  </template>
  <script>
  import axios from 'axios';
  export default {
	  name: 'Front',
	  data(){
		  return{
			  list: []
		  }
	  },
	  created() {
	  var vm = this;
	  axios.get('http://localhost:9000/project/api/lecture/lectureList?largeCategory=backend&smallCategory=all')
		.then(function(response) {
		  console.log(response);
		  vm.list = response.data;
		})
		.catch(function(error) {
		  console.log(error);
		})
	},
  }
  </script>
  <style>
  </style>
