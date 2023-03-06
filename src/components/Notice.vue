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
            <tr style="text-align: center;">
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
                <td>
                  <a href="detail?num=${tmp.num }&condition=${condition}&keyword=${encodedK}">{{tmp.title}}</a>
                </td>
                <td>{{tmp.regdate}}</td>
                <td>{{ tmp.notiWriter }}</td>
                <td>{{tmp.viewCount}}</td>
              </tr>
          </tbody>
        </table>
      </div>
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
      axios.get("http://localhost:9000/project/api/notice/list")
      .then(function(response){
        console.log(response.data);
        vm.notices = response.data.body;
      })
      .catch(function(error){
        console.log(error);
      })
    }
}
</script>

<style>

</style>