import Vue from 'vue'
import VueRouter from 'vue-router'
//路由懒加载
//Vue  是单页面应用，可能会有很多的路由引入 ，这样使用 webpcak 打包后的文件很大，当进入首页时，加载的资源过多，页面会出现白屏的情况，不利于用户体验。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的组件，这样就更加高效了。这样会大大提高首屏显示的速度，但是可能其他的页面的速度就会降下来。
/*const Foo = () => import('./Foo.vue')
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
}) */
const Login = () =>import('@/components/Login.vue')
const Test = () =>import('@/components/Index/Test.vue')
const Index = () =>import('@/components/Index/Index.vue')
const Home = () =>import('@/components/Home.vue')
const Log = () =>import('@/components/Log.vue')
const Appointment = () =>import( '@/components/Appointment.vue')
const Welecome= () =>import('@/components/Welcome.vue')
const Users = () =>import('@/components/Index/Help.vue')
const Permission  = () =>import('@/components/rights/Permission.vue')
const Role = () =>import('@/components/rights/Role.vue')
const Body  = () =>import('@/components/Index/Body.vue')
const Fail = () =>import('@/components/Index/Fail.vue')
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter(
   {  mode: 'history',
      routes: [
         { path: "/", redirect: '/Body' },
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
         {
            path: '*',
            name:'error',
            component:Fail,  
           // redirect: "/404",
         },
      ]
   }
)
router.beforeEach((to, from, next) => {
   if (to.path === '/index') return next()
   if (to.path === '/help') return next()
   if (to.path === '/login') return next()
  // const tokenStr = window.sessionStorage.getItem('token');
  // if (to.path === '/home' && !tokenStr) return next('/login')
  // if (to.path === '/welcome' && !tokenStr) return next('/login')
   next();
})
export default router