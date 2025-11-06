import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  members = [
    {
      name: 'Tristan',
      role: 'CEO',
      designation: 'Designer',
      address: '125 Ipsum Lorem Ave, Suite 458 New York, USA 154875',
      badgeColor: '#7b3eff',
      image: '../../../assets/1.jpg',
      socials: [
        { iconClass: 'fa-brands fa-facebook-f', link: '#' },
        { iconClass: 'fab fa-instagram', link: '#' },
        { iconClass: 'fab fa-twitter', link: '#' },
        { iconClass: 'fas fa-envelope', link: '#' },
      ],
    },
    {
      name: 'Sophia',
      role: 'MD',
      designation: 'Full Stack Developer',
      address: '125 Ipsum Lorem Ave, Suite 458 New York, USA 154875',
      badgeColor: '#e63946',
      image: '../../../assets/2.jpg',
      socials: [
        { iconClass: 'fab fa-facebook-f', link: '#' },
        { iconClass: 'fab fa-instagram', link: '#' },
        { iconClass: 'fab fa-twitter', link: '#' },
        { iconClass: 'fas fa-envelope', link: '#' },
      ],
    },
    {
      name: 'Jacob',
      role: 'Owner',
      designation: 'Support Agent',
      address: '125 Ipsum Lorem Ave, Suite 458 New York, USA 154875',
      badgeColor: '#00a86b',
      image: '../../../assets/1.jpg',
      socials: [
        { iconClass: 'fab fa-facebook-f', link: '#' },
        { iconClass: 'fab fa-instagram', link: '#' },
        { iconClass: 'fab fa-twitter', link: '#' },
        { iconClass: 'fas fa-envelope', link: '#' },
      ],
    },
  ];
}
