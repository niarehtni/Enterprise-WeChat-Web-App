<template>
  <div class="matchCommend">
    <SearchItemMatch @searchData="searchFunction"></SearchItemMatch>
    <div class="list-wrap">
      <vo-pages
        :data="list"
        :loaded-all="loadedAll"
        @pullingUp="pullingUp"
        @pullingDown="pullingDown"
      >
        <div class="placeholder"></div>
        <div class="lineBox">
          <div v-for="item in list" :key="item.type" class="lineList" @click="goDetail(item.lineId, item.timeDiff, item.monthlyTransaction, item.driverId)">
            <div class="lineListTop">
              <div class="name">
                <div class="nameBox">
                  <van-tag class="top-tag" type="warning">
                    {{ item.lineSaleName }}
                  </van-tag>
                  <p style="padding-right: 40px;box-sizing: border-box;">
                    {{ item.lineName }} / {{ item.customerName }}
                  </p>
                  <p class="address">
                    {{ item.warehouse }}
                  </p>
                </div>
                <div class="tagBox">
                  <!--车类型-->
                  <van-tag round :color="item.driverCarType.matched ? '#49CB15' : '#EC5F50'" type="success" size="medium" class="tag_margin">
                    {{ item.driverCarType.name }}
                  </van-tag>
                  <!--货物类型-->
                  <template v-for=" item_c in item.cargoTypes ">
                    <van-tag v-if="item_c.name" :key="item_c.name" round :color="item_c.matched ? '#49CB15' : '#EC5F50'" type="success" size="medium" class="tag_margin">
                      {{ item_c.name }}
                    </van-tag>
                  </template>
                  <!--区域类型-->
                  <van-tag v-for=" item_d in item.deliveryAreas " :key="item_d.name" round :color="item_d.matched ? '#49CB15' : '#EC5F50'" type="success" size="medium" class="tag_margin">
                    <span>[配]</span> {{ !item_d.name && typeof(item_d.name) !== 'undefined' && item_d.name !== 0 ? '暂无地址' : item_d.name }}
                  </van-tag>
                  <van-tag v-for=" item_w in item.warehouses " :key="item_w.name" round :color="item_w.matched ? '#49CB15' : '#EC5F50'" type="success" size="medium" class="tag_margin">
                    <span>[仓]</span> {{ !item_w.name && typeof(item_w.name) !== 'undefined' && item_w.name !== 0 ? '暂无地址' : item_w.name }}
                  </van-tag>
                  <!--装卸类型-->
                  <template v-for=" item_h in item.handlingDifficultyDegrees ">
                    <van-tag v-if="item_h.name" :key="item_h.name" round :color="item_h.matched ? '#49CB15' : '#EC5F50'" type="success" size="medium" class="tag_margin">
                      {{ item_h.name }}
                    </van-tag>
                  </template>
                  <!--时间-->
                  <template v-for=" item_r in item.runningDurations ">
                    <van-tag v-if="item_r.name" :key="item_r.name" round :color="item_r.matched ? '#49CB15' : '#EC5F50'" type="success" size="medium" class="tag_margin">
                      {{ item_r.name }}
                    </van-tag>
                  </template>
                </div>
                <!-- <div class="tagBox">
                  <template v-for="key in keyList">
                    <template v-if="Array.isArray(item[key.name]) && item[key.name].length > 0">
                      <van-tag
                        v-for="(value, index) in item[key.name]"
                        :key="index"
                        round
                        size="medium"
                        :color="value.matched ? '#49CB15' : '#EC5F50'"
                        :class="value.matched | setClass('-bg tag_margin')"
                      >
                        {{ key.name === 'warehouses' ? '[仓] ' : ''
                        }}{{ key.name === 'deliveryAreas' ? '[配] ' : ''
                        }}{{ value.name }}
                      </van-tag>
                    </template>
                  </template>
                </div> -->
                <div class="matchRate">
                  匹配度 <span>{{ item.suitability }}%</span>
                </div>
                <div class="needCarBox">
                  <div class="needCarList">
                    <div class="top">
                      所需车型
                    </div>
                    <div class="bottom">
                      <van-icon v-if="item.driverCarType.matched" name="checked" size="20" color="#70C740" />
                      <van-icon v-else name="clear" size="20" color="#DC6857" />
                    </div>
                  </div>
                  <div class="needCarList">
                    <div class="top">
                      货物类型
                    </div>
                    <div class="bottom">
                      <van-icon v-if="forEachArr(item.cargoTypes)" name="checked" size="20" color="#70C740" />
                      <van-icon v-else name="clear" size="20" color="#DC6857" />
                    </div>
                  </div>
                  <div class="needCarList">
                    <div class="top">
                      到仓区域
                    </div>
                    <div class="bottom">
                      <van-icon v-if="forEachArr(item.warehouses)" name="checked" size="20" color="#70C740" />
                      <van-icon v-else name="clear" size="20" color="#DC6857" />
                    </div>
                  </div>
                  <div class="needCarList">
                    <div class="top">
                      配送区域
                    </div>
                    <div class="bottom">
                      <van-icon v-if="forEachArr(item.deliveryAreas)" name="checked" size="20" color="#70C740" />
                      <van-icon v-else name="clear" size="20" color="#DC6857" />
                    </div>
                  </div>
                  <div class="needCarList">
                    <div class="top">
                      装卸难度
                    </div>
                    <div class="bottom">
                      <van-icon v-if="forEachArr(item.handlingDifficultyDegrees)" name="checked" size="20" color="#70C740" />
                      <van-icon v-else name="clear" size="20" color="#DC6857" />
                    </div>
                  </div>
                  <div class="needCarList">
                    <div class="top">
                      出车时段
                    </div>
                    <div class="bottom">
                      <van-icon v-if="forEachArr(item.runningDurations)" name="checked" size="20" color="#70C740" />
                      <van-icon v-else name="clear" size="20" color="#DC6857" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="item.remark" class="list-note">
              <div class="list-note_mize">
                {{ item.remark }}
              </div>
            </div>
            <div class="lineListBottom">
              <div class="lineListBottom_box">
                <van-cell title="详情" is-link />
              </div>
            </div>
          </div>
        </div>
      </vo-pages>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup, Tag, Icon } from 'vant'
import { helpMatchIntelligent, helpMatch } from '@/api/line'
import { getCorpSignature, getAgentSignature } from '@/api/user'
import VoPages from 'vo-pages'
import SearchItemMatch from 'components/SearchItemMatchNew'
import 'vo-pages/lib/vo-pages.css'
const wx = window.wx;
export default {
  name: 'Linecommend',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Tag.name]: Tag,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    VoPages,
    SearchItemMatch
  },
  filters: {
    setClass(key, bg) {
      return (key ? 'success' : 'danger') + (bg || '')
    },
    setType(key) {
      return key ? 'checked' : 'warning'
    },
    isNull(val) {
      return val || ''
    }
  },
  data() {
    return {
      listQuery: {
        'carType': '',
        'cargoType': '',
        'city': '',
        'county': '',
        'handlingDifficultyDegree': '',
        'departureTime': '',
        'arrivalArea': '',
        'key': '',
        'limit': '20',
        'page': 1
      },
      active: 1,
      list: [],
      total: 0,
      searchType: 0,
      page: 1,
      show: false,
      beforePullDown: false,
      driverId: '',
      actions: [
        { name: '产品介绍', color: '#3F8AF2' },
        { name: '推荐线路', color: '#3F8AF2' }
      ],
      keyList: [
        {
          name: 'driverCarType',
          key: '所需车型'
        },
        {
          name: 'cargoTypes',
          key: '货物类型'
        },
        {
          name: 'warehouses',
          key: '到仓区域'
        },
        {
          name: 'deliveryAreas',
          key: '配送区域'
        },
        {
          name: 'handlingDifficultyDegrees',
          key: '装卸难度'
        },
        {
          name: 'runningDurations',
          key: '出车时段'
        }
      ],
      loadedAll: false
    }
  },
  mounted() {
    // let externalUserIdOld = localStorage.getItem('externalUserId')
    // let city = localStorage.getItem('city')
    // this.listQuery.city = city
    // if (!city) {
    //   localStorage.removeItem('token')
    // }
    // if (externalUserIdOld) {
    //   this.getUserConfig(true, externalUserIdOld);
    // } else {
    //   this.getUserConfig(false, externalUserIdOld);
    this.driverId = this.$route.query.driverId;
    this.getList()
    // }
  },
  methods: {
    forEachArr(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].matched) {
          return true
        }
      }
      return false;
    },
    getUserConfig(type, externalUserIdOld) {
      let that = this;
      const hostName = window.location.href
      getCorpSignature({
        url: hostName
      }).then((res) => {
        if (res.data.success) {
          let data = res.data.data;
          wx.config({
            beta: true,
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.corpId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: Number(data.timestamp), // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ['agentConfig'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function() {
            // 开启企业微信debug模式wx.config里的debug为true
            wx.checkJsApi({
              jsApiList: [
                'agentConfig',
                'sendChatMessage',
                'getCurExternalContact'
              ],
              success: function(res) {
                getAgentSignature({
                  agentId: that.GLOBAL.agentId,
                  url: hostName
                }).then((res) => {
                  if (res.data.success) {
                    const agentData = res.data.data
                    wx.agentConfig({
                      corpid: agentData.corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                      agentid: agentData.agentId, // 必填，企业微信的应用id （e.g. 1000247）
                      timestamp: '' + agentData.timestamp, // 必填，生成签名的时间戳
                      nonceStr: agentData.nonceStr, // 必填，生成签名的随机串
                      signature: agentData.signature, // 必填，签名，见附录1
                      jsApiList: ['sendChatMessage', 'getCurExternalContact'], // 必填
                      success: function(res) {
                        wx.invoke('getCurExternalContact', {
                        }, function(res) {
                          if (res.err_msg === 'getCurExternalContact:ok') {
                            // console.log('userId', res.userId) // 返回当前外部联系人userId
                            localStorage.setItem('externalUserId', res.userId)
                            let externalUserId = res.userId
                            if (type) {
                              if (externalUserId === externalUserIdOld) {
                                let lineIdNeedBack = localStorage.getItem('lineIdNeedBack')
                                if (lineIdNeedBack) {
                                  lineIdNeedBack = JSON.parse(lineIdNeedBack)
                                  if (lineIdNeedBack.lineId) {
                                    localStorage.removeItem('lineIdNeedBack')
                                    that.$router.push({ path: '/linedetail', query: { id: lineIdNeedBack.lineId, timeDiff: lineIdNeedBack.timeDiff, monthlyTransaction: lineIdNeedBack.monthlyTransaction, backBtn: 1, driverId: lineIdNeedBack.driverId }})
                                  }
                                } else {
                                  that.getList()
                                }
                              } else {
                                localStorage.removeItem('lineIdNeedBack')
                                that.getList()
                              }
                            } else {
                              localStorage.removeItem('lineIdNeedBack')
                            }
                          } else {
                            // 错误处理
                            this.btnShow = true;
                          }
                        });
                      },
                      fail: function(res) {
                        // console.log('err', res)
                        if (res.errMsg.indexOf('is not a function') > -1) {
                          alert('<i class="weui-icon-warn">版本过低请升级333</i>')
                        }
                      }
                    });
                  }
                })
              },
              fail: function(res) {
                alert('版本过低请升级2');
              }
            });
          });
          wx.error(function(res) {
            console.log(res);
          });
        }
      })
    },
    pullingDown() {
      this.beforePullDown = false
      this.listQuery.page = 1
      this.getList(false)
    },
    pullingUp() {
      this.listQuery.page += 1
      this.getList()
    },
    searchFunction(data) {
      this.listQuery.carType = data.carVal
      this.listQuery.cargoType = data.cargoVal
      this.listQuery.county = data.lineVal
      this.listQuery.arrivalArea = data.diliverVal
      this.listQuery.key = data.findVal
      this.listQuery.handlingDifficultyDegree = data.difficultyVal
      this.listQuery.departureTime = data.timeVal
      this.searchType = data.type
      this.listQuery.page = 0
      this.list = [];
      this.pullingDown()
    },
    getList(loadMore = true) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      if (this.searchType) {
        helpMatch({
          'arrivalArea': this.listQuery.arrivalArea,
          'carType': this.listQuery.carType,
          'cargoType': this.listQuery.cargoType,
          'deliveryArea': this.listQuery.county,
          'departureTime': this.listQuery.departureTime,
          'handlingDifficultyDegree': this.listQuery.handlingDifficultyDegree,
          'driverId': this.driverId,
          'key': this.listQuery.key,
          'limit': 20,
          'page': this.listQuery.page
        }).then((res) => {
          if (res.data.success) {
            Toast.clear();
            let lists = res.data.data
            this.total = res.data.page.total
            if (loadMore) {
              this.list = this.list.concat(lists)
            } else {
              this.list = lists
            }
            if (!this.beforePullDown) {
              this.beforePullDown = true
            }
            if (this.list.length === this.total || this.list.length < 4) {
              this.loadedAll = true
            } else {
              this.loadedAll = false
            }
          } else {
            Toast.clear();
            this.loadedAll = true;
            // Toast.fail(res.data.errorMsg);
          }
        }).catch((err) => {
          Toast.clear();
          Toast.fail(err);
          this.loadedAll = true;
        })
      } else {
        helpMatchIntelligent({
          'driverId': this.driverId,
          'key': '',
          'limit': 20,
          'page': this.listQuery.page
        }).then((res) => {
          if (res.data.success) {
            Toast.clear();
            let lists = res.data.data
            this.total = res.data.page.total
            if (loadMore) {
              this.list = this.list.concat(lists)
            } else {
              this.list = lists
            }
            if (!this.beforePullDown) {
              this.beforePullDown = true
            }
            if (this.list.length === this.total || this.list.length < 4) {
              this.loadedAll = true
            } else {
              this.loadedAll = false
            }
          } else {
            Toast.clear();
            this.loadedAll = true;
            Toast.fail(res.data.errorMsg);
          }
        }).catch((err) => {
          Toast.clear();
          Toast.fail(err);
          this.loadedAll = true;
        })
      }
    },
    goDetail(id, timeDiff, monthlyTransaction, driverId) {
      this.$router.push({ path: '/linedetail', query: { id: id, timeDiff: timeDiff, monthlyTransaction: monthlyTransaction, driverId: driverId }})
    }
  }
}
</script>
<style lang="scss" scope>
.matchCommend{
    background: #f7f8fa;
    height: 100%;
    width: 100%;
    .list-note {
      padding: 0 10px;
      font-size: 12px;
      color: #b2b2b2;
      text-indent: 2em;
      background: #fff;
      border-left: 1px solid #EEEBEB;
      border-right: 1px solid #EEEBEB;
      .list-note_mize{
        padding: 8px 0;
        box-sizing: border-box;
        line-height: 18px;
        border-top: 1px solid #EEEBEB;
      }
    }
    .tag_margin{
      // margin: 2px 6px 6px 0;
      margin: 3px 4px 3px 0;
    }
    .list-wrap{
        height: 100%;
        // overflow-y: hidden;
        // padding:0.5rem 0.3rem;
        // box-sizing: border-box;
    }
    .lineBox{
        padding: 50px 18px;
        box-sizing: border-box;
    }
    .lineList{
        width:100%;
        background: #FFFFFF;
        // border: 1px solid #D9D9D9;
        border-radius: 5px;
        box-sizing: border-box;
        margin-bottom: 16px;
        overflow: hidden;
        .lineListTop{
            background:#fff;
            // padding:0.2rem 0;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
            .saleName{
              padding:2px 4px;
              box-sizing: border-box;
              background:burlywood;
              color:#fff;
              position: absolute;
              top:0;
              right:0;
              font-size: 12px;
            }
            .info{
                color:#333;
                font-size:14px;
                padding:0 0.42667rem 0.26rem;
                box-sizing: border-box;
            }
            .name{
                width:100%;
                font-weight: 500;
                // padding: 10px;
                // box-sizing: border-box;
                font-size: 17px;
                color: #000000;
                .nameBox{
                  padding:10px 10px 0 10px;
                  border:1px solid #EEEBEB;
                  border-radius: 5px 5px 0 0;
                  border-bottom:none;
                }
                .top-tag {
                  box-sizing: border-box;
                  background: #F09654;
                  border-radius: 5px;
                  height:21px;
                  line-height: 20px;
                  font-size: 13px;
                  color: #FFFFFF;
                  position: absolute;
                  right: 0;
                  top: 0;
                }
                .address{
                    font-weight: 400;
                    font-size: 14px;
                    color: #000000;
                    padding: 0.16rem 0;
                    box-sizing: border-box;
                    border-bottom: 1px solid #ECECEC;
                }
            }
            .tagBox{
                width: 100%;
                padding:3px 10px;
                box-sizing: border-box;
                border-bottom: 1px solid #EEEBEB;
                border-left: 1px solid #EEEBEB;
                border-right: 1px solid #EEEBEB;
            }
            .matchRate{
                width: 100%;
                padding:0.26rem 15px;
                box-sizing: border-box;
                font-size: 17px;
                color: #000000;
                font-weight: 400;
                border-bottom: 1px solid #EEEBEB;
                border-left: 1px solid #EEEBEB;
                border-right: 1px solid #EEEBEB;
                span{
                    font-size: 20px;
                    color: #2F7DCD;
                    font-weight: bold;
                    float: right;
                }
            }
            .needCarBox{
                width:100%;
                display: flex;
                padding: 0 10px;
                border-left: 1px solid #EEEBEB;
                border-right: 1px solid #EEEBEB;
                box-sizing: border-box;
                .needCarList{
                    flex: 1;
                    padding: 11px 0 0;
                    box-sizing: border-box;
                    .top{
                        width: 100%;
                        text-align: center;
                        font-size: 10px;
                        color: #B2B2B2;
                        font-weight: 400;
                    }
                    .bottom{
                        width: 100%;
                        padding: 4px 0 0 0;
                        box-sizing: border-box;
                        text-align: center;
                    }
                }
            }
        }
    }
    p{
        margin-block-start: 0;
        margin-block-end: 0;
    }

    .article-list {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 15px 15px 0;
        .article {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 10px 15px;
            box-sizing: border-box;
            background: #FFF;
            border-radius: 5px;
            box-shadow: 0 0 6px #e3e3e3;
            .left {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
        }
            .right {
                padding-left: 15px;
                box-sizing: border-box;
                display: flex;
                width: 235px;
                height: 80px;
                flex-direction: column;
                align-items: flex-start;
                justify-content: space-around;
                p {
                    width: 100%;
                    line-height: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 16px;
                }
                .more-info{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    color: #666;
                }
            }
        }
    }
    .focus{
        width:100%;
        text-align: center;
        padding-top: 1rem;
        box-sizing: border-box;
        img{
            width: 60%;
        }
        p{
            color:#666;
            font-size: 14px;
        }
    }
    .placeholder{
      width:100%;
    }
    .lineListBottom{
        // border-top: 1px solid #EEEBEB;
        font-size: 14px;
        color: #9B9B9B;
        padding:0 10px;
        border-radius: 0 0 5px 5px;
        box-sizing: border-box;
        border-left: 1px solid #EEEBEB;
        border-right: 1px solid #EEEBEB;
        border-bottom: 1px solid #EEEBEB;
        .lineListBottom_box{
          border-top: 1px solid #EEEBEB;
        }
        .van-cell{
          padding: 0;
          height:27px;
          line-height: 27px;
          box-sizing: border-box;
          font-size: 14px;
          color: #9B9B9B;
          .van-cell__title{
            font-size: 14px;
            color: #9B9B9B;
          }
        }
        .van-cell__right-icon{
          color:#C7C7CC;
        }
    }
}
</style>
