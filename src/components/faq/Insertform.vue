<template>
  <div class="container">
    <div>
        <label for="question">질문</label>
        <input type="text" v-model="question" placeholder="질문을 입력합니다"/>
    </div>
    <div>
        <label for="content">내용</label>
        <textarea type="text" v-model="content" placeholder="내용을 입력합니다"/>
    </div>
    <button @click="faqinsert">등록</button>
    <button @click="$router.go(-1)">취소</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Insertform',
    data() {
        return {
        faq: [],
        no: 0,
        question: '',
        content: '',
        result: null
        }
    },
    methods: {
		faqinsert : function() {
			axios.post('http://localhost:9000/project/api/faq/faq-insert', 
				{ question:this.question, content:this.content }
			).then(response => {
				console.warn(response)
				this.result = response.data;
				this.no = response.data.no;
                this.$router.push('/faq'); // 등록 완료 후 faq 페이지로 이동
			}).catch((ex) => {
				console.warn("ERROR!!!!! : ",ex)
			})
		},
    }
}
</script>

<style>

</style>