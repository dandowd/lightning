import { getUniqueAssets } from '../getUniqueAssets'

describe('getUniqueStrikes', () => {
  it('should return assets for any unique strikes', () => {
    const strikes = [
      { flashType: 1, strikeTime: 1446760902996, latitude: 33.7412419, longitude: -96.6794229, peakAmps: 4403, reserved: '000', icHeight: 16024, receivedTime: 1446760915185, numberOfSensors: 11, multiplicity: 13 },
      { flashType: 0, strikeTime: 1446760903087, latitude: 33.731673, longitude: -96.7631211, peakAmps: -52787, reserved: '000', icHeight: 0, receivedTime: 1446760915221, numberOfSensors: 19, multiplicity: 13 },
      { flashType: 1, strikeTime: 1446760903089, latitude: 33.7320437, longitude: -96.7257525, peakAmps: 2613, reserved: '000', icHeight: 12287, receivedTime: 1446760915221, numberOfSensors: 7, multiplicity: 13 },
      { flashType: 1, strikeTime: 1446760903116, latitude: 33.7629128, longitude: -96.6864843, peakAmps: -2011, reserved: '000', icHeight: 13258, receivedTime: 1446760915221, numberOfSensors: 13, multiplicity: 13 },
      { flashType: 1, strikeTime: 1446760903180, latitude: 33.7373298, longitude: -96.7196966, peakAmps: 17386, reserved: '000', icHeight: 19128, receivedTime: 1446760915221, numberOfSensors: 17, multiplicity: 13 }]

    const assets = {
      '023112310232': { assetName: 'Brady Loaf', quadKey: '023112310232', assetOwner: '06591' },
      '023112310233': { assetName: 'Fahey Brooks', quadKey: '023112310233', assetOwner: '86315' },
      '023112133010': { assetName: 'Christian Glens', quadKey: '023112133010', assetOwner: '9974' }
    }

    expect(getUniqueAssets(strikes, assets)).toEqual([
      { assetName: 'Fahey Brooks', quadKey: '023112310233', assetOwner: '86315' }
    ])
  })

  it('should not return assets for heartbeats', () => {
    const strikes = [{ flashType: 9, strikeTime: 1446760903087, latitude: 33.731673, longitude: -96.7631211, peakAmps: -52787, reserved: '000', icHeight: 0, receivedTime: 1446760915221, numberOfSensors: 19, multiplicity: 13 }]

    const assets = {
      '023112310232': { assetName: 'Brady Loaf', quadKey: '023112310232', assetOwner: '06591' },
      '023112310233': { assetName: 'Fahey Brooks', quadKey: '023112310233', assetOwner: '86315' },
      '023112133010': { assetName: 'Christian Glens', quadKey: '023112133010', assetOwner: '9974' }
    }

    expect(getUniqueAssets(strikes, assets)).toEqual([])
  })
})
