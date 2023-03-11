<template>
    <div class="container">
		<div>
			<label for="title">제목</label>
			<input type="text" v-model="title" placeholder="제목을 입력합니다"/>
		</div>
		<div>
			<label for="content">내용</label>
			<textarea type="text" v-model="content" placeholder="내용을 입력합니다"/>
		</div>
		<button @click="qnafreeinsert">등록</button>
		<button @click="$router.go(-1)">취소</button>
	</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'QnaFreeInsert',
	data(){
		return {
			title: '',
			content: '',
		}
	},
	methods: {
      qnafreeinsert : function() {
        axios.post('/project/api/qna-free/insert', 
          { title:this.title, content:this.content }
        ).then(response => {
          console.warn(response)
          this.result = response.data;
          this.$router.push('/qnafree'); // 등록 완료 후 faq 페이지로 이동
        }).catch((ex) => {
          console.warn("ERROR!!!!! : ",ex)
        })
      },
    }
}
</script>

<style>

</style>