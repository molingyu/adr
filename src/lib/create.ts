let fs = require('fs')
let path = require('path')
let mkdirp = require('mkdirp')
let gitConfig = require('git-config')

import Config from './Config'
import Utils from './utils'
import { generate } from './generate'

function createDecisions (name: string, savePath: string | any | void) {
  let language = Config.getLanguage()
  let raw = fs.readFileSync(__dirname + path.normalize('/templates/' + language + '.md'), 'utf8')
  let newDate = Utils.createDateString()
  let fileName = Utils.generateFileName(name)
  let config = gitConfig.sync()
  let userName = ''
  let email = ''
  if (config === void 0 && config.user === void 0) {
    console.log('git info get error')
  } else {
    userName = config.user.name
    email = config.user.email
  }
  let newIndex = Utils.getNewIndexString()
  let fileData = raw.replace(/{NUMBER}/g, Utils.getLatestIndex() + 1)
    .replace(/{TITLE}/g, name)
    .replace(/{DATE}/g, newDate)
    .replace(/{AUTHOR}/g, userName)
    .replace(/{EMAIL}/g, email)
  let filePath = savePath + newIndex + '-' + fileName + '.md'
  fs.writeFileSync(filePath, fileData)
}

export function create (name: string) {
  let savePath = Config.getSavePath()
  let i18n = Utils.getI18n()
  console.log(i18n.logSavePath + savePath)
  mkdirp.sync(savePath)

  createDecisions(name, savePath)
  let toc = generate('toc', {output: false})
  fs.writeFileSync(savePath + 'README.md', toc)
}
