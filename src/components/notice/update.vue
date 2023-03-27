<template>
  <div class="container">
    <div class="container mt-5">
      <h3 class="sr-only">새글 작성 폼입니다.</h3>
      <form @submit.prevent="submitForm">
        <div>
          <label for="title" class="form-label">제목</label>
          <input v-model="title" type="text" name="title" id="title" class="form-control" />
        </div>
        <div class="mt-3">
          <label for="content" class="form-label">내용</label>
          <textarea v-model="content" name="content" id="content" rows="10" class="form-control"></textarea>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
          <button type="submit" onclick="submitContents(this)" class="new-btn btn btn-sm ">수정</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Signup',
  data() {
    return {
      title:'',
      content:''
    }
  },
  created() {
    var vm = this;
    var url = `/plec/api/notice/${this.$route.query.notiNum}`;
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
    submitForm(){
      const url = `/plec/api/notice/${this.$route.query.notiNum}/update`;
      const data = {
        content:this.content,
        title:this.title,
        notiNum:this.$route.query.notiNum
      }
      var vm = this;
      axios.put(url, data)
        .then(function () {
          alert('공지사항이 수정되었습니다.');
          vm.$router.push('/notice');
        })
    }
  }
}
</script>
<style>
</style>