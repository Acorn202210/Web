import axios from 'axios'
import Vuex from 'vuex'

const store = new Vuex.Store({
    state () {
        return {
            userId : null
        }
    },
    mutations :{
        setUserId(state, userId){
            state.userId = userId;
        },
        setMore(state, data){
            state.more = data
        },
    },
    actions : {
        setUserId:({commit}, userId) => {
            commit('setUserId', userId);
        },
        getData(context){
            axios.get('http://localhost:9000/project/api/faq/Faqlist').then((a)=>{
                console.log(a.data)
                context.commit('setMore', a.data.body)
            })
        },
    },

})

export default store;