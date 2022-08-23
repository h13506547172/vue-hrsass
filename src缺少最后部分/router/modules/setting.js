import Layout from '@/layout'
export default {
  path: '/setting',
  component: Layout,
  meta: {
    id: 'settings', // 和后端做好约定
  },
  children: [
    {
      path: '',
      component: () => import('@/views/setting'),
      meta: { title: '公司设置', icon: 'setting' }
    }
  ]
}
