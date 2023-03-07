<template>
  <div>
    <div>
      <button type="button">등록</button>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
            <th>답변여부</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list.body.data" :key="item.boardQuestionNum">
            <td>{{item.boardQuestionNum}}</td>
            <td>
              <a href="/qna/detail/${item.boardQuestionNum}">{{item.title}}</a>
            </td>
            <td>{{item.boardQuestionWriter}}</td>
            <td>{{item.userRegdate}}</td>
            <td>{{item.answeredYn}}</td>
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
      axios.get('http://localhost:9000/project/api/qna_board/list')
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