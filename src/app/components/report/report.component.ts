import { Component, OnInit } from '@angular/core';
import { JourneyModel } from 'src/app/models/journey.model';
import { TrainDetailsService } from 'src/app/services/train-details.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  CurrentJourneys: JourneyModel[] = [];

  constructor(private trainDetailsService: TrainDetailsService) {
    this.trainDetailsService.getCurrentBookings().subscribe(data => {
      if(data.length === 0) {
        this.trainDetailsService.createJourneys().subscribe(data => {
          this.trainDetailsService.getCurrentBookings().subscribe(data => {
            this.CurrentJourneys = data;
            this.CurrentJourneys.sort((a, b) => {
              if(a.Hour - b.Hour < 0) {
                return -1;
              } else if (a.Hour - b.Hour > 0) {
                return 1;
              } else {
                return a.Min - b.Min;
              }
            });
          });
        });
      } else {
        this.CurrentJourneys = data;
        this.CurrentJourneys.sort((a, b) => {
          if(a.Hour - b.Hour < 0) {
            return -1;
          } else if (a.Hour - b.Hour > 0) {
            return 1;
          } else {
            return a.Min - b.Min;
          }
        });
      }
    });
  }

  ngOnInit(): void {
  }

  roundup(pass: number) {
    return Math.ceil(pass / 20);
  }

}
