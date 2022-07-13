

let constantRoutes = [
    {
        path: '/',
        name: 'LoginPage',
        component: () => import('@/views/LoginPage.vue'),
        meta: {
            title: '登录',
        }
    },
    {
        path: '/question',
        name: 'QuestionIndex',
        component: () => import('@/views/QuestionIndex.vue'),
    }
  
]

export {
    constantRoutes,
}
