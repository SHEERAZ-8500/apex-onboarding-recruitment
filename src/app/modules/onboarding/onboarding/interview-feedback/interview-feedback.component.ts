import { Component, HostListener } from '@angular/core';
import { CandidateLisitngDto, InterviewDto, InterviewFeedback } from '../../../../shared/dtos/Dto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../../shared/services/loader.service';
import { ApiService } from '../../../../shared/services/apis/api.service';

@Component({
  selector: 'app-interview-feedback',
  templateUrl: './interview-feedback.component.html',
  styleUrl: './interview-feedback.component.scss'
})
export class InterviewFeedbackComponent {

  interviewFeedback: InterviewFeedback = new InterviewFeedback();
  candidateLisitng: CandidateLisitngDto[] = [];
  interviewListing: InterviewDto[] = [];
  selectedInterviewId: string = '';
  interviewerPublicId: string = '';
  // Dropdown state
  activeDropdown: string = '';
  selectedCandidateId: string = '';
  selectedCandidateInfo = {
    firstName: '',
    lastName: '',
  }

  // Result options
  resultOptions: string[] = [
    'SELECTED',
    'REJECTED',


  ];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loader: LoaderService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.loadCandidates();
  }

  loadCandidates(): void {
    this.loader.show();
    this.api.getAllCandidates('INTERVIEW_SCHEDULED').subscribe({
      next: (res: any) => {
        this.candidateLisitng = res.data || [];
        this.loader.hide();
      },
      error: (err: any) => {
        console.error('Error fetching candidates:', err);
        this.toastr.error('Failed to load candidates');
        this.loader.hide();
      }
    });
  }

  toggleDropdown(event: Event, field: string): void {
    event.stopPropagation();

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
      this.selectedCanidateInterview();
    } else if (field === 'result') {
      this.interviewFeedback.result = value;
    } else if (field === 'selectedInterview' && value) {
      this.selectedInterviewId = value.code;
      this.interviewerPublicId = value.publicId;
    }

    this.activeDropdown = '';
  }

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event): void {
    this.activeDropdown = '';
  }

  saveInterviewFeedback(): void {
    if (!this.selectedCandidateId) {
      this.toastr.warning('Please select a candidate');
      return;
    }
    if (!this.selectedInterviewId) {
      this.toastr.warning('Please select an interview');
      return;
    }


    if (!this.interviewFeedback.result) {
      this.toastr.warning('Please select a result');
      return;
    }
    this.interviewFeedback.result = this.interviewFeedback.result === 'SELECTED' ? 'PASS' : 'FAIL';
    const feedbackData = {
      result: this.interviewFeedback.result,
      remarks: this.interviewFeedback.remarks || ''
    };

    this.loader.show();
    this.api.interviewFeedback(this.interviewerPublicId, feedbackData).subscribe({
      next: (res: any) => {
        this.toastr.success('Interview feedback submitted successfully');
        this.loader.hide();
        this.resetForm();
      },
      error: (err: any) => {
        this.loader.hide();
        this.toastr.error(err.error?.message || 'Failed to submit feedback');
      }
    });
  }

  resetForm(): void {
    this.interviewFeedback = new InterviewFeedback();
    this.selectedCandidateInfo = { firstName: '', lastName: '' };
    this.selectedCandidateId = '';
    this.activeDropdown = '';
    this.selectedInterviewId = '';
    this.interviewerPublicId = '';
  }

  onCancel(): void {
    this.router.navigate(['/panel']);
  }
  selectedCanidateInterview() {
    this.api.getSelectedCandidatesInterview([this.selectedCandidateId]).subscribe({
      next: (res: any) => {
        this.interviewListing = res.data || [];
        this.loader.hide();
      },
      error: (err: any) => {
        console.error('Error fetching interviews:', err);
        this.toastr.error('Failed to load interviews');
        this.loader.hide();
      }
    });
  }
}
