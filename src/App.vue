<template>
  
  <div class="wrapper" id="App">
    <Header/>
    <div class="container">
      <router-view></router-view>
    </div>

    <div class="visual-bg">
      <div class="container hero">
          <div class="row">
              <div class="col-12 col-lg-6 col-xl-5 offset-xl-1">
                  <h1>Online lecture HomePage</h1>
                  <p>Acorn 2조</p><button
                      class="btn btn-light btn-lg action-button" type="button">Learn More</button>
              </div>
              <div class="col-md-5 col-lg-5 offset-lg-1 offset-xl-0 d-none phone-holder">
                  <div class="iphone-mockup"><img src="" class="device">
                      <div class="screen"></div>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <Footer/>
  </div>
  
</template>

<script>
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'
import axios from 'axios';

export default {
  name: 'App',
  data(){
    return{
      users: []
      
    }
  }, 
  created() {
    var vm = this;
    axios.get('http://localhost:9000/project/api/faq/Faqlist')
      .then(function(response) {
        console.log(response);
        vm.users = response.data;
      })
      .catch(function(error) {
        console.log(error);
      })
  },

  methods:{
    
  },
  components: {
    Header, 
    Footer
  },
  
  
}
</script>

<style>

/* 기존 스타일 추가 (main_nav.css)  */
/*레이아웃*/
.sub-tit-box{padding:50px 0; background:rgba(30,189,142,0.7); margin-bottom:30px}
.sub-tit {font-weight: 600; color:#fff; text-align:center;}
.lecture-detail-tit{background:rgba(30,189,142,0.7); padding:50px 50px; font-weight: 600; color:#fff; text-align:center;}


/* 메인 페이지 */

/*메인 visual*/
.visual-bg {
	background:#1EBD8E;
	padding:100px 0 100px;
}

/*테이블 하단 카테고리 검색 박스*/
.table-search-box{
    width:502px;
    margin:0 auto;
}
.table-search-box select{width:55%}
.table-search-box input[type=text]{width:100%}
.table-search-box .table-search-btn{width:150px}

/*글쓰기 버튼(등록버튼) */
.new-btn{
    background: #1EBD8E;
    color: #fff;
    font-weight: bold;
    border: none;
}
.new-btn:hover,
.new-btn:focus {
	color: #fff;
	background:  #46DEB1;
    border-color: #46DEB1;
}
.new-btn-black{
    background: #000;
    color: #fff;
    font-weight: bold;
    border: none;
}
.new-btn-black:hover,
.new-btn-black:focus{
	background: rgba(0,0,0,0.7);
	color: #fff;
}

/*페이지 숫자(1,2,..) 버튼*/
.page-btn {margin-top:15px;}
.new-page-link {
    color: #000;
    border:none;
}
.new-page-link:hover,
.new-page-link:focus{
    color:#fff;
    background:  #46DEB1;
    border-color: #46DEB1;
}


.page-item:first-child .new-page-link, 
.page-item:last-child .new-page-link{
	border-radius: 0;
}
.active>.new-page-link,.new-page-link.active{
    color:#fff;
    background: #1EBD8E;
    border-color:#1EBD8E;
}

/*마이페이지*/
.mypage-table-box th, 
.mypage-table-box td{display:block}



/*reset*/
a {color:inherit; text-decoration: none}
.sr-only {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    border: 0;
    clip: rect(0,0,0,0);
}

@media (min-width: 768px) {
  .header-blue .navbar .navbar-collapse {
    border-color:transparent;
    margin:0;
  }
  .header-blue .navbar-nav .nav-link {
    padding-left:.7rem;
    padding-right:.7rem;
  }
  .header-blue .hero {
    margin-top:60px;
    text-align:left;
  }
  .header-blue .navbar {
    padding-top:1rem;
    padding-bottom:1rem;
  }
}



@media (min-width: 992px) {
  .header-blue .hero h1 {
    margin-top:190px;
    margin-bottom:24px;
    line-height:1.2;
  }
  .header-blue .navbar-nav .nav-link {
    padding-left:1.2rem;
    padding-right:1.2rem;
  }
}




</style>
