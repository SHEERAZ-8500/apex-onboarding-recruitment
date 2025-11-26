import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent {
 ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart() {
    new Chart('clickChart', {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Clicks',
            data: [4, 10, 8, 20, 38, 15, 6],
            borderColor: '#1274ac',
            backgroundColor: '#7793a4ff',
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#1274ac',
            pointBorderColor: '#1274ac',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { color: '#7793a4ff' },
          },
          y: {
            ticks: { color: '#7793a4ff' },
            grid: { color: 'ffffffd9' },
          },
        },
      },
    });
  }
}
