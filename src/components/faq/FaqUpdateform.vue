<template>
  <div class="container">
    <input type="hidden" v-model="no"/>
    <div>
        <label for="question">질문</label>
        <input type="text" v-model="question" placeholder="질문을 입력합니다"/>
    </div>
    <div>
        <label for="content">내용</label>
        <textarea type="text" v-model="content" placeholder="내용을 입력합니다"/>
    </div>
    <button @click="faqupdate">수정</button>
    <button @click="$router.go(-1)">취소</button>
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
      axios.put('http://localhost:9000/project/api/faq/' + this.no + '/update',
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