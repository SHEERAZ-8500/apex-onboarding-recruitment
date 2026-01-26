import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateLisitngDto, CandidateScreeningDto, CandidateScreeningSalaryRowDto, LookupDto } from '../../../shared/dtos/Dto';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../shared/services/loader.service';
import { DynamicFieldsSharingService } from '../../../shared/services/dynamic-fields-sharing.service';
import { ApiService } from '../../../shared/services/apis/api.service';

@Component({
  selector: 'app-candidate-screening',
  templateUrl: './candidate-screening.component.html',
  styleUrl: './candidate-screening.component.scss'
})
export class CandidateScreeningComponent implements OnInit {

  candidateScreening: CandidateScreeningDto = new CandidateScreeningDto();

  // Backend field management
  backendFieldsMap: Record<string, boolean> = {};
  fieldConfigMap: Record<string, any> = {};

  // Dropdown state
  activeDropdown: string = '';
  selectedCandidateId: string = '';
  candidateLisitng: CandidateLisitngDto[] = [];
  selectedCandidateInfo = {
    firstName: '',
    lastName: '',
  }
  // Dropdown options
  candidateIds: string[] = ['CAN-001', 'CAN-002', 'CAN-003', 'CAN-004'];
  statuses: string[] = [
    'APPLIED',
    'SHORTLISTED',
    'INTERVIEW_SCHEDULED',
    'INTERVIEWED',
    'SELECTED',
    'REJECTED',
    'CONVERTED'
  ];

  payFrequencies: string[] = ['MONTHLY', 'BI_MONTHLY', 'WEEKLY', 'YEARLY'];
  currencies: string[] = ['PKR', 'USD', 'EUR', 'GBP'];
  payElements: LookupDto[] = [];

  // Sidebar Tabs Data
  sidebarTabs: any[] = [];
  activeTabId: number = 1;

  constructor(
    private router: Router,
    public dynamicFieldsService: DynamicFieldsSharingService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private api: ApiService
  ) { }
  selectedPaymentElement: string = '';
  ngOnInit(): void {
    this.initializeSalaryRow();
    this.getFormFields();

    // this.loader.show();
    // this.dynamicFieldsService.loadDynamicFields('CANDIDATE_SCREENING', 'USER_DEFINED', [])
    //   .then(() => {
    //     this.sidebarTabs = this.dynamicFieldsService.sidebarTabs;
    //     this.activeTabId = this.dynamicFieldsService.activeTabId;
    //     this.loader.hide();
    //   })
    //   .catch((err) => {
    //     console.error('Error loading dynamic fields:', err);
    //     this.toastr.error('Failed to load dynamic fields');
    //     this.loader.hide();
    //   });
  }

  initializeSalaryRow(): void {
    if (this.candidateScreening.salaryRows.length === 0) {
      this.candidateScreening.salaryRows.push(new CandidateScreeningSalaryRowDto());
    }
  }

  addSalaryRow(): void {
    this.candidateScreening.salaryRows.push(new CandidateScreeningSalaryRowDto());
  }

  removeSalaryRow(index: number): void {
    if (this.candidateScreening.salaryRows.length > 1) {
      this.candidateScreening.salaryRows.splice(index, 1);
    } else {
      this.toastr.warning('At least one salary row is required');
    }
  }

  toggleDropdown(event: Event, field: string): void {
    event.stopPropagation();

    if (field === 'candidateId') {
      if (this.candidateLisitng.length === 0) {
        this.allCandidate()
      }
    }
    if (field === 'payElement_0') {
      this.fetchLookupOptions('pay_element');
    }
    if (this.activeDropdown === field) {
      this.activeDropdown = '';
    } else {
      this.activeDropdown = field;
    }
  }

  selectOption(field: string, value: any, event: Event): void {
    event.stopPropagation();

    if (field === 'candidateId' && value) {

      this.selectedCandidateInfo.firstName = value.firstName;
      this.selectedCandidateInfo.lastName = value.lastName;
      this.selectedCandidateId = value.publicId;
    } else {
      (this.candidateScreening as any)[field] = value;

    }

    this.activeDropdown = '';
  }

  selectSalaryRowOption(index: number, field: string, value: any, event: Event): void {
    event.stopPropagation();
    
    (this.candidateScreening.salaryRows[index] as any)[field] = value.name;
    this.activeDropdown = '';
    this.selectedPaymentElement = value.code;
  }

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event): void {
    this.activeDropdown = '';
    this.dynamicFieldsService.closeAllDropdowns();
  }

  setActiveTab(tabId: number): void {
    this.activeTabId = tabId;
    this.dynamicFieldsService.setActiveTab(tabId);
  }

  saveCandidateScreening(): void {
    if (!this.candidateScreening.status || !this.candidateScreening.dateOfJoining) {
      this.toastr.warning('Please fill all required fields');
      return;
    }

    // Validate salary rows
    for (let row of this.candidateScreening.salaryRows) {
      if (!row.payElement || !row.amount || !row.payFrequency || !row.currency || !row.effectiveDate) {
        this.toastr.warning('Please fill all required salary row fields');
        return;
      }
    }
    this.candidateScreening.salaryRows[0].payElement = this.selectedPaymentElement;
    const completeData = this.dynamicFieldsService.getCompleteFormData(this.candidateScreening);
    this.loader.show();
    this.api.saveCandidateScreening(this.selectedCandidateId, completeData).subscribe({
      next: (res: any) => {
        this.toastr.success('Candidate screening saved successfully');
        this.loader.hide();
        this.resetForm();
      }
      , error: (err: any) => {
        this.loader.hide();
        this.toastr.error('Failed to save candidate screening');
      }
    });

  }

  resetForm(): void {
    this.candidateScreening = new CandidateScreeningDto();
    this.selectedCandidateInfo = { firstName: '', lastName: '' };
    this.selectedCandidateId = '';
    this.selectedPaymentElement = '';
    this.initializeSalaryRow();
    this.dynamicFieldsService.dynamicFieldsData = {};
    this.activeDropdown = '';
  }

  onCancel(): void {
    this.router.navigate(['/panel']);
  }

  getFormFields(): void {
    // this.api.getFormByFormCode('CANDIDATE_SCREENING').subscribe({
    //   next: (res: any) => {
    //     console.log('Form Fields:', res);

    //     if (res?.data?.fields && Array.isArray(res.data.fields)) {
    //       res.data.fields.forEach((field: any) => {
    //         this.backendFieldsMap[field.fieldCode] = field.active;
    //         if (field.fieldConfig) {
    //           this.fieldConfigMap[field.fieldCode] = field.fieldConfig;
    //         }
    //         if (field.fieldCode === 'status') {
    //           this.statuses = field.enumValues || this.statuses;
    //         }
    //         if (field.fieldCode === 'pay_frequency') {
    //           this.payFrequencies = field.enumValues || this.payFrequencies;
    //         }
    //         if (field.fieldCode === 'pay_element') {
    //           this.payElements = field.enumValues || this.payElements;
    //         }
    //         if (field.fieldCode === 'currency') {
    //           this.currencies = field.enumValues || this.currencies;
    //         }
    //       });
    //     }
    //   },
    //   error: (err: any) => {
    //     console.error('Error fetching form fields:', err);
    //   }
    // });
  }

  isFieldActive(fieldCode: string): boolean {
    return this.backendFieldsMap[fieldCode] !== false;
  }
  allCandidate() {
    this.api.getAllCandidates().subscribe({
      next: (res: any) => {
        console.log('All Candidates:', res);
        this.candidateLisitng = res.data || [];
      },
      error: (err: any) => {
        console.error('Error fetching candidates:', err);
      }
    });
  }
  fetchLookupOptions(fieldCode: string): void {
    this.api.getLokupTableByCode(fieldCode).subscribe({
      next: (res: any) => {

        let data: LookupDto[] = res?.data || [];
        if (fieldCode === 'pay_element') {
          this.payElements = data;
        }


      },
      error: (err: any) => {
        console.error(`Error fetching lookup options for ${fieldCode}:`, err);
      }
    });
  }
}
