<template>
	<div>
        <div class="container userform">
			<main class="form-signin w-100 m-auto">
			  <form @submit.prevent="submitForm">
			    <h1 class="mb-3 fw-normal main">login</h1>
			    <div class="form-floating">
			      <input type="text" class="form-control" id="floatingId" name="id" placeholder="id" v-model="id">
			      <label for="floatingInput">id</label>
			    </div>
			    <div class="form-floating">
			      <input type="password" class="form-control" id="floatingPassword" name="pwd" placeholder="Password" v-model="pwd" >
			      <label for="floatingPassword">Password</label>
			    </div>
			
			    <div class="checkbox mb-3">
			      <label>
			            <input type="checkbox" value="remember-me" name=isSave> Remember me
			      </label>
			    </div>
			    <button class="w-100 button btn-lg btn" type="submit">로그인</button>
			  </form>
			</main>
		</div>
	</div>
  </template>
  
  <script>
import axios from 'axios';
  export default {
	  name: 'Login',
	  data(){
		  return{
			  id:'',
              pwd:''
		  }
	  },
	  methods:{
        submitForm: function(){
            const url = 'http://localhost:9000/project/api/users/login';
            const data ={
                lecUserId : this.id,
                userPwd : this.pwd
            };
            console.log(data);
            var vm = this;
            axios.post(url, data)
                .then(function(response){
                    vm.$store.dispatch('setUserId', vm.id);
                    vm.$store.dispatch('setIsManager', response.data.body.isManager)
                    vm.$router.push('/home');
                })
                .catch(function(error){
                    console.log(error)
                });
        }
      }
    }
  </script>
  <style>
  @import '../assets/css/user.css'
  </style>