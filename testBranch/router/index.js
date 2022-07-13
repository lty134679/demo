import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes} from './routes'
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

router.beforeEach(async(to, from, next) => {
    next()
   
})
export default router
