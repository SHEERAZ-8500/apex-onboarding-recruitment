import { Component, OnInit } from '@angular/core';
import { ToggleService } from '../../services/ToggleService';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {
  isOpen = true;
  constructor(private toggleService: ToggleService) { }

  // top-level groups
  assesment = true;
  masterdata = true;
  employees = true;
  recruitment = true;
  selection = true;

  // master data tree state
  masterdataCollapsed = true;
  generalMasterdataCollapsed = true;
  organizationalMasterdataCollapsed = true;
  outsourcinggMasterdataCollapsed = true;
  employeesCollapsed = true;
  recruitmentCollapsed = true;
  recruitmentFormsCollapsed = true;
    SelectionFormsCollapsed = true


  // other groups
  adminCollapsed = true;
  formsCollapsed = true;
  requisitionLookupsCollapsed = true;
  employeesMasterDataCollapsed = true;
  tableCollapsed = true;
  ngOnInit() {
    this.toggleService.sidebarOpen$.subscribe(open => this.isOpen = open);
  }

  // toggles (bound to click handlers)
  toggleAssessment() { this.assesment = !this.assesment; }

  toggleMasterData() { this.masterdataCollapsed = !this.masterdataCollapsed; }
    toggleEmployees() { this.employeesCollapsed = !this.employeesCollapsed; }


  toggleGeneralMaster() { this.generalMasterdataCollapsed = !this.generalMasterdataCollapsed; }

  toggleOrganizationalMaster() { this.organizationalMasterdataCollapsed = !this.organizationalMasterdataCollapsed; }

  toggleOutsourcingMaster() { this.outsourcinggMasterdataCollapsed = !this.outsourcinggMasterdataCollapsed; }

  toggleAdmin() { this.adminCollapsed = !this.adminCollapsed; }

  toggleForms() { this.formsCollapsed = !this.formsCollapsed; }

  toggleRequisitionLookups() { this.requisitionLookupsCollapsed = !this.requisitionLookupsCollapsed; }
  toggleEmployeesMasterData() { this.employeesMasterDataCollapsed = !this.employeesMasterDataCollapsed; }
  toggleRecruitment() { this.recruitmentCollapsed = !this.recruitmentCollapsed; }
  toggleRecruitmentForms() { this.recruitmentFormsCollapsed = !this.recruitmentFormsCollapsed; }
  toggleSelectionForms() { this.SelectionFormsCollapsed = !this.SelectionFormsCollapsed; }
  
  toggleTable() { this.tableCollapsed = !this.tableCollapsed; }
  
}
