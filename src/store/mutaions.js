import * as types  from './mutaions-types'

const mutations = {
  [types.SET_SINGER](state, singer){
    state.singer = singer
  }
}

export  default mutations
