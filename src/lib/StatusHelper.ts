let fs = require('fs')
let md = require('markdown').markdown

import Utils from './utils'

let i18n = Utils.getI18n()

function getStatusSection (tree: any) {
  let statusFlag = false
  let statusSection: string[] = []
  for (let i = 0; i < tree.length; i++) {
    let node = tree[i]
    if (statusFlag && node[0] === 'header') return statusSection
    if (statusFlag) statusSection.push(node)
    if (node[0] === 'header' && node[2] === i18n.Status) statusFlag = true
  }
  return statusSection
}

function getStatusWithDate (statusSections: string[]) {
  let status: string[] = []
  for (let i = 0; i < statusSections.length; i++) {
    let currentStatusSection = statusSections[i]
    if (currentStatusSection[0] === 'para') {
      if (/\d{1,4}-\d{1,2}-\d{1,2}/.test(currentStatusSection[1])) {
        status.push(currentStatusSection[1])
      }
    }
  }
  return status
}

function getFileData (filePath): string {
  let fileData
  try {
    return fileData = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.log(error)
    return ''
  }
}

function setStatus (filePath: string, status: string) {
  let statusFlag = false
  let regExp = `## ${i18n.Status}`
  let data: string[] = getFileData(filePath).split('\n')
  for (let i = 0; i < data.length; i++) {
    let line: string = data[i]
    if (statusFlag && line[0] === '#') {
      data.splice(i, 0, `${Utils.createDateString()} ${status}`)
      data.splice(i + 1, 0, '')
      return fs.writeFileSync(filePath, data.join('\n'))
    }
    if (line.match(regExp)) statusFlag = true
  }
}

function getAllStatus (filePath: string): string[] {
  let tree = md.parse(getFileData(filePath))
  let statusSections = getStatusSection(tree)
  let status = getStatusWithDate(statusSections)

  if (status.length === 0) {
    let lastStatusSection = statusSections[statusSections.length - 1]
    if (!(lastStatusSection && lastStatusSection[1])) {
      return []
    }
    status = [lastStatusSection[1]]
  }

  return status
}

function getLatestStatus (filePath) {
  let allStatus = getAllStatus(filePath)
  return allStatus[allStatus.length - 1]
}

let StatusHelper = {
  setStatus: setStatus,
  getLatestStatus: getLatestStatus,
  getAllStatus: getAllStatus
}

export default StatusHelper
