import Layout from '@/layout/index.vue'
import i18n from '@/locales/i18n'
import Home from '@/views/Home/index.vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

export const configRoutes = {
  path: '/lucky-fn/config',
  name: 'Config',
  component: () => import('@/views/Config/index.vue'),
  children: [
    {
      path: '',
      redirect: '/lucky-fn/config/person',
    },
    {
      path: '/lucky-fn/config/person',
      name: 'PersonConfig',
      component: () => import('@/views/Config/Person/PersonConfig.vue'),
      meta: {
        title: i18n.global.t('sidebar.personConfiguration'),
        icon: 'person',
      },
      children: [
        {
          path: '',
          redirect: '/lucky-fn/config/person/all',
        },
        {
          path: '/lucky-fn/config/person/all',
          name: 'AllPersonConfig',
          component: () => import('@/views/Config/Person/PersonAll.vue'),
          meta: {
            title: i18n.global.t('sidebar.personList'),
            icon: 'all',
          },
        },
        {
          path: '/lucky-fn/config/person/already',
          name: 'AlreadyPerson',
          component: () => import('@/views/Config/Person/PersonAlready.vue'),
          meta: {
            title: i18n.global.t('sidebar.winnerList'),
            icon: 'already',
          },
        },
      ],
    },
    {
      path: '/lucky-fn/config/prize',
      name: 'PrizeConfig',
      component: () => import('@/views/Config/Prize/PrizeConfig.vue'),
      meta: {
        title: i18n.global.t('sidebar.prizeConfiguration'),
        icon: 'prize',
      },
    },
    {
      path: '/lucky-fn/config/global',
      name: 'GlobalConfig',
      redirect: '/lucky-fn/config/global/all',
      meta: {
        title: i18n.global.t('sidebar.globalSetting'),
        icon: 'global',
      },
      children: [
        {
          path: '/lucky-fn/config/global/face',
          name: 'FaceConfig',
          component: () => import('@/views/Config/Global/FaceConfig.vue'),
          meta: {
            title: i18n.global.t('sidebar.viewSetting'),
            icon: 'face',
          },
        },
        {
          path: '/lucky-fn/config/global/image',
          name: 'ImageConfig',
          component: () => import('@/views/Config/Global/ImageConfig.vue'),
          meta: {
            title: i18n.global.t('sidebar.imagesManagement'),
            icon: 'image',
          },
        },
        {
          path: '/lucky-fn/config/global/music',
          name: 'MusicConfig',
          component: () => import('@/views/Config/Global/MusicConfig.vue'),
          meta: {
            title: i18n.global.t('sidebar.musicManagement'),
            icon: 'music',
          },
        },
      ],
    },
    {
      path: '/lucky-fn/config/readme',
      name: 'Readme',
      component: () => import('@/views/Config/Readme/index.vue'),
      meta: {
        title: i18n.global.t('sidebar.operatingInstructions'),
        icon: 'readme',
      },
    },
  ],
}
const routes = [
  {
    path: '/lucky-fn',
    component: Layout,
    redirect: '/lucky-fn/home',
    children: [
      {
        path: '/lucky-fn/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/lucky-fn/demo',
        name: 'Demo',
        component: () => import('@/views/Demo/index.vue'),
      },
      configRoutes,
    ],
  },
]
const envMode = import.meta.env.MODE
const router = createRouter({
  history: envMode === 'file' ? createWebHashHistory() : createWebHistory(),
  routes,
})

export default router
