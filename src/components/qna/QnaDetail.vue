<template>
    <div class="container mt-5">
        <div>
            <div class="d-md-flex justify-content-md-end">
            <a v-if="qna.prevNum != 0" :href="`/qna/${qna.prevNum}`" class="btn btn-sm me-md-2 btn-secondary">이전글</a>
            <a v-if="qna.nextNum != 0" :href="`/qna/${qna.nextNum}`" class="btn btn-sm btn-secondary">다음글</a>
	        </div>
        </div>
        <c:if test="${not empty keyword }">
            <p class="mt-2">
                <strong>${condition }</strong> 조건 
                <strong>${keyword }</strong> 검색어로 검색된 내용입니다.
            </p>
        </c:if>

        <h3 class="sr-only">1:1문의 상세 보기</h3>
        <h1>{{ qna.title }}</h1>
        <table>
            <tr>                
                <th>글번호</th>
                <td>{{qna.boardQuestionNum}}</td>
            </tr>
            <!--<tr>                
                <th>조회수</th>
                <td>{{qna.viewCount}}</td>
            </tr>-->
            <tr>                
                <th>작성자</th>
                <td>{{qna.boardQuestionWriter}}</td>
            </tr>
            <tr>                
                <th>작성일</th>
                <td>{{qna.userRegdate}}</td>
            </tr>
        </table>
        <div class="mainContent mt-3">{{ qna.content }}</div>
        <div class="d-grid d-md-flex justify-content-md-end mt-3">
            <div class="d-grid d-md-flex" v-if="$store.getters.isUserId == qna.boardQuestionWriter">
                <a :href="`/qnaupdate/${qna.boardQuestionNum}`" class="btn btn-sm me-2 new-btn">수정</a>
                <a href="javascript:" @click="deleteConfirm(qna.boardQuestionNum)" class="btn btn-sm me-2 btn-danger">삭제</a>                           
            </div>
            <a :href="'/qna'" class="btn btn-sm me-2 btn-secondary">목록</a>
        </div>           
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'QnaDetail',
	  data(){
      return{
        qna:{}
      }
	  },
    created(){
      var vm = this;
      var url = `/project/api/qna-board/${this.$route.params.boardQuestionNum}`;
      axios.get(url)
      .then(function(response){
        console.log(response.data.body);
        vm.qna = response.data.body;
      })
      .catch(function(error){
        console.log(error);
      })
    },
    methods:{
      deleteConfirm:function(boardQuestionNum){
        const isDelete = confirm("이 1:1문의를 삭제하겠습니까?");
        var url = `/project/api/qna-board/${boardQuestionNum}/delete`;
        if(isDelete){
          axios.put(url)
          .then(function(){
            alert('1:1문의가 삭제 되었습니다.');
            this.$router.push('/qna');
          })
          .catch(function(){
            alert('1:1문의 삭제에 실패했습니다.')
          })
        }
      }
    }
}
</script>

<style>
    @import '../../assets/css/board.css'
</style>