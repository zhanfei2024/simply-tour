import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)
const module = {
  state: {
    breadListState: [
      {name: '首页', path: '/'}
    ],
    filesToUpload: [],
    productDetails: {},
    signName: '',
    loading: false
  },
  mutations: {
    breadListStateAdd(state, obj) {
      state.breadListState.push(obj);
    },
    breadListStateRemove(state, num) {
      state.breadListState.splice(num, state.breadListState.length - num);
    },
    productDetailsState(state, obj) {
      state.productDetails = obj;
    },
    setFilesToUpload(state, obj) {
      state.filesToUpload.push(obj);
    }
  }
}

const store = new Vuex.Store(module)
export default store
