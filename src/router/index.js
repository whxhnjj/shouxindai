import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/home/Home'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/My',
      name: 'My',
      component: () => import('@/pages/My/My'),
      meta: {
        title: '我的'
      }
    },
    {
      path: '/Borrow',
      name: 'Borrow',
      component: () => import('@/pages/Borrow/Borrow'),
      meta: {
        title: '我要借款'
      }
    },
    {
      path: '/repayment',
      name: 'repayment',
      component: () => import('@/pages/repayment/repayment'),
      meta: {
        title: '还款计划'
      }
    },
    {
      path: '/Code',
      name: 'Code',
      component: () => import('@/pages/Code/Code'),
      meta: {
        title: '请输入验证码'
      }
    },
    {
      path: '/Result',
      name: 'Result',
      component: () => import('@/pages/Result/Result'),
      meta: {
        title: '借款结果'
      }
    }
  ]
})
