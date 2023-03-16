<template>
  <div class="container">
    <input type="hidden" v-model="no"/>
    <div>
        <label for="question" class="form-label">질문</label>
        <input type="text" v-model="question" class="form-control" placeholder="질문을 입력합니다"/>
    </div>
    <div>
        <label for="content" class="form-label">내용</label>
        <textarea type="text" v-model="content" class="form-control" placeholder="내용을 입력합니다"/>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">    
      <button @click="faqupdate" class="btn new-btn">수정</button>
      <button @click="$router.go(-1)" class="btn btn-secondary">취소</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FaqUpdate',
  data() {
    return {
      faq: {},
      no: this.$route.params.num, // $route.params.num 값으로 초기화
      question: '',
      content: '',
    }
  },
  methods: {
    faqupdate: function () {
      axios.put('/project/api/faq/' + this.no + '/update',
        { faqNum: this.no, question: this.question, content: this.content }
      ).then(response => {
        console.warn(response)
        this.question = '';
        this.content = '';
        this.result = response.data;
        this.$router.push('/faq'); // 수정 완료 후 faq 페이지로 이동
      }).catch((ex) => {
        console.warn("ERROR!!!!! : ", ex)
      })
    },
  }
};
</script>