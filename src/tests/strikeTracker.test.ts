import { StrikeTracker } from '../strikeTracker'

describe('StrikeTracker', () => {
  it('should return assets for any unique strikes', () => {
    const strike = { flashType: 1, strikeTime: 1446760902996, latitude: 33.7412419, longitude: -96.6794229, peakAmps: 4403, reserved: '000', icHeight: 16024, receivedTime: 1446760915185, numberOfSensors: 11, multiplicity: 13 }

    const assets = {
      '023112310232': { assetName: 'Brady Loaf', quadKey: '023112310232', assetOwner: '06591' },
      '023112310233': { assetName: 'Fahey Brooks', quadKey: '023112310233', assetOwner: '86315' },
      '023112133010': { assetName: 'Christian Glens', quadKey: '023112133010', assetOwner: '9974' },
      '023112310322': { assetName: 'McClure Ford', quadKey: '023112310322', assetOwner: '035' }
    }

    const tracker = new StrikeTracker(assets)

    expect(tracker.getUniqueStruckAssets(strike)).toEqual(
      { assetName: 'McClure Ford', quadKey: '023112310322', assetOwner: '035' }
    )
  })

  it('should not return assets for heartbeats', () => {
    const strike = { flashType: 9, strikeTime: 1446760903087, latitude: 33.731673, longitude: -96.7631211, peakAmps: -52787, reserved: '000', icHeight: 0, receivedTime: 1446760915221, numberOfSensors: 19, multiplicity: 13 }

    const assets = {
      '023112310232': { assetName: 'Brady Loaf', quadKey: '023112310232', assetOwner: '06591' },
      '023112310233': { assetName: 'Fahey Brooks', quadKey: '023112310233', assetOwner: '86315' },
      '023112133010': { assetName: 'Christian Glens', quadKey: '023112133010', assetOwner: '9974' }
    }

    const tracker = new StrikeTracker(assets)

    expect(tracker.getUniqueStruckAssets(strike)).toBeUndefined()
  })
})
