<template>
    <div class="container mt-3">
        <div class="d-md-flex justify-content-md-end">
            <a v-if="qnafree.prevNum != 0" :href="`/qnafree/${qnafree.prevNum}?condition=${this.$route.query.condition }&keyword=${this.$route.query.keyword }`" class="btn btn-sm me-md-2 btn-secondary">이전글</a>
            <a v-if="qnafree.nextNum != 0" :href="`/qnafree/${qnafree.nextNum}?condition=${this.$route.query.condition }&keyword=${this.$route.query.keyword }`" class="btn btn-sm btn-secondary">다음글</a>
        </div>
        <p class="mt-2" v-if="this.$route.query.condition != ''">
            <strong>{{ this.$route.query.condition }}</strong> 조건
            <strong>{{ this.$route.query.keyword }}</strong> 검색어로 검색된 내용입니다.
        </p>
        <h3 class="sr-only">글 상세 보기</h3>
        <h1>{{ qnafree.title }}</h1>
        <table>
            <tr>
                <th>글번호</th>
                <td>{{ qnafree.freeQuestionNum }}</td>
            </tr>
            <tr>
                <th>조회수</th>
                <td>{{ qnafree.viewCount }}</td>
            </tr>
            <tr>
                <th>작성자</th>
                <td class="fw-bold fs-6">by {{ qnafree.freeQuestionWriter }}</td> <!--작성자 추가해야함.-->
            </tr>
            <tr>
                <th>작성일</th>
                <td>{{ qnafree.userRegdate }}</td>
            </tr>
        </table>
        <div class="mainContent mt-3">{{ qnafree.content }}</div>
        <div class="d-grid d-md-flex justify-content-md-end mt-3">
            <div class="d-grid d-md-flex " v-if="$store.getters.isUserId == qnafree.freeQuestionWriter">
                <a :href="`/qnafree/update/${qnafree.freeQuestionNum}`" class="btn btn-sm me-2 new-btn">수정</a>
                <a href="javascript:" @click="confirmDelete(qnafree.freeQuestionNum)" class="btn btn-sm me-2 btn-danger">삭제</a>
            </div>
            <a :href="'/qnafree'" class="btn btn-sm me-2 btn-secondary">목록</a>
        </div>
        <div class="mt-3" v-if="$store.getters.isUserId != null">
            <form class="comment-form insert-form" @submit.prevent="submitAnswerForm">
                <div class="input-group">
                    <input type="hidden" name="freeCommentRefGroup" :value="qnafree.freeQuestionNum" />
                    <textarea class="form-control" name="content" v-model="formData.content" placeholder="댓글을 입력합니다"></textarea>
                    <button type="submit" class="btn new-btn">등록</button>
                </div>
            </form>
        </div>
        <!-- 댓글 목록-->
        <!-- <div class="mt-3" v-for="qnafreeanswer in qnafreeanswer.data" :key="qnafreeanswer.freeCommentNum">
            <img v-if="qnafreeanswer.profileNum" :src="`/project/api/users/profile/${qnafreeanswer.profileNum}`" width="50" height="50" style="border-radius: 50%;">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-circle me-3" viewBox="0 0 16 16" v-else>
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
            <span class="ms-3"><strong>{{ qnafreeanswer.freeCommentWriter }}</strong></span>
            <span class="ms-3">{{ qnafreeanswer.userRegdate }}</span>
            <span class="mt-3" v-if="$store.getters.isUserId != null">
                <a class="insert-link ms-3" @click="showAnswerInsertForm(qnafreeanswer.freeCommentNum)">답글</a>
            </span>
            <span v-if="$store.getters.isUserId != null && qnafreeanswer.freeCommentWriter == $store.getters.isUserId">
                <a class="update-link ms-1" @click="showAnswerUpdateForm(qnafreeanswer.freeCommentNum)">수정</a>
                <a class="del ms-1" @click="deleteAnswerConfirm(qnafreeanswer.freeCommentNum)">삭제</a>
            </span>
            <dd>
                <pre id="pre{{qnafreeanswer.freeCommentNum }}">{{ qnafreeanswer.content }}</pre>
            </dd> -->
            
                <!-- 그룹번호 -->
                <!-- <div v-if="qnafreeanswer.commentGroup == qnafreeanswer.freeCommentNum">
                    <div v-if="qnafreeanswer.freeCommentNum == qnafreeanswer.commentGroup">
                        {{ qnafreeanswer.content }}
                    </div>
                    <div v-else-if="qnafreeanswer.commentGroup == qnafreeanswer.freeCommentNum">
                        {{ qnafreeanswer.content }}
                    </div>
                </div>
            <div v-for="(answers, group) in groupedAnswers" :key="group">
                <h2>{{ group }}</h2>
                <div v-for="answer in answers" :key="answer.freeCommentNum">
                    
                </div>
            </div> -->

        <div v-for="(answers, group) in groupedAnswers" :key="group">
            <h2>{{ group }}</h2>
            <div v-if="answers">
                <div v-for="answer in answers" :key="answer.freeCommentNum">
                    <img v-if="answer.profileNum" :src="`/project/api/users/profile/${answer.profileNum}`" width="50" height="50" style="border-radius: 50%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-circle me-3" viewBox="0 0 16 16" v-else>
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                    <span class="ms-3"><strong>{{ answer.freeCommentWriter }}</strong></span>
                    <span class="ms-3">{{ answer.userRegdate }}</span>
                    <span class="mt-3" v-if="$store.getters.isUserId != null">
                        <a class="insert-link ms-3" @click="showAnswerInsertForm(answer.freeCommentNum)">답글</a>
                    </span>
                    <span v-if="$store.getters.isUserId != null && answer.freeCommentWriter == $store.getters.isUserId">
                        <a class="update-link ms-1" @click="showAnswerUpdateForm(answer.freeCommentNum)">수정</a>
                        <a class="del ms-1" @click="deleteAnswerConfirm(answer.freeCommentNum)">삭제</a>
                    </span>
                    <dd>
                        <pre id="pre{{answer.freeCommentNum}}">{{ answer.content }}</pre>
                    </dd>

                    <div v-if="isInsertFormVisible[answer.freeCommentNum]" >
                        <form class="comment-form update-form" @submit.prevent="answerinsert(answer.freeCommentWriter, answer.commentGroup)">
                            <input type="text" name="freeCommentRefGroup" :value="qnafree.freeQuestionNum"/>
                            <input type="text" name="targetId" :value="answer.freeCommentWriter"/>
                            <input type="text" name="commentGroup" :value="answer.commentGroup"/>
                            <textarea class="me-3" name="content" v-model="formData.content" placeholder="댓글을 입력합니다"></textarea>
                            <button type="submit" class="btn new-btn">등록</button>
                        </form>
                    </div>
                    <div v-if="isUpdateFormVisible[answer.freeCommentNum]" >
                        <form class="comment-form update-form" @submit.prevent="answerupdate(answer.freeCommentNum)">
                            <textarea class="me-3" name="content" v-model="formData.contentUpdate" :placeholder="answer.content"></textarea>
                            <button type="submit" class="button btn mb-5">수정</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <nav>
            <ul class="pagination justify-content-center">
                <li class="page-item" v-if="qnafreeanswer.startPageNum != 1">
                    <a class="page-link new-page-link" @click="paging(qnafreeanswer.startPageNum - 1)">
                        <span aria-hidden="true">&lt;</span>
                    </a>
                </li>
                <li v-for="i in 10" :key="i" class="page-item ${qnafreeanswer.pageNum eq i ? 'active' : '' }">
                    <a class="page-link new-page-link" v-if="i + qnafreeanswer.startPageNum - 1 <= qnafreeanswer.endPageNum"
                        @click="paging(i + qnafreeanswer.startPageNum - 1)">{{ i + qnafreeanswer.startPageNum - 1 }}</a>
                </li>
                <li class="page-item" v-if="qnafreeanswer.endPageNum < qnafreeanswer.totalPage">
                    <a class="page-link new-page-link" @click="paging(qnafreeanswer.endPageNum + 1)">
                        <span aria-hidden="true">&gt;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'QnaFreeDetail',
    data(){
        return {
            qnafree:{},
            qnafreeanswer:{},
            isUpdateFormVisible: {},
			isInsertFormVisible: {},
            formData: {
                content:'',
                contentUpdate:'',
                freeCommentRefGroup:'',
                targetId:'',
                commentGroup:'',
				freeCommentNum:'',
				freeCommentWriter:'',
            },
            freeCommentWriter:'',
            commentGroup:'',
            profile:'',
        }
    },
    created() {
        var vm = this;
        var url = `/project/api/qna-free/${this.$route.params.freeQuestionNum}`;
        const data = {
            keyword:this.$route.query.keyword,
            condition:this.$route.query.condition
        }
        axios.get(url, { params: data })
        .then((response) => {
            console.log(response.data.body);
            vm.qnafree = response.data.body;
			vm.formData.freeCommentRefGroup = this.qnafree.freeQuestionNum;
            vm.formData.targetId = this.qnafree.freeQuestionWriter;
            vm.formData.commentGroup = this.qnafree.freeQuestionNum;
        })
        .catch((error) => {
            console.error(error);
        });
        var url2 = `/project/api/qna-free-answer/list?freeCommentRefGroup=${this.$route.params.freeQuestionNum}`;
        axios.get(url2)
        .then((response) => {
            console.log(response.data.body);
            vm.qnafreeanswer = response.data.body;
			vm.formData.freeCommentRefGroup = this.qnafree.freeQuestionNum;
            vm.formData.targetId = this.qnafreeanswer.freeCommentWriter;
            vm.formData.commentGroup = this.qnafreeanswer.commentGroup;
        })
        .catch((error) => {
            console.error(error);
        });
    },
    methods: {
        qnafreedelete : function(freeQuestionNum) {
            axios.put('/project/api/qna-free/' + freeQuestionNum + '/delete',
                { freeQuestionNum }
            ).then(response => {
                console.warn(response)
                this.result = response.data;
                this.$router.push('/qnafree');
            }).catch((ex) => {
                console.warn("ERROR!!!!! : ",ex)
            })
        },
        confirmDelete: function (freeQuestionNum) {
            if (confirm("정말 삭제하시겠습니까?")) {
                this.qnafreedelete(freeQuestionNum);
            }
        },
        paging: function (currentPage) {
            const url = '/project/api/qna-free-answer/list';
            const data = {
            limit: 10,
            currentPage: currentPage,
            freeCommentRefGroup: this.qnafree.freeQuestionNum
            };
            axios.get(url, { params: data })
            .then(response => {
                this.qnafreeanswer = response.data.body;
            })
            .catch(error => {
                console.log(error);
            });
        },
        showAnswerUpdateForm(freeCommentNum) {
            if(this.isUpdateFormVisible[freeCommentNum] == true){
                this.isUpdateFormVisible[freeCommentNum] = false;
            }else{
                this.isUpdateFormVisible[freeCommentNum] = true;
            }
        },
		showAnswerInsertForm(freeCommentNum) {
            if(this.isInsertFormVisible[freeCommentNum] == true){
                this.isInsertFormVisible[freeCommentNum] = false;
            }else{
                this.isInsertFormVisible[freeCommentNum] = true;
            }
		},
        submitAnswerForm() {
            const url = '/project/api/qna-free-answer';
            const data = {
                content : this.formData.content,
                freeCommentRefGroup : this.qnafree.freeQuestionNum,
                targetId : this.$store.getters.isUserId,
            };
            axios.post(url, data)
            .then(response => {
                console.log(response.data);
                alert('답변 등록 성공');
                this.$router.go();
            })
            .catch(error => {
                console.error(error);
                console.log(data);
                alert('답변 등록 실패');
            });
        },
        answerupdate(freeCommentNum) {
            const url = `/project/api/qna-free-answer/${freeCommentNum}/update`;
            const data = {
                content: this.formData.contentUpdate,
				freeCommentNum: freeCommentNum
            };
            axios.put(url, data)
            .then(response => {
                console.log(response.data);
                alert('댓글 수정 성공');
                this.$router.go();
            })
            .catch(error => {
                console.error(error);
                alert('댓글 수정 실패');
            });
        },
		answerinsert(targetId, commentGroup ) {
            const url = '/project/api/qna-free-answer';
            const data = {
                content : this.formData.content,
                freeCommentRefGroup : this.qnafree.freeQuestionNum,
                targetId : targetId,
                commentGroup : commentGroup
            };
            axios.post(url, data)
            .then(response => {
                console.log(response.data);
                alert('답변 등록 성공');
                this.$router.go();
            })
            .catch(error => {
                console.error(error);
                console.log(data);
                alert('답변 등록 실패');
            });
        },
        qnafreeanswerdelete: function (freeCommentNum) {
            axios.put('/project/api/qna-free-answer/' + freeCommentNum + '/delete',
                { freeCommentNum }
            ).then(response => {
            console.warn(response)
            this.result = response.data;
            location.reload();
            }).catch((ex) => {
            console.warn("ERROR!!!!! : ", ex)
            })
        },
        deleteAnswerConfirm: function (freeCommentNum) {
            if (confirm("정말 삭제하시겠습니까?")) {
                this.qnafreeanswerdelete(freeCommentNum);
            }
        },
    },
    computed: {
        groupedAnswers() {
            const groups = {};
            this.qnafreeanswer.data.forEach(answer => {
            if (!groups[answer.commentGroup]) {
                groups[answer.commentGroup] = [];
            }
            groups[answer.commentGroup].push(answer);
            });
            return groups;
        }
    }
}
</script>
<style>
    .input-group {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>