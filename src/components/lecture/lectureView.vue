<template>
  <div class="container mt-3">
    <div>
      <iframe id="player" type="text/html" width="640" height="360" :src="detail.videoPath" frameborder="0" gesture="media" allow="encrypted-media"></iframe>
      <br>
      <textarea style="width: 640px;" v-model=" detail.describe"></textarea>
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
    .get(`/project/api/lecture/lecture-one/${this.$route.params.lecNum}`)
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