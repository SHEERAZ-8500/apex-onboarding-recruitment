import { Component } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent {
offersList = [
  {
    logo: '../../../assets/logo-1.jpg',
    company: 'Globela Inc.',
    title: 'Project Manager',
    salary: '$1,200 - $1,800',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    openingJobs: '15/20',
    progress: 75,
    location: 'Miami'
  },
  {
    logo: '../../../assets/logo-1.jpg',
    company: 'Group Inc.',
    title: 'Sales Manager',
    salary: '$1,200 - $1,800',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    openingJobs: '15/20',
    progress: 70,
    location: 'Tampa'
  },
  {
    logo: '../../../assets/logo-1.jpg',
    company: 'Group Inc.',
    title: 'Sales Manager',
    salary: '$1,200 - $1,800',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    openingJobs: '15/20',
    progress: 70,
    location: 'Tampa'
  }
];
constructor(){
  console.log(this.offersList);
  
}
}
