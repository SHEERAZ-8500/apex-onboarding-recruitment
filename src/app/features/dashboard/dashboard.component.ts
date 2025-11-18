// dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  cards = [
    { title: 'Total employees', number: 352, percent: 5 },
    { title: 'Number of leave', number: 22, percent: -3 },
    { title: 'New employees', number: 32, percent: 10 },
    { title: 'Happinnes rate', number: 82, percent: -7 }
  ];

  getArrow(percent: number) {
    return percent >= 0 ? '▲' : '▼';
  }
getPercentDisplay(percent: number) {
  return percent >= 0 ? `+${percent}` : `${percent}`;
}

  getPercentColor(percent: number) {
    return percent >= 0 ? 'text-success' : 'text-danger';
  }

}
