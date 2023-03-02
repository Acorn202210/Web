<template>

	<p>{{ $store.state.more }}</p>
  	<button @click="$store.dispatch('getData')">더보기버튼</button>

	
  </template>
  <script>
  	import { mapMutations } from 'vuex'

  	export default {
	  name: 'Faq',
	  data(){

	  },
	  methods : {
		...mapMutations(['setMore']),
	  },
      
	}
  
  </script>
  <style>
  </style>