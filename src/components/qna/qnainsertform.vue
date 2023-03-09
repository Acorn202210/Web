<template>
  <div class="sub-tit-box">
    <div class="container">
      <h3 class="sub-tit">1:1문의</h3>
    </div>
  </div>
  <div class="container">
    <div>
        <label for="title">제목</label>
        <input class="title" type="text" v-model="title" placeholder="질문 입력..."/>
    </div>
    <div>
        <label style="padding: 100px 0px;" for="content">내용</label>
        <textarea class="content" type="text" v-model="content" placeholder="내용 입력..."/>
    </div>
    <button class="btn btn-sm me-2 mb-3 button" @click="qnainsert">등록</button>
    <button class="btn btn-sm me-2 mb-3 button" @click="$router.go(-1)">취소</button>
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
    methods: {
		qnainsert : function() {
			axios.post('http://localhost:9000/project/api/qna-board/insert', 
				{ title:this.title, content:this.content }
			).then(response => {
				console.warn(response)
				this.result = response.data;
				this.no = response.data.no;
                this.$router.push('/qna'); 
			}).catch((ex) => {
				console.warn("ERROR!!!!! : ",ex)
			})
		},
    }
}
</script>

<style>
    .title{
        flex: 1;
        height: 35px;
        padding: 0 4px;
        margin: 10px 10px;
    }
    .content{
        flex: 1;
        height: 100px;
        padding: 0 4px;
        margin: 10px 10px 0;
    }
</style>