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
              
                <h4>수강 후기를 작성해 주세요</h4>
                <form class="comment-form insert-form" action="lectureReview_insert" method="post" name="myform" id="myform">
                    <input type="text" name="ref_group" value="{{detail.lecNum }}"/>
                    <input type="text" name="lecReWriter" value="{{detail.lecWriter }}"/>
                </form>
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
      };
    },
    created() {
      axios
        .get(`http://localhost:9000/project/api/lecture/${this.$route.params.lecNum}/lecture-one`)
        .then(response => {
          console.log(response.data.body);
          this.detail = response.data.body;
        })
        .catch(error => {
          console.error(error);
        });
    },
  };
  </script>