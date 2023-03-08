<template>

  <div class="sub-tit-box">
    <div class="container">
      <h3 class="sub-tit">1:1문의</h3>
    </div>
  </div>
    
  <div class="container">
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">            
      <a href="${pageContext.request.contextPath }/qna-insertform" class="new-btn btn btn-sm">등록</a>      
    </div>         
    <div class="table-responsive table-top">
      <table class="table table-hover align-middle">
        <thead>
          <tr style="text-align: center" on-click="">
            <th width="15%">번호</th>
            <th width="auto">제목</th>
            <th width="15%">작성자</th>
            <th width="25%">등록일</th>
            <th width="15%">답변여부</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr style="text-align: center;" v-for="item in qnalist.data" :key="item">
            <td>{{item.boardQuestionNum}}</td>
            <td>
              <a href="/qna/detail/${item.boardQuestionNum}">{{item.title}}</a>
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
    </div> 
    <div>
      <nav>
        <ul class="pagination justify-content-center">
            <li class="page-item" v-if="qnalist.startPageNum != 1">
              <a class="page-link new-page-link" @click="paging(qnalist.startPageNum - 1)">
              <span aria-hidden="true">&lt;</span>
              </a>
            </li>
            <li v-for="i in 5" :key="i" :class="[ 'page-item', qnalist.currentPage == i ? 'active' : '' ]">
							<a class="page-link new-page-link" v-if="i+qnalist.startPageNum-1 <= qnalist.endPageNum" @click="paging(i+qnalist.startPageNum-1)">{{i+qnalist.startPageNum-1}}</a>
						</li>
            <li class="page-item" v-if="qnalist.endPageNum < qnalist.totalPage">
              <a class="page-link new-page-link" @click="paging(qnalist.endPageNum + 1)">
                <span aria-hidden="true">&gt;</span>
              </a>
            </li>
					</ul>
				</nav>
    </div>    
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Qna',
	  data(){
      return{
        qnalist: {}        
      }

	  },
    created(){
      var vm=this;
      var url = "http://localhost:9000/project/api/qna-board/list";
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
      paging:function(currentPage){
        var vm = this;
        var url = "http://localhost:9000/project/api/qna-board/list";
        const data={
          limit : 5,
          currentPage:currentPage
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