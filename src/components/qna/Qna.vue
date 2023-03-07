<template>

  <div class="sub-tit-box">
    <div class="container">
      <h3 class="sub-tit">1:1문의</h3>
    </div>
  </div>
    
  <div class="container">
    <div>
      <button class="btn btn-sm me-2 mb-3 button">
        <a href="/insertform">등록</a>
      </button>
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
          <tr style="text-align: center;" v-for="item in list.body.data" :key="item.boardQuestionNum">
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
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Qna',
	  data(){
      return{
        list: []        
      }

	  },
    created(){
      var vm=this;
      axios.get('http://localhost:9000/project/api/qna-board/list')
        .then(function(response){
          console.log(response);
          vm.list=response.data;        
        })
        .catch(function(error){
          console.log(error);
        })
    },
}
</script>

<style>

</style>