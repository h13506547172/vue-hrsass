import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,
  meta: {
    id: 'attendances', // 和后端做好约定
  },
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      meta: { title: '考勤', icon: 'skill' }
    }
  ]
}
