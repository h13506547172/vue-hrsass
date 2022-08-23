import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  meta: {
    id: 'employees', // 和后端做好约定
  },
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: '/employees/detail/:id',
      component: () => import('@/views/employees/detail'),
      hidden: true
    },
    {
      path: '/employees/print/:id',
      component: () => import(`@/views/employees/print`),
      hidden: true
    }
  ]
}
