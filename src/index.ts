import { parseArgs } from 'node:util'
import { getUniqueAssets } from './getUniqueAssets'
import { loadAssets } from './loadAssets'
import { validateLightningStrike } from './validateLightningStrike'

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

const dataToBeProcessed: string[] = []

process.stdin.on('data', data => {
  dataToBeProcessed.push(data.toString())
}).on('error', error => {
  console.log(error)
})

const processData = (): void => {
  while (dataToBeProcessed.length > 0) {
    const row = dataToBeProcessed.pop()

    if (row === undefined) {
      continue
    }

    const strike = validateLightningStrike(row)

    const struckAsset = getUniqueAssets(strike, assets)

    if (struckAsset !== undefined) {
      console.log(`\nlightning alert for ${struckAsset.assetOwner}:${struckAsset.assetName}\n`)
    }
  }
}

setInterval(processData, 4000)
