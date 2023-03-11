<template>
  <div class="container userform">
    <main class="form-signin w-100 m-auto mt-5">
      <h3 class="text-center mb-3 fw-normal">강의 등록 페이지</h3>
      <p class="text-center mb-3 fw-normal">강의 등록 페이지입니다.</p>
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <div class="mb-3">
          <label class="form-label" for="file">썸네일</label>
          <input class="form-control" type="file" id="file" ref="file" accept="image/*" @change="handleFileChange">
        </div>
        <div class="mb-3">
          <label class="form-label" for="title">강의 제목</label>
          <input class="form-control" type="text" v-model="lecture.title" name="title" id="title" />
        </div>
        <div class="mb-3">
          <label class="form-label" for="teacher">강사</label>
          <input class="form-control" type="text" v-model="lecture.teacher" name="teacher" id="teacher" />
        </div>
        <div class="mb-3">
          <label class="form-label" for="describe">강의 내용</label>
          <textarea v-model="lecture.describe" name="describe" id="describe"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label" for="videoPath">강의 영상</label>
          <input class="form-control" type="text" v-model="lecture.videoPath" name="videoPath" id="videoPath" />
        </div>
        <div class="mb-3">
          <label class="form-label" for="largeCategory">대분류</label>
          <select class="form-control" v-model="lecture.largeCategory" name="largeCategory" id="largeCategory">
            <option value="front">프론트엔드</option>
            <option value="backend">백엔드</option>
            <option value="mobile">모바일</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label" for="smallCategory">소분류</label>
          <select class="form-control" v-model="lecture.smallCategory" name="smallCategory" id="smallCategory">
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
        <button class="w-100 button btn btn-lg mt-3 mb-5" type="submit">강의 등록</button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lecture: {
        title: "",
        teacher: "",
        describe: "",
        videoPath: "",
        largeCategory: "",
        smallCategory: "",
        file: "",
      },
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    async handleSubmit() {
      if (!this.lecture.file) {
        console.log("파일을 선택해주세요.");
        return;
      }
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("title", this.lecture.title);
      formData.append("teacher", this.lecture.teacher);
      formData.append("describe", this.lecture.describe);
      formData.append("videoPath", this.lecture.videoPath);
      formData.append("largeCategory", this.lecture.largeCategory);
      formData.append("smallCategory", this.lecture.smallCategory);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:9000/project/api/lecture/lecture-insert");
      xhr.send(formData);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("강의 등록 성공");
          } else {
            console.log("강의 등록 실패");
          }
        }
      };
    },
  },
};
</script>

<style>

</style>