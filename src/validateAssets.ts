import Ajv, { type JSONSchemaType } from 'ajv'

const ajv = new Ajv()

export interface Asset {
  assetName: string
  quadKey: string
  assetOwner: string
}

const assetSchema: JSONSchemaType<Asset> = {
  type: 'object',
  properties: {
    assetName: { type: 'string' },
    quadKey: { type: 'string' },
    assetOwner: { type: 'string' }
  },
  required: ['assetName', 'quadKey', 'assetOwner']
}

const assetCollectionSchema: JSONSchemaType<Asset[]> = {
  type: 'array',
  items: assetSchema
}

const validate = ajv.compile(assetCollectionSchema)

export const validateAssets = (json: string): Asset[] => {
  try {
    const assets = JSON.parse(json)
    const isValid = validate(assets)

    if (isValid) {
      return assets
    } else {
      throw new Error(JSON.stringify(validate.errors))
    }
  } catch (err) {
    throw new Error(`Could not parse ${json}`)
  }
}
