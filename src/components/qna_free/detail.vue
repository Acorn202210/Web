<template>
    <div class="container mt-3">
        <div class="d-md-flex justify-content-md-end">
            <button v-if="qnafree.prevNum != 0" @click="goToPrev" class="btn btn-sm me-md-2 btn-secondary">이전글</button>
            <button v-if="qnafree.nextNum != 0" @click="goToNext" class="btn btn-sm btn-secondary">다음글</button>
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
        <textarea class="mainContent mt-3" v-model="qnafree.content"></textarea>
        <div class="d-grid d-md-flex justify-content-md-end mt-3">
            <div class="d-grid d-md-flex " v-if="$store.getters.isUserId == qnafree.freeQuestionWriter">
                <a @click="this.$router.push(`/qnafree/update/${qnafree.freeQuestionNum}`)" class="btn btn-sm me-2 new-btn">수정</a>
                <a href="javascript:" @click="confirmDelete(qnafree.freeQuestionNum)"
                    class="btn btn-sm me-2 btn-danger">삭제</a>
            </div>
            <a @click="this.$router.push('/qnafree')" class="btn btn-sm me-2 btn-secondary">목록</a>
        </div>
        <div class="mt-3" v-if="$store.getters.isUserId != null">
            <form class="comment-form insert-form" @submit.prevent="submitAnswerForm">
                <div class="input-group">
                    <input type="hidden" name="freeCommentRefGroup" :value="qnafree.freeQuestionNum" />
                    <textarea class="form-control" name="content" v-model="formData.content"
                        placeholder="댓글을 입력합니다"></textarea>
                    <button type="submit" class="btn new-btn">등록</button>
                </div>
            </form>
        </div>
        <!-- 댓글 목록 -->

        <div class="comments mt-3" v-for="(answers, group) in groupedAnswers" :key="group">
            <ul v-for="answer in answers" :key="answer.freeCommentNum">
                <li :id="'reli' + answer.freeCommentNum" v-if="answer.freeCommentNum == answer.commentGroup">
                    <dl>
                        <dt>
                            <svg v-if="answer.profileNum == null" class="profile-image bi bi-person-circle"
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                            <img v-if="answer.profileNum != null" class="profile-image"
                                :src="`/project/api/users/profile/${answer.profileNum}`" />
                            <span class="ms-3">{{ answer.freeCommentWriter }}</span>

                            <i v-if="answer.freeCommentNum != answer.commentGroup">@{{ answer.targetId }}</i>

                            <span class="ms-3">{{ answer.userRegdate }}</span>
                            <span class="mt-3" v-if="$store.getters.isUserId != null">
                                <a class="insert-link ms-3" @click="showAnswerInsertForm(answer.freeCommentNum)">답글</a>
                            </span>
                            <span
                                v-if="$store.getters.isUserId != null && answer.freeCommentWriter == $store.getters.isUserId">
                                <a class="update-link ms-3" @click="showAnswerUpdateForm(answer.freeCommentNum)">수정</a>
                                <a class="del ms-3" @click="deleteAnswerConfirm(answer.freeCommentNum)">삭제</a>
                            </span>
                        </dt>
                        <dd>
                            <pre :id="'pre' + answer.freeCommentNum">{{ answer.content }}</pre>
                        </dd>
                    </dl>
                    <div v-if="isInsertFormVisible[answer.freeCommentNum]">
                        <form class="comment-form update-form"
                            @submit.prevent="answerinsert(answer.freeCommentWriter, answer.commentGroup)">
                            <div class="input-group">
                                <textarea name="content" v-model="formData.content"
                                    placeholder="댓글을 입력합니다"></textarea>
                                <button type="submit" class="btn new-btn">등록</button>
                            </div>
                        </form>
                    </div>
                    <div v-if="isUpdateFormVisible[answer.freeCommentNum]">
                        <form class="comment-form update-form" @submit.prevent="answerupdate(answer.freeCommentNum)">
                            <div class="input-group">
                                <textarea name="content" v-model="formData.contentUpdate"
                                    :placeholder="answer.content"></textarea>
                                <button type="submit" class="btn new-btn">수정</button>
                            </div>
                        </form>
                    </div>
                </li>
                <li :id="'reli' + answer.freeCommentNum" style="padding-left:50px;"
                    v-if="answer.freeCommentNum != answer.commentGroup">
                    <svg class="reply-icon bi bi-arrow-return-right" xmlns="http://www.w3.org/2000/svg" width="16"
                        height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z" />
                    </svg>
                    <dl>
                        <dt>
                            <svg v-if="answer.profileNum == null" class="profile-image bi bi-person-circle"
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                            <img v-if="answer.profileNum != null" class="profile-image"
                                :src="`/project/api/users/profile/${answer.profileNum}`" />
                            <span class="ms-3">{{ answer.freeCommentWriter }}</span>

                            <!-- <i class="ms-3" v-if="answer.freeCommentNum != answer.commentGroup">@{{ answer.targetId }}</i> -->

                            <span class="ms-3">{{ answer.userRegdate }}</span>
                            <span class="mt-3" v-if="$store.getters.isUserId != null">
                                <a class="insert-link ms-3" @click="showAnswerInsertForm(answer.freeCommentNum)">답글</a>
                            </span>
                            <span
                                v-if="$store.getters.isUserId != null && answer.freeCommentWriter == $store.getters.isUserId">
                                <a class="update-link ms-3" @click="showAnswerUpdateForm(answer.freeCommentNum)">수정</a>
                                <a class="del ms-3" @click="deleteAnswerConfirm(answer.freeCommentNum)">삭제</a>
                            </span>
                        </dt>
                        <dd>
                            <pre :id="'pre' + answer.freeCommentNum"><strong v-if="answer.freeCommentNum != answer.commentGroup">@{{ answer.targetId }}</strong> {{ answer.content }}</pre>
                        </dd>
                    </dl>
                    <div v-if="isInsertFormVisible[answer.freeCommentNum]">
                        <form class="comment-form update-form" @submit.prevent="answerinsert(answer.freeCommentWriter, answer.commentGroup)">
                            <div class="input-group">
                                <textarea name="content" v-model="formData.content" placeholder="댓글을 입력합니다"></textarea>
                                <button type="submit" class="btn new-btn">등록</button>
                            </div>
                        </form>
                    </div>
                    <div v-if="isUpdateFormVisible[answer.freeCommentNum]">
                        <form class="comment-form update-form" @submit.prevent="answerupdate(answer.freeCommentNum)">
                            <div class="input-group">
                                <textarea name="content" v-model="formData.contentUpdate"
                                    :placeholder="answer.content"></textarea>
                                <button type="submit" class="btn new-btn">수정</button>
                            </div>
                        </form>
                    </div>
                </li>
            </ul>
        </div>
        <nav>
            <ul class="pagination justify-content-center">
            <li class="page-item" v-if="qnafreeanswer.startPageNum != 1">
                <a class="page-link new-page-link" @click="paging(qnafreeanswer.startPageNum - 1)">
                <span aria-hidden="true">&lt;</span>
                </a>
            </li>

            <li v-for="i in 10" :key="i"
                :class="['page-item', qnafreeanswer.currentPage == i + qnafreeanswer.startPageNum - 1 ? 'active' : '']">
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
    data() {
        return {
            qnafree: {},
            qnafreeanswer: {},
            isUpdateFormVisible: {},
            isInsertFormVisible: {},
            formData: {
                content: '',
                content2: '',
                contentUpdate: '',
                contentUpdate2: '',
                freeCommentRefGroup: '',
                targetId: '',
                commentGroup: '',
                freeCommentNum: '',
                freeCommentWriter: '',
            },
            freeCommentWriter: '',
            commentGroup: '',
            profile: '',
        }
    },
    created() {
        axios
        .get(`/project/api/qna-free/${this.$route.params.freeQuestionNum}`, {
            params: {
                keyword: this.$route.query.keyword,
                condition: this.$route.query.condition
            }
        })
        .then(response => {
            console.log(response.data.body);
            this.qnafree = response.data.body;
            this.getReviewList();
        })
        .catch((error) => {
            console.error(error);
        });
        const url = `/project/api/qna-free-answer/list?freeCommentRefGroup=${this.$route.params.freeQuestionNum}`;
        axios.get(url)
            .then((response) => {
                console.log(response);
                this.qnafreeanswer = response.data.body;
            })
            .catch((error) => {
                console.error(error);
            });
    },
    methods: {
        qnafreedelete: function (freeQuestionNum) {
            axios.put('/project/api/qna-free/' + freeQuestionNum + '/delete',
                { freeQuestionNum }
            ).then(response => {
                console.warn(response)
                this.result = response.data;
                this.$router.push('/qnafree');
            }).catch((ex) => {
                console.warn("ERROR!!!!! : ", ex)
            })
        },
        confirmDelete: function (freeQuestionNum) {
            if (confirm("정말 삭제하시겠습니까?")) {
                this.qnafreedelete(freeQuestionNum);
            }
        },
        getReviewList() {
            var url = `/project/api/qna-free-answer/list`;
            const data = {
            limit: 10,
            freeCommentRefGroup: this.qnafree.freeQuestionNum
            }
            axios.get(url, { params: data })
            .then(response => {
                console.log(response.data);
                this.qnafreeanswer = response.data.body;
            })
            .catch(error => {
                console.error(error);
            });
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
            if (this.isUpdateFormVisible[freeCommentNum] == true) {
                this.isUpdateFormVisible[freeCommentNum] = false;
            } else {
                this.isUpdateFormVisible[freeCommentNum] = true;
            }
        },
        showAnswerInsertForm(freeCommentNum) {
            if (this.isInsertFormVisible[freeCommentNum] == true) {
                this.isInsertFormVisible[freeCommentNum] = false;
            } else {
                this.isInsertFormVisible[freeCommentNum] = true;
            }
            console.log(freeCommentNum);

        },
        submitAnswerForm() {
            const url = '/project/api/qna-free-answer';
            const data = {
                content: this.formData.content,
                freeCommentRefGroup: this.qnafree.freeQuestionNum,
                targetId: this.$store.getters.isUserId,
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
        answerinsert(targetId, commentGroup) {
            const url = '/project/api/qna-free-answer';
            const data = {
                content: this.formData.content,
                freeCommentRefGroup: this.qnafree.freeQuestionNum,
                targetId: targetId,
                commentGroup: commentGroup
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
        fetchData() {
            axios
                .get(`/project/api/qna-free/${this.$route.params.freeQuestionNum}`, {
                    params: {
                        keyword: this.$route.query.keyword,
                        condition: this.$route.query.condition
                    }
                })
                .then(response => {
                    console.log(response.data.body);
                    this.qnafree = response.data.body;
                    this.getReviewList();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        goToPrev() {
            this.$router.push({
                path: `/qnafree/${this.qnafree.prevNum}`,
                query: {
                condition: this.$route.query.condition,
                keyword: this.$route.query.keyword
                }
            })
        },
        goToNext() {
            this.$router.push({
                path: `/qnafree/${this.qnafree.nextNum}`,
                query: {
                condition: this.$route.query.condition,
                keyword: this.$route.query.keyword
                }
            })
        }
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
    },
    watch: {
        '$route.params.freeQuestionNum': function() {
            this.fetchData();
        }
    },
}
</script>
<style>
@import '../../assets/css/board.css'
</style>