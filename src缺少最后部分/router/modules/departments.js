import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  meta: {
    id: 'departments', // 和后端做好约定
  },
  children: [
    {
      path: '',
      component: () => import('@/views/departments'),
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
