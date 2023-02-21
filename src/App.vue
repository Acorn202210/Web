<template>
  
  <div class="wrapper" id="App">
    <Header/>
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

export default {
  name: 'App',
  data(){
    return{
      
    }
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


.wrapper {
  min-height: calc(100vh - 70px);
}
.footer {
  height: 50px;
}

.header-blue {
  font-family:'Source Sans Pro', sans-serif;
  border-bottom: 1px solid #1EBD8E;
}

.header-blue .navbar {
  background:transparent;
  padding-top:.75rem;
  padding-bottom:.75rem;
  color:#000;
  border-radius:0;
  box-shadow:none;
  border:none;
}

@media (min-width:768px) {
  .header-blue .navbar {
    padding-top:1rem;
    padding-bottom:1rem;
  }
}

.header-blue .navbar .navbar-brand {
  font-weight:bold;
  color:#1EBD8E;
}

.header-blue .navbar .navbar-collapse {
  border-top:1px solid rgba(255,255,255,0.3);
  margin-top:.5rem;
}

@media (min-width:768px) {
  .header-blue .navbar .navbar-collapse {
    border-color:transparent;
    margin:0;
  }
}

.header-blue .navbar .navbar-collapse span .login {
  color:#000;
  margin-right:.2rem;
  text-decoration:none;
  font-weight:bold;
}

.header-blue .navbar .navbar-toggler {
  border-color:#1EBD8E;
}

.header-blue .navbar .navbar-toggler:hover, .header-blue .navbar-toggler:focus {
  background:none;
}

.header-blue .navbar .navbar-nav a.active, .header-blue .navbar .navbar-nav > .show .dropdown-item {
  background:none;
  box-shadow:none;
}

@media (min-width: 768px) {
  .header-blue .navbar-nav .nav-link {
    padding-left:.7rem;
    padding-right:.7rem;
  }
}

@media (min-width: 992px) {
  .header-blue .navbar-nav .nav-link {
    padding-left:1.2rem;
    padding-right:1.2rem;
  }
}

.header-blue .navbar .navbar-nav > li > .dropdown-menu {
  margin-top:-5px;
  box-shadow:0 4px 8px rgba(0,0,0,.1);
  background-color:#fff;
  border-radius:2px;
}

.header-blue .navbar .dropdown-menu .dropdown-item:focus, .header-blue .navbar .dropdown-menu .dropdown-item {
  line-height:2;
  color:#37434d;
}

.header-blue .navbar .dropdown-menu .dropdown-item:focus, .header-blue .navbar .dropdown-menu .dropdown-item:hover {
  background:#ebeff1;
}

.header-blue .action-button, .header-blue .action-button:not(.disabled):active {
  border:1px solid #1EBD8E;
  border-radius:40px;
  color:#1EBD8E;
  font-weight:700;
  box-shadow:none;
  text-shadow:none;
  padding:.3rem .8rem;
  background:transparent;
  transition:background-color 0.25s;
  outline:none;
  margin-left:5px;
}

.header-blue .action-button:hover {
  color:#fff;
  background:#1EBD8E;
}

.header-blue .navbar .form-inline label {
  color:#d9d9d9;
}

.header-blue .navbar .form-inline .search-field {
  display:inline-block;
  width:80%;
  background:none;
  border:none;
  border-bottom:1px solid transparent;
  border-radius:0;
  color:#ccc;
  box-shadow:none;
  color:inherit;
  transition:border-bottom-color 0.3s;
}

.header-blue .navbar .form-inline .search-field:focus {
  border-bottom:1px solid #ccc;
}

.header-blue .hero {
  margin-top:20px;
  text-align:center;
}

@media (min-width:768px) {
  .header-blue .hero {
    margin-top:60px;
    text-align:left;
  }
}

.header-blue .hero h1 {
  color:#fff;
  font-size:40px;
  margin-top:0;
  margin-bottom:15px;
  font-weight:300;
  line-height:1.4;
}

@media (min-width:992px) {
  .header-blue .hero h1 {
    margin-top:190px;
    margin-bottom:24px;
    line-height:1.2;
  }
}

.header-blue .hero p {
  color:rgba(255,255,255,0.8);
  font-size:20px;
  margin-bottom:30px;
  font-weight:300;
}

.header-blue .phone-holder {
  text-align:right;
}

.header-blue div.iphone-mockup {
  position:relative;
  max-width:300px;
  margin:20px;
  display:inline-block;
}

.header-blue .iphone-mockup img.device {
  width:100%;
  height:auto;
}

.header-blue .iphone-mockup .screen {
  position:absolute;
  width:88%;
  height:77%;
  top:12%;
  border-radius:2px;
  left:6%;
  border:1px solid #444;
  background-color:#aaa;
  overflow:hidden;
  /*background:url(../../assets/img/screen-content-iphone-6.jpg);*/
  background-size:cover;
  background-position:center;
}

.header-blue .iphone-mockup .screen:before {
  content:'';
  background-color:#fff;
  position:absolute;
  width:70%;
  height:140%;
  top:-12%;
  right:-60%;
  transform:rotate(-19deg);
  opacity:0.2;
}

/* 메인 header */
.navbar-text{color:#000; vertical-align: middle;}
.new-nav-link {color:#000}
.new-nav-link:hover, 
.new-nav-link:focus,
.navbar-nav .new-nav-link.active, 
.navbar-nav .show>.new-nav-link{color:#000; font-weight:700}
/*.ham-btn{background-image:url(../images/Hamburger_Icon.png);}*/

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
