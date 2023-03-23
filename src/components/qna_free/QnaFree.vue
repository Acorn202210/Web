<template>
	<div class="sub-tit-box">
		<div class="container">
			<h3 class="sub-tit">자유게시판</h3>
		</div>
	</div>
	<div class="container">
		<div class="table-responsive table-top">
			<table class="table table-hover align-middle">
				<thead>
					<tr style="text-align: center" on-click="detail">
						<th width="15%">번호</th>
						<th width="auto">제목</th> 
						<th width="15%">작성자</th>             
						<th width="25%">등록일</th>
						<th width="15%">조회수</th>
					</tr>
				</thead>
				<tbody class="table-group-divider">
					<tr style="text-align: center;" v-for="qnafree in qnafree.data" :key="qnafree" @click="detail(qnafree.freeQuestionNum)">
						<td>{{qnafree.freeQuestionNum}}</td>
						<td>{{qnafree.title}}</td>
						<td>{{qnafree.freeQuestionWriter}}</td>          
						<td>{{qnafree.userRegdate}}</td>
						<td>{{qnafree.viewCount}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="d-grid gap-2 d-md-flex justify-content-md-end" v-if="$store.getters.isUserId != null">
			<a @click="$router.push('/qnafree/insert')" class="new-btn btn btn-sm">등록</a>
		</div>
		<nav>
			<ul class="pagination justify-content-center">
			<li class="page-item" v-if="qnafree.startPageNum != 1">
				<a class="page-link new-page-link" @click="paging(qnafree.startPageNum - 1)">
				<span aria-hidden="true">&lt;</span>
				</a>
			</li>

			<li v-for="i in 7" :key="i"
				:class="['page-item', qnafree.currentPage == i + qnafree.startPageNum - 1 ? 'active' : '']">
				<a class="page-link new-page-link" v-if="i + qnafree.startPageNum - 1 <= qnafree.endPageNum"
				@click="paging(i + qnafree.startPageNum - 1)">{{ i + qnafree.startPageNum - 1 }}</a>
			</li>

			<li class="page-item" v-if="qnafree.endPageNum < qnafree.totalPage">
				<a class="page-link new-page-link" @click="paging(qnafree.endPageNum + 1)">
				<span aria-hidden="true">&gt;</span>
				</a>
			</li>
			</ul>
		</nav>

		<form @submit.prevent="submitForm" action="list" method="get">
			<div class="d-grid gap-2 d-md-flex justify-content-md-end table-search-box">
			<select v-model="condition" name="condition" id="condition" class="form-select">
				<option value="" disabled>검색 조건</option>
				<option value="title_content">제목 + 내용</option>
				<option value="title">제목</option>
				<option value="writer">작성자</option>
			</select>
			<input type="text" name="keyword" placeholder="검색어..." class="form-control" v-model="keyword" />
			<button type="submit" class="table-search-btn new-btn-black btn">검색</button>
			</div>
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'QnaFree',
    data() {
		return {
		qnafree: {},
		condition: '',
		keyword: ''
		}
	},
	created() {
		var vm = this;
		var url = "/project/api/qna-free/list";
		const data = {
		limit: 10
		}
		axios.get(url, { params: data })
		.then(function (response) {
			console.log(response.data);
			vm.qnafree = response.data.body;
		})
		.catch(function (error) {
			console.log(error);
		})
	},
	methods: {
		detail: function (freeQuestionNum) {
		this.$router.push('/qnafree/' + freeQuestionNum+'?condition='+this.condition+'&keyword='+this.keyword);
		},
		paging: function (currentPage) {
		var vm = this;
		var url = "/project/api/qna-free/list";
		const data = {
			limit: 10,
			currentPage: currentPage,
			keyword: vm.keyword,
			condition: vm.condition
		}
		axios.get(url, { params: data })
			.then(function (response) {
			console.log(response.data);
			vm.qnafree = response.data.body;
			})
			.catch(function (error) {
			console.log(error);
			})
		},
		submitForm: function () {
		var vm = this;
		var url = "/project/api/qna-free/list";
		const data = {
			limit: 10,
			currentPage: vm.currentPage,
			keyword: vm.keyword,
			condition: vm.condition
		}
		axios.get(url, { params: data })
			.then(function (response) {
			console.log(response.data);
			vm.qnafree = response.data.body;
			})
			.catch(function (error) {
			console.log(error);
			})
		}
	}
}
</script>

<style>

</style>