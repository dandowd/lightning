import { validateAssets } from '../validateAssets'

describe('validateAssets', () => {
  it('should return parsed input if valid', () => {
    const assets = '[{"assetName":"Mayer Park","quadKey":"023112133002","assetOwner":"02115"},{"assetName":"Sunshine Wall","quadKey":"023112133003","assetOwner":"325"}]'

    expect(validateAssets(assets)).toStrictEqual([
      {
        assetName: 'Mayer Park',
        quadKey: '023112133002',
        assetOwner: '02115'
      },
      {
        assetName: 'Sunshine Wall',
        quadKey: '023112133003',
        assetOwner: '325'
      }
    ])
  })

  it('should throw invalid input', () => {
    const assets = '[{"quadKey":"023112133002","assetOwner":"02115"},{"assetName":"Sunshine Wall","quadKey":"023112133003","assetOwner":"325"},{"assetName":"Cruickshank Forge","quadKey":"023112133000","assetOwner":"313"},{"assetName":"Syed Pines","quadKey":"023112133001","assetOwner":"259"},{"assetName":"Dare Isle","quadKey":"023112310111","assetOwner":"363"}]'

    expect(() => validateAssets(assets)).toThrowError()
  })
})
