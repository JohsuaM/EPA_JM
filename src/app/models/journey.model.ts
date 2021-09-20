import {ReservationModel} from './reservation.model';

export interface JourneyModel {
    JourneyId: number,
    Year?: number,
    Month?: number,
    Day?: number,
    Hour: number,
    Min: number,
    Reservations: ReservationModel[],
    TotalPassengers: number,
    TrainName: string,
    Destination: string,
    Departure: string
}