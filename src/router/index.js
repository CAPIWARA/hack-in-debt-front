import Vue from 'vue'
import Router from 'vue-router'
import store from '@store'
import { AUTH_CHECK } from '@store/types'
import SignIn from '@components/Auth/SignIn'
import SignUp from '@components/Auth/SignUp'

Vue.use(Router)

const roles = (...roles) => ({ meta: roles })

const router = new Router({
  mode: 'history',
  routes: [
    {
      ...roles('visitor'),
      path: '/entrar',
      alias: '/',
      name: 'Entrar',
      component: SignIn
    },
    {
      ...roles('visitor'),
      path: '/cadastrar',
      name: 'Cadastrar',
      component: SignUp
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const isAuth = await store.dispatch(AUTH_CHECK)
  const role = isAuth ? 'user' : 'visitor'
  const roles = (to.meta && to.meta.roles) || ['*']
  const can = roles.includes('*') || roles.includes(role)

  if (!can && role === 'visitor') {
    next({ name: 'Entrar' })
  } else if (!can && role === 'user') {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
