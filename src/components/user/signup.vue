<template>
  <div class="container userform">
    <main class="form-signin w-100 m-auto mt-5">
      <h3 class="text-center mb-3 fw-normal">환영합니다</h3>
      <form v-on:submit="onSubmit" @submit.prevent="submitForm" id="myForm">
        <div class="mt-4">
          <div class="form-check form-check-inline">
            <input v-model="isManager" class="form-check-input" type="radio" name="isManager" id="inlineRadio1" value="N">
            <label class="form-check-label" for="inlineRadio1">회원</label>
          </div>
          <div class="form-check form-check-inline">
            <input v-model="isManager" class="form-check-input" type="radio" name="isManager" id="inlineRadio2" value="Y">
            <label class="form-check-label" for="inlineRadio2">관리자</label>
          </div>
        </div>
        <div class="form-floating">
          <input v-on:input="onIdInput" v-model="id" v-bind:class="{ 'is-valid': isIdValid, 'is-invalid': !isIdValid && isIdDirty }" type="text" class="form-control" name="id" id="floatingId" placeholder="아이디" />
          <label for="floatingId">아이디</label>
          <small class="form-text text-muted">영문자 소문자로 시작하고 5글자~10글자 이내로 입력하세요</small>
          <div class="valid-feedback">사용 가능한 아이디 입니다.</div>
          <div class="invalid-feedback">사용할 수 없는 아이디 입니다.</div>
        </div>
        <div class="form-floating">
          <input v-on:input="onPwdInput" v-model="pwd" v-bind:class="{'is-valid':isPwdValid, 'is-invalid':!isPwdValid && isPwdDirty}" type="password" class="form-control" name="pwd" id="floatingPwd" placeholder="비밀번호" />
          <label for="floatingPassword">비밀번호</label>
          <small class="form-text text-muted">특수 문자를 하나 이상 조합하세요.</small>
          <div class="invalid-feedback">비밀 번호를 확인 하세요</div>
        </div>
        <div class="form-floating">
          <input v-on:input="onPwdInput" v-model="pwd2" type="password" class="form-control" name="pwd2" id="floatingPwd2" placeholder="비밀번호 확인" />
          <label for="floatingPassword2">비밀번호 확인</label>
        </div>
        <div class="form-floating">
          <input type="text" v-model="phone" class="form-control" name="phone" id="floatingPhone" placeholder="핸드폰 번호" />
          <label for="floatingPhone">핸드폰 번호</label>
        </div>
        <div class="form-floating">
          <input type="date" v-model="birth" class="form-control" name="birth" id="floatingBirth" placeholder="생일" />
          <label for="floatingBirth">생일</label>
        </div>
        <div class="form-floating">
          <input v-on:input="onEmailInput" v-model="email" v-bind:class="{'is-valid':isEmailValid, 'is-invalid':!isEmailValid && isEmailDirty}" type="email" class="form-control" name="email" id="floatingEmail" placeholder="이메일" />
          <label for="floatingEmail">이메일</label>
          <div class="invalid-feedback email-feedbak">이메일 형식에 맞게 입력하세요.</div>
        </div>
        <button style="background:#1EBD8E; color:#fff" v-bind:disabled="!isFormValid" class="w-100 button btn btn-lg mt-3" type="submit">가입</button>
      </form>
    </main>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  name: 'Signup',
  data() {
    return {
      isIdValid: false,
      isPwdValid: false,
      isEmailValid: false,
      isManager:'',
      id: "",
      email: "",
      pwd: "",
      pwd2: "",
      phone:"",
      birth:"",
      isIdDirty: false,
      isEmailDirty: false,
      isPwdDirty: false,
    }
  },
  computed: {
    isFormValid() {
      // 모델을 활용해서 얻어낼 값이 있으면 얻어낸다.
      let result = this.isIdValid && this.isPwdValid && this.isEmailValid;
      // 함수에서 리턴해주는 값을 모델처럼 사용하면 됨.
      return result;
    }
  },
  methods: {
    onIdInput() {
      this.isIdDirty = true;
      const reg = /^[a-z].{4,9}$/;
      const isMatch = reg.test(this.id);
      if (!isMatch) {
        this.isIdValid = false;
        return;
      }

      const self = this;
      const url = 'http://localhost:9000/project/api/users/checkid';
      const data = { lecUserId: this.id }
      axios.get(url, { params: data })
        .then(function (response) {
          console.log(response);
          if (response.data.body.isValid) {
            self.isIdValid = true;
          } else {
            self.isIdValid = false;
          }
        })
    },
    onPwdInput() {
      this.isPwdDirty = true;
      const reg = /[\W]/;
      if (!reg.test(this.pwd)) {
        this.isPwdValid = false;
        return;
      }

      if (this.pwd == this.pwd2) {
        this.isPwdValid = true;
      } else {
        this.isPwdValid = false;
      }
    },

    onEmailInput() {
      this.isEmailDirty = true;

      const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (!reg.test(this.email)) {
        this.isEmailValid = false;
      } else {
        this.isEmailValid = true;
      }
    },
    onSubmit(e) {
      if (!this.isFormValid) {
        e.preventDefault();
      } 
    },
    submitForm(){
      const url = 'http://localhost:9000/project/api/users';
      const data = {
        lecUserId: this.id,
        managerYn: this.isManager,
        userBirth: this.birth,
        userEmail: this.email,
        userPhone: this.phone, 
        userPwd : this.pwd,
        userNickname:"dd"
      }
      var vm = this;
      axios.post(url, data)
        .then(function (response) {
          console.log(response);
          alert('환영합니다! 회원가입 되었습니다!');
          vm.$router.push('/login');
        })
    }
  }
}
</script>
<style>
@import '../../assets/css/user.css'
</style>