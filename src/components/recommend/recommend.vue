<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="discList">
      <div>
        <div class="slider-wrapper" v-if="recommends.length>0">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList">
              <div class="icon">
                <img width="60" height="60" :src="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Slider from 'base/slider/slider'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  export default{
    data(){
      return {
        recommends: [],
        discList: []
      }
    },
    components: {
      Slider,
      Scroll
    },
    created(){
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend(){
        getRecommend()
          .then(res => {
            if (res.code == ERR_OK) {
              this.recommends = res.data.slider
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      _getDiscList(){
        getDiscList()
          .then(res => {

            if (res.code == ERR_OK) {
              this.discList = res.data.list
            }
          })
          .catch(err => {
            console.log(err)
          })

      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~style/variable";

  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      .recommend-list {
        .list-title {
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-theme;
        }
        .item {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px;
          .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;
            .name {
              margin-bottom: 10px;
              color: $color-text;
            }
            .desc {
              color: $color-text-d
            }
          }

        }
      }
    }
  }
</style>
