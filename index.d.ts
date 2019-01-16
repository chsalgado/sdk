/**
 * Commons
 */

export interface Config {
    clientName: string;
    hosts?: {
        journeyPlanner?: string;
        geocoder?: string;
        nsr?: string;
    };
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface MultilingualString {
    lang: string;
    value: string;
}

export interface Notice {
    text: string;
}

export type ReportType = "general" | "incident" | null;

export interface ServiceConfig {
    clientName: string;
    hosts: {
        journeyplanner: string;
        geocoder: string;
        nsr: string;
    };
}

interface ValidityPeriod {
    startTime: string;
    endTime: string;
}

export interface Situation {
    situationNumber: string;
    summary: Array<MultilingualString>;
    description: Array<MultilingualString>;
    detail: Array<MultilingualString>;
    validityPeriod: ValidityPeriod;
    reportType: ReportType;
}

/**
 * Bike rental
 */

export interface BikeRentalStation {
    id: string;
    name: string;
    bikesAvailable: number;
    spacesAvailable: number;
    longitude: number;
    latitude: number;
}


/**
 * Geocoder
 */

export type Category =
    | "onstreetBus"
    | "onstreetTram"
    | "airport"
    | "railStation"
    | "metroStation"
    | "busStation"
    | "coachStation"
    | "tramStation"
    | "harbourPort"
    | "ferryPort"
    | "ferryStop"
    | "liftStation"
    | "vehicleRailInterchange"
    | "other"
    | "GroupOfStopPlaces"
    | "poi"
    | "Vegadresse"
    | "street"
    | "tettsteddel"
    | "bydel";

export interface GetFeaturesParams {
    "boundary.rect.min_lon"?: number;
    "boundary.rect.max_lon"?: number;
    "boundary.rect.min_lat"?: number;
    "boundary.rect.max_lat"?: number;
    "boundary.country"?: string;
    sources?: Array<string>;
    layers?: Array<string>;
    limit?: number;
}

export interface Feature {
    geometry: {
        coordinates: [number, number]; // longitude, latitude
        type: "Point";
    };
    properties: {
        id: string;
        name: string;
        label?: string;
        borough: string;
        accuracy: "point";
        layer: "venue" | "address";
        borough_gid: string;
        category: Array<Category>;
        country_gid: string;
        county: string;
        county_gid: string;
        gid: string;
        housenumber?: string;
        locality: string;
        locality_gid: string;
        postalcode: string;
        source: string;
        source_id: string;
        street: string;
    };
}

export interface Location {
    name: string;
    place?: string;
    coordinates?: Coordinates;
}


/**
 * Trip
 */

export interface Authority {
    id: string;
    name: string;
    url?: string;
}

export interface Operator {
    id: string;
    name: string;
    url?: string;
}

export interface Quay {
    id: string;
    name: string;
    description?: string;
    publicCode?: string;
}

export interface StopPlace {
    description?: string;
    id: string;
    name: string;
    tariffZones?: Array<{ id: string }>;
}

export interface Place {
    latitude: number;
    longitude: number;
    name?: string;
    quay?: Quay & { stopPlace: StopPlace };
}

export type TransportMode =
    | "air"
    | "bus"
    // | "cableway"
    | "water"
    // | "funicular"
    // | "lift"
    | "rail"
    | "metro"
    | "tram"
    | "coach"
    | "car"
    // | "unknown"

export type LegMode = TransportMode | "bicycle" | "foot";
    // | "transit"
    // | "car_park"
    // | "car_pickup"

export type TransportSubmode =
    | "airportLinkRail"
    | "highSpeedPassengerService"
    | "highSpeedVehicleService"
    | "internationalCarFerry"
    | "localCarFerry"
    | "localPassengerFerry"
    | "nationalCarFerry"
    | "railReplacementBus"
    | "regionalCarFerry"
    | "touristRailway"
    | "airportLinkBus"
    | "cityTram";

export interface DestinationDisplay {
    frontText: string;
}

export interface EstimatedCall {
    date: string;
    destinationDisplay: DestinationDisplay;
    forAlighting: boolean;
    forBoarding: boolean;
    notices?: Array<Notice>;
    requestStop: boolean;
}


export interface IntermediateEstimatedCall {
    actualArrivalTime?: string; // Only available AFTER arrival has taken place
    actualDepartureTime?: string; // Only available AFTER departure has taken place
    aimedArrivalTime: string;
    aimedDepartureTime: string;
    cancellation: boolean;
    date: string;
    destinationDisplay: DestinationDisplay;
    expectedArrivalTime?: string; // Only available BEFORE arrival has taken place
    expectedDepartureTime?: string; // Only available BEFORE departure has taken place
    forAlighting: boolean;
    forBoarding: boolean;
    notices?: Array<Notice>;
    quay?: Quay;
    requestStop: boolean;
}

export interface Line {
    id: string;
    name: string;
    notices?: Array<Notice>;
    publicCode: string;
}

export interface PointsOnLink {
  points: string;
  length: number;
}

export interface JourneyPattern {
    line: {
        notices?: Array<Notice>;
    };
    notices?: Array<Notice>;
}

export interface ServiceJourney {
    id: string;
    journeyPattern?: JourneyPattern;
    notices?: Array<Notice>;
    publicCode?: string;
    transportSubmode?: TransportSubmode;
}

export interface Leg {
    aimedEndTime: string;
    aimedStartTime: string;
    authority?: Authority;
    distance: number;
    duration: number;
    expectedEndTime: string;
    expectedStartTime: string;
    fromEstimatedCall?: EstimatedCall;
    fromPlace: Place;
    intermediateEstimatedCalls: Array<IntermediateEstimatedCall>;
    line?: Line;
    mode: LegMode;
    notices?: Array<Notice>;
    operator?: Operator;
    pointsOnLink: PointsOnLink;
    realtime: boolean;
    ride: boolean;
    serviceJourney: ServiceJourney;
    situations?: Array<Situation>;
    toEstimatedCall?: EstimatedCall;
    toPlace: Place;
    transportSubmode: TransportSubmode;
}

export interface TransportSubmodeParam {
    transportMode: TransportMode;
    transportSubmodes: Array<TransportSubmode>;
}

export interface GetTripPatternsParams {
    searchDate?: Date;
    arriveBy?: boolean;
    modes?: Array<LegMode>;
    transportSubmodes?: Array<TransportSubmodeParam>;
    limit?: number;
    wheelchairAccessible?: boolean;
}

export interface TripPattern {
    distance: number;
    duration: number;
    endTime: string;
    id?: string,
    legs: Array<Leg>;
    startTime: string;
    walkDistance: number;
}

export interface GetDeparturesParams {
    includeNonBoarding?: boolean;
    limit?: number;
    departures?: number; // deprecated
    timeRange?: number;
}

/**
 * Stop Place
 */

export interface Departure {
    date: string;
    forBoarding: boolean;
    requestStop: boolean;
    forAlighting: boolean;
    destinationDisplay: DestinationDisplay;
    notices?: Array<Notice>;
    aimedDepartureTime: string;
    expectedDepartureTime: string;
    realtime: boolean;
    situations?: Array<Situation>;
    quay: Quay;
    serviceJourney: ServiceJourney & {
        line: Line & {
            transportMode: TransportMode;
            description?: string;
        };
    };
}

export interface QuayDepartures {
    id: string;
    estimatedCalls: Array<Departure>;
}

export interface StopPlaceDepartures {
    id: string;
    estimatedCalls: Array<Departure>;
}

export interface StopPlaceDetails {
    id: string;
    name: string;
    description?: string;
    latitude: number;
    longitude: number;
    wheelchairBoarding: "noInformation" | "possible" | "notPossible";
    weighting: "preferredInterchange" | "recommendedInterchange" | "interchangeAllowed" | "noInterchange";
    transportMode: TransportMode;
    transportSubmode?: TransportSubmode;
    quays?: Array<Quay & { situations?: Situation[] }>;
}

export type LimitationStatusType = "FALSE" | "TRUE" | "PARTIAL" | "UNKNOWN";

export interface WaitingRoomEquipment {
    id: string;
}

export interface ShelterEquipment {
    id: string;
}

export interface SanitaryEquipment {
    id: string;
    numberOfToilets: number;
    gender: "both" | "femaleOnly" | "maleOnly" | "sameSexOnly";
}

export interface TicketingEquipment {
    id: string;
    ticketOffice: boolean;
    ticketMachines: boolean;
    numberOfMachines: number;
}

export type ParkingVehicle =
    | "pedalCycle"
    | "moped"
    | "motorcycle"
    | "motorcycleWithSidecar"
    | "motorScooter"
    | "twoWheeledVehicle"
    | "threeWheeledVehicle"
    | "car"
    | "smallCar"
    | "passengerCar"
    | "largeCar"
    | "fourWheelDrive"
    | "taxi"
    | "camperCar"
    | "carWithTrailer"
    | "carWithCaravan"
    | "minibus"
    | "bus"
    | "van"
    | "largeVan"
    | "highSidedVehicle"
    | "lightGoodsVehicle"
    | "heavyGoodsVehicle"
    | "truck"
    | "agriculturalVehicle"
    | "tanker"
    | "tram"
    | "articulatedVehicle"
    | "vehicleWithTrailer"
    | "lightGoodsVehicleWithTrailer"
    | "heavyGoodsVehicleWithTrailer"
    | "undefined"
    | "other"
    | "allPassengerVehicles"
    | "all";

export interface StopPlaceFacilitiesStopPlace {
    id: string;
    name: MultilingualString;
    accessibilityAssessment: {
        limitations: {
            wheelchairAccess: LimitationStatusType;
            stepFreeAccess: LimitationStatusType;
        }
    },
    placeEquipments: {
        waitingRoomEquipment?: Array<WaitingRoomEquipment>;
        shelterEquipment?: Array<ShelterEquipment>;
        sanitaryEquipment?: Array<SanitaryEquipment>;
        ticketingEquipment?: Array<TicketingEquipment>;
    }
}

export interface StopPlaceFacilitiesParking {
    name: MultilingualString;
    parentSiteRef: string;
    totalCapacity?: number;
    principalCapacity?: number;
    parkingVehicleTypes?: Array<ParkingVehicle>;
}

export interface StopPlaceFacilities {
    stopPlace: Array<StopPlaceFacilitiesStopPlace>;
    parking: Array<StopPlaceFacilitiesParking>;
}

export interface GetQuaysForStopPlaceParams {
    filterByInUse?: boolean;
}

declare class EnturService {
  constructor(args: Config);

  journeyPlannerQuery<journeyPlannerResponse>(
      queryObj: Object | string,
      variables?: Object,
      ignoreFields?: Array<string>,
      config?: ServiceConfig,
  ): Promise<journeyPlannerResponse>;

  nsrQuery<nsrResponse>(
      queryObj: Object | string,
      variables?: Object,
      ignoreFields?: Array<string>,
      config?: ServiceConfig,
  ): Promise<nsrResponse>;

  getFeatures(
    query: string,
    coords?: Coordinates,
    params?: GetFeaturesParams,
  ): Promise<Feature[]>;

  getTripPatterns(
      from: Location,
      to: Location,
      params?: GetTripPatternsParams,
      ignoreFields?: Array<string>,
  ): Promise<TripPattern[]>;

  findTrips(
    from: string,
    to: string,
    date?: Date | string | number,
  ): Promise<TripPattern[]>;

  getDeparturesForStopPlaces(
      stopPlaceIds: Array<string>,
      params?: GetDeparturesParams,
  ): Promise<StopPlaceDepartures[]>;

  getDeparturesForStopPlace(
      stopPlaceId: string,
      params?: GetDeparturesParams,
  ): Promise<Departure[]>;

  getDeparturesForQuays(
      quayIds: Array<string>,
      params?: GetDeparturesParams,
  ): Promise<QuayDepartures[]>;

  getStopPlace(id: string): Promise<StopPlaceDetails>;

  getStopPlacesByPosition(
    coordinates: Coordinates,
    distance?: number,
  ): Promise<StopPlace[]>;

  getStopPlaceFacilities(stopPlaceId: string): Promise<StopPlaceFacilities>;

  getQuaysForStopPlace(
      stopPlaceId: string,
      params?: GetQuaysForStopPlaceParams,
  ): Promise<Quay[]>;

  getBikeRentalStation(stationId: string): Promise<BikeRentalStation>;

  getBikeRentalStationsByPosition(
    coordinates: Coordinates,
    distance?: number,
  ): Promise<BikeRentalStation[]>;
}

export default EnturService;

/**
 * Constants
 */

// Any for of public transportation
export var AIR: 'air';
export var BICYCLE: 'bicycle';
export var BUS: 'bus';
export var CABLEWAY: 'cableway';
export var CAR: 'car';
export var COACH: 'coach';
export var WATER: 'water';
export var FUNICULAR: 'funicular';
export var LIFT: 'lift';
export var RAIL: 'rail';
export var METRO: 'metro';
export var TRAM: 'tram';
export var TRANSIT: 'transit';
export var FOOT: 'foot';

// Combine with foot and transit for park and ride.
export var CAR_PARK: 'car_park';

// Combine with foot and transit for ride and kiss
export var CAR_PICKUP: 'car_pickup';

export var AIRPORT_LINK_RAIL: 'airportLinkRail';
export var HIGH_SPEED_PASSENGER_SERVICE: 'highSpeedPassengerService';
export var HIGH_SPEED_VEHICLE_SERVICE: 'highSpeedVehicleService';
export var INTERNATIONAL_CAR_FERRY: 'internationalCarFerry';
export var LOCAL_CAR_FERRY: 'localCarFerry';
export var LOCAL_PASSENGER_FERRY: 'localPassengerFerry';
export var NATIONAL_CAR_FERRY: 'nationalCarFerry';
export var RAIL_REPLACEMENT_BUS: 'railReplacementBus';
export var REGIONAL_CAR_FERRY: 'regionalCarFerry';
export var TOURIST_RAILWAY: 'touristRailway';
export var AIRPORT_LINK_BUS: 'airportLinkBus';

export var TransportMode: {
    BUS: 'bus',
    TRAM: 'tram',
    RAIL: 'rail',
    METRO: 'metro',
    WATER: 'water',
    AIR: 'air',
    COACH: 'coach',
    CAR: 'car',
};

export var LegMode: {
    BUS: 'bus',
    TRAM: 'tram',
    RAIL: 'rail',
    METRO: 'metro',
    WATER: 'water',
    AIR: 'air',
    COACH: 'coach',
    CAR: 'car',
    FOOT: 'foot',
    BICYCLE: 'bicycle',
};

export var TransportSubmode: {
    AIRPORT_LINK_RAIL: 'airportLinkRail',
    HIGH_SPEED_PASSENGER_SERVICE: 'highSpeedPassengerService',
    HIGH_SPEED_VEHICLE_SERVICE: 'highSpeedVehicleService',
    INTERNATIONAL_CAR_FERRY: 'internationalCarFerry',
    LOCAL_CAR_FERRY: 'localCarFerry',
    LOCAL_PASSENGER_FERRY: 'localPassengerFerry',
    NATIONAL_CAR_FERRY: 'nationalCarFerry',
    RAIL_REPLACEMENT_BUS: 'railReplacementBus',
    REGIONAL_CAR_FERRY: 'regionalCarFerry',
    TOURIST_RAILWAY: 'touristRailway',
    AIRPORT_LINK_BUS: 'airportLinkBus',
};

export var ONSTREET_BUS: 'onstreetBus';
export var ONSTREET_TRAM: 'onstreetTram';
export var AIRPORT: 'airport';
export var RAIL_STATION: 'railStation';
export var METRO_STATION: 'metroStation';
export var BUS_STATION: 'busStation';
export var COACH_STATION: 'coachStation';
export var TRAM_STATION: 'tramStation';
export var HARBOUR_PORT: 'harbourPort';
export var FERRY_PORT: 'ferryPort';
export var FERRY_STOP: 'ferryStop';
export var LIFT_STATION: 'liftStation';
export var VEHICLE_RAIL_INTERCHANGE: 'vehicleRailInterchange';
export var GROUP_OF_STOPP_LACES: 'GroupOfStopPlaces';
export var POI: 'poi';
export var VEGADRESSE: 'Vegadresse';
export var STREET: 'street';
export var TETTSTEDDEL: 'tettsteddel';
export var BYDEL: 'bydel';
export var OTHER: 'other';

export var FeatureCategory: {
    ONSTREET_BUS: 'onstreetBus',
    ONSTREET_TRAM: 'onstreetTram',
    AIRPORT: 'airport',
    RAIL_STATION: 'railStation',
    METRO_STATION: 'metroStation',
    BUS_STATION: 'busStation',
    COACH_STATION: 'coachStation',
    TRAM_STATION: 'tramStation',
    HARBOUR_PORT: 'harbourPort',
    FERRY_PORT: 'ferryPort',
    FERRY_STOP: 'ferryStop',
    LIFT_STATION: 'liftStation',
    VEHICLE_RAIL_INTERCHANGE: 'vehicleRailInterchange',
    GROUP_OF_STOPP_LACES: 'GroupOfStopPlaces',
    POI: 'poi',
    VEGADRESSE: 'Vegadresse',
    STREET: 'street',
    TETTSTEDDEL: 'tettsteddel',
    BYDEL: 'bydel',
    OTHER: 'other',
};

/**
 * Utils
 */

export function convertFeatureToLocation(feature: Feature): Location;
export function convertLocationToPosition(feature: Feature): Location;
export function convertPositionToBbox(coordinates: Coordinates, distance: number): {
    minLng: number,
    minLat: number,
    maxLng: number,
    maxLat: number,
};

export function throttler<T, U>(
  queryHandler: (T) => Promise<U>,
  queries: T[]
): Promise<U[]>;

export function isAir(mode: string): boolean;
export function isBicycle(mode: string): boolean;
export function isBus(mode: string): boolean;
export function isCableway(mode: string): boolean;
export function isCar(mode: string): boolean;
export function isCoach(mode: string): boolean;
export function isWater(mode: string): boolean;
export function isFunicular(mode: string): boolean;
export function isLift(mode: string): boolean;
export function isRail(mode: string): boolean;
export function isMetro(mode: string): boolean;
export function isTram(mode: string): boolean;
export function isTransit(mode: string): boolean;
export function isFoot(mode: string): boolean;
export function isCarPark(mode: string): boolean;
export function isCarPickup(mode: string): boolean;