<template>
  <div class="container mt-5">
    <h3 class="sr-only">새글 작성 폼입니다.</h3>
    <form @submit.prevent="submitForm">
      <div>
        <label for="question" class="form-label">질문</label>
        <input v-model="question" type="text" name="question" id="question" class="form-control" />
      </div>
      <div class="mt-3">
        <label for="content" class="form-label">내용</label>
        <textarea v-model="content" name="content" id="content" rows="10" class="form-control"></textarea>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
        <button type="submit" class="new-btn btn btn-sm">수정</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FaqUpdate',
  data() {
    return {
      question: '',
      content: '',
    }
  },
  created() {
    var vm = this;
    var url = `/project/api/faq/${this.$route.params.num}`;
    axios.get(url)
      .then(function (response) {
        vm.question = response.data.body.question;
        vm.content = response.data.body.content;
      })
      .catch(function (error) {
        console.log(error);
      })
  },
  methods: {
    submitForm(){
      const url = `/project/api/faq/${this.$route.params.num}/update`;
      const data = {
        content:this.content,
        question:this.question,
        faqNum:this.$route.params.num
      }
      var vm = this;
      axios.put(url, data)
        .then(function () {
          alert('자주묻는질문이 수정되었습니다.');
          vm.$router.push('/faq');
        })
    }
  }
};
</script>