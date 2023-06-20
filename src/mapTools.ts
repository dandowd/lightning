// @ts-expect-error library does not have any types
import { locationToQuadkey } from 'quadkeytools'

type LocationToQuadKey = (location: { lat: number, lng: number }, zoom: number) => number

export const getQuadKey: LocationToQuadKey = locationToQuadkey
