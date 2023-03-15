<template>
    <div class="container mt-5">
        <div>
            <div class="d-md-flex justify-content-md-end">
            <a v-if="qna.prevNum != 0" :href="`/qna/${qna.prevNum}`" class="btn btn-sm me-md-2 btn-secondary">이전글</a>
            <a v-if="qna.nextNum != 0" :href="`/qna/${qna.nextNum}`" class="btn btn-sm btn-secondary">다음글</a>
	        </div>
        </div>

        <p v-if="qna.keyword != null" class="mt-2">
          <strong>{{ qna.condition }}</strong> 조건
          <strong v-bind:title="qna.keyword">{{ qna.keyword }}</strong> 검색어로 검색된 내용입니다.
        </p>

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
              <div class="d-grid d-md-flex">
                <input type="hidden" v-model="qna.boardQuestionNum"/>
                <button @click="deleteConfirm(qna.boardQuestionNum)" class="btn btn-sm me-2 btn-danger">삭제</button>
              </div>                
          </div>
          <a :href="'/qna'" class="btn btn-sm me-2 btn-secondary">목록</a>
        </div>     

        <div class="mb-5 pb-5" v-show="qnaAnswer.boardCommentWriter != null">
          <span><b> {{ qnaAnswer.boardCommentWriter }}</b></span><br>
          <span> {{ qnaAnswer.userRegdate }}</span> 
          <form class="comment-form pb-3">
            <textarea class="me-3" name="content" v-model="qnaAnswer.content" readonly></textarea>            
          </form>          
        </div>
        
        <div v-if="$store.getters.isManager == 'Y'">          
          <br><p>댓글 작성 폼</p>
          <form class="comment-form insert-form" @submit.prevent="submitAnswerForm">
            <input type="hidden" name="boardCommentRefGroup" :value="qna.boardQuestionNum" />
            <textarea class="me-3" name="content" v-model="formData.content"></textarea>
            <button type="submit" class="button btn mb-5">등록</button>
          </form>          
        </div>
                      
    </div>
</template>


<script>
import axios from 'axios'
export default {
    name: 'QnaDetail',
    
	  data(){
      return{
        qna:{},
        condition: '',
      	keyword: '',
        formData: {
          boardCommentRefGroup:'',
          content:''
        },
        qnaAnswer:{},
        isUpdateFormVisible: false,
        answerSignupForm:{
          boardCommentRefGroup: ''
        },
        completeForm:{
          boardCommentRefGroup: ''
        }
        
      }
	  },
    created(){
      var vm = this;
      var url = `/project/api/qna-board/${this.$route.params.boardQuestionNum}`;
      axios.get(url)
      .then(response => {
        console.log(response.data.body);
        vm.qna = response.data.body;
        this.formData.boardCommentRefGroup = this.qna.boardQuestionNum;
        this.answerSignupForm.boardCommentRefGroup = this.qna.boardQuestionNum;
        this.completeForm.boardCommentRefGroup = this.qna.boardQuestionNum;
        this.getAnswerData();
      })
      .catch(function(error){
        console.log(error);
      })
    },

    methods:{

      submitAnswerForm(){
        const url = '/project/api/qna-board/answerInsert';
        const data = {
            content : this.formData.content,
            boardCommentRefGroup : this.formData.boardCommentRefGroup
        };
        axios.post(url, data)
        .then(response => {
          console.log(response.data);
          alert('1:1문의 답변 등록 성공');
          this.$router.push('/qna/');
        })
        .catch(error => {
          console.error(error);
          alert('1:1문의 답변 등록 실패');
        });
      },

      getAnswerData(){        
        axios.get(`/project/api/qna-board/${this.$route.params.boardQuestionNum}/answer`)
        .then(response => {
          console.log(response.data);
          this.qnaAnswer = response.data.body;
        })
        .catch(error => {
          console.error(error);
        });
      },

      qnaboarddelete: function(boardQuestionNum){
        axios.put('/project/api/qna-board/' + boardQuestionNum + '/delete', 
          { boardQuestionNum }
        ).then(response => {
          console.warn(response)
          this.result = response.data;
          this.$router.push('/qna');
        }).catch((ex) => {
          console.warn("ERROR!!!!! : ",ex)
        })
      },

      deleteConfirm: function(boardQuestionNum){
        const isDelete = confirm("이 1:1문의를 삭제하겠습니까?");        
        if(isDelete){          
          this.qnaboarddelete(boardQuestionNum);
          alert('1:1문의가 삭제 되었습니다.');
          this.$router.push('/qna');          
        }
      }
    }
    
}
</script>

<style>
    @import '../../assets/css/board.css'
</style>