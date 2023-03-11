<template>
    <div class="container">
        <input type="hidden" v-model="no"/>
        <div>
            <label for="title">제목</label>
            <input type="text" v-model="title" placeholder="제목을 입력합니다"/>
        </div>
        <div>
            <label for="content">내용</label>
            <textarea type="text" v-model="content" placeholder="내용을 입력합니다"/>
        </div>
        <button @click="qnafreeupdate">수정</button>
        <button @click="$router.go(-1)">취소</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'QnaFreeUpdate',
	data(){
		return {
			qnafree:{},
            no: this.$route.params.freeQuestionNum,
			title: '',
			content: '',
		}
	},
    methods: {
        qnafreeupdate: function () {
        axios.put('/project/api/qna-free/' + this.no + '/update',
            { freeQuestionNum: this.no, title: this.title, content: this.content }
        ).then(response => {
            console.warn(response)
            this.title = '';
            this.content = '';
            this.result = response.data;
            this.$router.push('/qnafree'); // 수정 완료 후 faq 페이지로 이동
        }).catch((ex) => {
            console.warn("ERROR!!!!! : ", ex)
        })
        },
    }
}
</script>

<style>

</style>