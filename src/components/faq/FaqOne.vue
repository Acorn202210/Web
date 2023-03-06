<template>
<div>
    <h1>{{ detail.question }}</h1>
    <p>{{ detail.content }}</p>
</div>
</template>
<script>
import axios from 'axios';
export default {
name: 'FaqOne',
data() {
    return {
    detail: {},
    };
},
created() {
    axios
    .get(`http://localhost:9000/project/api/faq/${this.$route.params.faqNum}/faqOne`)
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