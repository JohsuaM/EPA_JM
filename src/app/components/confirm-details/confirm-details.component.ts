import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JourneyModel } from 'src/app/models/journey.model';
import { ReservationModel } from 'src/app/models/reservation.model';
import { TrainDetailsService } from 'src/app/services/train-details.service';

@Component({
  selector: 'app-confirm-details',
  templateUrl: './confirm-details.component.html',
  styleUrls: ['./confirm-details.component.css']
})
export class ConfirmDetailsComponent implements OnInit {

  JourneyDetails: JourneyModel[] = [];
  OutboundJourney!: JourneyModel;
  ReturnJourney!: JourneyModel;
  OutboundReservation!: ReservationModel;
  ReturnReservation!: ReservationModel;

  constructor(private trainDetailsService: TrainDetailsService,
              private route: ActivatedRoute) { 
    this.trainDetailsService.getCurrentBookings().subscribe(data => {
      this.JourneyDetails = data;
    }, error => {}, () => {
      this.route.queryParams.forEach(x => {
        this.OutboundJourney = this.JourneyDetails.filter(j => j.JourneyId == x.JOut)[0];
        this.ReturnJourney = this.JourneyDetails.filter(j => j.JourneyId == x.JRtn)[0];
        console.log(this.OutboundJourney)
        this.OutboundReservation = this.OutboundJourney.Reservations.filter(r => r.ReservationId == x.ROut)[0];
        this.ReturnReservation = this.ReturnJourney.Reservations.filter(r => r.ReservationId == x.RRtn)[0];
      });
    });
  }

  ngOnInit(): void {
  }
}
