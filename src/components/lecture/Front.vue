<template>
	<div class="container">
	  <div class="row">
		<div v-for="front in list.data" :key="front.lecNum">
		  <div class="card mb-3">
			<a :href="`/lectureDetail/${front.lecNum}`">
			  <div class="img-wrapper">
				<img :src="`http://localhost:9000/project/api/lecture/${front.lecNum}/Image?lecNum=${front.lecNum}`" style="width: 100px; height: 100px;">
			  </div>
			</a>
			<div class="card-body">
			  <h5>{{ front.title }}</h5>
			  <p><strong>{{ front.teacher }}</strong></p>
			</div>
		  </div>
		</div>
	  </div>
	  <nav>
		<ul class="pagination justify-content-center">
		  <li class="page-item" v-bind:class="{ disabled : list.currentPage <= 1 }">
			<a class="page-link" href="javascript:void(0);" aria-label="Previous" @click.prevent="setPage(list.currentPage - 1)">
			  <span aria-hidden="true">&laquo;</span>
			</a>
		  </li>
		  <li class="page-item" v-for="num in list.totalPage" :key="num" v-bind:class="{ active : list.currentPage == num }">
			<a class="page-link" href="javascript:void(0);" @click.prevent="setPage(num)">{{ num }}</a>
		  </li>
		  <li class="page-item" v-bind:class="{ disabled : list.currentPage >= list.totalPage }">
			<a class="page-link" href="javascript:void(0);" aria-label="Next" @click.prevent="setPage(list.currentPage + 1)">
			  <span aria-hidden="true">&raquo;</span>
			</a>
		  </li>
		</ul>
	  </nav>
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
	name: 'Front',
	data() {
	  return {
		list: {
		  data: [],
		  currentPage: '',
		  totalPage: '',
		},
		lecNum: '',
		teacher: '',
		lecWriter: '',
		title: '',
		describe: '',
		videoPath: '',
		viewCount: '',
		userRegdate: '',
		largeCategory: 'front',
		smallCategory: 'all',
		updateId: '',
		serviceYnCode: '',
	  };
	},
	created() {
	  this.fetchData(this.list.currentPage);
	},
	methods: {
	  setPage(currentPage) {
		const url = 'http://localhost:9000/project/api/lecture/lectureList';
		const data = {
		  currentPage: currentPage,
		  largeCategory: this.largeCategory,
		  smallCategory: this.smallCategory,
		};
  
		axios
		  .get(url, { params: data })
		  .then((response) => {
			this.list = response.data.body;
			window.scrollTo(0, 0);
		  })
		  .catch((error) => {
			console.log(error);
		  });
	  },
	  fetchData(currentPage) {
		const url = 'http://localhost:9000/project/api/lecture/lectureList';
		const data = {
		  currentPage: currentPage,
		  largeCategory: this.largeCategory,
		  smallCategory: this.smallCategory
		};
		axios.get(url, { params: data })
		  .then(response => {
			this.list.data = response.data.body.data;
			this.list.currentPage = response.data.body.currentPage;
			this.list.totalPage = response.data.body.totalPage;
			this.$set(this.list, 'data', this.list.data);
			this.$set(this.list, 'currentPage', this.list.currentPage);
			this.$set(this.list, 'totalPage', this.list.totalPage);
		  })
		  .catch(error => {
			console.log(error);
		  });
	  },
	  goToUploadForm() {
		this.$router.push({ path: '/lectureUpload' });
	  }
	}
  }
  </script>
  
  <style>
  </style>
  