import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  // meta: {
  //   id: 'import', // 和后端做好约定
  // },
  children: [
    {
      path: '',
      component: () => import('@/views/import')
    }
  ]
}
