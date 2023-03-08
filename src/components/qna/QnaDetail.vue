<template>
    <div class="container mt-5">
        <div>
            <!-- 이전글, 다음글 처리 -->
        </div>
        <h3 class="sr-only">1:1문의 상세 보기</h3>
        <h1>{{ qna.title }}</h1>
        <table>
            <tr>                
                <th>글번호</th>
                <td>{{qna.boardQuestionNum}}</td>
            </tr>
            <tr>                
                <th>조회수</th>
                <td>{{qna.viewCount}}</td>
            </tr>
            <tr>                
                <th>작성자</th>
                <td>{{qna.boardQuestionWriter}}</td>
            </tr>
            <tr>                
                <th>작성일</th>
                <td>{{qna.userRegdate}}</td>
            </tr>
            <div class="mainContent mt-3">{{qna.content}}</div>
            <div class="d-grid d-md-flex justify-content-md-end mt-3">
            <div class="d-grid d-md-flex">
                <!-- (본인만 삭제가능) v-if="$store.getters.lecUserId == {{qna.boardQuestionWriter}}" -->
                <a :href="`/qna/${qna.prevNum}/update`" class="btn btn-sm me-2 new-btn">수정</a>
                <a href="javascript:" @click="deleteConfirm(qna.boardQuestionNum)" class="btn btn-sm me-2 btn-danger">삭제</a>                
            </div>
	            <a :href="'/qna'" class="btn btn-sm me-2 btn-secondary">목록</a>
	        </div>

        </table>

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
      var url = `http://localhost:9000/project/api/qna-board/${this.$route.params.boardQuestionNum}`;
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
        var url = `http://localhost:9000/project/api/qna-board/${boardQuestionNum}/delete`;
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
    /* @import '../../assets/css/board.css' */
</style>