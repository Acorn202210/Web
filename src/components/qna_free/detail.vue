<template>
    <div class="container mt-3">
		<div class="d-md-flex justify-content-md-end">
			<a v-if="qnafree.prevNum != 0" :href="`/qnafree/${qnafree.prevNum}?condition=${this.$route.query.condition }&keyword=${this.$route.query.keyword }`" class="btn btn-sm me-md-2 btn-secondary">이전글</a>
			<a v-if="qnafree.nextNum != 0" :href="`/qnafree/${qnafree.nextNum}?condition=${this.$route.query.condition }&keyword=${this.$route.query.keyword }`" class="btn btn-sm btn-secondary">다음글</a>
		</div>

		<p class="mt-2" v-if="this.$route.query.condition != ''">
		<strong>{{ this.$route.query.condition }}</strong> 조건
		<strong>{{ this.$route.query.keyword }}</strong> 검색어로 검색된 내용입니다.
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

        

		<!-- 댓글 목록-->
        <div v-for="qnafreeanswer in qnafreeanswer.data" :key="qnafreeanswer.freeCommentWriter">
          <img v-if="qnafreeanswer.profileNum" :src="`/project/api/users/profile/${qnafreeanswer.profileNum}`" width="50" height="50" style="border-radius: 50%;">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
              class="bi bi-person-circle me-3" viewBox="0 0 16 16" v-else>
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
          <span class="ms-3"><strong>{{ qnafreeanswer.freeCommentWriter }}</strong></span>
          <span class="ms-3">{{ qnafreeanswer.userRegdate }}</span>

          <span class="ms-3"
            v-if="$store.getters.isUserId != null && qnafreeanswer.freeCommentWriter == $store.getters.isUserId">
            <a class="update-link" @click="showReviewUpdateForm(qnafreeanswer.freeCommentNum)">수정</a>
            <a class="del ms-1" @click="deleteReviewConfirm(qnafreeanswer.freeCommentNum)">삭제</a>
          </span>
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
			qnafreeanswer:{},

		}
	},

	created() {
		var vm = this;
		var url = `/project/api/qna-free/${this.$route.params.freeQuestionNum}`;
		const data = {
        	keyword:this.$route.query.keyword,
        	condition:this.$route.query.condition
      	}
		axios.get(url, { params: data })
		.then(function (response) {
			console.log(response.data.body);
			vm.qnafree = response.data.body;
		})
		.catch(function (error) {
			console.log(error);
		});

		var url2 = `/project/api/qna-free-answer/list?freeCommentRefGroup=${this.$route.params.freeQuestionNum}`;
		axios.get(url2)
		.then((response) => {
			console.log(response.data.body);
			vm.qnafreeanswer = response.data.body;
		})
		.catch((error) => {
			console.error(error);
		});
  	},

	methods: {

		qnafreedelete : function(freeQuestionNum) {
			axios.put('/project/api/qna-free/' + freeQuestionNum + '/delete', 
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