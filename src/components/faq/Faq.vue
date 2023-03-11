<template>
	
	<div class="sub-tit-box">
		<div class="container">
			<h3 class="sub-tit">자주묻는 질문</h3>
		</div>
	</div>

		<div class="container">
			<div v-for="faq in faq.data" :key="faq">
				<div class="accordion mb-2" id="accordionPanelsStayOpenExample">
				<div class="accordion-item">
					<h2 class="accordion-header" id="panelsStayOpen-headingOne">
					<button class="accordion-button acco-btn-new collapsed "  type="button" data-bs-toggle="collapse" :data-bs-target="`#panelsStayOpen-collapse-${faq.faqNum}`" aria-expanded="true" aria-controls="panelsStayOpen-collapse">
						<div class="d-flex align-items-center acco-head-box">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-question-circle me-2" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
							<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
							</svg>
							<strong>{{ faq.question }}</strong>
						</div>
					</button>
					</h2>
					<div :id="`panelsStayOpen-collapse-${faq.faqNum}`" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading">
					<div class="accordion-body">
						<div class="d-grid gap-2 d-md-flex justify-content-md-end" v-if="$store.getters.isManager == 'Y'">
							<a @click="$router.push(`/faqupdateform/${faq.faqNum}`)" class="btn new-btn">수정</a>
							<div>
								<input type="hidden" v-model="faq.faqNum"/>
								<button @click="confirmDelete(faq.faqNum)" class="btn btn-danger">삭제</button>
							</div>
						</div>
						<div><strong>{{ faq.content }}</strong></div>
					</div>
					</div>
				</div>
				</div>
			</div>
			<div class="d-grid gap-2 d-md-flex justify-content-md-end" v-if="$store.getters.isManager == 'Y'">
				<a @click="$router.push('/faqinsertform')" class="btn new-btn">등록</a>
			</div>
			<nav>
				<ul class="pagination justify-content-center">
				<li class="page-item" v-if="faq.startPageNum != 1">
					<a class="page-link new-page-link" @click="paging(faq.startPageNum - 1)">
					<span aria-hidden="true">&lt;</span>
					</a>
				</li>

				<li v-for="i in 10" :key="i"
					:class="['page-item', faq.currentPage == i + faq.startPageNum - 1 ? 'active' : '']">
					<a class="page-link new-page-link" v-if="i + faq.startPageNum - 1 <= faq.endPageNum"
					@click="paging(i + faq.startPageNum - 1)">{{ i + faq.startPageNum - 1 }}</a>
				</li>

				<li class="page-item" v-if="faq.endPageNum < faq.totalPage">
					<a class="page-link new-page-link" @click="paging(faq.endPageNum + 1)">
					<span aria-hidden="true">&gt;</span>
					</a>
				</li>
				</ul>
			</nav>
		</div>
</template>
  
<script>
import axios from 'axios';

export default {
	name: 'Faq',
	data(){
		return {
			faq:{},
		}
	},
	created() {
		var vm = this;
		var url = "/project/api/faq/faq-list";
		const data = {
		limit: 10
		}
		axios.get(url, { params: data })
		.then(function (response) {
			console.log(response.data);
			vm.faq = response.data.body;
		})
		.catch(function (error) {
			console.log(error);
		})
 	 },
	methods: {
		paging: function (currentPage) {
			var vm = this;
			var url = "/project/api/faq/faq-list";
			const data = {
				limit: 10,
				currentPage: currentPage,
			}
			axios.get(url, { params: data })
				.then(function (response) {
				console.log(response.data);
				vm.faq = response.data.body;
				})
				.catch(function (error) {
				console.log(error);
				})
		},

		faqone : function(faqNum) {
			axios.get('/project/api/faq/' + faqNum + '/faqOne',
				{ faqNum }
			).then((response) => {
				console.warn(response);
				this.result = response.data
			})
		},

		faqupdatedelete : function(faqNum) {
			axios.put('/project/api/faq/' + faqNum + '/delete', 
				{ faqNum }
			).then(response => {
				console.warn(response)
				this.result = response.data;
				location.reload();
			}).catch((ex) => {
				console.warn("ERROR!!!!! : ",ex)
			})
		},
		confirmDelete: function (faqNum) {
      		if (confirm("정말 삭제하시겠습니까?")) {
        		this.faqupdatedelete(faqNum);
      		}
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