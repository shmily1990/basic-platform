export const loginInfo = function() {
  const data = [
    {
      path: '/devOps',
      name: 'devOps',
      component: 'devOps',
      meta: {
        authName: '运维',
        showName: '运维',
        authCode: '',
        needAuth: true
      },
      redirect: { name: 'devOpsAnalysis' },
      children: [
        {
          path: 'devOpsAnalysis',
          name: 'devOpsAnalysis',
          component: 'devOps/devOpsAnalysis',
          meta: {
            authName: '运维分析1',
            showName: '运维分析1',
            authCode: '',
            needAuth: true,
            icon: 'user'
          }
        },
        {
          path: 'devOpsAnalysis2',
          name: 'devOpsAnalysis2',
          component: 'devOps/devOpsAnalysis2',
          meta: {
            authName: '运维分析2',
            showName: '运维分析2',
            authCode: '',
            needAuth: true,
            icon: 'user'
          }
        },
        {
          path: 'devOpsAnalysis3',
          name: 'devOpsAnalysis3',
          component: 'devOps/devOpsAnalysis3',
          meta: {
            authName: '运维分析3',
            showName: '运维分析3',
            authCode: '',
            needAuth: true,
            icon: 'user',
            subMenu: true
          },
          redirect: { name: 'devOpsAnalysis3-01' },
          children: [
            {
              path: 'devOpsAnalysis3-01',
              name: 'devOpsAnalysis3-01',
              component: 'devOps/devOpsAnalysis3/devOpsAnalysis301',
              meta: {
                authName: '运维分析3-01',
                showName: '运维分析3-01',
                authCode: '',
                needAuth: true
              }
            },
            {
              path: 'devOpsAnalysis3-02',
              name: 'devOpsAnalysis3-02',
              component: 'devOps/devOpsAnalysis3/devOpsAnalysis302',
              meta: {
                authName: '运维分析3-02',
                showName: '运维分析3-02',
                authCode: '',
                needAuth: true
              }
            }
          ]
        },
        {
          path: 'devOpsAnalysis4',
          name: 'devOpsAnalysis4',
          component: 'devOps/devOpsAnalysis4',
          meta: {
            authName: '运维分析4',
            showName: '运维分析4',
            authCode: '',
            needAuth: true,
            icon: 'user'
          }
        },
        {
          path: 'devOpsAnalysis5',
          name: 'devOpsAnalysis5',
          component: 'devOps/devOpsAnalysis5',
          meta: {
            authName: '运维分析5',
            showName: '运维分析5',
            authCode: '',
            needAuth: true,
            icon: 'user',
            subMenu: true
          },
          redirect: { name: 'devOpsAnalysis5-01' },
          children: [
            {
              path: 'devOpsAnalysis5-01',
              name: 'devOpsAnalysis5-01',
              component: 'devOps/devOpsAnalysis5/devOpsAnalysis501',
              meta: {
                authName: '运维分析5-01',
                showName: '运维分析5-01',
                authCode: '',
                needAuth: true
              }
            },
            {
              path: 'devOpsAnalysis5-02',
              name: 'devOpsAnalysis5-02',
              component: 'devOps/devOpsAnalysis5/devOpsAnalysis502',
              meta: {
                authName: '运维分析5-02',
                showName: '运维分析5-02',
                authCode: '',
                needAuth: true
              }
            }
          ]
        }
      ]
    },
    {
      path: '/quality',
      name: 'quality',
      meta: {
        authName: '质控',
        showName: '质控',
        authCode: '',
        needAuth: true
      },
      component: 'quality',
      redirect: { name: 'dataCenter' },
      children: [
        {
          path: 'dataCenter',
          name: 'dataCenter',
          meta: {
            authName: '数据中心',
            showName: '数据中心',
            authCode: '',
            needAuth: true,
            icon: 'user',
            subMenu: true
          },
          component: 'quality/dataCenter',
          redirect: { name: 'dataSearch' },
          children: [
            {
              path: 'dataSearch',
              name: 'dataSearch',
              component: 'quality/dataCenter/dataSearch',
              meta: {
                authName: '数据查询',
                showName: '数据查询',
                authCode: '',
                needAuth: true
              }
            },
            {
              path: 'freliminary-review',
              name: 'freliminary-review',
              component: 'quality/dataCenter/freliminaryReview',
              meta: {
                authName: '数据初审',
                showName: '数据初审',
                authCode: '',
                needAuth: true
              }
            }
          ]
        }
      ]
    }
  ]
  return data
}

export const branchInfo = function() {
  const data = [
    {
      path: '/tools',
      name: 'tools',
      component: 'tools',
      meta: {
        authName: '工具箱',
        showName: '工具箱',
        authCode: '',
        needAuth: true
      },
      redirect: { name: 'toolsAnalysis' },
      children: [
        {
          path: 'toolsAnalysis',
          name: 'toolsAnalysis',
          component: 'tools/toolsAnalysis',
          meta: {
            authName: '工具箱分析1',
            showName: '工具箱分析1',
            authCode: '',
            needAuth: true,
            icon: 'user'
          }
        },
        {
          path: 'toolsAnalysis2',
          name: 'toolsAnalysis2',
          component: 'tools/toolsAnalysis2',
          meta: {
            authName: '工具箱分析2',
            showName: '工具箱分析2',
            authCode: '',
            needAuth: true,
            icon: 'user',
            subMenu: true
          },
          redirect: { name: 'toolsAnalysis2-01' },
          children: [
            {
              path: 'toolsAnalysis2-01',
              name: 'toolsAnalysis2-01',
              component: 'tools/toolsAnalysis2/toolsAnalysis201',
              meta: {
                authName: '工具箱分析2-01',
                showName: '工具箱分析2-01',
                authCode: '',
                needAuth: true
              }
            },
            {
              path: 'toolsAnalysis2-02',
              name: 'toolsAnalysis2-02',
              component: 'tools/toolsAnalysis2/toolsAnalysis202',
              meta: {
                authName: '工具箱分析2-02',
                showName: '工具箱分析2-02',
                authCode: '',
                needAuth: true
              }
            }
          ]
        }
      ]
    }
  ]
  return data
}
