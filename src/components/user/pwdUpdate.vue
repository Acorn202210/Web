<template>
    <div class="sub-tit-box">
        <div class="container">
            <h3 class="sub-tit">비밀번호 수정</h3>
        </div>
    </div>
    <div class="container py-5">
        <div style="width:100%; max-width:500px; margin:0 auto;">
            <div>
                <div style="width:100%">
                    <form v-on:submit="onSubmit" id="myForm" @submit.prevent="submitForm">
                        <div class="form-floating mb-3">
                            <input v-model="pwd" type="password" name="pwd" id="pwd" class="form-control"
                                placeholder="기존 비밀 번호" />
                            <label for="pwd" class="form-label">기존 비밀 번호</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input v-on:input="onPwdInput" v-model="newPwd" type="password" name="newPwd" id="newPwd"
                                v-bind:class="{ 'is-valid': isPwdValid, 'is-invalid': !isPwdValid && isPwdDirty }"
                                class="form-control" placeholder="새 비밀번호" />
                            <label for="newPwd" class="form-label">새 비밀번호</label>
                            <small class="form-text text-muted">특수 문자를 하나 이상 조합하세요.</small>
                            <div class="invalid-feedback">비밀 번호를 확인 하세요</div>
                        </div>
                        <div class="form-floating mb-3">
                            <input v-on:input="onPwdInput" v-model="newPwd2" type="password" id="newPwd2"
                                v-bind:class="{ 'is-valid': isPwdValid, 'is-invalid': !isPwdValid && isPwdDirty }"
                                class="form-control" placeholder="새 비밀번호 확인" />
                            <label for="newPwd2" class="form-label">새 비밀번호 확인</label>
                        </div>
                        <button v-bind:disabled="!isFormValid" type="submit" class="btn btn-dark"
                            style="width:100%">수정하기</button>
                        <button type="reset" class="btn btn-outline-secondary mt-2" style="width:100%">리셋</button>
                    </form>
                </div>
            </div>
        </div>
    </div><!-- //container -->
</template>
  
<script>
import axios from 'axios';
export default {
    name: 'myPage',
    data() {
        return {
            my: {},
            profile: false,
            id: this.$store.getters.isUserId,
            isPwdValid: false,
            pwd: "",
            newPwd: "",
            newPwd2: ""

        }
    },
    computed: {
        isFormValid() {
            let result = this.isPwdValid && (this.pwd != "");
            return result;
        }
    },
    created() {
        var vm = this;
        var url = `http://localhost:9000/project/api/users/${this.id}`;
        axios.get(url)
            .then(function (response) {
                vm.my = response.data.body;
            })
            .catch(function (error) {
                console.log(error);
            })

        var url2 = `http://localhost:9000/project/api/users/${this.id}/profile`;
        axios.get(url2)
            .then(function (response) {
                if (response != null) {
                    vm.profile = true;
                }
            })
            .catch(function () {
                vm.profile = false;
            })
    },
    methods: {
        del: function () {
            var vm = this;
            var url = `http://localhost:9000/project/api/users/${this.id}/delete`;
            axios.put(url)
                .then(function () {
                    alert("탈퇴되었습니다.");
                    vm.$store.dispatch('setremoveId');
                    vm.$store.dispatch('setremoveManager');
                    vm.$router.push("/home");
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        onPwdInput() {
            this.isPwdDirty = true;
            const reg = /[\W]/;
            if (!reg.test(this.newPwd)) {
                this.isPwdValid = false;
                return;
            }

            if (this.newPwd == this.newPwd2) {
                this.isPwdValid = true;
            } else {
                this.isPwdValid = false;
            }
        },
        onSubmit(e) {
            if (!this.isFormValid) {
                e.preventDefault();
            }
        },
        submitForm() {
            const url = `http://localhost:9000/project/api/users/${this.id}/pwdUpdate`;
            const data = {
                lecUserId: this.id,
                newPwd: this.newPwd,
                userPwd: this.pwd
            }
            var vm = this;
            axios.put(url, data)
                .then(function () {
                    alert('비밀 번호가 수정되었습니다.');
                    vm.$store.dispatch('setremoveId');
                    vm.$store.dispatch('setremoveManager');

                    vm.$router.push("/home");
                })
                .catch(function () {
                    alert('비밀 번호 수정에 실패했습니다.');
                })
        }
    }
}
</script>
<style></style>