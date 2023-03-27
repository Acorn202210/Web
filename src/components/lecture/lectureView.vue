<template>
  <div class="container mt-3">
    <div>
      <iframe id="player" type="text/html" width="1000" height="500" :src="detail.videoPath" frameborder="0" gesture="media" allow="encrypted-media"></iframe>
      <br><br>
      <p><strong>Teacher.</strong>{{ detail.teacher }}</p>
      <br>
      <p>강의 설명</p>
      <textarea style="width: 540px; border: none; height: 300px;" v-model=" detail.describe"></textarea>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
  return {
    detail: {},
  };
},
created() {
  axios
    .get(`/plec/api/lecture/lecture-one/${this.$route.params.lecNum}`)
    .then(response => {
      console.log(response.data.body);
      this.detail = response.data.body;
      
    })
    .catch(error => {
      console.error(error);
    });
},
}
</script>

<style>

</style>