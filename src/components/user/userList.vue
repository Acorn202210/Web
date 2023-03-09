<template>
  <div>
    <div class="sub-tit-box">
      <div class="container">
        <h3 class="sub-tit">회원 목록</h3>
      </div>
    </div>
    <div class="container">
      <div class="mb-4">
        <a @click="$router.push('/manager')" class="fw-bold me-3">전체회원목록</a>
        <a href="${pageContext.request.contextPath}/studentLecture/list?large_category=1&small_category=1"> 강의별 회원목록</a>
      </div>
      <div class="table-responsive table-top">
        <table class="table table-hover align-middle">
          <thead>
            <tr style="text-align: center;">
              <th width="10%">아이디</th>
              <th width="20%">생일</th>
              <th width="20%">이메일</th>
              <th width="20%">핸드폰 번호</th>
              <th width="20%">가입일</th>
              <th width="10%">회원 삭제</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr style="text-align: center;" v-for="tmp in list.data" :key="tmp">
              <td>{{ tmp.lecUserId }}</td>
              <td>{{ tmp.userBirth }}</td>
              <td>{{ tmp.userEmail }}</td>
              <td>{{ tmp.userPhone }}</td>
              <td>{{ tmp.userRegdate }}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="del(tmp.lecUserId)"> 삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  name: 'Signup',
  data() {
    return {
      list: {}
    }
  },
  created() {
    var vm = this;
    var url = "http://localhost:9000/project/api/users/list";
    const data = {
      limit: 7
    }
    axios.get(url, { params: data })
      .then(function (response) {
        console.log(response.data);
        vm.list = response.data.body;
      })
      .catch(function (error) {
        console.log(error);
      })
  },
  methods: {
    del: function (lecUserId) {
      console.log(lecUserId);
      var url = `http://localhost:9000/project/api/users/${lecUserId}/delete`;
      axios.put(url)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })

      var vm = this;
      var url2 = "http://localhost:9000/project/api/users/list";
      const data = {
        limit: 7
      }
      axios.get(url2, { params: data })
        .then(function (response) {
          console.log(response.data);
          vm.list = response.data.body;
        })
        .catch(function (error) {
          console.log(error);
        })
    },
  }
}
</script>
<style></style>