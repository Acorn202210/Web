<template>
    <div class="container userform">
      <main class="form-signin w-100 m-auto mt-5">
        <h3 class="text-center mb-3 fw-normal">강의 수정 페이지</h3>
        <p class="text-center mb-3 fw-normal">강의 수정 페이지입니다.</p>
        
        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
          썸네일
            <input ref="image" type="file" id="image" name="image" multiple="multiple" accept=".jpg, .png, .gif" @change="imageChange"/>
          <div class="mb-3">
            <label class="form-label" for="title">강의 제목</label>
            <input class="form-control" type="text" v-model="title" name="title" id="title" />
          </div>
          <div class="mb-3">
            <label class="form-label" for="teacher">강사</label>
            <input class="form-control" type="text" v-model="teacher" name="teacher" id="teacher" />
          </div>
          <div class="mb-3">
            <label class="form-label" for="describe">강의 내용</label>
            <textarea v-model="describe" name="describe" id="describe"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label" for="videoPath">강의 영상</label>
            <input class="form-control" type="text" v-model="videoPath" name="videoPath" id="videoPath" />
          </div>
          <div class="mb-3">
            <label class="form-label" for="largeCategory">대분류</label>
            <select class="form-control" v-model="largeCategory" name="largeCategory" id="largeCategory">
              <option value="front">프론트엔드</option>
              <option value="backend">백엔드</option>
              <option value="mobile">모바일</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label" for="smallCategory">소분류</label>
            <select class="form-control" v-model="smallCategory" name="smallCategory" id="smallCategory">
              <option value="js">javascript</option>
              <option value="html_css">html/css</option>
              <option value="react">react</option>
              <option value="vue">vue.js</option>
              <option value="jquery">jQuery</option>
              <option value="java">java</option>
              <option value="spring">spring</option>
              <option value="springboot">spring boot</option>
              <option value="kotlin">kotlin</option>
            </select>
          </div>
          <button class="w-100 button btn btn-lg mt-3 mb-5" type="submit">강의 수정</button>
        </form>
      </main>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        lectureImage: {},
        lecture: {
          title: "",
          teacher: "",
          describe: "",
          videoPath: "",
          largeCategory: "",
          smallCategory: "",
          imageNum: ""
        },
      };
    },
    methods: {
      imageChange() {
        let form = new FormData();
        let image = this.$refs['image'].files[0];
        form.append('file', image);
        var vm = this;
        var url = `/project/api/lecture/lecture-img-upload`;
              axios.post(url, form)
                  .then(function (response) {
                    vm.lectureImage = response.data.body;
                    vm.imageNum = vm.lectureImage.imageNum;
                  })
                  .catch(function (error) {
                      console.log(error);
                  })
      },
      handleSubmit() {
        const url = `/project/api/lecture/${this.$route.params.lecNum}/lecture-update`;
          const data = {
              title: this.title,
              teacher: this.teacher,
              describe: this.describe,
              videoPath: this.videoPath, 
              largeCategory : this.largeCategory,
              smallCategory : this.smallCategory,
              imageNum : this.imageNum,
              lecNum: this.$route.params.lecNum,
          }
        axios.put(url, data)
          .then((res) => {
            console.log(res);
            alert("강의 수정 완료");
            this.$router.go(-1);
          })
          .catch((err) => {
            console.error(err);
            alert("강의 수정 실패");
          });
      },
    },
  };
  </script>
  
  <style>
  
  </style>