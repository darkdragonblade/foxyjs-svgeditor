import { createRouter, createWebHashHistory } from 'vue-router'
const LAYOUT = () => import('@/layout/index.vue')

const staticRouters = [
  {
    path: '/guide',
    name: 'guide',
    redirect: '/guide/install',
    meta: {
      title: 'message.guide',
    },
    children: [
      {
        path: '/guide/install',
        name: 'install',
        component: () => import('@/views/guide/install.vue'),
        meta: {
          title: 'message.install',
        },
      },
      {
        path: '/guide/theme',
        name: 'theme',
        component: () => import('@/views/guide/theme.vue'),
        meta: {
          title: 'message.theme',
        },
      },
      // {
      //   path: '/guide/stage',
      //   name: 'stage',
      //   component: () => import('@/views/guide/stage.vue'),
      // },
    ],
  },
  {
    path: '/stage',
    name: 'stage',
    meta: {
      title: 'message.stage',
    },
    redirect: '/stage/transform',
    children: [
      {
        path: '/shapes/star',
        name: 'stage',
        component: () => import('@/views/shapes/star.vue'),
        meta: {
          title: 'message.stageToggleTool',
        },
      },
    ],
  },
  {
    path: '/shapes',
    name: 'shapes',
    meta: {
      title: 'message.shapes',
    },
    redirect: '/shapes/star',
    children: [
      {
        path: '/shapes/star',
        name: 'star',
        component: () => import('@/views/shapes/star.vue'),
        meta: {
          title: 'message.star',
        },
      },
    ],
  },
  {
    path: '/tools',
    name: 'tools',
    redirect: '/transform-tool',
    meta: {
      title: 'message.tools',
    },
    children: [
      {
        path: '/transformTool',
        name: 'transformTool',
        meta: {
          title: 'message.transformTool',
        },
      },
      {
        path: '/panTool',
        name: 'panTool',
        meta: {
          title: 'message.panTool',
        },
      },
      {
        path: '/rectTool',
        name: 'rectTool',
        meta: {
          title: 'message.rectTool',
        },
      },
      {
        path: '/ellipseTool',
        name: 'ellipseTool',
        meta: {
          title: 'message.ellipseTool',
        },
      },
      {
        path: '/triangleTool',
        name: 'triangleTool',
        meta: {
          title: 'message.triangleTool',
        },
      },
      {
        path: '/pathTool',
        name: 'pathTool',
        meta: {
          title: 'message.pathTool',
        },
      },
      {
        path: '/freehandTool',
        name: 'freehandTool',
        meta: {
          title: 'message.freehandTool',
        },
      },
      {
        path: '/textTool',
        name: 'textTool',
        meta: {
          title: 'message.textTool',
        },
      },
      {
        path: '/nGonTool',
        name: 'nGonTool',
        meta: {
          title: 'message.nGonTool',
        },
      },
      {
        path: '/starTool',
        name: 'starTool',
        meta: {
          title: 'message.starTool',
        },
      },
      {
        path: '/crossTool',
        name: 'crossTool',
        meta: {
          title: 'message.crossTool',
        },
      },
      {
        path: '/frameTool',
        name: 'frameTool',
        meta: {
          title: 'message.frameTool',
        },
      },
      {
        path: '/ringTool',
        name: 'ringTool',
        meta: {
          title: 'message.ringTool',
        },
      },
      {
        path: '/pieTool',
        name: 'pieTool',
        meta: {
          title: 'message.pieTool',
        },
      },
      {
        path: '/crescentTool',
        name: 'crescentTool',
        meta: {
          title: 'message.crescentTool',
        },
      },
      {
        path: '/cogTool',
        name: 'cogTool',
        meta: {
          title: 'message.cogTool',
        },
      },
      {
        path: '/spiralTool',
        name: 'spiralTool',
        meta: {
          title: 'message.spiralTool',
        },
      },
      {
        path: '/arrowTool',
        name: 'arrowTool',
        meta: {
          title: 'message.arrowTool',
        },
      },
      {
        path: '/frenhandTool',
        name: 'frenhandTool',
        meta: {
          title: 'message.frenhandTool',
        },
      },
      {
        path: '/penTool',
        name: 'penTool',
        meta: {
          title: 'message.penTool',
        },
      },
      {
        path: '/vektorTool',
        name: 'vektorTool',
        meta: {
          title: 'message.vektorTool',
        },
      },
    ],
  },
  {
    path: '/methods',
    name: 'methods',
    redirect: '/history',
    meta: {
      title: 'message.methods',
      children: [
        {
          path: '/history',
          name: 'history',
          meta: {
            title: 'message.history',
          },
        },
        {
          path: '/clipboard',
          name: 'clipboard',
          meta: {
            title: 'message.clipboard',
          },
        },
        {
          path: '/alignment',
          name: 'alignment',
          meta: {
            title: 'message.alignment',
          },
        },
        {
          path: '/transform',
          name: 'transform',
          meta: {
            title: 'message.transform',
          },
        },
        {
          path: '/order',
          name: 'order',
          meta: {
            title: 'message.order',
          },
        },
        {
          path: '/group',
          name: 'group',
          meta: {
            title: 'message.group',
          },
        },
        {
          path: '/geometry',
          name: 'geometry',
          meta: {
            title: 'message.geometry',
          },
        },
        {
          path: '/text',
          name: 'text',
          meta: {
            title: 'message.text',
          },
        },
        {
          path: '/shape',
          name: 'shape',
          meta: {
            title: 'message.shape',
          },
        },
        {
          path: '/style',
          name: 'style',
          meta: {
            title: 'message.style',
          },
        },
      ]
    },
  },
]

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: () => import('../views/index.vue'),
  },
  {
    path: '/root',
    name: 'root',
    component: LAYOUT,
    children: staticRouters,
    meta: {
      title: 'system',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
