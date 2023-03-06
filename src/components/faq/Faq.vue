<template>
<div id="faq">
	<div v-for="faq in faq.data" :key="faq.faqNum">
		<div>{{faq.question}}</div>
		<a href="/faqOne/${faq.faqNum}">하나만</a>
		<div>{{faq.faqNum}}</div>
		<div>{{faq.content}}</div>
		{{faq}}
	</div>

	<div>
		<input type="text" v-model="question" 
			placeholder="질문을 입력합니다"/>
		<input type="text" v-model="content" 
			placeholder="내용을 입력합니다"/>
		<button @click="faqinsert">자주묻는질문 1건 추가</button>
	</div>
	<div>
		<input type="text" v-model="no"/>
		<button @click="faqone">자주묻는질문 1건 조회</button>
	</div>
	<div>
		<input type="text" v-model="no"/>
		<input type="text" v-model="question" 
								placeholder="질문을 입력합니다"/>
	<input type="text" v-model="content" 
								placeholder="내용을 입력합니다"/>
		<button @click="faqupdate">수정</button>
	</div>
	<div>
		<input type="text" v-model="no"/>
		<button @click="faqupdatedelete">삭제</button>
	</div>
	<span>JSON 출력</span>
        <div id="result" class="container">
          {{ result }}
        </div>
</div>
</template>
  
<script>
import axios from 'axios';

export default {
	name: 'Faq',
	data(){
		return {
			page: 0,
			faq:[],
			no: 0,
			question: '',
			content: '',
			faqNum: '',
			result: null
		}
	},
	created() {
	  axios.get('http://localhost:9000/project/api/faq/faqlist').then((a)=>{
				this.faq = a.data.body;
			})
	},
	methods : {
		faqinsert : function() {
			axios.post('http://localhost:9000/project/api/faq/faqinsert', 
				{ question:this.question, content:this.content }
			).then(response => {
				console.warn(response)
				this.result = response.data
				this.no = response.data.no
			}).catch((ex) => {
				console.warn("ERROR!!!!! : ",ex)
			})
		},

		faqone : function() {
			axios.get('http://localhost:9000/project/api/faq/' + this.no + '/faqOne')
			.then((response) => {
				console.warn(response);
				this.result = response.data
			})
		},

		faqupdate : function() {
			axios.put('http://localhost:9000/project/api/faq/' + this.no + '/update', 
				{ faqNum:this.no, question:this.question, content:this.content }
			).then(response => {
				console.warn(response)
				this.question = '';
				this.content = '';
				this.result = response.data
			}).catch((ex) => {
				console.warn("ERROR!!!!! : ",ex)
			})
		},

		faqupdatedelete : function() {
			axios.put('http://localhost:9000/project/api/faq/' + this.no + '/delete', 
				{ faqNum:this.no }
			).then(response => {
				console.warn(response)
				this.result = response.data
			}).catch((ex) => {
				console.warn("ERROR!!!!! : ",ex)
			})
		},
	}
}
</script>
  
<style>
#faq {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osz-font-smoothing: grayscale;
    text-align: center;
    color : #2c3e50;
    margin-top : 60px;
}


#result {
    text-align: left;
    padding: 20px;
    border: solid 1px black;
}


</style>