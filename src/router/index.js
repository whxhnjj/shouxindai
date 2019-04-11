import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/UpLoad',
      name: 'UpLoad',
      component: () => import('@/pages/UpLoad/UpLoad'),
      meta: {
        title: '上传图片'
      }
    },
    {
      path: '/ApplyInfo',
      name: 'ApplyInfo',
      component: () => import('@/pages/ApplyInfo/ApplyInfo'),
      meta: {
        title: '申请信息'
      }
    },
    {
      path: '/ApplyInfoSubmit',
      name: 'ApplyInfoSubmit',
      component: () => import('@/pages/ApplyInfoSubmit/ApplyInfoSubmit'),
      meta: {
        title: '申请信息'
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
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/pages/account/account'),
      meta: {
        title: '请选择收款账户'
      }
    },
    {
      path: '/Addcard',
      name: 'Addcard',
      component: () => import('@/pages/Addcard/Addcard'),
      meta: {
        title: '添加储蓄卡'
      }
    },
    {
      path: '/BankCard',
      name: 'BankCard',
      component: () => import('@/pages/BankCard/BankCard'),
      meta: {
        title: '选择银行卡'
      }
    },
    {
      path: '/Total',
      name: 'Total',
      component: () => import('@/pages/Total/Total'),
      meta: {
        title: '我要还款'
      }
    },
    {
      path: '/Details',
      name: 'Details',
      component: () => import('@/pages/Details/Details'),
      meta: {
        title: '还款详情'
      }
    },
    {
      path: '/LoanRecord',
      name: 'LoanRecord',
      component: () => import('@/pages/LoanRecord/LoanRecord'),
      meta: {
        title: '借款记录'
      }
    },
    {
      path: '/LoanDetails',
      name: 'LoanDetails',
      component: () => import('@/pages/LoanDetails/LoanDetails'),
      meta: {
        title: '借款详情'
      }
    },
    {
      path: '/Jump',
      name: 'Jump',
      component: () => import('@/pages/Jump/Jump')
    }
  ]
})
