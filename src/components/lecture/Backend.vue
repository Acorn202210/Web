<template>
	<div class="container">
	  <div class="row">
		<div class="col-md-10">
		  <div class="d-flex justify-content-end">
			<div>
			  <button class="btn btn-sm me-2 mb-3 button" type="button" @click="goToUploadForm">새글작성</button>
			</div>
		  </div>
		</div>
	  </div>
	</div>
	<div class="row">
	  <div v-for="backend in list.data" :key="backend.lecNum">
		<div class="card mb-3">
		  <a :href="`/lectureDetail/${backend.lecNum}`">    
		<div class="img-wrapper">
		  <img :src="`http://localhost:9000/project/api/lecture/%7BlecNum%7D/Image?lecNum=${backend.lecNum}`" style="width: 100px; height: 100px;">
		</div>
		</a>
		<div class="card-body">
		  <h5>{{ backend.title }}</h5>
		  <p><strong>{{ backend.teacher }}</strong></p>
		</div>
	  </div>
	  </div>
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
	name: 'Backend',
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
		  vm.list = response.data.body;
		})
		.catch(function(error) {
		  console.log(error);
		});
	}
  }
  </script>
  
  <style>
  </style>
  