<template>
    <div v-for="qnafree in qnafree.data" :key="qnafree">
		<div>{{qnafree.title}}</div>
		<div>{{qnafree.freeQuestionWriter}}</div>
		<div>{{qnafree.viewCount}}</div>
		<div>{{qnafree.userRegdate}}</div>
		<div>{{qnafree.answeredYn}}</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'QnaFree',
	data(){
		return {
			qnafree:{},
			condition: '',
			keyword: ''
		}
	},
	created() {
    	this.fetchData(this.qnafree.currentPage);
 	 },
	methods: {
		setPage(currentPage) {
			const url = 'http://localhost:9000/project/api/qna-free/list';
			const data = {
				currentPage: currentPage,
				limit:10			
			};

			axios
			.get(url, { params: data })
			.then((response) => {
				this.qnafree = response.data.body;
				window.scrollTo(0, 0);
			})
			.catch((error) => {
				console.log(error);
			});
		},
		fetchData(currentPage) {
		const url = 'http://localhost:9000/project/api/qna-free/list';
		const data = {
		  currentPage: currentPage,
		};
		axios.get(url, { params: data })
		  .then(response => {
			this.qnafree.data = response.data.body.data;
			this.qnafree.currentPage = response.data.body.currentPage;
			this.qnafree.totalPage = response.data.body.totalPage;
			this.$set(this.qnafree, 'data', this.qnafree.data);
			this.$set(this.qnafree, 'currentPage', this.qnafree.currentPage);
			this.$set(this.qnafree, 'totalPage', this.qnafree.totalPage);
		  })
		  .catch(error => {
			console.log(error);
		  });
	  	},
	},
}
</script>

<style>

</style>