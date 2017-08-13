<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
  import MusicList from 'components/music-list/music-list'
  import{mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'

  export default{
    computed: {
      title(){
        return this.disc.dissname
      },
      bgImage(){
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    data(){
      return {
        songs: []
      }
    },
    components: {
      MusicList
    },
    created(){
      this._getSongList()
    },
    methods: {
      _getSongList(){
        if (!this.disc.dissid) {
          this.$router.push(`/recommend`)
          return
        }
        console.log(this.disc.dissid)
        getSongList(this.disc.dissid)
          .then(res => {
            console.log(res.cdlist[0])
            if (res.code === ERR_OK) {
              console.log(res.cdlist[0])
              this.songs = this._normalizeSongs(res.cdlist[0].songlist)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      _normalizeSongs(list){
        let ret = []
        list.forEach(musicData => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
