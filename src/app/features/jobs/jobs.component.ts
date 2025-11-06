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
            borderColor: '#a855f7',
            backgroundColor: 'rgba(168,85,247,0.2)',
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#a855f7',
            pointBorderColor: '#a855f7',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: '#9ca3af' },
            grid: { color: '#1f2937' },
          },
          y: {
            ticks: { color: '#9ca3af' },
            grid: { color: '#1f2937' },
          },
        },
      },
    });
  }
}
