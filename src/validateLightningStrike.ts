import Ajv, { type JSONSchemaType } from 'ajv'
const ajv = new Ajv()

export interface Strike {
  flashType: number
  strikeTime: EpochTimeStamp
  latitude: number
  longitude: number
  peakAmps: number
  reserved: string
  icHeight: number
  receivedTime: EpochTimeStamp
  numberOfSensors: number
  multiplicity: number
}

const strikeSchema: JSONSchemaType<Strike> = {
  type: 'object',
  properties: {
    flashType: { type: 'number' },
    strikeTime: { type: 'number' },
    latitude: { type: 'number' },
    longitude: { type: 'number' },
    peakAmps: { type: 'number' },
    reserved: { type: 'string' },
    icHeight: { type: 'number' },
    receivedTime: { type: 'number' },
    numberOfSensors: { type: 'number' },
    multiplicity: { type: 'number' }
  },
  required: ['flashType', 'latitude', 'longitude']
}

const validate = ajv.compile(strikeSchema)

export const validateLightningStrike = (json: string): Strike => {
  try {
    const strike = JSON.parse(json)
    const isValid = validate(strike)

    if (isValid) {
      return strike
    } else {
      throw new Error(validate.errors?.toString())
    }
  } catch (err) {
    throw new Error(`Could not parse ${json}`)
  }
}

export const validateLightningStrikes = (json: string[]): Strike[] => {
  return json.reduce((acc: Strike[], row) => {
    try {
      const strike = validateLightningStrike(row)
      acc.push(strike)

      return acc
    } catch (err) {
      // log error for this row
      return acc
    }
  }, [])
}
