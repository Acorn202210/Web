<template>
    <div class="container">      

        <p v-if="qna.keyword != null" class="mt-2">
          <strong>{{ qna.condition }}</strong> 조건
          <strong v-bind:title="qna.keyword">{{ qna.keyword }}</strong> 검색어로 검색된 내용입니다.
        </p>
        <div class="wrapper mt-2">
          <div>
            <div class="d-md-flex justify-content-md-end">
              <a v-if="qna.prevNum != 0" :href="`/qna/${qna.prevNum}`" class="btn btn-sm me-md-2 btn-secondary">이전글</a>
              <a v-if="qna.nextNum != 0" :href="`/qna/${qna.nextNum}`" class="btn btn-sm btn-secondary">다음글</a>
            </div>
          </div>
          <h3 class="sr-only">1:1문의 상세 보기</h3>
          <h1>{{ qna.title }}</h1>
          <table>
              <tr>                
                  <th>글번호</th>
                  <td>{{qna.boardQuestionNum}}</td>
              </tr>            
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

          <!-- 댓글 출력 폼 -->
          <div v-for="qnaAnswer in qnaAnswer.data" :key="qnaAnswer.boardCommentWriter"
            class="mb-1 pb-1" v-show="qnaAnswer.boardCommentWriter != null">
            <span><b> {{ qnaAnswer.boardCommentWriter }}</b></span><br>
            <span> {{ qnaAnswer.userRegdate }}</span> 
            <form class="comment-form mb-3">
              <textarea class="form-control me-1" name="content" v-model="qnaAnswer.content" readonly></textarea>            
            </form>
            
            <span
                v-if="$store.getters.isUserId != null && $store.getters.isManager == 'Y'">
                <a class="update-link btn btn-sm me-2 new-btn" @click="showUpdateForm(qnaAnswer.boardCommentNum)">수정</a>
                <a class="btn btn-sm me-2 btn-danger" @click="deleteAnswerConfirm(qnaAnswer.boardCommentNum)">삭제</a>
            </span>
            
            <!-- 댓글 수정 폼 -->
            <div v-if="isUpdateFormVisible[qnaAnswer.boardCommentNum]">
              <form class="comment-form update-form" @submit.prevent="answerUpdate(qnaAnswer.boardCommentNum)">
              <div class="input-group">
                <textarea class="form-control" name="content" v-model="formData.contentUpdate" :placeholder="qnaAnswer.content"></textarea>
                <button type="submit" class="button btn">수정</button>          
              </div>
              </form>
            </div>
          </div>          

          <!-- 새 댓글 작성 폼 -->
          <div v-if="$store.getters.isManager == 'Y'">
            <br><p class="mt-4">댓글 작성 폼</p>          
              <form class="comment-form insert-form" @submit.prevent="submitAnswerForm">
                <div class="input-group">
                  <input type="hidden" name="boardCommentRefGroup" :value="qna.boardQuestionNum" />
                  <textarea class="form-control" name="content" v-model="formData.content"></textarea>
                  <button type="submit" class="button btn">등록</button>
                </div>
              </form>          
          </div>                        
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
          boardCommentNum:'',
          boardCommentRefGroup:'',
          content:'',
          contentUpdate:''
        },
        qnaAnswer:{},
        isUpdateFormVisible: [],        
        
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
        this.getAnswerList();
      })
      .catch(function(error){
        console.log(error);
      })
    },

    methods:{
      //댓글 등록 메소드
      submitAnswerForm(){
        const url = '/project/api/qna-answer/insert';
        const data = {
            content : this.formData.content,
            boardCommentRefGroup : this.formData.boardCommentRefGroup
        };
        axios.post(url, data)
        .then(response => {
          console.log(response.data);
          alert('1:1문의 답변 등록 성공');
          this.$router.go('/qna/'+this.formData.boardCommentRefGroup);          
        })
        .catch(error => {
          console.error(error);
          alert('1:1문의 답변 등록 실패');
        });
      },

      getAnswerList(){        
        var url=`/project/api/qna-answer/list`;
        var data={
          boardCommentRefGroup: this.qna.boardQuestionNum
        }
        axios.get(url, { params:data })
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
      },
      //댓글 수정 폼 보이기
      showUpdateForm(boardCommentNum) {
        if(this.isUpdateFormVisible[boardCommentNum] == true){
          this.isUpdateFormVisible[boardCommentNum] = false;
        }else{
          this.isUpdateFormVisible[boardCommentNum] = true;
        }
      },
      //댓글 수정 메소드
      answerUpdate(boardCommentNum) {
        const url = `/project/api/qna-answer/${boardCommentNum}/update`;
        const data = {          
          boardCommentNum: boardCommentNum,
          content: this.formData.contentUpdate
        };
        axios.put(url, data)
          .then(response => {
            console.log(response.data);
            alert('답변 수정 성공');
            this.$router.go('/qna/'+boardCommentNum);
          })
          .catch(error => {
            console.error(error);
            alert('답변 수정 실패');
          });
      },
      //댓글 삭제 메소드
      qnaAnswerDelete: function (boardCommentNum) {
        axios.put('/project/api/qna-answer/' + boardCommentNum + '/delete', {}, { params: { boardCommentNum } }
        ).then(response => {
          console.warn(response)
          this.result = response.data;
          location.reload();
        }).catch((ex) => {
          console.warn("ERROR!!!!! : ", ex)
        })
      },
      deleteAnswerConfirm: function (boardCommentNum) {
        if (confirm("정말 삭제하시겠습니까?")) {
          this.qnaAnswerDelete(boardCommentNum);
        }
      },
    }
    
}
</script>

<style>
    @import '../../assets/css/board.css';
    
    .input-group {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
</style>