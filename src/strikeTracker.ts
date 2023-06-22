import { type Asset } from './validateAssets'
import { type Strike } from './validateLightningStrike'
import { getQuadKey } from './mapTools'

export class StrikeTracker {
  private readonly warned = new Set()

  constructor (private readonly assets: Record<string, Asset>) {}

  public getUniqueStruckAssets (strike: Strike): Asset | undefined {
    if (strike.flashType === 9) {
      return
    }

    const quadkey = getQuadKey({ lat: strike.latitude, lng: strike.longitude }, 12)
    const hitAsset = this.assets[quadkey]

    if (!this.warned.has(quadkey) && hitAsset !== undefined) {
      this.warned.add(quadkey)

      return hitAsset
    }
  }
}
