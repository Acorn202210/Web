<template>
    <div class="container mt-5">
        <form @submit.prevent="submitForm">
        <div>
            <label for="title" class="form-label">질문</label>
            <input v-model="title" type="text" name="title" id="title" class="form-control" />
        </div>
        <div class="mt-3">
            <label for="content" class="form-label">내용</label>
            <textarea v-model="content" name="content" id="content" rows="10" class="form-control"></textarea>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
            <button type="submit" class="new-btn btn ">수정</button>
        </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'QnaFreeUpdate',
	data(){
		return {
			title: '',
			content: '',
		}
	},
    created() {
        var vm = this;
        var url = `/project/api/qna-free/${this.$route.params.freeQuestionNum}`;
        axios.get(url)
            .then(function (response) {
                vm.title = response.data.body.title;
                vm.content = response.data.body.content;
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    methods: {
        submitForm(){
        const url = `/project/api/qna-free/${this.$route.params.freeQuestionNum}/update`;
        const data = {
            title:this.title,
            content:this.content,
            freeQuestionNum:this.$route.params.freeQuestionNum
        }
        var vm = this;
        axios.put(url, data)
            .then(function () {
            alert('자유게시판이 수정되었습니다.');
            vm.$router.push('/qnafree');
            })
        }
    }
}
</script>

<style>

</style>