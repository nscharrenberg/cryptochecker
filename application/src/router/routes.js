
export default [
  {
    path: '/',
    component: () => import('layouts/CryptoChecker'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: '/crypto/:id', component: () => import('pages/crypto') }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
