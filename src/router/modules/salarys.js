import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  meta: {
    id: 'salarys', // 和后端做好约定
  },
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      meta: { title: '工资', icon: 'money' }
    }
  ]
}
