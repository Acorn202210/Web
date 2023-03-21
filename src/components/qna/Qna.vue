<template>

  <div class="sub-tit-box">
    <div class="container">
      <h3 class="sub-tit">1:1문의</h3>
    </div>
  </div>
    
  <div class="container">    
    <div class="table-responsive table-top">
      <table class="table table-hover align-middle">
        <thead>
          <tr style="text-align: center" on-click="detail">
            <th width="15%">번호</th>
            <th width="auto">제목</th>
            <th width="15%">작성자</th>
            <th width="25%">등록일</th>
            <th width="15%">답변여부</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr style="text-align: center;" v-for="item in qnalist.data" :key="item" @click="detail(item.boardQuestionNum, item.boardQuestionWriter)">
            <td>{{item.boardQuestionNum}}</td>
            <td>
              <div v-if="$store.getters.isManager == 'Y'">
                {{item.title}}
              </div>
              <div v-else>
                {{item.title}}
              </div>
            </td>
            <td>{{item.boardQuestionWriter}}</td>
            <td>{{item.userRegdate}}</td>
            <td>
              <span style="color:green;" v-if="item.answeredYn == 'Y'">답변완료</span>
              <span style="color:orangered;" v-else>답변대기</span>              
            </td>
          </tr>
        </tbody>

      </table>      
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">            
        <a class="new-btn btn btn-sm" @click="this.$router.push(`/qna-insertform`)">등록</a>      
      </div>
    </div> 
    <div>
      <nav>
        <ul class="pagination justify-content-center">
            <li class="page-item" v-if="qnalist.startPageNum != 1">
              <a class="page-link new-page-link" @click="paging(qnalist.startPageNum - 1)">
              <span aria-hidden="true">&lt;</span>
              </a>
            </li>
            <li v-for="i in 5" :key="i" :class="[ 'page-item', qnalist.currentPage == i+qnalist.startPageNum-1 ? 'active' : '' ]">
							<a class="page-link new-page-link" v-if="i+qnalist.startPageNum-1 <= qnalist.endPageNum" @click="paging(i+qnalist.startPageNum-1)">{{i+qnalist.startPageNum-1}}</a>
						</li>
            <li class="page-item" v-if="qnalist.endPageNum < qnalist.totalPage">
              <a class="page-link new-page-link" @click="paging(qnalist.endPageNum + 1)">
                <span aria-hidden="true">&gt;</span>
              </a>
            </li>
					</ul>
				</nav>

        <form @submit.prevent="submitForm" action="list" method="get">
					<div class="d-grid gap-2 d-md-flex justify-content-md-end table-search-box">
						<select v-model="condition" name="condition" id="condition" class="form-select">
              <option value="" disabled >검색조건</option>
              <option value="title_content" >제목 + 내용</option>
							<option value="title" >제목</option>
              <option value="writer" >작성자</option>
						</select>
						<input type="text" name="keyword" placeholder="검색어..." class="form-control" v-model="keyword"/>
						<button type="submit" class="table-search-btn new-btn-black btn">검색</button>
					</div>
				</form>

    </div>    
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Qna',
	  data(){
      return{
        qnalist: {},
        condition:'',
        keyword:''     
      }

	  },
    created(){
      var vm=this;
      var url = "/project/api/qna-board/list";
      const data={
        limit : 5
      }
      axios.get(url, { params: data })
        .then(function(response){
          console.log(response.data);
          vm.qnalist=response.data.body;
        })
        .catch(function(error){
          console.log(error);
        })
    },
    methods:{
      detail:function(boardQuestionNum, boardQuestionWriter){
          
          if(boardQuestionWriter == this.$store.getters.isUserId || this.$store.getters.isManager == 'Y'){
            this.$router.push('/qna/'+boardQuestionNum+'?condition='+this.condition+'&keyword='+this.keyword);     
          }else{
            alert('본인의 글만 열람할 수 있습니다.'); 
          }          
      },
      paging:function(currentPage){
        var vm = this;
        var url = "/project/api/qna-board/list";
        const data={
          limit : 5,
          currentPage:currentPage,
          keyword:vm.keyword,
          condition:vm.condition
        }
        axios.get(url, { params: data })
        .then(function(response){
          console.log(response.data);
          vm.qnalist = response.data.body;
        })
        .catch(function(error){
          console.log(error);
        })
      },
      submitForm:function(){
        var vm = this;
        var url = "/project/api/qna-board/list";
        const data={
          limit : 5,
          currentPage:vm.currentPage,
          keyword:vm.keyword,
          condition:vm.condition
        }
        axios.get(url, { params: data })
        .then(function(response){
          console.log(response.data);
          vm.qnalist=response.data.body;
        })
        .catch(function(error){
          console.log(error);
        })
      }
  },
}
</script>

<style>

</style>