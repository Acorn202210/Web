<template>
  <div class="container mt-3">

    <div class="d-md-flex justify-content-md-end">
      <a v-if="notice.prevNum != 0" :href="`/notice/${notice.prevNum}?condition=${this.$route.query.condition }&keyword=${this.$route.query.keyword }`" class="btn btn-sm me-md-2 btn-secondary">이전글</a>
      <a v-if="notice.nextNum != 0" :href="`/notice/${notice.nextNum}?condition=${this.$route.query.condition }&keyword=${this.$route.query.keyword }`" class="btn btn-sm btn-secondary">다음글</a>
    </div>
    <p class="mt-2" v-if="this.$route.query.condition != ''">
      <strong>{{ this.$route.query.condition }}</strong> 조건
      <strong>{{ this.$route.query.keyword }}</strong> 검색어로 검색된 내용입니다.
    </p>
    <h3 class="sr-only">글 상세 보기</h3>
    <h1>{{ notice.title }}</h1>
    <table>
      <tr>
        <th>글번호</th>
        <td>{{ notice.notiNum }}</td>
      </tr>
      <tr>
        <th>조회수</th>
        <td>{{ notice.viewCount }}</td>
      </tr>
      <tr>
        <th>작성자</th>
        <td class="fw-bold fs-6">{{ notice.notiWriter }}</td>
      </tr>
      <tr>
        <th>작성일</th>
        <td>{{ notice.regdate }}</td>
      </tr>
    </table>
    <div class="mainContent mt-3">{{ notice.content }}</div>
    <div class="d-grid d-md-flex justify-content-md-end mt-3">
      <div class="d-grid d-md-flex " v-if="$store.getters.isManager == 'Y'">
        <a :href="`/notice/update?notiNum=${notice.notiNum}`" class="btn btn-sm me-2 new-btn">수정</a>
        <a href="javascript:" @click="deleteConfirm(notice.notiNum)" class="btn btn-sm me-2 btn-danger">삭제</a>
      </div>
      <a :href="'/notice'" class="btn btn-sm me-2 btn-secondary">목록</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NoticeDetail',
  data() {
    return {
      notice: {}
    }
  },
  created() {
    var vm = this;
    var url = `/project/api/notice/${this.$route.params.notiNum}`;
    const data = {
        keyword:this.$route.query.keyword,
        condition:this.$route.query.condition
      }
    axios.get(url, { params: data })
      .then(function (response) {
        vm.notice = response.data.body;
      })
      .catch(function (error) {
        console.log(error);
      })
  },
  methods: {
    deleteConfirm: function (notiNum) {
      var vm = this;
      const isDelete = confirm("이 공지 사항을 삭제하겠습니까?");
      var url = `/project/api/notice/${notiNum}/delete`;
      if (isDelete) {
        axios.put(url)
          .then(function () {
            alert('공지 사항이 삭제 되었습니다.');
            vm.$router.push('/notice');
          })
          .catch(function () {
            alert('공지 사항 삭제에 실패했습니다.');
          })
      }
    }
  }
}
</script>

<style>
@import '../../assets/css/board.css'
</style>