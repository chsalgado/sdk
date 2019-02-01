// @flow
import { journeyPlannerQuery } from '../api'
import {
    FOOT, BUS, TRAM, RAIL, METRO, WATER, AIR,
} from '../constants/travelModes'

import {
    getTripPatternQuery,
} from './query'

import { legMapper } from './mapper'

import type {
    TripPattern,
    Location,
    LegMode,
    TransportMode,
    TransportSubmode,
} from '../../flow-types'
import { convertFeatureToLocation, isValidDate } from '../utils'


type TransportSubmodeParam = {
    transportMode: TransportMode,
    transportSubmodes: Array<TransportSubmode>,
}

export type GetTripPatternsParams = {
    searchDate?: Date,
    arriveBy?: boolean,
    modes?: Array<LegMode>,
    transportSubmodes?: Array<TransportSubmodeParam>,
    limit?: number,
    wheelchairAccessible?: boolean,
    walkSpeed?: number,
}

const DEFAULT_GET_TRIP_PATTERN_IGNORE_FIELDS = [
    'notices',
    'situations',
    'journeyPattern',
    'fromEstimatedCall',
    'toEstimatedCall',
    'intermediateEstimatedCalls',
    'pointsOnLink',
    'authority',
    'operator',
    'quay',
]

export function getTripPatterns(
    from: Location,
    to: Location,
    params?: GetTripPatternsParams = {},
    ignoreFields?: Array<string> = DEFAULT_GET_TRIP_PATTERN_IGNORE_FIELDS,
): Promise<Array<TripPattern>> {
    const {
        searchDate = new Date(),
        arriveBy = false,
        modes = [FOOT, BUS, TRAM, RAIL, METRO, WATER, AIR],
        transportSubmodes = [],
        wheelchairAccessible = false,
        limit = 5,
        ...rest
    } = params

    const variables = {
        from,
        to,
        dateTime: searchDate.toISOString(),
        arriveBy,
        modes,
        transportSubmodes,
        wheelchair: wheelchairAccessible,
        numTripPatterns: limit,
        ...rest,
    }

    return journeyPlannerQuery(getTripPatternQuery, variables, ignoreFields, this.config)
        .then((data: Object = {}) => {
            if (!data?.trip?.tripPatterns) {
                return []
            }

            return data.trip.tripPatterns.map(trip => ({
                ...trip,
                legs: trip.legs.map(legMapper),
            }))
        })
}

export async function findTrips(
    from: string,
    to: string,
    date?: Date | string | number,
): Promise<Array<TripPattern>> {
    const searchDate = date ? new Date(date) : new Date()

    if (!isValidDate(searchDate)) {
        throw new Error('Entur SDK: Could not parse <date> argument to valid Date')
    }

    const [fromFeatures, toFeatures] = await Promise.all([
        this.getFeatures(from),
        this.getFeatures(to),
    ])

    if (!fromFeatures || !fromFeatures.length) {
        throw new Error(`Entur SDK: Could not find any locations matching <from> argument "${from}"`)
    }

    if (!toFeatures || !toFeatures.length) {
        throw new Error(`Entur SDK: Could not find any locations matching <to> argument "${to}"`)
    }

    return this.getTripPatterns(
        convertFeatureToLocation(fromFeatures[0]),
        convertFeatureToLocation(toFeatures[0]),
        searchDate,
    )
}
