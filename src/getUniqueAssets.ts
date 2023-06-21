import { type Asset } from './validateAssets'
import { type Strike } from './validateLightningStrike'
import { getQuadKey } from './mapTools'

const warned = new Set()

export const getUniqueAssets = (strike: Strike, assets: Record<string, Asset>): Asset | undefined => {
  if (strike.flashType === 9) {
    return
  }

  const quadkey = getQuadKey({ lat: strike.latitude, lng: strike.longitude }, 12)
  const hitAsset = assets[quadkey]

  if (!warned.has(quadkey) && hitAsset !== undefined) {
    warned.add(quadkey)

    return hitAsset
  }
}
