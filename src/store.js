import { createStore } from "vuex";
import axios from 'axios'

const store = createStore({
    state () {
        return {

        }
    },
    mutations :{
        setMore(state, data){
            state.more = data
        },
    },
    actions : {
        getData(context){
            axios.get('http://localhost:9000/project/api/faq/Faqlist').then((a)=>{
                console.log(a.data)
                context.commit('setMore', a.data.body)
            })
        },
    },

})

export default store;