import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    component: () =>
      import(
        /* webpackChunkName: "pages" */
        '../views/pages/Index.vue'
      ),
    children: [{
      path: '',
      name: 'Dashboard',
      component: () =>
        import(
          /* webpackChunkName: "pages" */
          '../views/pages/Dashboard.vue'
        )
    },
    {
      path: 'profile',
      name: 'Profile',
      component: () =>
        import(/* webpackChunkName: "users" */ '../views/pages/Profile.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'products',
      name: 'Products',
      component: () =>
        import(
          /* webpackChunkName: "pages" */
          '../views/pages/Products/Index.vue'
        ),
      children: [{
        path: '',
        name: 'ListProducts',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Products/ListProducts.vue'
          )
      },
      {
        path: ':productId',
        name: 'ViewProduct',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Products/ViewProduct.vue'
          )
      }],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'users',
      name: 'Users',
      component: () =>
        import(
          /* webpackChunkName: "pages" */
          '../views/pages/Users/Index.vue'
        ),
      children: [{
        path: '',
        name: 'LisUsers',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Users/ListUsers.vue'
          )
      },
      {
        path: ':userId',
        name: 'ViewUser',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Users/ViewUser.vue'
          )
      }],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'orders',
      name: 'Orders',
      component: () =>
        import(
          /* webpackChunkName: "pages" */
          '../views/pages/Orders/Index.vue'
        ),
      children: [{
        path: '',
        name: 'ListOrders',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Orders/ListOrders.vue'
          )
      },
      {
        path: ':orderId',
        name: 'ViewOrders',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Orders/ViewOrders.vue'
          )
      }],
      meta: {
        requiresAuth: true
      }

    },
    {
      path: 'deliveries',
      name: 'Deliveries',
      component: () =>
        import(
          /* webpackChunkName: "pages" */
          '../views/pages/Deliveries/Index.vue'
        ),
      children: [{

        path: '',
        name: 'ListDeliveries',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Deliveries/ListDeliveries.vue'
          )
      },
      {
        path: ':deliveriesId',
        name: 'ViewDeliveries',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Deliveries/ViewDeliveries.vue'
          )

      }],
      meta: {
        requiresAuth: true
      }
    },
    {
      meta: {
        title: 'Edit User'
      },
      path: '/user/edit/:id',
      name: 'user.edit',
      component: () =>
        import(
          /* webpackChunkName: "client-form" */
          '@/components/forms/UsersForm.vue'
        ),
      props: true
    },
    {
      meta: {
        title: 'New User',
        requiresAuth: true
      },
      path: '/user/new',
      name: 'user.new',
      component: () =>
        import(
          /* webpackChunkName: "client-form" */
          '@/components/forms/UsersForm.vue'
        )
    }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    component: () =>
      import(
      /* webpackChunkName: "authentication" */
        '../views/authentication/Index.vue'
      ),
    children: [{
      path: '',
      name: 'Login',
      component: () =>
        import(
        /* webpackChunkName: "authentication" */
          '../views/authentication/Login.vue'
        )
    },
    {
      path: 'register',
      name: 'Register',
      component: () =>
        import(
        /* webpackChunkName: "authentication" */
          '../views/authentication/Register.vue'
        )
    },
    {
      path: 'forgot-password',
      name: 'ForgotPassword',
      component: () =>
        import(
        /* webpackChunkName: "authentication" */
          '../views/authentication/ForgotPassword.vue'
        )
    },
    {
      path: 'reset-password',
      name: 'ResetPassword',
      component: () =>
        import(
        /* webpackChunkName: "authentication" */
          '../views/authentication/ResetPassword.vue'
        )
    }
    ]
  },

  {
    path: '/forms',
    component: () =>
      import(/* webpackChunkName: "forms" */ '../views/pages/FormsIndex.vue'),
    children: [{
      meta: {
        title: 'Edit Delivery',
        requiresAuth: true
      },
      path: '/deliveries/edit/:id',
      name: 'deliveries.edit',
      component: () =>
        import(
        /* webpackChunkName: "client-form" */
          '@/components/forms/DeliveriesForm.vue'
        ),
      props: true
    },
    {
      path: '/deliveries/new',
      name: 'deliveries.new',
      component: () =>
        import(
        /* webpackChunkName: "client-form" */
          '@/components/forms/DeliveriesForm.vue'
        ),
      meta: {
        title: 'New Delivery'
      }
    },
    {
      path: '/order/edit/:id',
      name: 'order.edit',
      component: () =>
        import(
        /* webpackChunkName: "team-form" */
          '@/components/forms/OrdersForm.vue'
        ),
      meta: {
        title: 'Edit Order'
      },
      props: true
    },
    {
      meta: {
        title: 'New Order'
      },
      path: '/order/new',
      name: 'order.new',
      component: () =>
        import(
        /* webpackChunkName: "order-form" */
          '@/components/forms/OrdersForm.vue'
        )
    },
    {
      path: '/product/edit/:id',
      name: 'product.edit',
      component: () =>
        import(
        /* webpackChunkName: "team-form" */
          '@/components/forms/ProductsForm.vue'
        ),
      meta: {
        title: 'Edit Food Item'
      },
      props: true
    },
    {
      meta: {
        title: 'New Product'
      },
      path: '/product/new',
      name: 'product.new',
      component: () =>
        import(
        /* webpackChunkName: "product-form" */
          '@/components/forms/ProductsForm.vue'
        )
    }
    ]
  },
  {
    path: '/error',
    component: () =>
      import(/* webpackChunkName: "errors" */ '../views/errors/Index.vue'),
    children: [{
      path: 'forbidden',
      name: 'Forbidden',
      component: () =>
        import(
        /* webpackChunkName: "errors" */
          '../views/errors/Forbidden.vue'
        )
    },
    {
      path: 'unauthorized',
      name: 'Unauthorized',
      component: () =>
        import(
        /* webpackChunkName: "errors" */
          '../views/errors/Unauthorized.vue'
        )
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: () =>
        import(
        /* webpackChunkName: "errors" */
          '../views/errors/PageNotFound.vue'
        )
    },
    {
      path: 'internal-server-error',
      name: 'ServerError',
      component: () =>
        import(
        /* webpackChunkName: "errors" */
          '../views/errors/ServerError.vue'
        )
    }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('accessToken')
  const role = localStorage.getItem('role')
  // test for authentication
  if (to.meta.requiresAuth && isAuthenticated === '') {
    next({
      name: 'Unauthorized'
    })
  } else if (to.meta.role && to.meta.role.toString() !== role) {
    next({
      name: 'Forbidden'
    })
  }
  next()
})

export default router
