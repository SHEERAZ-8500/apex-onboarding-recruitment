import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
@Input() member : any;
}
