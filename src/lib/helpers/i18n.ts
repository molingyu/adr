import Config from '../Config'

export function getI18n () {
  let language = Config.getLanguage()
  let I18N = {
    en: {
      decision: 'Decision',
      Status: 'Status',
      statusStr: 'proposed/accepted/done/deprecated/superseded',
      modifiedDate: 'Last Modified Date',
      lastStatus: 'Last Status',
      logSavePath: 'Save Path:',
      tocHeader: 'Architecture Decision Records',
      status: {
        proposed: 'Proposed',
        accepted: 'Accepted',
        done: 'Done',
        deprecated: 'Deprecated',
        superseded: 'Superseded'
      }
    },
    'zh-cn': {
      decision: '决策',
      Status: '状态',
      statusStr: '提议/通过/完成/已弃用/已取代',
      modifiedDate: '上次修改时间',
      lastStatus: '最后状态',
      logSavePath: '保存路径：',
      tocHeader: '决策记录',
      status: {
        proposed: '提议',
        accepted: '通过',
        done: '完成',
        deprecated: '已弃用',
        superseded: '已取代'
      }
    }
  }

  return I18N[language]
}
