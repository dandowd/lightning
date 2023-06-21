import { StreamStitch } from '../stich'

describe('StreamStitch', () => {
  it('should combine one call with the next', () => {
    const stitch = new StreamStitch()
    const firstRow = ['{"flashType":1,"strikeTime":1446761130585,"latitude":31.3481596,"l']
    const secondRow = ['ongitude":-95.9088407,"peakAmps":-12126,"reserved":"000","icHeight":18826,"receivedTime":1446761142718,"numberOfSensors":18,"multiplicity":20}']

    stitch.connect(firstRow)
    stitch.connect(secondRow)

    expect(secondRow).toEqual(['{"flashType":1,"strikeTime":1446761130585,"latitude":31.3481596,"longitude":-95.9088407,"peakAmps":-12126,"reserved":"000","icHeight":18826,"receivedTime":1446761142718,"numberOfSensors":18,"multiplicity":20}'])
  })
})
