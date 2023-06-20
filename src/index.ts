import { parseArgs } from 'node:util'
import fs from 'fs'
import { type Asset, validateAssets } from './validateAssets'
import { validateLightningStrike } from './validateLightningStrike'
import { getQuadKey } from './mapTools'

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

const json = fs.readFileSync(assetsFile)
const validAssets = validateAssets(json.toString())

const assets = validAssets.reduce((acc: Record<string, Asset>, asset) => {
  acc[asset.quadKey] = asset

  return acc
}, {})

process.stdin.on('data', data => {
  const strike = validateLightningStrike(data.toString())
  const strikeQuadKey = getQuadKey({ lat: strike.latitude, lng: strike.longitude }, 12)

  const asset = assets[strikeQuadKey]

  if (asset === undefined) {
    throw new Error(`Asset not found for quadkey: ${strikeQuadKey}`)
  } else {
    process.stdout.write(`lightning alert for ${asset.assetOwner}: ${asset.assetName}`)
  }
}).on('error', error => {
  console.log(error)
})
