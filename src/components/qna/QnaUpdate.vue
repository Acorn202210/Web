<template>
  <div class="container">
    <input type="hidden" v-model="boardQuestionNum"/>
    <div>
        <label for="title">제목</label>
        <input type="text" v-model="title" name="title" id="title" class="form-control" placeholder="질문을 입력합니다"/>
    </div>
    <div>
        <label for="content">내용</label>
        <textarea v-model="content" name="content" id="content" rows="10" class="form-control" placeholder="내용을 입력합니다"/>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
      <button class="btn btn-sm button" @click="qnaboardupdate">수정</button>
      <button class="btn btn-sm btn-secondary" @click="$router.go(-1)">취소</button>
    </div>
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
  created() {
    var vm = this;
    var url = `/project/api/qna-board/${this.$route.params.boardQuestionNum}`;
    axios.get(url)
      .then(function (response) {
        vm.title = response.data.body.title;
        vm.content = response.data.body.content;
      })
      .catch(function (error) {
        console.log(error);
      })
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
        alert('1:1문의가 수정되었습니다.');
        this.$router.push('/qna');
      }).catch((ex) => {
        console.warn("ERROR!!!!! : ", ex)
      })
    },
  }
};
</script>