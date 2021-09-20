import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { JourneyModel } from 'src/app/models/journey.model';
import { ReservationModel } from 'src/app/models/reservation.model';
import { TrainDetailsService } from 'src/app/services/train-details.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  ticketForm = new FormGroup({
    passengerNameControl: new FormControl(''),
    passengerNumberControl: new FormControl()
  });
  AvailableJourneys: JourneyModel[] = [];
  OutboundJourneys: JourneyModel[] = [];
  InboundJourneys: JourneyModel[] = [];
  SelectedOutbound: number | undefined;
  SelectedInbound: number | undefined; 

  constructor(private trainDetailsService: TrainDetailsService,
              private router: Router) { 
    this.trainDetailsService.getTrainDetails().subscribe(data => {
      console.log(data);
    });
    this.trainDetailsService.getCurrentBookings().subscribe(data => {
      if(data.length === 0) {
        this.trainDetailsService.createJourneys().subscribe(data => {
          this.trainDetailsService.getCurrentBookings().subscribe(data => {
            this.saveData(data);
          });
        });
      } else {
        this.saveData(data);
      }
    });
    
  }

  ngOnInit(): void {
  }

  saveData(data: JourneyModel[]) {
    this.AvailableJourneys = data;
    this.OutboundJourneys = this.AvailableJourneys.filter(journey => {
      return journey.Departure === "Broklehurst";
    });
    this.InboundJourneys = this.AvailableJourneys.filter(journey => {
      return journey.Departure === "Ivelhurst";
    });
  }

  onSubmit() {
    console.warn(this.ticketForm.value);
    console.log(this.OutboundJourneys)
    let outID = this.SelectedOutbound;
    let rtnID = this.SelectedInbound;
    if (outID != undefined && rtnID != undefined) {
      let outJourney = this.OutboundJourneys.filter(journey => journey.JourneyId === outID)[0];
      let rtnJourney = this.InboundJourneys.filter(journey => journey.JourneyId === rtnID)[0];
      let reservationOut : ReservationModel = {
        ReservationId: outJourney.Reservations.length,
        Name: this.ticketForm.value.passengerNameControl,
        numberOfPassengers: this.ticketForm.value.passengerNumberControl
      }
      let reservationRtn : ReservationModel = {
        ReservationId: rtnJourney.Reservations.length,
        Name: this.ticketForm.value.passengerNameControl,
        numberOfPassengers: this.ticketForm.value.passengerNumberControl
      }

      let params = {
        JOut: this.SelectedOutbound,
        ROut: outJourney.Reservations.length,
        JRtn: this.SelectedInbound,
        RRtn: rtnJourney.Reservations.length
      }

      outJourney.Reservations.push(reservationOut);
      rtnJourney.Reservations.push(reservationRtn);
      outJourney.TotalPassengers = outJourney.Reservations.map(item => item.numberOfPassengers).reduce((prev, next) => prev + next);
      console.log(outJourney);
      rtnJourney.TotalPassengers = rtnJourney.Reservations.map(item => item.numberOfPassengers).reduce((prev, next) => prev + next);
      console.log(rtnJourney);

      this.trainDetailsService.sendBookingDetails(outJourney).subscribe(result => {
        console.log(result);
      }, error => {}, () => {
        this.trainDetailsService.sendBookingDetails(rtnJourney).subscribe(result => {
          console.log(result);
        });
      });
      

      this.router.navigate(['confirm-details'], { queryParams: params, queryParamsHandling: 'merge' });
    }
    
    
  }

  test(event: any, id: number, type: number) {    
    if (type == 0) {
      this.SelectedOutbound = id;
    } else {
      this.SelectedInbound = id;
    }
  }

}
