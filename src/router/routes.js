
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',                    component: () => import('pages/Index.vue'), name: 'home' },
      { path: 'PatientRegistration', component: () => import('pages/patient-page.vue'), name: 'patient-page'},
      { path: 'DonorRegistration',   component: () => import('pages/donor-page.vue'), name: 'donor-page' },
      { path: 'test',                component: () => import('pages/test.vue'), name: 'test' }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
