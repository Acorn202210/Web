<template>
	
	<div class="sub-tit-box">
		<div class="container">
			<h3 class="sub-tit">자주묻는 질문</h3>
		</div>
	</div>

		<div class="container">
			<div v-for="faq in faq.data" :key="faq.faqNum">
				<div class="accordion mb-2" id="accordionPanelsStayOpenExample">
				<div class="accordion-item">
					<h2 class="accordion-header" id="panelsStayOpen-headingOne">
					<button class="accordion-button acco-btn-new collapsed "  type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
						<div class="d-flex align-items-center acco-head-box">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-question-circle me-2" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
							<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
							</svg>
							<strong>{{ faq.question }}</strong>
						</div>
					</button>
					</h2>
					<div id="panelsStayOpen-collapse" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading">
					<div class="accordion-body">
						<div class="d-grid gap-2 d-md-flex justify-content-md-end">
							<a :href="`/updateform/${faq.faqNum}`" class="btn new-btn">수정</a>
							<div>
								<input type="text" v-model="no"/>
								<button @click="faqupdatedelete" class="btn btn-danger">삭제</button>
							</div>
						</div>
						<div>{{ faq.content }}</div>
					</div>
					</div>
				</div>
				</div>
			</div>
				<a href="${pageContext.request.contextPath}/faq/insertform">새글 작성</a>
			<nav>
				<ul class="pagination justify-content-center">
					<li class="page-item" v-bind:class="{ disabled : faq.currentPage <= 1 }">
						<a class="page-link" href="javascript:void(0);" aria-label="Previous" @click.prevent="setPage(faq.currentPage - 1)">
						<span aria-hidden="true">&laquo;</span>
						</a>
					</li>
					<li class="page-item" v-for="num in faq.totalPage" :key="num" v-bind:class="{ active : faq.currentPage == num }">
						<a class="page-link" href="javascript:void(0);" @click.prevent="setPage(num)">{{ num }}</a>
					</li>
					<li class="page-item" v-bind:class="{ disabled : faq.currentPage >= faq.totalPage }">
						<a class="page-link" href="javascript:void(0);" aria-label="Next" @click.prevent="setPage(faq.currentPage + 1)">
						<span aria-hidden="true">&raquo;</span>
						</a>
					</li>
				</ul>
			</nav>
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
	
</template>
  
<script>
import axios from 'axios';

export default {
	name: 'Faq',
	data(){
		return {
			faq:[],
			no: 0,
			question: '',
			content: '',
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
	},
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