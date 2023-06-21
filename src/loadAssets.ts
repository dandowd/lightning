import fs from 'fs'
import { type Asset, validateAssets } from './validateAssets'

export const loadAssets = (fileLoc: string): Record<string, Asset> => {
  const json = fs.readFileSync(fileLoc)
  const validAssets = validateAssets(json.toString())

  const assets = validAssets.reduce((acc: Record<string, Asset>, asset) => {
    acc[asset.quadKey] = asset

    return acc
  }, {})

  return assets
}
