export default [
  {
    path: '/driver',
    name: 'driver',
    component: () => import('views/driver/Driver.vue'),
    meta: {
      title: '司机管理',
      // auth: true,
      keepAlive: true
    }
  }, {
    path: '/driverdetail',
    name: 'driverdetail',
    component: resolve => require(['@/views/driver/DriverDetail'], resolve),
    meta: {
      title: '司机详情',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/driverfollow',
    name: 'DriverFollow',
    component: () => import('views/driver/DriverFollow.vue'),
    meta: {
      title: '撮合跟进',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/driverfollowdetail',
    name: 'DriverFollowDetail',
    component: () => import('views/driver/DriverFollowDetail.vue'),
    meta: {
      title: '跟进详情',
      keepAlive: true
    }
  }, {

    path: '/driverintention',
    name: 'driverintention',
    component: () => import('views/driver/DriverIntention.vue'),
    meta: {
      title: '司机接活意向',
      keepAlive: true
    }
  },
  {
    path: '/matchcommend',
    name: 'matchcommend',
    component: resolve => require(['@/views/driver/MatchCommend'], resolve),
    meta: {
      title: '促撮推荐',
      keepAlive: true
    }
  }
]

