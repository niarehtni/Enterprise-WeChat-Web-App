<template>
  <div class="driverDetail">
    <div class="list-wrap">
      <van-tabs v-model="active" color="#0082EF" sticky @click="buryPoint">
        <van-tab title="基本" class="backgroundTab">
          <van-cell-group v-if="JSON.stringify(detail) != '{}'">
            <!-- <h2 class="van-doc-demo-block__title">
              基本信息
            </h2> -->
            <van-cell title="姓名" :value="detail.name | DataIsNull" />
            <van-cell title="身份证号" :value="detail.idNumber | DataIsNull" />
            <van-cell title="联系电话" :value="detail.phone | DataIsNull" />
            <van-cell title="司机编号" :value="detail.driverId | DataIsNull" />
            <van-cell title="工作城市" :value="detail.workCityName | DataIsNull" />
            <van-cell title="户籍地址" :value="detail.cityName ? detail.cityName + detail.provinceName : '暂无数据'" />
            <van-cell title="面试时间" :value=" detail.interviewTime | DataIsNull" />
            <van-cell title="货物经验" :value=" detail.cargoTypeName | DataIsNull" />
            <van-cell title="物流从业经验" :value="detail.workExperienceName | DataIsNull" />
            <van-cell title="可接受一天工作时长" :value=" detail.workHourName | DataIsNull" />
            <van-cell title="意向车型" :value=" detail.carTypeName | DataIsNull" />
            <van-cell title="是否有在还贷款" :value=" detail.isHaveLoan ? (detail.isHaveLoan === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="期望月收入" :value=" detail.expMonthlyIncomeName | DataIsNull" />
            <van-cell title="司机年龄" :value=" detail.age | DataIsNull" />
            <van-cell title="可接受首付范围" :value=" detail.acceptPayRangeName | DataIsNull" />
            <van-cell title="现居住地址" :value=" detail.address | DataIsNull" />
            <van-cell title="之前在哪工作" :value=" detail.whereWorked | DataIsNull" />
            <van-cell title="来源渠道" :value=" detail.sourceName | DataIsNull" />
            <van-cell title="征信是否通过" :value=" detail.isCreditPass ? (detail.isCreditPass === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="是否跟车" :value="detail.isPay ? (detail.isPay === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="意向金缴纳日期" :value=" detail.payDate | DataIsNull" />
            <van-cell title="上岗时间" :value=" detail.goToWorkTime | DataIsNull" />
            <van-cell title="平均月收入" :value=" detail.monthlyIncome | DataIsNull" />
            <van-cell title="户口类型" :value=" detail.accountType | DataIsNull" />
            <van-cell title="家里几个孩子" :value=" detail.childrenNum | DataIsNull" />
            <van-cell title="孩子的平均年龄" :value=" detail.childrenAge | DataIsNull" />
            <van-cell title="是否有货车" :value="detail.isHaveCar ? (detail.isHaveCar === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="征信是否通过" :value="detail.isCreditPass ? (detail.isCreditPass === 2 ? '否' : '是') : '暂无数据'" />
          </van-cell-group>
          <p v-if="JSON.stringify(detail) == '{}'" class="noMore">
            暂无信息
          </p>
          <van-button class="btn_bottom" @click="check">
            操作
          </van-button>
        </van-tab>
        <van-tab title="订单" class="backgroundTab">
          <van-cell-group v-if="lineList.length">
            <!-- <h2 class="van-doc-demo-block__title">
              订单信息
            </h2> -->
            <van-cell v-for="item in orderList" :key="item.type" title="订单编号" :value="item.orderId + '(' + item.stateName + ')'" />
          </van-cell-group>
          <p v-if="!lineList.length" class="noMore">
            暂无信息
          </p>
          <van-button class="btn_bottom" @click="check">
            操作
          </van-button>
        </van-tab>
        <van-tab title="线路" class="backgroundTab">
          <van-cell-group v-if="lineList.length">
            <!-- <h2 class="van-doc-demo-block__title">
              线路信息
            </h2> -->
            <van-cell v-for="item in lineList" :key="item.type" title="线路编号" :value="item.lineId + '(' + item.stateName + ')'" />
          </van-cell-group>
          <p v-if="!lineList.length" class="noMore">
            暂无信息
          </p>
          <van-button class="btn_bottom" @click="check">
            操作
          </van-button>
        </van-tab>
        <van-tab title="撮合" :class="matchModule ? 'backgroundTab2' : 'backgroundTab'" @click="buryPoint('撮合')">
          <div v-if="!matchModule" class="match_box">
            <img src="https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/img/97ee7868311c46b3be2875cbaf5e354d" alt="">
            <p class="hint_weight">
              未设置接活意向
            </p>
            <p class="text_nomarl">
              请根据司机需求设置接活意向
            </p>
            <p class="text_nomarl">
              系统会根据意向智能推荐匹配线路
            </p>
            <van-button type="info" class="btn2" @click="goRouter(1)">
              设置司机接活意向
            </van-button>
          </div>
          <div v-else class="match_box2">
            <van-cell-group>
              <!-- <h2 class="van-doc-demo-block__title">
                撮合信息
              </h2> -->
            </van-cell-group>
            <!-- <van-cell-group class="matchGroup">
              <van-cell title="车型" :value="matchDetail.carType | DataIsNull" />
            </van-cell-group> -->
            <div class="matchList">
              <div class="title_sm">
                车型
              </div>
              <div class="tage_type">
                <van-tag v-for="item in matchDetail.carType" :key="item" round type="primary" color="#4F77AA" class="tag" size="medium">
                  {{ item }}
                </van-tag>
                <p v-if="!matchDetail.cargoType.length">
                  暂无数据
                </p>
              </div>
            </div>
            <div class="matchList">
              <div class="title_sm">
                货物类型
              </div>
              <div class="tage_type">
                <van-tag v-for="item in matchDetail.cargoType" :key="item" round type="primary" color="#4F77AA" class="tag" size="medium">
                  {{ item }}
                </van-tag>
                <p v-if="!matchDetail.cargoType.length">
                  暂无数据
                </p>
              </div>
            </div>
            <div class="matchList">
              <div class="title_sm">
                到仓区域
              </div>
              <div class="tage_type">
                <van-tag v-for="item in matchDetail.arrivalArea" :key="item" round type="primary" color="#4F77AA" class="tag" size="medium">
                  {{ item }}
                </van-tag>
                <p v-if="!matchDetail.deliveryArea.length">
                  暂无数据
                </p>
              </div>
            </div>
            <div class="matchList">
              <div class="title_sm">
                配送区域
              </div>
              <div class="tage_type">
                <van-tag v-for="item in matchDetail.deliveryArea" :key="item" round type="primary" color="#4F77AA" class="tag" size="medium">
                  {{ item }}
                </van-tag>
                <p v-if="!matchDetail.deliveryArea.length">
                  暂无数据
                </p>
              </div>
            </div>
            <div class="matchList">
              <div class="title_sm">
                装卸难度
              </div>
              <div class="tage_type">
                <van-tag v-for="item in matchDetail.handlingDifficultyDegree" :key="item" round type="primary" color="#4F77AA" class="tag" size="medium">
                  {{ item }}
                </van-tag>
                <p v-if="!matchDetail.handlingDifficultyDegree.length">
                  暂无数据
                </p>
              </div>
            </div>
            <div class="matchList">
              <div class="title_sm">
                出车时段
              </div>
              <div class="tage_type">
                <van-tag v-for="item in matchDetail.departureTime" :key="item" round type="primary" color="#4F77AA" class="tag" size="medium">
                  {{ item }}
                </van-tag>
                <p v-if="!matchDetail.departureTime.length">
                  暂无数据
                </p>
              </div>
            </div>
            <div style="margin-top:20px">
              <van-cell-group class="menuBottom">
                <van-cell title="接活意向" is-link value="设置智能筛选撮合线路" @click="goRouter(1)" />
              </van-cell-group>
              <van-cell-group class="menuBottom">
                <van-cell title="促撮推荐" is-link value="根据接活意向推荐线路" @click="goRouter(2)" />
              </van-cell-group>
              <van-cell-group class="menuBottom">
                <van-cell title="撮合跟进" is-link value="跟进撮合进度及节点" @click="goRouter(3)" />
              </van-cell-group>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup, Button, ActionSheet, Tag } from 'vant'
import { driverDetail, queryOrdersByDriverId, relatedLineInformation } from '@/api/user'
import { judgingIntentionOfReceiving } from '@/api/driver'
// import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
// import wx from 'jWeixin';
var startTime
export default {
  name: 'Clue',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      clueLog: [],
      orderList: [],
      lineList: [],
      cost: [],
      total: 0,
      page: 1,
      loadedAll: false,
      judgeType: false,
      driverId: '',
      driverType: '1',
      active: 0,
      loadTimeNum: 0,
      detail: '',
      show: false,
      matchModule: false,
      matchDetail: '',
      actions: [
        { name: '产品介绍', color: '#3F8AF2' },
        { name: '推荐线路', color: '#3F8AF2' }
      ]
    }
  },
  beforeRouteLeave(to, from, next) {
    let that = this;
    let eventLevelVariables = {
      duration_look: that.loadTimeNum || '0'
    }
    clearInterval(startTime);
    that.GLOBAL.buryPointFunction('customer_visit', '客户信息页面访问', eventLevelVariables)
    next(true);
  },
  created() {
  },
  mounted() {
    let driverId = this.$route.query.driverId;
    this.driverId = driverId;
    this.active = Number(localStorage.getItem('active'))
    this.loadTime()
    if (this.active) {
      localStorage.removeItem('active')
    }
    this.getDetail(driverId)
  },
  methods: {
    double(mat) {
      return mat < 10 ? '0' + mat : mat;
    },
    loadTime() {
      let date = 0;
      let hour = 0;
      let minute = 0;
      let second = 0;
      let that = this;
      startTime = setInterval(function() {
        second++;
        if (second === 60) {
          minute += 1;
          second = 0;
        }
        if (minute === 60) {
          hour += 1;
          minute = 0;
        }
        if (hour === 24) {
          date += 1;
          hour = 0;
        }
        let days = that.double(date) + '天：' + that.double(hour) + ':' + that.double(minute) + ':' + that.double(second);
        that.loadTimeNum = days
      }, 1000)
    },
    getDetail(driverId) {
      driverDetail({
        driverId: driverId
      }).then((res) => {
        if (res.data.success) {
          this.detail = res.data.data
          if (this.detail.accountType === 1) {
            this.detail.accountType = '城镇户口'
          }
          if (this.detail.accountType === 2) {
            this.detail.accountType = '农村户口'
          }
        }
      })
      queryOrdersByDriverId({
        driverId: driverId
      }).then((res) => {
        if (res.data.success) {
          this.orderList = res.data.data;
        }
      })
      relatedLineInformation({
        driverId: driverId
      }).then((res) => {
        if (res.data.success) {
          this.lineList = res.data.data.lineTenderInformationVOS;
        }
      })
      judgingIntentionOfReceiving({
        driverId: driverId
      }).then((res) => {
        if (res.data.success) {
          this.matchModule = res.data.data.flag;
          if (this.matchModule) {
            console.log(this.matchDetail)
            this.matchDetail = res.data.data
          }
        }
      })
    },
    buryPoint(name, title) {
      this.active = Number(name);
      localStorage.setItem('active', name)
      let eventLevelVariables = {
        tab: title || ''
      }
      this.GLOBAL.buryPointFunction('customer_tab', '客户信息页-tab点击', eventLevelVariables)
    },
    goRouter(type) {
      let that = this;
      localStorage.setItem('active', 3)
      if (type === 1) {
        that.$destroy(true)
        that.$router.push({ path: '/driverintention', query: { driverId: that.driverId }})// 撮合跟进
      } else if (type === 2) {
        that.$router.push({ path: '/matchcommend', query: { driverId: that.driverId }})// 撮合跟进
      } else if (type === 3) {
        that.$router.push({ path: '/driverfollow', query: { driverId: that.driverId }})// 撮合跟进
      }
    },
    check() {
      this.show = true;
    //   judgingIntentionOfReceiving({
    //     driverId: 201910231017
    //   }).then((res) => {
    //     if (res.data.success) {
    //       console.log(res.data.data)
    //       this.detail = res.data.data
    //     }
    //   })
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      let eventLevelVariables = {
        option: item.name || ''
      }
      this.GLOBAL.buryPointFunction('customer_options', '客户详情操作按钮点击', eventLevelVariables)
      Toast(item.name);
      if (item.name === '产品介绍') {
        this.$router.push({ path: '/productinfo' })
      } else {
        this.$router.push({ path: '/linecommend' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/common.scss";
.driverDetail{
  background: #F5F5F5;
  .backgroundTab{
    height: 100%;
    padding-bottom: 1.6rem;
    box-sizing: border-box;
    // background: #FFF;
  }
  .backgroundTab2{
    background: #F5F5F5;
  }
  .match_box2{
    height: 100%;
    padding-top:8px;
    .van-cell__title{
      font-size: 17px;
      color: #000000;
    }
    .matchGroup{
      margin-bottom: 2px;
      border-top: 1px solid #ebedf0;
      border-bottom: 1px solid #ebedf0;
    }
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
      border: none;
    }
    .matchList{
      width:100%;
      background: #fff;
      border-bottom: 2px solid #F5F5F5;
      box-sizing: border-box;
      .title_sm{
        height:20px;
        line-height: 20px;
        font-size: 12px;
        color: #B2B2B2;
        background: #F5F5F5;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .tage_type{
        overflow: hidden;
        padding:14px 20px 8px;
        box-sizing: border-box;
        border-top: 1px solid #ebedf0;
        border-bottom: 1px solid #ebedf0;
        .van-tag{
          padding:0 12px;
          box-sizing: border-box;
          font-size: 13px;
          color: #FFFFFF;
          margin-right: 10px;
          margin-bottom: 6px;
        }
        // .tag{
          // margin: 2px 6px 8px 0;
        // }
      }
    }
  }
  .menuBottom{
    margin: 4px 0;
  }
  .match_box{
    width: 100%;
    text-align: center;
    padding:60px 0;
    box-sizing: border-box;
    img{
      width: 90px;
      height: 90px;
    }
    .hint_weight{
      font-size: 20px;
      color: #2D3034;
      font-weight: bold;
      padding:31px 0 14px;
      box-sizing: border-box;
    }
    .text_nomarl{
      font-size: 14px;
      color: #9B9B9B;
      line-height: 22px;
    }
  }
  .noMore{
    width: 100%;
    text-align: center;
    height:5rem;
    line-height: 6rem;
  }
    p{
    margin-block-start: 0;
    margin-block-end: 0;
    }
    .container{
    height: 100%;
    width: 100%;
    background: #f5f5f5;
    .list-wrap{
        height: calc(100% - 50px);
        overflow-y: hidden;
    }
    }

    .btn2{
      width:90%;
      margin: 63px auto 0;
      height: 46px;
      line-height: 46px;
      background: #3C7FC8;
      font-size: 18px;
      border:none;
      border-radius: 5px;
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

  .van-doc-demo-block__title{
    margin: 0;
    text-align: center;
    padding: 16px;
    color: #4D86C6;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    background-color: #f7f8fa;
  }
}
</style>
