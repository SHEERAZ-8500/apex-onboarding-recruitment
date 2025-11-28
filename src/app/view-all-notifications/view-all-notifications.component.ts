import { Component } from '@angular/core';
import { ThemeService } from '../shared/services/Theme.service';


@Component({
  selector: 'app-view-all-notifications',
  templateUrl: './view-all-notifications.component.html',
  styleUrl: './view-all-notifications.component.scss'
})
export class ViewAllNotificationsComponent {
notifications = [
    {
      icon: 'fa-solid fa-bell',
      iconColor: '#e63946',
      title: 'Daily Rundown: Monday',
      message: 'Nunc purus metus, aliquam vitae venenatis sit amet.',
      time: '3d'
    },
    {
      icon: 'fa-solid fa-calendar',
      iconColor: '#457b9d',
      title: 'Daily Rundown: Saturday',
      message: 'Pellentesque semper ex diam, at tristique ipsum varius sed.',
      time: '3d'
    },
    {
      icon: 'fa-solid fa-user',
      iconColor: '#2a9d8f',
      title: 'Congratulate Gurdeep Singh',
      message: 'for 5 years at Askbootstrap Pvt.',
      time: '4d'
    },
    {
      icon: 'fa-solid fa-user',
      iconColor: '#f4a261',
      title: 'Congratulate Mandeep Singh',
      message: 'for 4 years at Askbootstrap Pvt.',
      time: '4d'
    },
    {
      icon: 'fa-solid fa-bell',
      iconColor: '#e63946',
      title: 'Daily Rundown: Monday',
      message: 'Nunc purus metus, aliquam vitae venenatis sit amet.',
      time: '3d'
    },
    {
      icon: 'fa-solid fa-calendar',
      iconColor: '#457b9d',
      title: 'Daily Rundown: Saturday',
      message: 'Pellentesque semper ex diam, at tristique ipsum varius sed.',
      time: '3d'
    },
    {
      icon: 'fa-solid fa-user',
      iconColor: '#2a9d8f',
      title: 'Congratulate Gurdeep Singh',
      message: 'for 5 years at Askbootstrap Pvt.',
      time: '4d'
    },
    {
      icon: 'fa-solid fa-user',
      iconColor: '#f4a261',
      title: 'Congratulate Mandeep Singh',
      message: 'for 4 years at Askbootstrap Pvt.',
      time: '4d'
    },
    {
      icon: 'fa-solid fa-bell',
      iconColor: '#e63946',
      title: 'Daily Rundown: Monday',
      message: 'Nunc purus metus, aliquam vitae venenatis sit amet.',
      time: '3d'
    },
    {
      icon: 'fa-solid fa-calendar',
      iconColor: '#457b9d',
      title: 'Daily Rundown: Saturday',
      message: 'Pellentesque semper ex diam, at tristique ipsum varius sed.',
      time: '3d'
    },
    {
      icon: 'fa-solid fa-user',
      iconColor: '#2a9d8f',
      title: 'Congratulate Gurdeep Singh',
      message: 'for 5 years at Askbootstrap Pvt.',
      time: '4d'
    },
    {
      icon: 'fa-solid fa-user',
      iconColor: '#f4a261',
      title: 'Congratulate Mandeep Singh',
      message: 'for 4 years at Askbootstrap Pvt.',
      time: '4d'
    },
    {
      icon: 'fa-solid fa-bell',
      iconColor: '#e63946',
      title: 'Daily Rundown: Monday',
      message: 'Nunc purus metus, aliquam vitae venenatis sit amet.',
      time: '3d'
    },
    {
      icon: 'fa-solid fa-calendar',
      iconColor: '#457b9d',
      title: 'Daily Rundown: Saturday',
      message: 'Pellentesque semper ex diam, at tristique ipsum varius sed.',
      time: '3d'
    },
    {
      icon: 'fa-solid fa-user',
      iconColor: '#2a9d8f',
      title: 'Congratulate Gurdeep Singh',
      message: 'for 5 years at Askbootstrap Pvt.',
      time: '4d'
    },
    {
      icon: 'fa-solid fa-user',
      iconColor: '#f4a261',
      title: 'Congratulate Mandeep Singh',
      message: 'for 4 years at Askbootstrap Pvt.',
      time: '4d'
    }
  ];


  clearAll() {
    this.notifications = [];
  }

  // DELETE SPECIFIC NOTIFICATION
  deleteNotification(index: number) {
    this.notifications.splice(index, 1);
  }


}
