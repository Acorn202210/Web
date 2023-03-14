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
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" v-if="list.startPageNum != 1">
            <a class="page-link new-page-link" @click="paging(list.startPageNum - 1)">
              <span aria-hidden="true">&lt;</span>
            </a>
          </li>

          <li v-for="i in 7" :key="i"
            :class="['page-item', list.currentPage == i + list.startPageNum - 1 ? 'active' : '']">
            <a class="page-link new-page-link" v-if="i + list.startPageNum - 1 <= list.endPageNum"
              @click="paging(i + list.startPageNum - 1)">{{ i + list.startPageNum - 1 }}</a>
          </li>

          <li class="page-item" v-if="list.endPageNum < list.totalPage">
            <a class="page-link new-page-link" @click="paging(list.endPageNum + 1)">
              <span aria-hidden="true">&gt;</span>
            </a>
          </li>
        </ul>
      </nav>

      <form @submit.prevent="submitForm" action="list" method="get">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end table-search-box">
          <select v-model="condition" name="condition" id="condition" class="form-select">
            <option value="" disabled>검색 조건</option>
            <option value="id" >아이디</option>
            <option value="birth" >생일</option>
            <option value="email" >이메일</option>
            <option value="phone" >핸드폰 번호</option>
            <option value="regdate" >가입일</option>
          </select>
          <input type="text" name="keyword" placeholder="검색어..." class="form-control" v-model="keyword" />
          <button type="submit" class="table-search-btn new-btn-black btn">검색</button>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  name: 'Signup',
  data() {
    return {
      list: {},
      condition:'',
      keyword:'',
      id:'',
      birth:'',
      email:'',
      phone:'',
      regdate:''
    }
  },
  created() {
    var vm = this;
    var url = "/project/api/users/list";
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
      var url = `/project/api/users/${lecUserId}/delete`;
      axios.put(url)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })

      var vm = this;
      var url2 = "/project/api/users/list";
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
    paging: function (currentPage) {
      var vm = this;

      if(this.condition == 'id'){
        this.id = this.keyword;
        this.birth='';
        this.email='';
        this.phone='';
        this.regdate='';
      }else if(this.condition == 'birth'){
        this.birth = this.keyword;
        this.id='';
        this.email='';
        this.phone='';
        this.regdate='';
      }else if(this.condition == 'email'){
        this.email = this.keyword;
        this.birth='';
        this.id='';
        this.phone='';
        this.regdate='';
      }else if(this.condition == 'phone'){
        this.phone = this.keyword;
        this.birth='';
        this.email='';
        this.id='';
        this.regdate='';
      }else if(this.condition == 'regdate'){
        this.regdate = this.keyword;
        this.birth='';
        this.email='';
        this.phone='';
        this.id='';
      }
      var url = "/project/api/users/list";
      const data = {
        limit: 7,
        currentPage: currentPage,
        lecUserId:vm.id,
        userBirth:vm.birth,
        userEmail:vm.email,
        userPhone:vm.phone,
        userRegdate:vm.regdate
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
    submitForm(){
      var vm = this;

      if(this.condition == 'id'){
        this.id = this.keyword;
        this.birth='';
        this.email='';
        this.phone='';
        this.regdate='';
      }else if(this.condition == 'birth'){
        this.birth = this.keyword;
        this.id='';
        this.email='';
        this.phone='';
        this.regdate='';
      }else if(this.condition == 'email'){
        this.email = this.keyword;
        this.birth='';
        this.id='';
        this.phone='';
        this.regdate='';
      }else if(this.condition == 'phone'){
        this.phone = this.keyword;
        this.birth='';
        this.email='';
        this.id='';
        this.regdate='';
      }else if(this.condition == 'regdate'){
        this.regdate = this.keyword;
        this.birth='';
        this.email='';
        this.phone='';
        this.id='';
      }
      var url = "/project/api/users/list";
      const data = {
        limit: 7,
        currentPage: vm.currentPage,
        lecUserId:vm.id,
        userBirth:vm.birth,
        userEmail:vm.email,
        userPhone:vm.phone,
        userRegdate:vm.regdate
      }
      axios.get(url, { params: data })
        .then(function (response) {
          console.log(response.data);
          vm.list = response.data.body;
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
}
</script>
<style></style>