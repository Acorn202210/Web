<template>
  <div class="container">
    <div class="box">
      <div class="box1">
        <h3 class="lecture-detail-tit">{{ detail.title }}</h3>
        <div class="d-flex justify-content-end mt-3" v-if="$store.getters.isManager == 'Y'">
          <button class="btn btn-secondary btn-sm me-2 mb-3" @click="this.$router.push(`/lectureUpdateForm/${detail.lecNum}`)"
            type="button">수정</button>
          <div>
            <input type="hidden" v-model="detail.lecNum" />
            <button class="btn btn-danger btn-sm me-2 mb-3" @click="deleteConfirm(detail.lecNum)"
              type="button">삭제</button>
          </div>
        </div>
        <div>
          <img :src="`/project/api/lecture/${detail.imageNum}/image?imageNum=${detail.imageNum}`"
            style="width: 350px; height: 350px;">
        </div>
        <p>{{ detail.describe }}</p>
        <br>
        <div v-if="isStudent && $store.getters.isUserId != null">
          <h4>수강 후기를 작성해주세요</h4>
          <form class="comment-form insert-form" @submit.prevent="submitReviewForm">
            <div class="star-rating">
              <input type="hidden" name="lecReStuRefGroup" :value="detail.lecNum" />
              <input type="radio" id="5-stars" name="star" value="5" v-model="formData.star" />
              <label for="5-stars" class="star" @click="setRating(5)">&#9733;</label>
              <input type="radio" id="4-stars" name="star" value="4" v-model="formData.star" />
              <label for="4-stars" class="star" @click="setRating(4)">&#9733;</label>
              <input type="radio" id="3-stars" name="star" value="3" v-model="formData.star" />
              <label for="3-stars" class="star" @click="setRating(3)">&#9733;</label>
              <input type="radio" id="2-stars" name="star" value="2" v-model="formData.star" />
              <label for="2-stars" class="star" @click="setRating(2)">&#9733;</label>
              <input type="radio" id="1-star" name="star" value="1" v-model="formData.star" />
              <label for="1-star" class="star" @click="setRating(1)">&#9733;</label>
            </div>
            <textarea class="me-3" name="content" v-model="formData.content" :placeholder="placeholderText"></textarea>
            <button type="submit" class="button btn mb-5">등록</button>
          </form>
        </div>

        <!-- 댓글 목록-->
        <div v-for="lectureReview in lectureReview.data" :key="lectureReview.lecReWriter">
          <img v-if="lectureReview.profileNum" :src="`/project/api/users/profile/${lectureReview.profileNum}`" width="50" height="50" style="border-radius: 50%;">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
              class="bi bi-person-circle me-3" viewBox="0 0 16 16" v-else>
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
          <span class="ms-3"><strong>{{ lectureReview.lecReWriter }}</strong></span>
          <span class="ms-3">{{ lectureReview.userRegdate }}</span>

          <span class="ms-3"
            v-if="$store.getters.isUserId != null && lectureReview.lecReWriter == $store.getters.isUserId">
            <a class="update-link" @click="showReviewUpdateForm(lectureReview.lecReNum)">수정</a>
            <a class="del ms-1" @click="deleteReviewConfirm(lectureReview.lecReNum)">삭제</a>
          </span>

            <span class="star-rating2">
              <input type="radio" id="5-stars" name="star" value="5" />
              <label :style="[lectureReview.star > 4 ? colorStar : noColorStar]" for="5-stars" class="star">&#9733;</label>
              <input type="radio" id="4-stars" name="star" value="4" />
              <label :style="[lectureReview.star > 3 ? colorStar : noColorStar]" for="4-stars" class="star">&#9733;</label>
              <input type="radio" id="3-stars" name="star" value="3" />
              <label :style="[lectureReview.star > 2 ? colorStar : noColorStar]" for="3-stars" class="star">&#9733;</label>
              <input type="radio" id="2-stars" name="star" value="2" />
              <label :style="[lectureReview.star > 1 ? colorStar : noColorStar]" for="2-stars" class="star">&#9733;</label>
              <input type="radio" id="1-star" name="star" value="1" />
              <label :style="[lectureReview.star > 0 ? colorStar : noColorStar]" for="1-star" class="star">&#9733;</label>
            </span>
          <dd>
            <pre id="pre{{lectureReview.lecReNum }}">{{ lectureReview.content }}</pre>
          </dd>
          <div v-if="isUpdateFormVisible[lectureReview.lecReNum]" >
            <form class="comment-form update-form" @submit.prevent="reviewUpdate(lectureReview.lecReNum)">
              <div class="star-rating">
                <input type="hidden" name="lecReStuRefGroup" :value="lectureReview.lecNum"/>
                <input type="radio" id="5-stars" name="star" value="5" v-model="formData.star" />
                <label for="5-stars" class="star" @click="setRating(5)">&#9733;</label>
                <input type="radio" id="4-stars" name="star" value="4" v-model="formData.star" />
                <label for="4-stars" class="star" @click="setRating(4)">&#9733;</label>
                <input type="radio" id="3-stars" name="star" value="3" v-model="formData.star" />
                <label for="3-stars" class="star" @click="setRating(3)">&#9733;</label>
                <input type="radio" id="2-stars" name="star" value="2" v-model="formData.star" />
                <label for="2-stars" class="star" @click="setRating(2)">&#9733;</label>
                <input type="radio" id="1-star" name="star" value="1" v-model="formData.star" />
                <label for="1-star" class="star" @click="setRating(1)">&#9733;</label>
              </div>
              <textarea class="me-3" name="content" v-model="formData.contentUpdate" :placeholder="lectureReview.content"></textarea>
              <button type="submit" class="button btn mb-5">수정</button>
            </form>
          </div>
        </div>
        <nav>
          <ul class="pagination justify-content-center" >
            <li class="page-item" v-if="lectureReview.startPageNum != 1">
              <a class="page-link new-page-link" @click="paging(lectureReview.startPageNum - 1)">
                <span aria-hidden="true"></span>
              </a>
            </li>

            <li v-for="i in 5" :key="i"
              :class="['page-item', lectureReview.currentPage == i + lectureReview.startPageNum - 1 ? 'active' : '']">
              <a class="page-link new-page-link" v-if="i + lectureReview.startPageNum - 1 <= lectureReview.endPageNum"
                @click="paging(i + lectureReview.startPageNum - 1)">{{ i + lectureReview.startPageNum - 1 }}</a>
            </li>

            <li class="page-item" v-if="lectureReview.endPageNum < lectureReview.totalPage">
              <a class="page-link new-page-link" @click="paging(lectureReview.endPageNum + 1)">
                <span aria-hidden="true">></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="box2" v-if="$store.getters.isManager != 'Y' && $store.getters.isUserId != null">
        <div>
          <div class="mt-4 d-flex justify-content-center mb-3">
            <div v-if="!isStudent || studentOne.completeYn == 'Y'">
              <form class="mt-4 mb-3 d-flex justify-content-center" @submit.prevent="lectureSignupForm">
                <input type="hidden" name="lecStuRefGroup" :value="detail.lecNum" />
                <button :disabled="isStudent" class="button" type="submit">수강 신청</button>
              </form>
            </div>
            <div v-if="isStudent && studentOne.completeYn == 'N'">
              <form id="completeForm" @submit.prevent="lectureComplete">
                <input type="hidden" name="completeYn" value="Y" />
                <input type="hidden" name="lecStuRefGroup" :value="detail.lecNum" />
                <button class="button" type="submit">강의완료</button>
              </form>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mb-3" v-if="isStudent && studentOne.completeYn == 'N'">
          <button class="button " type="button" @click="$router.push(`/lectureDetail/lectureView/${this.$route.params.lecNum}`)">강의보기</button>
        </div>  
        <div class="d-flex justify-content-center">
          <button type="button" @click="this.$router.push(`/qna`)">
            1:1문의
          </button>
        </div>
      </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
name: 'lctureDetail',
data() {
  return {
    detail: {},
    formData: {
      star: '',
      content: '',
      contentUpdate: '',
      lecReStuRefGroup: ''     
    },
    placeholderText: '리뷰를 작성해주세요',
    lectureReview: [],
    my: {},
    profile: "",
    isUpdateFormVisible: [],
    lecSignupForm: {
      lecStuRefGroup: ''
    },
    completeForm: {
      lecStuRefGroup: ''
    },
    isStudent: false,
    studentOne: {},
    colorStar:{
      color:'#f90'
    },
    noColorStar:{
      color:'#ccc'
    }
  };
},
created() {
  axios
    .get(`/project/api/lecture/lecture-one/${this.$route.params.lecNum}`)
    .then(response => {
      console.log(response.data.body);
      this.detail = response.data.body;
      this.formData.lecReStuRefGroup = this.detail.lecNum;
      this.lecSignupForm.lecStuRefGroup = this.detail.lecNum;
      this.completeForm.lecStuRefGroup = this.detail.lecNum;
      this.getReviewList();
      this.lecStudentOne();
      
    })
    .catch(error => {
      console.error(error);

    });
    const url = `/project/api/lecture-student/checkStudent/?lecStuRefGroup=${this.$route.params.lecNum}`;
    axios.get(url)
      .then((response) => {
        console.log(response);
        this.isStudent = response.data.body.isStudent;
      })
      .catch((error) => {
        console.error(error);
      });
},
methods: {
  setRating(starCount) {
    this.formData.star = starCount;
  },
  submitReviewForm() {
    const url = '/project/api/lecture-review/Lecture-review-insert';
    const data = {
      content: this.formData.content,
      star: this.formData.star,
      lecReStuRefGroup: this.formData.lecReStuRefGroup
    };
    axios.post(url, data)
      .then(response => {
        console.log(response.data);
        alert('후기 등록 성공');
        location.reload();
      })
      .catch(error => {
        console.error(error);
        alert('후기 등록 실패');
      });
  },
  getReviewList() {
    var url = `/project/api/lecture-review/LectureReviewList`;
    const data = {
      limit: 8,
      lecReStuRefGroup: this.detail.lecNum
    }
    axios.get(url, { params: data })
      .then(response => {
        console.log(response.data);
        this.lectureReview = response.data.body;
      })
      .catch(error => {
        console.error(error);
      });
  },
  paging: function (currentPage) {
    var vm = this;
    const url = '/project/api/lecture-review/LectureReviewList';
    const data = {
      limit: 8,
      currentPage: currentPage,
      lecReStuRefGroup: this.detail.lecNum
    };
    axios.get(url, { params: data })
      .then(response => {
        vm.lectureReview = response.data.body;
      })
      .catch(error => {
        console.log(error);
      });
  },
  lectureDelete: function (lecNum) {
    axios.put('/project/api/lecture/' + lecNum + '/lecture-delete', {}, { params: { lecNum } }
    ).then(response => {
      console.warn(response)
      this.result = response.data;
      this.$router.push('/home');
    }).catch((ex) => {
      console.warn("ERROR!!!!! : ", ex)
    })
  },
  deleteConfirm: function (lecNum) {
    if (confirm("정말 삭제하시겠습니까?")) {
      this.lectureDelete(lecNum);
    }
  },
  showReviewUpdateForm(lecReNum) {
    if(this.isUpdateFormVisible[lecReNum] == true){
      this.isUpdateFormVisible[lecReNum] = false;
    }else{
      this.isUpdateFormVisible[lecReNum] = true;
    }
  },
  reviewUpdate(lecReNum) {
    const url = `/project/api/lecture-review/${lecReNum}/update`;

    const data = {
      content: this.formData.contentUpdate,
      star: this.formData.star,

    };
    axios.put(url, data)
      .then(response => {
        console.log(response.data);
        alert('후기 수정 성공');
        location.reload();
      })
      .catch(error => {
        console.error(error);
        alert('후기 수정 실패');
      })
      .finally(() => {   
      location.reload();
    });
  },
  lectureReviewDelete: function (lecReNum) {
    axios.put('/project/api/lecture-review/' + lecReNum + '/lecture-review-delete', {}, { params: { lecReNum } }
    ).then(response => {
      console.warn(response)
      this.result = response.data;
      location.reload();
    }).catch((ex) => {
      console.warn("ERROR!!!!! : ", ex)
    })
  },
  deleteReviewConfirm: function (lecReNum) {
    if (confirm("정말 삭제하시겠습니까?")) {
      this.lectureReviewDelete(lecReNum);
    }
  },
  lectureSignupForm() {
    const url = '/project/api/lecture-student/lecture-signup'
    const data = {
      lecStuRefGroup: this.lecSignupForm.lecStuRefGroup
    };
    axios.post(url, data)
      .then(response => {
        console.log(response.data);
        alert('강의 신청 성공');
        location.reload();
      })
      .catch(error => {
        console.error(error);
        alert('강의 신청 실패');
      });
  },
  lectureComplete() {
    const url = '/project/api/lecture-student/lecture-complete'
    const data = {
      lecStuRefGroup: this.completeForm.lecStuRefGroup
    };
    axios.post(url, data)
      .then(response => {
        console.log(response.data);
        alert('강의 완료 성공');
        location.reload();
      })
      .catch(error => {
        console.error(error);
        alert('강의 완료 실패');
      });
  },
  lecStudentOne(){
    axios.get('/project/api/lecture-student/lecture-student-one', {
      params: {
        lecStuRefGroup: this.detail.lecNum
      }
    })
    .then(response => {
        console.log(response.data);
        this.studentOne = response.data.body;
      })
      .catch(error => {
        console.error(error);
      });
  }
},
};
</script>
<style>
@import '../../assets/css/lecture.css'
</style>
