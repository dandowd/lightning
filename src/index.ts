import { parseArgs } from 'node:util'
import { loadAssets } from './loadAssets'
import { validateLightningStrike } from './validateLightningStrike'
import fs from 'fs'
import { StreamDataManager } from './streamDataManager'
import { StrikeTracker } from './strikeTracker'

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
const strikeTracker = new StrikeTracker(assets)
let logs: any[] = []
const dataManager = new StreamDataManager()

process.stdin.on('data', data => {
  try {
    dataManager.ingest(data)
    const frame = dataManager.flushFrame()

    processData(frame)
  } catch (err) {
    if (err instanceof Error) {
      logs.push({ err: err.message })
    } else {
      logs.push(err)
    }
  }
})

const processData = (frame: string[]): void => {
  while (frame.length > 0) {
    const row = frame.pop() as string

    try {
      const strike = validateLightningStrike(row)

      const struckAsset = strikeTracker.getUniqueStruckAssets(strike)

      if (struckAsset !== undefined) {
        console.log(`\nlightning alert for ${struckAsset.assetOwner}:${struckAsset.assetName}`)
      }
    } catch (err) {
      if (err instanceof Error) {
        logs.push({ row, err: err.message })
      } else {
        logs.push({ row, err })
      }
    }
  }
}

const dumpLogs = (): void => {
  const dump = logs
  logs = []

  fs.appendFile('./log-dump', JSON.stringify(dump, null, 2), err => {
    if (err !== null) {
      console.error('error while dumping logs')
      console.error(err)
    }
  })
}

setInterval(dumpLogs, 10000)
