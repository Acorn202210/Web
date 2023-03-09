<template>
    <div class="sub-tit-box">
        <div class="container">
            <h3 class="sub-tit">개인정보 수정</h3>
        </div>
    </div>
    <div class="container py-5">
        <div style="width:100%; max-width:500px; margin:0 auto;">
            <div class=""><!-- d-grid gap-3 -->
                <div class="mypage-table-box py-3 border-top border-bottom">
                    <div style="width:100%">
                        <div class="d-flex align-items-center flex-column text-center">
                            <a id="profileLink" href="javascript:">
                                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor"
                                    class="bi bi-person-circle" viewBox="0 0 16 16" v-if="profile == false">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fill-rule="evenodd"
                                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                                <img v-if="profile == true" id="profileImage"
                                    :src="`http://localhost:9000/project/api/users/${$store.getters.isUserId}/profile`"
                                    width="150" height="150">
                            </a>
                            <span class="d-block mt-2 fw-bold">{{ my.lecUserId }}님</span>
                        </div>
                        <form>
                            <input type="hidden" name="profile" value="${ empty dto.profile ? 'empty' : dto.profile }" />
                            <div class="form-floating mb-3 mt-3">
                                <input v-on:input="onEmailInput" v-model="email" v-bind:class="{'is-valid':isEmailValid, 'is-invalid':!isEmailValid && isEmailDirty}" type="email" class="form-control" name="email" id="floatingEmail" placeholder="이메일" />
                                <label for="email" class="form-label">이메일</label>
                                <div class="invalid-feedback email-feedbak">이메일 형식에 맞게 입력하세요.</div>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" v-model="phone" class="form-control" name="phone" id="floatingPhone" placeholder="핸드폰 번호" />
                                <label for="phone" class="form-label">핸드폰 번호</label>
                            </div>
                            <div class="form-floating">
                                <input type="date" v-model="birth" class="form-control" name="birth" id="floatingBirth" placeholder="생일" />
                                <label for="birth" class="form-label">생일</label>
                            </div>
                            <button type="submit" class="btn btn-dark mt-3" style="width:100%">수정확인</button>
                            <button type="reset" class="btn btn-outline-secondary mt-2" style="width:100%">취소</button>
                        </form>

                        <form id="imageForm" action="${pageContext.request.contextPath}/users/profile_upload" method="post"
                            enctype="multipart/form-data">
                            프로필 사진
                            <input type="file" id="image" name="image" accept=".jpg, .png, .gif" />
                            <button type="submit">업로드</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div><!-- //container -->
</template>
  
<script>
import axios from 'axios';
export default {
    name: 'userUpdate',
    data() {
        return {
            my: {},
            profile: false,
            id: this.$store.getters.isUserId,
            isEmailValid: false,
            email: "",
            phone:"",
            birth:""

        }
    },
    created() {
        var vm = this;
        var url = `http://localhost:9000/project/api/users/${this.id}`;
        axios.get(url)
            .then(function (response) {
                vm.my = response.data.body;
                vm.email = vm.my.userEmail;
                vm.phone = vm.my.userPhone;
                vm.birth = vm.my.userBirth;
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
        onEmailInput() {
            this.isEmailDirty = true;

            const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            if (!reg.test(this.email)) {
                this.isEmailValid = false;
            } else {
                this.isEmailValid = true;
            }
        },
    }
}
</script>
<style></style>