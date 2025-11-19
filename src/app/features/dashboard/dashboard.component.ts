// dashboard.component.ts
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
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
  cardTitle = "Total Applications";

  progress = [
    { value: 8, color: "#dc3545" },  // red
    { value: 12, color: "#ffa800" },  // yellow
    { value: 22, color: "#05825f" },  // green
    { value: 58, color: "#3596f7" }   // blue
  ];

  stats = [
    {
      label: "Applications",
      percentage: 58,
      color: "#4a90e2",      // dot color
      badgeBg: "#e1edff",    // badge background
      badgeText: "#4a90e2"   // badge text color
    },
    {
      label: "Shortlisted",
      percentage: 22,
      color: "#2ecc71",
      badgeBg: "#d4f5e2",
      badgeText: "#2ecc71"
    },
    {
      label: "On-Hold",
      percentage: 12,
      color: "#f1c40f",
      badgeBg: "#fff4cc",
      badgeText: "#f1c40f"
    },
    {
      label: "Rejected",
      percentage: 8,
      color: "#e74c3c",
      badgeBg: "#ffd6d2",
      badgeText: "#e74c3c"
    }
  ];
  cardTitle1 = "Recruitment Progress";

  recruitmentData = [
    {
      name: 'Dom Sibley',
      department: 'Devops',
      type: 'Tech interview',
      color: '#6c63ff',
      avatar: 'assets/h.avif'
    },
    {
      name: 'Joe Root',
      department: 'UX/UI Designer',
      type: 'Resume review',
      color: '#ff4267',
      avatar: 'assets/m.avif'
    },
    {
      name: 'Zak Crawley',
      department: '.Net developer',
      type: 'Final interview',
      color: '#ffb300',
      avatar: 'assets/k.avif'
    }
  ];
  ngAfterViewInit(): void {
    const ctx: any = document.getElementById('workingFormatChart');

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Remote', 'On Site'],
        datasets: [
          {
            data: [82, 26],
            backgroundColor: ['#7a42ff', '#e2d8ff'],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { display: false }
        }
      }
    });

    const ctxBar: any = document.getElementById('projectEmploymentChart');

    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            label: 'Project',
            data: [70, 85, 140, 200, 130, 220, 300],
            backgroundColor: '#3596f7',
            borderRadius: 6
          },
          {
            label: 'Bench',
            data: [40, 60, 120, 170, 85, 170, 260],
            backgroundColor: '#aad7ff',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,          // responsive chart
        maintainAspectRatio: false, // height adjust ho sake
        scales: {
          x: {
            ticks: { color: '#b8c4e9' },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#b8c4e9' },
            grid: { color: 'rgba(255,255,255,0.1)' }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });

    const bar: any = document.getElementById('staffTurnoverChart');

    new Chart(bar, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
          {
            label: 'Employees',
            data: [80, 90, 150, 200, 130, 220, 300, 270, 120],
            backgroundColor: '#7a42ff',
            borderRadius: 6,
            barThickness: 28
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // height adjust ho sake
        scales: {
          x: {
            ticks: { color: '#b8c4e9' },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#b8c4e9' },
            grid: { color: 'rgba(255,255,255,0.15)' }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });

  }

}
