import { validateLightningStrike } from '../validateLightningStrike'

describe('validateLightningStrike', () => {
  it('should validate single item', () => {
    const strike = '{"flashType":1,"strikeTime":1446760902510,"latitude":8.7020156,"longitude":-12.2736188,"peakAmps":3034,"reserved":"000","icHeight":11829,"receivedTime":1446760915181,"numberOfSensors":6,"multiplicity":1}'

    expect(validateLightningStrike(strike)).toEqual({
      flashType: 1,
      strikeTime: 1446760902510,
      latitude: 8.7020156,
      longitude: -12.2736188,
      peakAmps: 3034,
      reserved: '000',
      icHeight: 11829,
      receivedTime: 1446760915181,
      numberOfSensors: 6,
      multiplicity: 1
    })
  })

  it('should throw if invalid', () => {
    const strike = '{"strikeTime":1446760902510,"latitude":8.7020156,"longitude":-12.2736188,"peakAmps":3034,"reserved":"000","icHeight":11829,"receivedTime":1446760915181,"numberOfSensors":6,"multiplicity":1}'

    expect(() => validateLightningStrike(strike)).toThrowError()
  })

  it('should throw on invalid json', () => {
    const strike = 'ikeTime":1446760902510,"latitude":8.7020156,"longitude":-12.2736188,"peakAmps":3034,"reserved":"000","icHeight":11829,"receivedTime":1446760915181,"numberOfSensors":6,"multiplicity":1}'

    expect(() => validateLightningStrike(strike)).toThrowError()
  })
})
