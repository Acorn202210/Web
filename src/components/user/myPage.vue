<template>
    <div>
        <div class="sub-tit-box">
            <div class="container">
                <h3 class="sub-tit">마이페이지</h3>
            </div>
        </div>
        <div class="container py-5">
            <div style="width:100%; max-width:500px; margin:0 auto;">
                <div class="d-grid gap-3">
                    <a @click="this.$router.push('/my-lec-list')" onfocus="this.blur()" class="btn new-btn">나의 강의실</a>
                    <div class="mypage-table-box py-3 border-top border-bottom">
                        <table style="width:100%">
                            <tr class="d-block mb-3">
                                <th>아이디</th>
                                <td>{{ my.lecUserId }}</td>
                            </tr>
                            <tr class="d-block mb-3">
                                <th>프로필 이미지</th>
                                <td>
                                    <svg id="profileImage" xmlns="http://www.w3.org/2000/svg" width="100" height="100"
                                        fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16"
                                        v-if="profile == ''">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fill-rule="evenodd"
                                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                    <img v-if="profile != ''" id="profileImage"
                                        :src="`/project/api/users/profile/${profile}`"
                                        width="100" height="100" />
                                </td>
                            </tr>
                            <tr class="d-block mb-3">
                                <th>이메일</th>
                                <td>{{ my.userEmail }}</td>
                            </tr>
                            <tr class="d-block mb-3">
                                <th>핸드폰 번호</th>
                                <td>{{ my.userPhone }}</td>
                            </tr>
                            <tr class="d-block mb-3">
                                <th>생일</th>
                                <td>{{ my.userBirth }}</td>
                            </tr>
                            <tr class="d-block mb-3">
                                <th>가입일</th>
                                <td>{{ my.userRegdate }}</td>
                            </tr>
                            <tr>
                                <th></th>
                                <td><a  @click="this.$router.push('/user-update')" class="btn btn-dark" style="width:100%">개인정보 수정</a></td>
                            </tr>
                        </table>
                    </div>
                    <a @click="this.$router.push('/pwd-update')" class="btn new-btn">비밀번호 수정하기</a>
                    <a @click="del" class="btn btn-outline-secondary">탈퇴</a>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    name: 'myPage',
    data() {
        return {
            my: {},
            profile: '',
            id : this.$store.getters.isUserId,
        }
    },
    created() {
        var vm = this;
        var url = `/project/api/users/${this.id}`;
        axios.get(url)
            .then(function (response) {
                vm.my = response.data.body;
                if(vm.my.profileNum == null){
                    vm.profile = '';
                }else{
                    vm.profile = vm.my.profileNum;
                }
            })
            .catch(function (error) {
                console.log(error);
            })

    },
    methods: {
        del: function () {
            var vm = this;
            var url = `/project/api/users/${this.id}/delete`;
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
        }
    }
}
</script>
<style></style>