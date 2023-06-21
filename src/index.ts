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

let dataFrame: string[] = []

process.stdin.on('data', data => {
  dataFrame.push(data.toString())
}).on('error', error => {
  console.log(error)
})

const processData = (): void => {
  const dataToBeProcessed = dataFrame
  dataFrame = []

  while (dataToBeProcessed.length > 0) {
    try {
      const row = dataToBeProcessed.pop()

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
    }
  }
}

setInterval(processData, 4000)
