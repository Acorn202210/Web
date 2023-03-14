<template>
  <div class="wrapper">
    <div class="container">
      <div class="box">
        <div class="box1">
          <h3 class="lecture-detail-tit">{{ detail.title }}</h3>
          <div class="d-flex justify-content-end mt-3">
            <button class="btn btn-secondary btn-sm me-2 mb-3" type="button">수정</button>
            <div>
              <input type="hidden" v-model="detail.lecNum"/>
              <button class="btn btn-danger btn-sm me-2 mb-3" @click="deleteConfirm(detail.lecNum)" type="button">삭제</button>
            </div>
            </div>
          <div>
            <img :src="`/project/api/lecture/${detail.imageNum}/image?lecNum=${detail.imageNum}`" style="width: 350px; height: 350px;">
          </div>
          <p>{{ detail.describe }}</p>
        </div>
        <br>
          
      </div>
      <div>
        <h4>수강 후기를 작성해주세요</h4>
          <form class="comment-form insert-form" @submit.prevent="submitReviewForm">
          <div class="star-rating">
            <input type="hidden" name="lecReStuRefGroup" :value="detail.lecNum"/>
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
      <div v-for="lectureReview in lectureReview.data" :key="lectureReview.lecReWriter">
          <div>
            <img v-if="profile != ''"
                  :src="`/project/api/users/profile/${profile}`"
                  width="150" height="150">
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor"
                class="bi bi-person-circle" viewBox="0 0 16 16" v-if="profile == ''">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
          </div>
          <span>{{ lectureReview.lecReWriter }}</span>
          <span>{{ lectureReview.userRegdate }}</span>

          <div v-if="$store.getters.isUserId != null && lectureReview.lecReWriter == $store.getters.isUserId">
            <button class="update-link" @click="showReviewUpdateForm(lectureReview.lecReNum)">수정</button>
              <a data-num="{{lectureReview.lecReNum }}" class="delete-link" href="javascript:">삭제</a>
          </div>

          <div v-if="isReviewUpdateFormVisible">
            <form class="comment-form update-form" @submit.prevent="reviewUpdate">
              <div class="star-rating">
                <input type="hidden" name="lecReStuRefGroup" :value="lectureReview.lecNum"/>
                <input type="radio" id="5-stars-update" name="star" value="5" v-model="formDataUpdate.star" />
                <label for="5-stars-update" class="star" @click="setRatingUpdate(5)">&#9733;</label>
                <input type="radio" id="4-stars-update" name="star" value="4" v-model="formDataUpdate.star" />
                <label for="4-stars-update" class="star" @click="setRatingUpdate(4)">&#9733;</label>
                <input type="radio" id="3-stars-update" name="star" value="3" v-model="formDataUpdate.star" />
                <label for="3-stars-update" class="star" @click="setRatingUpdate(3)">&#9733;</label>
                <input type="radio" id="2-stars-update" name="star" value="2" v-model="formDataUpdate.star" />
                <label for="2-stars-update" class="star" @click="setRatingUpdate(2)">&#9733;</label>
                <input type="radio" id="1-star-update" name="star" value="1" v-model="formDataUpdate.star" />
                <label for="1-star-update" class="star" @click="setRatingUpdate(1)">&#9733;</label>
              </div>
              <textarea class="me-3" name="content" v-model="formDataUpdate.content" :placeholder="placeholderText"></textarea>
              <button type="submit" class="button btn mb-5">수정</button>
            </form>
          </div>
          <dd>
							<pre id="pre{{lectureReview.lecReNum }}">{{lectureReview.content }}</pre>						
          </dd>
      </div>

      <div class="box2">
        <div>
          <form class="mt-4 mb-3 d-flex justify-content-center" @submit.prevent="lectureSignupForm">
            <input type="hidden" name="lecStuRefGroup" :value="detail.lecNum" />
            <button class="button" type="submit">수강 신청</button>
          </form>
        </div>
        <div>
          <div class="mt-4 d-flex justify-content-center mb-3">
            <button class="button" type="button">강의보기</button>
            <br />
            <form id="completeForm" @submit.prevent="lectureComplete">
              <input type="hidden" name="completeYn" value="Y" />
              <input type="hidden" name="lecStuRefGroup" :value="detail.lecNum" />
              <button class="button" type="submit">강의완료</button>
            </form>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <button type="button">
            1:1문의
          </button>
        </div>
      </div>
      
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" v-if="lectureReview.startPageNum != 1">
          <a class="page-link new-page-link" @click="paging(lectureReview.startPageNum - 1)">
            <span aria-hidden="true">&lt;</span>
          </a>
          </li>

          <li v-for="i in 5" :key="i" class="page-item ${lectureReview.pageNum eq i ? 'active' : '' }">
          <a class="page-link new-page-link" v-if="i+lectureReview.startPageNum-1 <= lectureReview.endPageNum" @click="paging(i+lectureReview.startPageNum-1)">{{i+lectureReview.startPageNum-1}}</a>
          </li>

          <li class="page-item" v-if="lectureReview.endPageNum < lectureReview.totalPage">
          <a class="page-link new-page-link" @click="paging(lectureReview.endPageNum + 1)">
            <span aria-hidden="true">&gt;</span>
          </a>
          </li>
        </ul>
      </nav>
      
    
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
        lecReStuRefGroup: ''
      },
      placeholderText: '리뷰를 작성해주세요',
      lectureReview: [],
      my : {},
      profile: "",
      isUpdateFormVisible: false,
      lecSignupForm:{
        lecStuRefGroup: ''
      },
      completeForm:{
        lecStuRefGroup: ''
      }
    };
  },
  created() {
    axios
      .get(`/project/api/lecture/${this.$route.params.lecNum}/lecture-one`)
      .then(response => {
        console.log(response.data.body);
        this.detail = response.data.body;
        this.formData.lecReStuRefGroup = this.detail.lecNum;
        this.lecSignupForm.lecStuRefGroup = this.detail.lecNum;
        this.completeForm.lecStuRefGroup = this.detail.lecNum;
        this.getReviewList();
        this.getProfileImageUrl();
      })
      .catch(error => {
        console.error(error);
        
      });
  },
  methods: {
    setRating(starCount) {
      this.formData.star = starCount;
    },
    submitReviewForm() {
      const url = '/project/api/lecture-review/Lecture-review-insert';
      const data ={
        content : this.formData.content,
        star : this.formData.star,
        lecReStuRefGroup: this.formData.lecReStuRefGroup
            };
      axios.post(url, data)
    .then(response => {
      console.log(response.data);
      alert('후기 등록 성공');
    })
    .catch(error => {
      console.error(error);
      alert('후기 등록 실패');
    });
},
    getReviewList(){
      var url = `/project/api/lecture-review/LectureReviewList`;
      const data = {
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
    paging:function(currentPage) {
        const url = '/project/api/lecture-review/LectureReviewList';
        const data = {
		  limit : 5,
		  currentPage:currentPage,
      lecReStuRefGroup: this.detail.lecNum
            };
        axios.get(url, { params: data })
          .then(response => {
            this.lectureReview = response.data.body;
          })
          .catch(error => {
            console.log(error);
          });
      },
    getProfileImageUrl(lecReWriter) {
      var vm = this;
      var url = `/project/api/users/${lecReWriter}`;
      axios.get(url)
          .then(function (response) {
              vm.my = response.data.body;
              vm.profile = vm.my.profileNum === null ? '' : vm.my.profileNum;         
            })
          .catch(function (error) {
              console.log(error);
          })
    },
    lectureReviewDelete : function(lecNum) {
      axios.put('/project/api/lecture/'+ lecNum +'/lecture-delete', {}, { params: { lecNum } }
        ).then(response => {
				console.warn(response)
				this.result = response.data;
				location.reload();
			}).catch((ex) => {
				console.warn("ERROR!!!!! : ",ex)
			})
  },
  deleteConfirm: function (lecNum) {
      		if (confirm("정말 삭제하시겠습니까?")) {
        		this.lectureReviewDelete(lecNum);
      		}
    	},   
  showReviewUpdateForm(lecReNum) {
    const review = this.lectureReview.find(review => review.lecReNum === lecReNum); 
    
    this.formData.star = review.star;
    this.formData.content = review.content;
    
    this.isUpdateFormVisible = true;
    this.updateTargetReview  = lecReNum;
  },     
  reviewUpdate(){
    const url = `/project/api/lecture-review/${this.updateTargetReview}/update`;
      const data ={
        content : this.formData.content,
        star : this.formData.star,
       };
    axios.post(url, data)
    .then(response => {
      console.log(response.data);
      alert('후기 수정 성공');
    })
    .catch(error => {
      console.error(error);
      alert('후기 수정 실패');
    });
  }, 
  lectureSignupForm() {
  const url = '/project/api/lecture-student/lecture-signup'
  const data = {
    lecStuRefGroup:this.lecSignupForm.lecStuRefGroup
  };
  axios.post(url, data)
    .then(response => {
      console.log(response.data);
      alert('강의 신청 성공');
    })
    .catch(error => {
      console.error(error);
      alert('강의 신청 실패');
    });
  },
  lectureComplete(){
    const url = '/project/api/lecture-student/lecture-complete'
    const data = {
      lecStuRefGroup : this.completeForm.lecStuRefGroup
    };
    axios.post(url, data)
    .then(response => {
      console.log(response.data);
      alert('강의 완료 성공');
    })
    .catch(error => {
      console.error(error);
      alert('강의 완료 실패');
    });  
  }
  },  
};
</script>
<style>
</style>