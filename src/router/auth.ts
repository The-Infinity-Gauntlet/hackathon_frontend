const authRoutes = {
  path: '/',
  component: () => import('../layouts/auth.vue'),
  children: [
    {
      path: '/metodo-pagamento',
      name: 'PaymentMethod',
      component: () => import('../views/PaymentMethodView.vue'),
    },
    {
      path: '/sig-in',
      name: 'Login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/sig-up',
      name: 'Register',
      component: () => import('../views/auth/RegisterView.vue'),
    },
    {
      path: '/pagamento',
      name: 'Payment',
      component: () => import('../views/PaymentView.vue'),
    },
  ],
}
export default authRoutes
