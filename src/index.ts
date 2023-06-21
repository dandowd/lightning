import { parseArgs } from 'node:util'
import { getUniqueAssets } from './getUniqueAssets'
import { loadAssets } from './loadAssets'
import { validateLightningStrike } from './validateLightningStrike'
import fs from 'fs'
import { StreamDataManager } from './streamDataManager'

const dataManager = new StreamDataManager(process.stdin)

const { values: { assetsFile } } = parseArgs({
  args: process.argv,
  allowPositionals: true,
  options: {
    assetsFile: {
      type: 'string',
      short: 'a'
    }
  }
})

if (assetsFile === undefined) {
  process.stdout.write('Include asset file location with -a')
  process.exit()
}

const assets = loadAssets(assetsFile)

let logDump: any[] = []

const processData = (): void => {
  const dataFrame = dataManager.flushDataFrame()

  while (dataFrame.length > 0) {
    const row = dataFrame.pop()

    try {
      if (row === undefined) {
        continue
      }

      const strike = validateLightningStrike(row)

      const struckAsset = getUniqueAssets(strike, assets)

      if (struckAsset !== undefined) {
        console.log(`\nlightning alert for ${struckAsset.assetOwner}:${struckAsset.assetName}`)
      }
    } catch (err) {
      // log error
      if (err instanceof Error) {
        logDump.push({ row, err: err.message })
      } else {
        logDump.push({ row, err: 'unknown error' })
      }
    }
  }
}

const dumpLogs = (): void => {
  const dump = logDump
  logDump = []

  fs.appendFile('./log-dump', JSON.stringify(dump, null, 2), err => {
    if (err !== null) {
      console.error('error while dumping logs')
      console.error(err)
    }
  })
}

setInterval(dumpLogs, 10000)

setInterval(processData, 4000)
