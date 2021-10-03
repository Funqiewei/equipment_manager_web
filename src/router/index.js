import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Index from '@/components/Index/Index.vue'
import Test from '@/components/Index/Test.vue'
import Home from '@/components/Home.vue'
import Log from '@/components/Log.vue'
import Appointment from '@/components/Appointment.vue'
import Welecome from '@/components/Welcome.vue'
import Users from '@/components/Users.vue'
import Help from '@/components/Index/Help.vue'
import Permission from '@/components/rights/Permission.vue'
import Role from '@/components/rights/Role.vue'
import Body from '@/components/Index/Body.vue'
Vue.use(VueRouter)

const router = new VueRouter(
   {
      routes: [
         { path: "/", redirect: '/index' },
         {
            path: '/index',
            redirect: '/Body',
            component: Index,
            children: [
               { path: '/help', component: Help },
               { path: '/Body', component: Body },
               { path: '/Test', component: Test },
            ]

         },
         { path: '/login', component: Login },
         {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
               { path: '/welcome', component: Welecome },
               { path: '/users', component: Users },
               { path: '/rights', component: Permission },
               { path: '/roles', component: Role },
               { path: '/log', component: Log },
               { path: '/appointment', component: Appointment },
            ]
         },

      ]
   }
)
router.beforeEach((to, from, next) => {

   if (to.path === '/index') return next()
   if (to.path === '/help') return next()
   if (to.path === '/login') return next()
   const tokenStr = window.sessionStorage.getItem('token');
   if (to.path === '/home' && !tokenStr) return next('/login')
   if (to.path === '/welcome' && !tokenStr) return next('/login')
   next();
})
export default router