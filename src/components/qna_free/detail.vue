<template>
    <div class="container mt-5">

    <div class="d-md-flex justify-content-md-end">
		<a v-if="qnafree.prevNum != 0" :href="`/qnafree/${qnafree.prevNum}`" class="btn btn-sm me-md-2 btn-secondary">이전글</a>
		<a v-if="qnafree.nextNum != 0" :href="`/qnafree/${qnafree.nextNum}`" class="btn btn-sm btn-secondary">다음글</a>
    </div>

    
	<p v-if="qnafree.keyword" class="mt-2">
		<strong>{{ qnafree.condition }}</strong> 조건
		<strong v-bind:title="qnafree.keyword">{{ qnafree.keyword }}</strong> 검색어로 검색된 내용입니다.
	</p>

    <h3 class="sr-only">글 상세 보기</h3>
    <h1>{{ qnafree.title }}</h1>
    <table>
		<tr>
			<th>글번호</th>
			<td>{{ qnafree.freeQuestionNum }}</td>
		</tr>
		<tr>
			<th>조회수</th>
			<td>{{ qnafree.viewCount }}</td>
		</tr>
		<tr>
			<th>작성자</th>
			<td class="fw-bold fs-6">by {{ qnafree.freeQuestionWriter }}</td> <!--작성자 추가해야함.-->
		</tr>
		<tr>
			<th>작성일</th>
			<td>{{ qnafree.userRegdate }}</td>
		</tr>
		</table>
		<div class="mainContent mt-3">{{ qnafree.content }}</div>
		<div class="d-grid d-md-flex justify-content-md-end mt-3">
			<div class="d-grid d-md-flex " v-if="$store.getters.isUserId == qnafree.freeQuestionWriter">
				<a :href="`/qnafree/update/${qnafree.freeQuestionNum}`" class="btn btn-sm me-2 new-btn">수정</a>
				<a href="javascript:" @click="confirmDelete(qnafree.freeQuestionNum)" class="btn btn-sm me-2 btn-danger">삭제</a>
			</div>
			<a :href="'/qnafree'" class="btn btn-sm me-2 btn-secondary">목록</a>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'QnaFreeDetail',
	data(){
		return {
			qnafree:{},
			condition: '',
      		keyword: ''
		}
	},

	created() {
		var vm = this;
		var url = `http://localhost:9000/project/api/qna-free/${this.$route.params.freeQuestionNum}`;
		axios.get(url)
		.then(function (response) {
			console.log(response.data.body);
			vm.qnafree = response.data.body;
		})
		.catch(function (error) {
			console.log(error);
		})
  	},

	methods: {

		qnafreedelete : function(freeQuestionNum) {
			axios.put('http://localhost:9000/project/api/qna-free/' + freeQuestionNum + '/delete', 
				{ freeQuestionNum }
			).then(response => {
				console.warn(response)
				this.result = response.data;
				this.$router.push('/qnafree');
			}).catch((ex) => {
				console.warn("ERROR!!!!! : ",ex)
			})
		},
		confirmDelete: function (freeQuestionNum) {
      		if (confirm("정말 삭제하시겠습니까?")) {
        		this.qnafreedelete(freeQuestionNum);
      		}
    	},
	}
}
</script>

<style>

</style>