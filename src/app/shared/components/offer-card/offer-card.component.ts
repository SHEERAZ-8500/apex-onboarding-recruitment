import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.scss'
})
export class OfferCardComponent {
  @Input() offer: any ;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['offer']) {
      console.log('Offer changed:', this.offer);
    }
  }
}
