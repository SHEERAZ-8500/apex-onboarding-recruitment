import { Component } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrl: './employes.component.scss'
})
export class EmployesComponent {
  myCandidates = [
    {
      name: 'John Doe',
      status:'Reviewed',
      screener: '1/1 Preferred Question met',
      applyDate: '19 Nov',
      interested: null
    },
    {
      name: 'Aditi Row',
      status: 'Reviewed',
      screener: '1/1 Preferred Question met',
      applyDate: '19 Nov',
      interested: null
    },
    {
      name: 'Mical Doe',
      status: 'Reviewed',
      screener: '0/1 Preferred Question met',
      applyDate: '19 Nov',
      interested: null
    },
    {
      name: 'Shone Marsh',
      status: 'Reviewed',
      screener: '0/1 Preferred Question met',
      applyDate: '19 Nov',
      interested: null
    },
    {
      name: 'Riki Ponting',
      status: 'Contacting',
      screener: '1/1 Preferred Question met',
      applyDate: '19 Nov',
      interested: null
    },
    {
      name: 'Gail Doe',
      status: 'Contacting',
      screener: '1/1 Preferred Question met',
      applyDate: '19 Nov',
      interested: null
    }
  ];
  statusList = ['Active', 'Reviewed', 'Contacting', 'Hired', 'Rejected', 'Archived'];
  activeIndex = 0;
  constructor(private loader: LoaderService) { }

  // ngOnInit() {
  //   this.showLoader();
  // }

  // showLoader() {
  //   this.loader.show();
  //   setTimeout(() => this.loader.hide(), 2000); 
  // }
}
