import { type Asset } from './validateAssets'
import { type Strike } from './validateLightningStrike'
import { getQuadKey } from './mapTools'

export const getUniqueAssets = (strikes: Strike[], assets: Record<string, Asset>): Asset[] => {
  const warned = new Set()

  return strikes.reduce((acc: Asset[], strike: Strike) => {
    if (strike.flashType === 9) {
      return acc
    }

    const quadkey = getQuadKey({ lat: strike.latitude, lng: strike.longitude }, 12)
    const hitAsset = assets[quadkey]

    if (!warned.has(quadkey) && hitAsset !== undefined) {
      warned.add(quadkey)
      acc.push(hitAsset)
    }

    return acc
  }, [])
}
