<template>
  
  <div>
    <div class="sub-tit-box">
      <div class="container">
        <h3 class="sub-tit">공지사항</h3>
      </div>
    </div>
    <div class="container">
      <div class="table-responsive table-top">
        <table class="table table-hover align-middle">
          <thead>
            <tr style="text-align: center" on-click="detail">
              <th width="15%">글번호</th>
              <th width="auto">제목</th>
              <th width="25%">작성일</th>
              <th width="15%">작성자</th>
              <th width="15%">조회수</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" >              
              <tr style="text-align: center;" v-for="tmp in notices.data" :key="tmp">
                <td>{{tmp.notiNum}} </td>
                <td><a :href="`/notice/${tmp.notiNum}`">{{tmp.title}}</a></td>
                <td>{{tmp.regdate}}</td>
                <td>{{tmp.notiWriter}}</td>
                <td>{{tmp.viewCount}}</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end" v-if="$store.getters.isManager == 'Y'">
        <a href="${pageContext.request.contextPath }/notice/insertform" class="new-btn btn btn-sm">글쓰기</a>
      </div>
      <nav>
					<ul class="pagination justify-content-center">
							<li class="page-item" v-if="notices.startPageNum != 1">
								<a class="page-link new-page-link" @click="paging(notices.startPageNum - 1)">
								<span aria-hidden="true">&lt;</span>
								</a>
							</li>
						
							<li v-for="i in 5" :key="i" class="page-item ${notices.pageNum eq i ? 'active' : '' }">
								<a class="page-link new-page-link" v-if="i+notices.startPageNum-1 <= notices.endPageNum" @click="paging(i+notices.startPageNum-1)">{{i+notices.startPageNum-1}}</a>
							</li>

							<li class="page-item" v-if="notices.endPageNum < notices.totalPage">
								<a class="page-link new-page-link" @click="paging(notices.endPageNum + 1)">
									<span aria-hidden="true">&gt;</span>
								</a>
							</li>
					</ul>
				</nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Notice',
	  data(){
      return{
        notices:{}
      }
	  },
    created(){
      var vm = this;
      var url = "http://localhost:9000/project/api/notice/list";
      const data={
        limit : 5
      }
      axios.get(url, { params: data })
      .then(function(response){
        console.log(response.data);
        vm.notices = response.data.body;
      })
      .catch(function(error){
        console.log(error);
      })
    },
    methods:{
      paging:function(currentPage){
        var vm = this;
        var url = "http://localhost:9000/project/api/notice/list";
        const data={
          limit : 5,
          currentPage:currentPage
        }
        axios.get(url, { params: data })
        .then(function(response){
          console.log(response.data);
          vm.notices = response.data.body;
        })
        .catch(function(error){
          console.log(error);
        })
      }
    }
}
</script>

<style>

</style>