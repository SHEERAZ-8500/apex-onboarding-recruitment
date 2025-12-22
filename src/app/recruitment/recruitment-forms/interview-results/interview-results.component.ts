import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interview-results',
  templateUrl: './interview-results.component.html',
  styleUrls: ['./interview-results.component.scss']
})
export class InterviewResultsComponent implements OnInit {

  // ✅ Interview Results Data
  interviews = [
    { 
      candidateName: 'John Doe', 
      interviewCode: 'INT001', 
      description: 'Frontend Developer Interview', 
      date: '2024-03-20',
      interviewerName: 'Alice Smith', 
      location: 'Conference Room A', 
      startTime: '09:00', 
      endTime: '10:30',
      comments: 'Good technical skills', 
      totalTime: 90, 
      action: 'Shortlisted' 
    },
    { 
      candidateName: 'Jane Smith', 
      interviewCode: 'INT002', 
      description: 'Backend Developer Interview', 
      date: '2024-03-21',
      interviewerName: 'Bob Johnson', 
      location: 'Meeting Room B', 
      startTime: '14:00', 
      endTime: '15:00',
      comments: 'Needs improvement in system design', 
      totalTime: 60, 
      action: 'Rejected' 
    },
    { 
      candidateName: 'Mike Wilson', 
      interviewCode: 'INT003', 
      description: 'Full Stack Developer Interview', 
      date: '2024-03-22',
      interviewerName: 'Carol Williams', 
      location: 'Conference Room C', 
      startTime: '11:00', 
      endTime: '12:30',
      comments: 'Excellent performance', 
      totalTime: 90, 
      action: 'Selected' 
    },
    { 
      candidateName: 'Sarah Brown', 
      interviewCode: 'INT004', 
      description: 'UI/UX Designer Interview', 
      date: '2024-03-23',
      interviewerName: 'David Miller', 
      location: 'Design Studio', 
      startTime: '10:00', 
      endTime: '11:00',
      comments: 'Creative portfolio', 
      totalTime: 60, 
      action: 'Shortlisted' 
    },
    { 
      candidateName: 'Tom Anderson', 
      interviewCode: 'INT005', 
      description: 'DevOps Engineer Interview', 
      date: '2024-03-24',
      interviewerName: 'Eva Davis', 
      location: 'Remote', 
      startTime: '15:00', 
      endTime: '16:30',
      comments: 'Strong cloud knowledge', 
      totalTime: 90, 
      action: 'Selected' 
    },
    { 
      candidateName: 'Lisa Taylor', 
      interviewCode: 'INT006', 
      description: 'Project Manager Interview', 
      date: '2024-03-25',
      interviewerName: 'Frank Wilson', 
      location: 'Board Room', 
      startTime: '13:00', 
      endTime: '14:30',
      comments: 'Good leadership skills', 
      totalTime: 90, 
      action: 'On Hold' 
    },
    { 
      candidateName: 'Robert Clark', 
      interviewCode: 'INT007', 
      description: 'QA Engineer Interview', 
      date: '2024-03-26',
      interviewerName: 'Grace Lee', 
      location: 'Testing Lab', 
      startTime: '16:00', 
      endTime: '17:00',
      comments: 'Detailed test cases', 
      totalTime: 60, 
      action: 'Shortlisted' 
    },
    { 
      candidateName: 'Emily Harris', 
      interviewCode: 'INT008', 
      description: 'Data Scientist Interview', 
      date: '2024-03-27',
      interviewerName: 'Henry Martin', 
      location: 'Data Lab', 
      startTime: '09:30', 
      endTime: '11:00',
      comments: 'Strong statistical background', 
      totalTime: 90, 
      action: 'Selected' 
    }
  ];

  // ✅ Form + State
  showForm = false;
  candidate = '';
  interviewCode = '';
  interviewDescription = '';
  interviewDate = '';
  interviewerName = '';
  interviewLocation = '';
  interviewStartTime = '';
  interviewEndTime = '';
  interviewerComments = '';
  totalInterviewTime = 0;
  interviewAction = '';
  
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Dropdown Options
  candidateList = ['John Doe', 'Jane Smith', 'Mike Wilson', 'Sarah Brown', 'Tom Anderson', 'Lisa Taylor', 'Robert Clark', 'Emily Harris'];
  interviewActions = ['Selected', 'Rejected', 'Shortlisted', 'On Hold', 'Rescheduled'];

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;

  ngOnInit() {
    this.calculateTotalTime();
  }

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredInterviews().length / this.itemsPerPage);
  }

  get totalPagesArray() {
    const total = this.totalPages;

    if (total <= 3) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (this.currentPage === 1) return [1, 2, 3];
    if (this.currentPage === total) return [total - 2, total - 1, total];

    return [this.currentPage - 1, this.currentPage, this.currentPage + 1];
  }

  // ✅ Pagination Data
  paginatedInterviews() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredInterviews().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Format Time for Display
  formatTime(time: string): string {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  // ✅ Calculate Total Interview Time
  calculateTotalTime() {
    if (this.interviewStartTime && this.interviewEndTime) {
      const start = new Date(`2000-01-01T${this.interviewStartTime}`);
      const end = new Date(`2000-01-01T${this.interviewEndTime}`);
      const diffMs = end.getTime() - start.getTime();
      this.totalInterviewTime = Math.round(diffMs / 60000); // Convert to minutes
    } else {
      this.totalInterviewTime = 0;
    }
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
  }

  createInterview() {
    if (!this.validateForm()) return;

    this.interviews.push({
      candidateName: this.candidate,
      interviewCode: this.interviewCode,
      description: this.interviewDescription,
      date: this.interviewDate,
      interviewerName: this.interviewerName,
      location: this.interviewLocation,
      startTime: this.interviewStartTime,
      endTime: this.interviewEndTime,
      comments: this.interviewerComments,
      totalTime: this.totalInterviewTime,
      action: this.interviewAction
    });

    this.hideForm();
  }

  // ✅ Edit
  editInterview(index: number) {
    const interview = this.interviews[index];
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    this.candidate = interview.candidateName;
    this.interviewCode = interview.interviewCode;
    this.interviewDescription = interview.description;
    this.interviewDate = interview.date;
    this.interviewerName = interview.interviewerName;
    this.interviewLocation = interview.location;
    this.interviewStartTime = interview.startTime;
    this.interviewEndTime = interview.endTime;
    this.interviewerComments = interview.comments;
    this.totalInterviewTime = interview.totalTime;
    this.interviewAction = interview.action;
  }

  updateInterview() {
    if (this.editIndex === null || !this.validateForm()) return;

    this.interviews[this.editIndex] = {
      candidateName: this.candidate,
      interviewCode: this.interviewCode,
      description: this.interviewDescription,
      date: this.interviewDate,
      interviewerName: this.interviewerName,
      location: this.interviewLocation,
      startTime: this.interviewStartTime,
      endTime: this.interviewEndTime,
      comments: this.interviewerComments,
      totalTime: this.totalInterviewTime,
      action: this.interviewAction
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteInterview(index: number) {
    if (confirm('Are you sure you want to delete this interview record?')) {
      this.interviews.splice(index, 1);

      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }

  // ✅ Form Validation
  validateForm(): boolean {
    if (!this.candidate || !this.interviewCode || !this.interviewDescription || 
        !this.interviewDate || !this.interviewerName || !this.interviewLocation ||
        !this.interviewStartTime || !this.interviewEndTime || !this.interviewAction) {
      alert('Please fill all required fields marked with *');
      return false;
    }

    if (this.totalInterviewTime <= 0) {
      alert('Interview end time must be after start time');
      return false;
    }

    return true;
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
  }

  resetForm() {
    this.candidate = '';
    this.interviewCode = '';
    this.interviewDescription = '';
    this.interviewDate = '';
    this.interviewerName = '';
    this.interviewLocation = '';
    this.interviewStartTime = '';
    this.interviewEndTime = '';
    this.interviewerComments = '';
    this.totalInterviewTime = 0;
    this.interviewAction = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredInterviews() {
    if (!this.searchText.trim()) return this.interviews;

    const searchLower = this.searchText.toLowerCase();
    return this.interviews.filter(interview =>
      interview.candidateName.toLowerCase().includes(searchLower) ||
      interview.interviewCode.toLowerCase().includes(searchLower) ||
      interview.description.toLowerCase().includes(searchLower) ||
      interview.interviewerName.toLowerCase().includes(searchLower) ||
      interview.location.toLowerCase().includes(searchLower) ||
      interview.action.toLowerCase().includes(searchLower)
    );
  }
}