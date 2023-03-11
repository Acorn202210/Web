<template>
  <div class="wrapper">
    <div class="container">
      <div class="box">
        <div class="box1">
          <h3 class="lecture-detail-tit">{{ detail.title }}</h3>
          <div class="d-flex justify-content-end mt-3">
            <button class="btn btn-secondary btn-sm me-2 mb-3" type="button">수정</button>
            <button class="btn btn-danger btn-sm me-2 mb-3" type="button">삭제</button>
          </div>
          <div>
            <img :src="`http://localhost:9000/project/api/lecture/${detail.lecNum}/image?lecNum=${detail.lecNum}`" style="width: 350px; height: 350px;">
          </div>
          <p>{{ detail.describe }}</p>
        </div>
        <br>
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
          <div v-if="profile">        
              <img :src="`http://localhost:9000/project/api/users/${lecReWriter}/profile`" style="width: 100px; height: 100px;">
          </div>
          <div v-if="!profile">
            <svg class="profile-image bi bi-person-circle " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
								  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
								  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </div>
          <span>{{ lectureReview.lecReWriter }}</span>
          <span>{{ lectureReview.userRegdate }}</span>

          <div v-if="$store.getters.isUserId != null && lectureReview.lecReWriter == $store.getters.isUserId">
              <a data-num="{{lectureReview.lecReNum }}" class="update-link" href="javascript:">수정</a>
              <a data-num="{{lectureReview.lecReNum }}" class="delete-link" href="javascript:">삭제</a>
          </div>

          <dd>
            <span class="star-rating2">
              <input type="radio" id="5-stars" name="star" value="5" />
              <label :style="{ color: lectureReview.star > 4 ? '#f90' : '' }" for="5-stars" class="star">&#9733;</label>
              <input type="radio" id="4-stars" name="star" value="4" />
              <label :style="{ color: lectureReview.star > 3 ? '#f90' : '' }" for="4-stars" class="star">&#9733;</label>
              <input type="radio" id="3-stars" name="star" value="3" />
              <label :style="{ color: lectureReview.star > 2 ? '#f90' : '' }" for="3-stars" class="star">&#9733;</label>
              <input type="radio" id="2-stars" name="star" value="2" />
              <label :style="{ color: lectureReview.star > 1 ? '#f90' : '' }" for="2-stars" class="star">&#9733;</label>
              <input type="radio" id="1-star" name="star" value="1" />
              <label :style="{ color: lectureReview.star > 0 ? '#f90' : '' }" for="1-star" class="star">&#9733;</label>
            </span>
          </dd>

          <dd>
							<pre id="pre{{lectureReview.lecReNum }}">{{lectureReview.content }}</pre>						
          </dd>
      </div>
      <div class="box2">

      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'LectureDetail',
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
      profile:null
    };
  },
  created() {
    axios
      .get(`http://localhost:9000/project/api/lecture/${this.$route.params.lecNum}/lecture-one`)
      .then(response => {
        console.log(response.data.body);
        this.detail = response.data.body;
        this.formData.lecReStuRefGroup = this.detail.lecNum;
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
      const url = 'http://localhost:9000/project/api/lecture-review/Lecture-review-insert';
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
      var url = `http://localhost:9000/project/api/lecture-review/LectureReviewList`;
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
    getProfileImageUrl(lecReWriter) {
      const url = `http://localhost:9000/project/api/users/${lecReWriter}/profile`;
      return axios.get(url)
        .then(response => {
          console.log(response.data.body);
          this.profile = true;
        })
        .catch(error => {
          console.error(error);
          this.profile = false;
        });
    },
  },  
};
</script>
<style>
@import '../../assets/css/lecture.css'
</style>