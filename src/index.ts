import { parseArgs } from 'node:util'
import { getUniqueAssets } from './getUniqueAssets'
import { loadAssets } from './loadAssets'
import { validateLightningStrikes } from './validateLightningStrike'

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

process.stdin.on('data', data => {
  const rows = data.toString().split('\n')
  const strikes = validateLightningStrikes(rows)

  const struckAssets = getUniqueAssets(strikes, assets)

  struckAssets.forEach((asset) => {
    process.stdout.write(`lightning alert for ${asset.assetOwner}:${asset.assetName}\n`)
  })
}).on('error', error => {
  console.log(error)
})
