import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duraion, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duraion = duraion
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid)
        .then(res => {
          if (res.retcode === ERR_OK) {
            this.lyric = Base64.decode(res.lyric)
            resolve(this.lyric)
          } else {
            reject('no lyric')
          }
        })
    })

  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duraion: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/${musicData.songid}.m4a?vkey=D192206579BD5EF9CBB833F5D3785AE9A3100889A69F92CEA3024CC57AEA520A8422D915EC9A0883BB70B06BFEAEF4BD05821EBC855BBD67&guid=4640268000&uin=0&fromtag=66`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    return ret.push(s.name)
  })
  return ret.join('/')
}
