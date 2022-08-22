import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  meta: {
    id: 'approvals', // 和后端做好约定
  },
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
