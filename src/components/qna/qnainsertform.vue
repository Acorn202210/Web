<template>
  <div class="sub-tit-box">
    <div class="container">
      <h3 class="sub-tit">1:1문의</h3>
    </div>
  </div>
  <div class="container">
    <form @submit.prevent="qnaboardinsert">
      <div>
          <label for="title" class="form-label">제목</label>
          <input type="text" v-model="title" name="title" id="title" class="form-control" placeholder="질문 입력..."/>
      </div>
      <div class="mt-3">
          <label for="content" class="form-label">내용</label>
          <textarea v-model="content"  name="content" id="content" rows="10" class="form-control" placeholder="내용 입력..."/>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
        <button type="submit" onclick="submitContents(this)" class="btn btn-sm button">등록</button>
        <button class="btn btn-sm btn-secondary" @click="$router.go(-1)">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'QnaInsertform',
    data() {
        return {
            qna: {},            
            title: '',
            content: ''
        }
    },
    created() {
    var vm = this;
    var url = `/plec/api/qna-board/`;
    axios.get(url)
      .then(function (response) {
        vm.qna = response.data.body;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    methods: {
      qnaboardinsert () {
        var vm = this;
        axios.post('/plec/api/qna-board/insert', 
          { title:this.title, content:this.content }
        ).then(function() {          
          alert('1:1문의가 등록되었습니다.');
          vm.$router.push('/qna'); 
        }).catch((ex) => {
          console.warn("ERROR!!!!! : ",ex)
        })
      },
    }
}
</script>

<style>
    
</style>