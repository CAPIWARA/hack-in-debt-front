import Vue from 'vue'
import Router from 'vue-router'
import store from '@store'
import { AUTH_CHECK } from '@store/types'
import SignIn from '@components/Auth/SignIn'
import SignUp from '@components/Auth/SignUp'
import Student from '@components/Data/Student'
import Dashboard from '@components/Dashboard/Dashboard'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/entrar',
      alias: '/',
      name: 'Entrar',
      component: SignIn
    },
    {
      path: '/cadastrar',
      name: 'Cadastrar',
      component: SignUp
    },
    {
      path: '/estudante',
      name: 'Estudantes',
      component: Student
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const isAuth = await store.dispatch(AUTH_CHECK)
  next()
})

export default router
