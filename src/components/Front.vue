<template>
	<div>
	  <div v-for="front in list.body.data" :key="front.lecNum">
		{{ front.title }}
	  </div>
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
	  axios.get('http://localhost:9000/project/api/lecture/lectureList?largeCategory=front&smallCategory=all')
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
