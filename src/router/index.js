import Vue from 'vue'
import Router from 'vue-router'
/*import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'
import Search from 'components/search/search'
import Disc from 'components/disc/disc'
import TopList from 'components/top-list/top-list'
import UserCenter from 'components/user-center/user-center'*/

Vue.use(Router)

const Recommend = (resolve)=>{
  import('components/recommend/recommend')
    .then(module=>{
      resolve(module)
    })
}

const Rank = (resolve)=>{
  import('components/Rank/Rank')
    .then(module=>{
      resolve(module)
    })
}

const Singer = (resolve)=>{
  import('components/Singer/Singer')
    .then(module=>{
      resolve(module)
    })
}

const SingerDetail = (resolve)=>{
  import('components/singer-detail/singer-detail')
    .then(module=>{
      resolve(module)
    })
}

const Search = (resolve)=>{
  import('components/Search/Search')
    .then(module=>{
      resolve(module)
    })
}

const Disc = (resolve)=>{
  import('components/Disc/Disc')
    .then(module=>{
      resolve(module)
    })
}

const TopList = (resolve)=>{
  import('components/top-list/top-list')
    .then(module=>{
      resolve(module)
    })
}

const UserCenter = (resolve)=>{
  import('components/user-center/user-center')
    .then(module=>{
      resolve(module)
    })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend',
      component: Recommend
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [{
        path: ':id',
        component: Disc
      }]
    },
    {
      path: '/user',
      component: UserCenter
    },
    {
      path: '/rank',
      component: Rank,
      children: [{
        path: ':id',
        component: TopList
      }]
    },
    {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
      path: '/search',
      component: Search,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    }
  ]
})
