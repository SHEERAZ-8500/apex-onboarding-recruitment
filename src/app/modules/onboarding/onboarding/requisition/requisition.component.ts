import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFieldsSharingService } from '../../../../shared/services/dynamic-fields-sharing.service';
import { LookupDto, RequisitionDto } from '../../../../shared/dtos/Dto';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../../shared/services/loader.service';
import { ApiService } from '../../../../shared/services/apis/api.service';

@Component({
  selector: 'app-requisition-form',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.scss']
})
export class RequisitionComponent implements OnInit {

  title = 'view';
  formTitle = "";

  // Form fields as DTO
  requisition: RequisitionDto = new RequisitionDto();

  
  // Dropdown state
  activeDropdown: string = '';

  // Dropdown options
  departments: LookupDto[] = [];
  jobTitles: LookupDto[] = [];
  designations: LookupDto[] = [];
  hiringManagers = ['Alice', 'Bob', 'Charlie'];
  backendFieldsMap: Record<string, boolean> = {};
  fieldConfigMap: Record<string, any> = {};
  lookupFields = ['job_title', 'designation', 'department']
  loadedLookups: Record<string, boolean> = {};
  // Sidebar Tabs Data
  sidebarTabs: any[] = [];
  activeTabId: number = 1;
  departMentDropDownValue: string = '';
  jobTitleDropDownValue: string = '';
  designationDropDownValue: string = '';
  hiringManagerDropDownValue: string = '';
  constructor(
    private router: Router,
    public dynamicFieldsService: DynamicFieldsSharingService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Load dynamic fields and tabs
    // this.loader.show();


    this.updatePagination();

    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {
        this.getRequisitionData();

        // set view mode loigc
        //  this.fetchSkills()
      }
      if (this.title === 'edit') {
        this.formTitle = "Edit Skill"
        this.dynamicFieldsService.loadDynamicFields('JOB_REQUISITION', 'USER_DEFINED', [])
          .then(() => {
            // Get tabs from service
            this.sidebarTabs = this.dynamicFieldsService.sidebarTabs;
            this.activeTabId = this.dynamicFieldsService.activeTabId;
            console.log('sidebarTabs:', this.sidebarTabs);
            if (this.sidebarTabs.length > 1) {
              console.log('rowTableField:', this.sidebarTabs[1]?.rowTableField);
            }
            this.loader.hide();
          })
          .catch((err) => {
            console.error('Error loading dynamic fields:', err);
            this.toastr.error('Failed to load dynamic fields');
            this.loader.hide();
          });
        this.getFormFileds();

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Skill"
        this.dynamicFieldsService.loadDynamicFields('JOB_REQUISITION', 'USER_DEFINED', [])
          .then(() => {
            // Get tabs from service
            this.sidebarTabs = this.dynamicFieldsService.sidebarTabs;
            this.activeTabId = this.dynamicFieldsService.activeTabId;
            console.log('sidebarTabs:', this.sidebarTabs);
            if (this.sidebarTabs.length > 1) {
              console.log('rowTableField:', this.sidebarTabs[1]?.rowTableField);
            }
            this.loader.hide();
          })
          .catch((err) => {
            console.error('Error loading dynamic fields:', err);
            this.toastr.error('Failed to load dynamic fields');
            this.loader.hide();
          });
        this.getFormFileds();


      }
    });


  }
  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;
  paginatedRequisitionsList: any[] = [];


  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();

  }



  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    // const filtered = this.filteredRequisitions();
    // this.paginatedRequisitionsList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }


  // filteredRequisitions() {
  //   if (!this.searchText.trim()) return this.requisition;

  //   return this.requisition.filter(this.requisition =>
  //     this.requisition.requisition_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //     this.requisition.department.toLowerCase().includes(this.searchText.toLowerCase())
  //   );
  // }

  hideForm() {
    this.resetForm();

  }

  cancelForm() {
    // this.hideForm();
    this.router.navigate(['/panel/onboarding/view-all-requisitions']);
  }

  // deleteSkill(index: number) {
  //   this.requisition.splice(index, 1);

  //   if (this.currentPage > this.totalPages && this.totalPages > 0) {
  //     this.currentPage = this.totalPages;
  //   }
  //   this.updatePagination();
  // }

  editSkill() {
    this.router.navigate(['/panel/onboarding/edit-requisition']);


  }

  // // updateSkill() {
  // //   if (this.editIndex === null) return;

  // //   this.requisition[this.editIndex] = {
  // //     code: this.requisition.,
  // //     name: this.skillName,
  // //   };

  //   this.hideForm();
  // }

  onNew() {
    this.resetForm();
    // this.showForm = true;
    this.router.navigate(['/panel/onboarding/create-new-requisition']);
  }

  // createSkill() {
  //   if (!this.skillCode || !this.skillName) return;

  //   this.skills.push({
  //     code: this.skillCode,
  //     name: this.skillName,
  //   });

  //   this.hideForm();
  // }


  // Dropdown toggle
  toggleDropdown(event: Event, dropdownId: string) {
    event.stopPropagation();

    // Fetch lookup options on first click
    if (this.lookupFields.includes(dropdownId) && !this.loadedLookups[dropdownId]) {
      this.fetchLookupOptions(dropdownId);
      this.loadedLookups[dropdownId] = true;
    }

    this.activeDropdown = this.activeDropdown === dropdownId ? '' : dropdownId;
  }

  selectOption(field: string, value: LookupDto, event: Event) {
    event.stopPropagation();
    if (field === 'department') this.departMentDropDownValue = value.name;
    if (field === 'job_title') this.jobTitleDropDownValue = value.name;
    if (field === 'designation') this.designationDropDownValue = value.name;
    if (field === 'hiring_manager') this.hiringManagerDropDownValue = value.name;

    (this.requisition as any)[field] = value.code;
    this.activeDropdown = '';
  }
  selectHiringManager(field: string, value: string, event: Event) {

    if (field === 'hiring_manager') this.hiringManagerDropDownValue = value;

    (this.requisition as any)[field] = value;
    this.activeDropdown = '';
  }

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event) {
    this.activeDropdown = '';
    this.dynamicFieldsService.closeAllDropdowns();
  }

  // Set active tab
  setActiveTab(tabId: number): void {
    this.activeTabId = tabId;
    this.dynamicFieldsService.setActiveTab(tabId);
  }

  // Save requisition data
  saveRequisition(): void {

    if (
      !this.requisition.requisition_name ||
      !this.requisition.department ||
      !this.requisition.job_title ||
      !this.requisition.designation ||
      // !this.requisition.hiring_manager ||
      !this.requisition.required_date
    ) {
      this.toastr.warning('Please fill all required fields');
      return;
    }
    // Remove hiring_manager if its source is 'current user'
    if (this.fieldConfigMap['hiring_manager']?.source === 'CURRENT_USER') {
      delete (this.requisition as any).hiring_manager;
    }

    const completeData = this.dynamicFieldsService.getCompleteFormData(this.requisition);
    // console.log('Saving Requisition Data:', completeData);
    this.loader.show();
    // API call to save data
    this.api.saveFormData('JOB_REQUISITION', completeData).subscribe({
      next: (res: any) => {
        this.toastr.success('Requisition saved successfully');
        this.loader.hide();
        // Reset form after successful save
        this.resetForm();
        this.router.navigate(['/panel/onboarding/requisition']);
      },
      error: (err: any) => {
        console.error('Error saving requisition:', err);
        this.toastr.error('Failed to save requisition');
        this.loader.hide();
      }
    });


  }

  onCancel(): void {
    this.router.navigate(['/panel']);
  }

  getFormFileds() {
    this.api.getFormByFormCode('JOB_REQUISITION').subscribe({
      next: (res: any) => {
        console.log('Form Fields:', res);

        // safety check
        if (res?.data?.fields && Array.isArray(res.data.fields)) {
          res.data.fields.forEach((field: any) => {
            this.backendFieldsMap[field.fieldCode] = field.active;
            // Store field config including source
            if (field.fieldConfig) {
              this.fieldConfigMap[field.fieldCode] = field.fieldConfig;
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Error fetching form fields:', err);
      }
    });
  }


  isFieldActive(fieldCode: string): boolean {

    return this.backendFieldsMap[fieldCode] !== false;
  }

  fetchLookupOptions(fieldCode: string): void {
    this.api.getLokupTableByCode(fieldCode).subscribe({
      next: (res: any) => {
        let data: LookupDto[] = res?.data || [];
        if (fieldCode === 'department') {
          this.departments = data;
        }
        if (fieldCode === 'job_title') {
          this.jobTitles = data;
        }
        if (fieldCode === 'designation') {
          this.designations = data;
        }

      },
      error: (err: any) => {
        console.error(`Error fetching lookup options for ${fieldCode}:`, err);
      }
    });
  }

  resetForm(): void {
    // Reset requisition object
    this.requisition = new RequisitionDto();
    // Reset dropdown display values
    this.departMentDropDownValue = '';
    this.jobTitleDropDownValue = '';
    this.designationDropDownValue = '';
    this.hiringManagerDropDownValue = '';
    // Reset loaded lookups to allow fresh fetch on next form
    this.loadedLookups = {};
    // Reset dynamic fields
    this.dynamicFieldsService.resetDynamicFields();
  }

  getRequisitionData() {
    this.api.getLokupTableByCodeWithFormType('JOB_REQUISITION').subscribe({
      next: (res: any) => {
                this.loader.hide();


      },
      error: (err: any) => {
        console.error('Error fetching requisition data:', err);
                this.loader.hide();

      }
    });
  }
}
