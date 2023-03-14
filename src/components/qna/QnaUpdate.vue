<template>
  <div class="container">
    <input type="hidden" v-model="boardQuestionNum"/>
    <div>
        <label for="title">제목</label>
        <input type="text" v-model="title" placeholder="질문을 입력합니다"/>
    </div>
    <div>
        <label for="content">내용</label>
        <textarea type="text" v-model="content" placeholder="내용을 입력합니다"/>
    </div>
    <button class="btn btn-sm me-2 mb-3 button" @click="qnaboardupdate">수정</button>
    <button class="btn btn-sm me-2 mb-3 button" @click="$router.go(-1)">취소</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'QnaUpdate',
  data() {
    return {
      qna: {},
      boardQuestionNum: this.$route.params.boardQuestionNum, // $route.params.boardQuestionNum 값으로 초기화
      title: '',
      content: ''
    }
  },
  methods: {
    qnaboardupdate: function () {
      axios.put('/project/api/qna-board/' + this.boardQuestionNum + '/update',
        { boardQuestionNum: this.boardQuestionNum, title: this.title, content: this.content }
      ).then(response => {
        console.warn(response)        
        this.title = '';
        this.content = '';
        this.result = response.data;
        this.$router.push('/qna');
      }).catch((ex) => {
        console.warn("ERROR!!!!! : ", ex)
      })
    },
  }
};
</script>