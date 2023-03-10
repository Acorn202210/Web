<template>
  <div class="header-blue" id="HeaderComponent">
    <nav class="navbar navbar-dark navbar-expand-md navigation-clean-search" style="background-color:#fff">
      <div class="container">
        <a class="navbar-brand" @click="$router.push('/home')"><router-link to="home">plec</router-link></a>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navcol-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="navbar-toggler-icon ham-btn"></span>
        </button>
        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="nav navbar-nav">

            <li class="dropdown">
              <a class="dropdown-toggle nav-link dropdown-toggle new-nav-link" data-toggle="dropdown"
                aria-expanded="false" href="#">강의 </a>
              <div class="dropdown-menu" role="menu">
                <a class="dropdown-item" role="presentation" @click="$router.push('/front')">웹프론트엔드</a>
                <a class="dropdown-item" role="presentation" @click="$router.push('/backend')">백엔드</a>
                <a class="dropdown-item" role="presentation" @click="$router.push('/mobile')">모바일</a>
              </div>
            </li>
            <!--<li class="nav-item" role="presentation"><a class="nav-link active" href="#">Link</a></li>-->
            <li class="dropdown"><a class="dropdown-toggle nav-link dropdown-toggle new-nav-link" data-toggle="dropdown"
                aria-expanded="false" href="#">고객센터 </a>
              <div class="dropdown-menu" role="menu">
                <a class="dropdown-item" role="presentation" @click="$router.push('/notice')">공지사항</a>
                <a class="dropdown-item" role="presentation" @click="$router.push('/faq')">자주묻는질문</a>
                <a class="dropdown-item" role="presentation" @click="$router.push('/qna')">1:1 문의</a>
              </div>
            </li>
            <li class="dropdown"><a class="dropdown-toggle nav-link dropdown-toggle new-nav-link" data-toggle="dropdown"
                aria-expanded="false" href="#">커뮤니티</a>
              <div class="dropdown-menu" role="menu">
                <a class="dropdown-item" role="presentation"
                  href="${pageContext.request.contextPath}/qna_users/list">질문답변</a>
                <a class="dropdown-item" role="presentation" @click="$router.push('/qnafree')">자유게시판</a>
              </div>
            </li>
          </ul>
          <!-- //검색 
              <form class="form-inline mr-auto" target="_self">
                  <div class="form-group"><label for="search-field"><i class="fa fa-search"></i></label>
                      <input class="form-control search-field" type="search" name="search" id="search-field">
                  </div>
              </form> -->
          <div style="margin-left:auto">
            <div v-if="$store.getters.isUserId == null">
              <span class="navbar-text" @click="$router.push('/login')">로그인</span>
              <a @click="$router.push('/signup')" class="btn btn-light action-button" role="button">회원가입</a>
            </div>
            <div v-if="$store.getters.isUserId != null">
              <p>
                <span v-if="$store.getters.isManager == 'Y'">
                  <a @click="$router.push('/manager')" class="login" style="vertical-align: middle;">회원 목록</a>
                </span>
                <span v-if="$store.getters.isManager == 'N'">
                  <span class="navbar-text"><a @click="$router.push('/my-page')" class="login" style="vertical-align: middle;">{{ $store.getters.isUserId }}</a> 로그인중... </span>
                </span>
                <a class="btn btn-light action-button" role="button" @click="logout">로그아웃</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout: function () {
      this.$store.dispatch('setremoveId');
      this.$store.dispatch('setremoveManager');

      this.$router.push("/home");

    }
  }
}
</script>
<style ></style>



