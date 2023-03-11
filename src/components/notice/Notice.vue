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
          <tbody class="table-group-divider">
            <tr style="text-align: center;" v-for="tmp in notices.data" :key="tmp" @click="detail(tmp.notiNum)">
              <td>{{ tmp.notiNum }} </td>
              <td>{{ tmp.title }}</td>
              <td>{{ tmp.regdate }}</td>
              <td>{{ tmp.notiWriter }}</td>
              <td>{{ tmp.viewCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end" v-if="$store.getters.isManager == 'Y'">
        <a @click="$router.push('/notice/insert')" class="new-btn btn btn-sm">글쓰기</a>
      </div>
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" v-if="notices.startPageNum != 1">
            <a class="page-link new-page-link" @click="paging(notices.startPageNum - 1)">
              <span aria-hidden="true">&lt;</span>
            </a>
          </li>

          <li v-for="i in 7" :key="i"
            :class="['page-item', notices.currentPage == i + notices.startPageNum - 1 ? 'active' : '']">
            <a class="page-link new-page-link" v-if="i + notices.startPageNum - 1 <= notices.endPageNum"
              @click="paging(i + notices.startPageNum - 1)">{{ i + notices.startPageNum - 1 }}</a>
          </li>

          <li class="page-item" v-if="notices.endPageNum < notices.totalPage">
            <a class="page-link new-page-link" @click="paging(notices.endPageNum + 1)">
              <span aria-hidden="true">&gt;</span>
            </a>
          </li>
        </ul>
      </nav>

      <form @submit.prevent="submitForm" action="list" method="get">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end table-search-box">
          <select v-model="condition" name="condition" id="condition" class="form-select">
            <option value="" disabled>검색 조건</option>
            <option value="title_content">제목 + 내용</option>
            <option value="title">제목</option>
          </select>
          <input type="text" name="keyword" placeholder="검색어..." class="form-control" v-model="keyword" />
          <button type="submit" class="table-search-btn new-btn-black btn">검색</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Notice',
  data() {
    return {
      notices: {},
      condition: '',
      keyword: ''
    }
  },
  created() {
    var vm = this;
    var url = "/project/api/notice/list";
    const data = {
      limit: 7
    }
    axios.get(url, { params: data })
      .then(function (response) {
        console.log(response.data);
        vm.notices = response.data.body;
      })
      .catch(function (error) {
        console.log(error);
      })
  },
  methods: {
    detail: function (notiNum) {
      this.$router.push('/notice/' + notiNum);
    },
    paging: function (currentPage) {
      var vm = this;
      var url = "/project/api/notice/list";
      const data = {
        limit: 7,
        currentPage: currentPage,
        keyword: vm.keyword,
        condition: vm.condition
      }
      axios.get(url, { params: data })
        .then(function (response) {
          console.log(response.data);
          vm.notices = response.data.body;
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    submitForm: function () {
      var vm = this;
      var url = "/project/api/notice/list";
      const data = {
        limit: 7,
        currentPage: vm.currentPage,
        keyword: vm.keyword,
        condition: vm.condition
      }
      axios.get(url, { params: data })
        .then(function (response) {
          console.log(response.data);
          vm.notices = response.data.body;
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
}
</script>

<style></style>