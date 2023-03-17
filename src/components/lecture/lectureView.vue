<template>
  <div class="container">
    <iframe id="player" type="text/html" width="640" height="360" :src="detail.videoPath" frameborder="0" gesture="media" allow="encrypted-media"></iframe>
    
    <p>{{ detail.describe }}</p>
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
    .get(`/project/api/lecture/${this.$route.params.lecNum}/lecture-one`)
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