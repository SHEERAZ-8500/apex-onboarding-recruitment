// // email.component.ts
// import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Modal } from 'bootstrap';

// @Component({
//   selector: 'app-email',
//   templateUrl: './email.component.html',
//   styleUrls: ['./email.component.scss']
// })
// export class EmailComponent implements OnInit {
//   @ViewChild('messageBody') messageBody!: ElementRef;
//   @ViewChild('fileInput') fileInput!: ElementRef;
//   @ViewChild('imageInput') imageInput!: ElementRef;

//   foldersCollapsed = false;
//   labelsCollapsed = false;
//   contactsCollapsed = false;
//   activeFolder = 'inbox';
//   activeEmail: any = null;
//   searchQuery = '';
//   sidebarVisible = false;
//   emailDetailVisible = true;
  
//   currentPage = 1;
//   pageSize = 10;
//   totalPages = 1;
//   paginatedEmails: any[] = [];

//   composeForm: FormGroup;
//   attachments: any[] = [];
//   uploadedImages: any[] = [];
//   linkUrl = '';
//   private selection: any;

//   contacts = [
//     { name: 'Sarah Kortney', online: true, avatar: 'assets/gh (1).png' },
//     { name: 'Tommy Nash', online: false, avatar: 'assets/gh (2).png' },
//     { name: 'Kathryn Mengel', online: true, avatar: 'assets/hj.png' },
//     { name: 'Mayra Sibley', online: true, avatar: 'assets/fv.png' },
//     { name: 'John Doe', online: true, avatar: 'assets/hj.png' },
//     { name: 'Alice Cooper', online: false, avatar: 'assets/j.jpg' },
//     { name: 'Bob Smith', online: true, avatar: 'assets/kl.png' }
//   ];

//  emails = [
//   {
//     id: 1,
//     sender: 'Johan Doe',
//     senderEmail: 'johan@example.com',
//     avatar: 'assets/1.jpg',
//     subject: 'Lorem ipsum',
//     preview: 'There are many variations of Ipsum available...',
//     time: '2:45 PM',
//     date: '22 JUL 2019 18:03 PM',
//     body: `<p>Dear User,</p><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit...</p>`,
//     folder: 'inbox',
//     starred: false,
//     selected: false,
//     attachments: [
//       { name: 'Mag.pdf', size: '5,215 KB' },
//       { name: 'Document.docx', size: '2,145 KB' }
//     ]
//   },
//   {
//     id: 2,
//     sender: 'Alice Smith',
//     senderEmail: 'alice@example.com',
//     avatar: 'assets/2.jpg',
//     subject: 'Meeting Tomorrow',
//     preview: 'Don\'t forget about our meeting tomorrow at 10 AM...',
//     time: '1:30 PM',
//     date: '21 JUL 2019 13:30 PM',
//     body: '<p>Hi, just a reminder about our meeting tomorrow. Please bring the quarterly reports.</p>',
//     folder: 'inbox',
//     starred: true,
//     selected: false
//   },
//   {
//     id: 3,
//     sender: 'Bob Johnson',
//     senderEmail: 'bob@example.com',
//     avatar: 'assets/7.jpg',
//     subject: 'Project Update',
//     preview: 'Here is the latest update on the project...',
//     time: '11:15 AM',
//     date: '21 JUL 2019 11:15 AM',
//     body: '<p>The project is progressing well. We have completed phase one ahead of schedule.</p>',
//     folder: 'inbox',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 4,
//     sender: 'Pavan Kumar',
//     senderEmail: 'pavan@domain.com',
//     avatar: 'assets/avtar.png',
//     subject: 'Your message title goes here',
//     preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
//     time: '8:03 PM',
//     date: '22 JUL 2019 08:03 PM',
//     body: `<p>Dear User,</p><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit...</p>`,
//     folder: 'inbox',
//     starred: false,
//     selected: false,
//     attachments: [
//       { name: 'Project.pdf', size: '3,215 KB' },
//       { name: 'Budget.xlsx', size: '1,845 KB' }
//     ]
//   },
//   {
//     id: 5,
//     sender: 'Sarah Wilson',
//     senderEmail: 'sarah@example.com',
//     avatar: 'assets/fv.png',
//     subject: 'Weekly Report',
//     preview: 'Please find attached the weekly performance report...',
//     time: '4:20 PM',
//     date: '20 JUL 2019 16:20 PM',
//     body: '<p>Hello team, attached is the weekly performance report for your review.</p>',
//     folder: 'inbox',
//     starred: true,
//     selected: false,
//     attachments: [
//       { name: 'Weekly_Report.pdf', size: '2,345 KB' }
//     ]
//   },
//   {
//     id: 6,
//     sender: 'Mike Thompson',
//     senderEmail: 'mike@example.com',
//     avatar: 'assets/g.png',
//     subject: 'Vacation Request',
//     preview: 'I would like to request vacation days for next month...',
//     time: '9:15 AM',
//     date: '19 JUL 2019 09:15 AM',
//     body: '<p>Dear Manager, I would like to request vacation from August 15-20.</p>',
//     folder: 'inbox',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 7,
//     sender: 'Emma Davis',
//     senderEmail: 'emma@example.com',
//     avatar: 'assets/gh (1).png',
//     subject: 'Team Lunch',
//     preview: 'Let\'s plan a team lunch for next Friday...',
//     time: '3:45 PM',
//     date: '18 JUL 2019 15:45 PM',
//     body: '<p>Hi everyone, let\'s plan a team lunch next Friday. Please suggest venues.</p>',
//     folder: 'inbox',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 8,
//     sender: 'David Brown',
//     senderEmail: 'david@example.com',
//     avatar: 'assets/gh (2).png',
//     subject: 'Client Meeting Notes',
//     preview: 'Here are the notes from yesterday\'s client meeting...',
//     time: '10:30 AM',
//     date: '17 JUL 2019 10:30 AM',
//     body: '<p>Please find attached the meeting notes from our client discussion.</p>',
//     folder: 'inbox',
//     starred: true,
//     selected: false,
//     attachments: [
//       { name: 'Meeting_Notes.docx', size: '1,567 KB' }
//     ]
//   },
//   {
//     id: 9,
//     sender: 'Lisa Anderson',
//     senderEmail: 'lisa@example.com',
//     avatar: 'assets/h.avif',
//     subject: 'Budget Approval',
//     preview: 'The Q3 budget has been approved by management...',
//     time: '5:10 PM',
//     date: '16 JUL 2019 17:10 PM',
//     body: '<p>Good news! The Q3 budget has been approved. We can proceed with our plans.</p>',
//     folder: 'inbox',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 10,
//     sender: 'Robert Garcia',
//     senderEmail: 'robert@example.com',
//     avatar: 'assets/hj.png',
//     subject: 'Training Session',
//     preview: 'New software training session scheduled for next week...',
//     time: '11:55 AM',
//     date: '15 JUL 2019 11:55 AM',
//     body: '<p>There will be a training session for the new software next Tuesday.</p>',
//     folder: 'inbox',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 11,
//     sender: 'Jennifer Lee',
//     senderEmail: 'jennifer@example.com',
//     avatar: 'assets/j.jpg',
//     subject: 'Website Update',
//     preview: 'The website update is now live with new features...',
//     time: '2:25 PM',
//     date: '14 JUL 2019 14:25 PM',
//     body: '<p>The website update has been successfully deployed with all new features.</p>',
//     folder: 'inbox',
//     starred: true,
//     selected: false
//   },
//   {
//     id: 12,
//     sender: 'Kevin Martin',
//     senderEmail: 'kevin@example.com',
//     avatar: 'assets/k.avif',
//     subject: 'System Maintenance',
//     preview: 'Scheduled system maintenance this weekend...',
//     time: '4:40 PM',
//     date: '13 JUL 2019 16:40 PM',
//     body: '<p>There will be system maintenance this Saturday from 10 PM to 2 AM.</p>',
//     folder: 'inbox',
//     starred: false,
//     selected: false
//   },

//   // Sent Folder - 12 emails
//   {
//     id: 13,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/kl.png',
//     subject: 'Re: Project Update',
//     preview: 'Thanks for the update Bob...',
//     time: '10:00 AM',
//     date: '20 JUL 2019 10:00 AM',
//     body: '<p>Thanks for the update. Looking forward to the next phase.</p>',
//     folder: 'sent',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 14,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/m.avif',
//     subject: 'Meeting Confirmation',
//     preview: 'Confirming our meeting for tomorrow at 2 PM...',
//     time: '3:20 PM',
//     date: '19 JUL 2019 15:20 PM',
//     body: '<p>Hi team, confirming our meeting tomorrow at 2 PM in conference room B.</p>',
//     folder: 'sent',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 15,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/ml.png',
//     subject: 'Report Submission',
//     preview: 'Submitted the monthly sales report...',
//     time: '11:45 AM',
//     date: '18 JUL 2019 11:45 AM',
//     body: '<p>Dear Manager, I have submitted the monthly sales report for review.</p>',
//     folder: 'sent',
//     starred: true,
//     selected: false
//   },
//   {
//     id: 16,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/nb (1).png',
//     subject: 'Follow Up: Client Proposal',
//     preview: 'Following up on the client proposal sent last week...',
//     time: '9:30 AM',
//     date: '17 JUL 2019 09:30 AM',
//     body: '<p>Hello, just following up on the proposal I sent last week.</p>',
//     folder: 'sent',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 17,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/nb (2).png',
//     subject: 'Vacation Approval',
//     preview: 'Your vacation request has been approved...',
//     time: '2:15 PM',
//     date: '16 JUL 2019 14:15 PM',
//     body: '<p>Your vacation request for August 15-20 has been approved.</p>',
//     folder: 'sent',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 18,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/ml.png',
//     subject: 'Training Materials',
//     preview: 'Sending the training materials for next week...',
//     time: '4:50 PM',
//     date: '15 JUL 2019 16:50 PM',
//     body: '<p>Please find attached the training materials for next week\'s session.</p>',
//     folder: 'sent',
//     starred: false,
//     selected: false,
//     attachments: [
//       { name: 'Training_Guide.pdf', size: '3,890 KB' }
//     ]
//   },
//   {
//     id: 19,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/o.avif',
//     subject: 'Weekly Update',
//     preview: 'Weekly team update and progress report...',
//     time: '10:20 AM',
//     date: '14 JUL 2019 10:20 AM',
//     body: '<p>Here is this week\'s update on our project progress and milestones.</p>',
//     folder: 'sent',
//     starred: true,
//     selected: false
//   },
//   {
//     id: 20,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/q.avif',
//     subject: 'Budget Review',
//     preview: 'Review of Q3 budget allocations...',
//     time: '1:40 PM',
//     date: '13 JUL 2019 13:40 PM',
//     body: '<p>Please review the attached Q3 budget allocations and provide feedback.</p>',
//     folder: 'sent',
//     starred: false,
//     selected: false,
//     attachments: [
//       { name: 'Q3_Budget.xlsx', size: '2,345 KB' }
//     ]
//   },
//   {
//     id: 21,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/s.avif',
//     subject: 'Client Feedback',
//     preview: 'Summary of client feedback from last meeting...',
//     time: '11:10 AM',
//     date: '12 JUL 2019 11:10 AM',
//     body: '<p>Here is a summary of the client feedback from our last meeting.</p>',
//     folder: 'sent',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 22,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/w.avif',
//     subject: 'Team Announcement',
//     preview: 'Important announcement regarding team structure...',
//     time: '3:35 PM',
//     date: '11 JUL 2019 15:35 PM',
//     body: '<p>Important announcement about changes to our team structure.</p>',
//     folder: 'sent',
//     starred: true,
//     selected: false
//   },
//   {
//     id: 23,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/1.jpg',
//     subject: 'Project Deadline',
//     preview: 'Reminder about upcoming project deadline...',
//     time: '9:55 AM',
//     date: '10 JUL 2019 09:55 AM',
//     body: '<p>Friendly reminder that the project deadline is next Friday.</p>',
//     folder: 'sent',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 24,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/2.jpg',
//     subject: 'Thank You Note',
//     preview: 'Thank you for your hard work on the recent project...',
//     time: '5:25 PM',
//     date: '09 JUL 2019 17:25 PM',
//     body: '<p>Thank you everyone for your hard work on the recent project.</p>',
//     folder: 'sent',
//     starred: false,
//     selected: false
//   },

//   // Drafts Folder - 12 emails
//   {
//     id: 25,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/7.jpg',
//     subject: 'Draft Email',
//     preview: 'This is a draft email...',
//     time: '9:45 AM',
//     date: '20 JUL 2019 09:45 AM',
//     body: '<p>This is a draft email that I haven\'t sent yet.</p>',
//     folder: 'drafts',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 26,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/avtar.png',
//     subject: 'Client Proposal Draft',
//     preview: 'Draft version of the client proposal...',
//     time: '2:30 PM',
//     date: '19 JUL 2019 14:30 PM',
//     body: '<p>Draft version of the client proposal for review.</p>',
//     folder: 'drafts',
//     starred: true,
//     selected: false
//   },
//   {
//     id: 27,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/fv.png',
//     subject: 'Monthly Report Draft',
//     preview: 'Working draft of the monthly report...',
//     time: '11:15 AM',
//     date: '18 JUL 2019 11:15 AM',
//     body: '<p>Working draft of the monthly report - needs final review.</p>',
//     folder: 'drafts',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 28,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/g.png',
//     subject: 'Team Meeting Agenda',
//     preview: 'Draft agenda for next team meeting...',
//     time: '4:40 PM',
//     date: '17 JUL 2019 16:40 PM',
//     body: '<p>Draft agenda for our next team meeting - please add items.</p>',
//     folder: 'drafts',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 29,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/gh (1).png',
//     subject: 'Budget Request Draft',
//     preview: 'Draft of the budget request for next quarter...',
//     time: '10:05 AM',
//     date: '16 JUL 2019 10:05 AM',
//     body: '<p>Draft version of the budget request for Q4.</p>',
//     folder: 'drafts',
//     starred: true,
//     selected: false
//   },
//   {
//     id: 30,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/gh (2).png',
//     subject: 'Project Update Draft',
//     preview: 'Draft of project update for stakeholders...',
//     time: '3:20 PM',
//     date: '15 JUL 2019 15:20 PM',
//     body: '<p>Draft of the project update to be sent to stakeholders.</p>',
//     folder: 'drafts',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 31,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/h.avif',
//     subject: 'Presentation Outline',
//     preview: 'Draft outline for upcoming presentation...',
//     time: '1:50 PM',
//     date: '14 JUL 2019 13:50 PM',
//     body: '<p>Draft outline for the upcoming client presentation.</p>',
//     folder: 'drafts',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 32,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/hj.png',
//     subject: 'Training Schedule Draft',
//     preview: 'Draft of new training schedule...',
//     time: '11:30 AM',
//     date: '13 JUL 2019 11:30 AM',
//     body: '<p>Draft version of the new training schedule.</p>',
//     folder: 'drafts',
//     starred: true,
//     selected: false
//   },
//   {
//     id: 33,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/j.jpg',
//     subject: 'Policy Update Draft',
//     preview: 'Draft of updated company policies...',
//     time: '2:45 PM',
//     date: '12 JUL 2019 14:45 PM',
//     body: '<p>Draft of the updated company policies for review.</p>',
//     folder: 'drafts',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 34,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/k.avif',
//     subject: 'Website Content Draft',
//     preview: 'Draft content for website update...',
//     time: '10:55 AM',
//     date: '11 JUL 2019 10:55 AM',
//     body: '<p>Draft content for the upcoming website update.</p>',
//     folder: 'drafts',
//     starred: false,
//     selected: false
//   },
//   {
//     id: 35,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/kl.png',
//     subject: 'Newsletter Draft',
//     preview: 'Draft of monthly newsletter...',
//     time: '4:10 PM',
//     date: '10 JUL 2019 16:10 PM',
//     body: '<p>Draft version of this month\'s newsletter.</p>',
//     folder: 'drafts',
//     starred: true,
//     selected: false
//   },
//   {
//     id: 36,
//     sender: 'Me',
//     senderEmail: 'me@example.com',
//     avatar: 'assets/m.avif',
//     subject: 'Performance Review Draft',
//     preview: 'Draft of team performance reviews...',
//     time: '9:25 AM',
//     date: '09 JUL 2019 09:25 AM',
//     body: '<p>Draft of the quarterly team performance reviews.</p>',
//     folder: 'drafts',
//     starred: false,
//     selected: false
//   }
// ];
//   filteredEmails = [...this.emails];

//   constructor(private fb: FormBuilder) {
//     this.composeForm = this.fb.group({
//       to: ['', [Validators.required, Validators.email]],
//       subject: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.filterEmails();
//     this.checkScreenSize();
//     this.updatePagination();
//   }

//   @HostListener('window:resize')
//   onResize() {
//     this.checkScreenSize();
//   }

//   checkScreenSize() {
//     const isMobile = window.innerWidth < 768;
//     this.sidebarVisible = !isMobile;
//     this.emailDetailVisible = !isMobile;
//   }

//   toggleFolders(): void {
//     this.foldersCollapsed = !this.foldersCollapsed;
//   }

//   toggleLabels(): void {
//     this.labelsCollapsed = !this.labelsCollapsed;
//   }

//   toggleContacts(): void {
//     this.contactsCollapsed = !this.contactsCollapsed;
//   }

//   setActiveFolder(folder: string): void {
//     this.activeFolder = folder;
//     this.filterEmails();
//     this.activeEmail = null;
//     this.currentPage = 1;
//     this.updatePagination();
//     if (window.innerWidth < 768) {
//       this.sidebarVisible = false;
//     }
//   }

//   getFolderCount(folder: string): number {
//     return this.emails.filter(email => email.folder === folder).length;
//   }

//   filterEmails(): void {
//     this.filteredEmails = this.emails.filter(email => {
//       const matchesFolder = email.folder === this.activeFolder;
//       const matchesSearch = !this.searchQuery || 
//         email.sender.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//         email.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//         email.preview.toLowerCase().includes(this.searchQuery.toLowerCase());
      
//       return matchesFolder && matchesSearch;
//     });
//     this.updatePagination();
//   }

//   updatePagination(): void {
//     this.totalPages = Math.ceil(this.filteredEmails.length / this.pageSize);
//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     const endIndex = startIndex + this.pageSize;
//     this.paginatedEmails = this.filteredEmails.slice(startIndex, endIndex);
//   }

//   previousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.updatePagination();
//     }
//   }

//   nextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.updatePagination();
//     }
//   }

//   selectEmail(email: any): void {
//     this.activeEmail = email;
//     if (window.innerWidth < 768) {
//       this.emailDetailVisible = true;
//     }
//   }

//   hideEmailDetail(): void {
//     this.emailDetailVisible = false;
//     this.activeEmail = null;
//   }

//   toggleEmailSelection(email: any): void {
//     email.selected = !email.selected;
//   }

//   toggleSelectAll(): void {
//     const allSelected = this.isAllSelected();
//     this.paginatedEmails.forEach(email => email.selected = !allSelected);
//   }

//   isAllSelected(): boolean {
//     return this.paginatedEmails.length > 0 && this.paginatedEmails.every(email => email.selected);
//   }

//   deleteSelected(): void {
//     this.paginatedEmails
//       .filter(email => email.selected)
//       .forEach(email => {
//         email.folder = 'trash';
//         email.selected = false;
//       });
//     this.filterEmails();
//     if (this.activeEmail && this.activeEmail.folder === 'trash') {
//       this.activeEmail = null;
//     }
//   }

//   replyToSelected(): void {
//     if (this.activeEmail) {
//       this.replyToEmail(this.activeEmail);
//     }
//   }

//   forwardSelected(): void {
//     if (this.activeEmail) {
//       this.forwardEmail(this.activeEmail);
//     }
//   }

//   refreshEmails(): void {
//     this.filterEmails();
//   }

//   toggleStar(email: any): void {
//     email.starred = !email.starred;
//     if (email.starred && email.folder !== 'starred') {
//       email.folder = 'starred';
//       this.filterEmails();
//     } else if (!email.starred && email.folder === 'starred') {
//       email.folder = 'inbox';
//       this.filterEmails();
//     }
//   }

//   printEmail(): void {
//     window.print();
//   }

//   deleteEmail(email: any): void {
//     email.folder = 'trash';
//     this.filterEmails();
//     this.activeEmail = null;
//   }

//   forwardEmail(email: any): void {
//     this.openComposeModal();
//     this.composeForm.patchValue({
//       subject: `Fwd: ${email.subject}`,
//     });
//     this.messageBody.nativeElement.innerHTML = `<br><br>---------- Forwarded message ---------<br>From: ${email.sender}<br>Date: ${email.date}<br>Subject: ${email.subject}<br><br>${email.body}`;
//   }

//   replyToEmail(email: any): void {
//     this.openComposeModal();
//     this.composeForm.patchValue({
//       to: email.senderEmail,
//       subject: `Re: ${email.subject}`
//     });
//     this.messageBody.nativeElement.innerHTML = `<br><br>---------- Original Message ---------<br>From: ${email.sender}<br>Date: ${email.date}<br>Subject: ${email.subject}<br><br>${email.body}`;
//   }

//   toggleSidebar(): void {
//     this.sidebarVisible = !this.sidebarVisible;
//   }

//   openComposeModal(): void {
//     const modalElement = document.getElementById('composeModal');
//     if (modalElement) {
//       const modal = new Modal(modalElement, {
//         backdrop: 'static',
//         keyboard: false
//       });
//       modal.show();
//     }
//   }

//   closeComposeModal(): void {
//     const modal = Modal.getInstance(document.getElementById('composeModal')!);
//     modal?.hide();
//   }

//   formatText(command: string): void {
//     this.restoreSelection();
//     document.execCommand(command, false, '');
//     this.messageBody.nativeElement.focus();
//   }

//   saveSelection(): void {
//     const sel = window.getSelection();
//     if (sel && sel.rangeCount > 0) {
//       this.selection = sel.getRangeAt(0);
//     }
//   }

//   restoreSelection(): void {
//     if (this.selection) {
//       const sel = window.getSelection();
//       sel?.removeAllRanges();
//       sel?.addRange(this.selection);
//     }
//   }

//   insertLink(): void {
//     const insertLinkModal = new Modal(document.getElementById('insertLinkModal')!);
//     insertLinkModal.show();
//   }

//   insertLinkToText(): void {
//     if (this.linkUrl) {
//       this.restoreSelection();
//       document.execCommand('createLink', false, this.linkUrl);
//       this.messageBody.nativeElement.focus();
      
//       const insertLinkModal = Modal.getInstance(document.getElementById('insertLinkModal')!);
//       insertLinkModal?.hide();
//       this.linkUrl = '';
//     }
//   }

//   triggerImageUpload(): void {
//     this.imageInput.nativeElement.click();
//   }

//   handleImageUpload(event: any): void {
//     const files = event.target.files;
//     if (files.length > 0) {
//       const file = files[0];
//       const reader = new FileReader();
      
//       reader.onload = (e: any) => {
//         this.uploadedImages.push({
//           name: file.name,
//           url: e.target.result,
//           file: file
//         });
//       };
      
//       reader.readAsDataURL(file);
//     }
//   }

//   removeImage(index: number): void {
//     this.uploadedImages.splice(index, 1);
//   }

//   triggerFileUpload(): void {
//     this.fileInput.nativeElement.click();
//   }

//   handleFileUpload(event: any): void {
//     const files = event.target.files;
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       this.attachments.push({
//         name: file.name,
//         size: this.formatFileSize(file.size),
//         file: file
//       });
//     }
//   }

//   removeAttachment(index: number): void {
//     this.attachments.splice(index, 1);
//   }

//   onMessageInput(event: any): void {
//   }

//   formatFileSize(bytes: number): string {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   }

//   sendEmail(): void {
//     if (this.composeForm.valid) {
//       const newEmail = {
//         id: this.emails.length + 1,
//         sender: 'Me',
//         senderEmail: 'me@example.com',
//         avatar: 'assets/images/avatars/me.jpg',
//         subject: this.composeForm.value.subject || '(No Subject)',
//         preview: this.messageBody.nativeElement.textContent?.substring(0, 50) + '...',
//         time: 'Just now',
//         date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//         body: this.messageBody.nativeElement.innerHTML,
//         folder: 'sent',
//         starred: false,
//         selected: false,
//         attachments: [...this.attachments]
//       };

//       this.emails.push(newEmail);
//       this.filterEmails();
      
//       // Show success message
//       alert('Email sent successfully!');
//       this.closeComposeModal();
//       this.resetComposeForm();
//     }
//   }

//   saveDraft(): void {
//     const newEmail = {
//       id: this.emails.length + 1,
//       sender: 'Me',
//       senderEmail: 'me@example.com',
//       avatar: 'assets/images/avatars/me.jpg',
//       subject: this.composeForm.value.subject || '(No Subject)',
//       preview: this.messageBody.nativeElement.textContent?.substring(0, 50) + '...',
//       time: 'Just now',
//       date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//       body: this.messageBody.nativeElement.innerHTML,
//       folder: 'drafts',
//       starred: false,
//       selected: false,
//       attachments: [...this.attachments]
//     };

//     this.emails.push(newEmail);
//     this.filterEmails();
    
//     // Show success message
//     alert('Draft saved successfully!');
//     this.closeComposeModal();
//     this.resetComposeForm();
//   }

//   discardEmail(): void {
//     if (confirm('Are you sure you want to discard this email?')) {
//       this.resetComposeForm();
//       this.closeComposeModal();
//     }
//   }

//   resetComposeForm(): void {
//     this.composeForm.reset();
//     this.attachments = [];
//     this.uploadedImages = [];
//     if (this.messageBody) {
//       this.messageBody.nativeElement.innerHTML = 'Your Message Here...';
//     }
//   }
// }








// email.component.ts
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  @ViewChild('messageBody') messageBody!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('imageInput') imageInput!: ElementRef;

  foldersCollapsed = false;
  labelsCollapsed = false;
  contactsCollapsed = false;
  activeFolder = 'inbox';
  activeEmail: any = null;
  searchQuery = '';
  sidebarVisible = false;
  
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  paginatedEmails: any[] = [];

  composeForm: FormGroup;
  attachments: any[] = [];
  uploadedImages: any[] = [];
  linkUrl = '';
  private selection: any;

  contacts = [
    { name: 'Sarah Kortney', online: true, avatar: 'assets/gh (1).png' },
    { name: 'Tommy Nash', online: false, avatar: 'assets/gh (2).png' },
    { name: 'Kathryn Mengel', online: true, avatar: 'assets/hj.png' },
    { name: 'Mayra Sibley', online: true, avatar: 'assets/fv.png' },
    { name: 'John Doe', online: true, avatar: 'assets/hj.png' },
    { name: 'Alice Cooper', online: false, avatar: 'assets/j.jpg' },
    { name: 'Bob Smith', online: true, avatar: 'assets/kl.png' }
  ];

  emails = [
    {
      id: 1,
      sender: 'Johan Doe',
      senderEmail: 'johan@example.com',
      avatar: 'assets/1.jpg',
      subject: 'Lorem ipsum',
      preview: 'There are many variations of Ipsum available...',
      time: '2:45 PM',
      date: '22 JUL 2019 18:03 PM',
      body: `<p>Dear User,</p><p>Lorem ipsum dolorLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbc sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcfit...</p>`,
      folder: 'inbox',
      starred: false,
      selected: false,
      attachments: [
        { name: 'Mag.pdf', size: '5,215 KB' },
        { name: 'Document.docx', size: '2,145 KB' }
      ]
    },
    {
      id: 2,
      sender: 'Alice Smith',
      senderEmail: 'alice@example.com',
      avatar: 'assets/2.jpg',
      subject: 'Meeting Tomorrow',
      preview: 'Don\'t forget about our meeting tomorrow at 10 AM...',
      time: '1:30 PM',
      date: '21 JUL 2019 13:30 PM',
      body: '<p>Hi, just a reminder about our meeting tomorrow. Please bring the quarterly reports.</p>',
      folder: 'inbox',
      starred: true,
      selected: false
    },
    {
    id: 3,
    sender: 'Bob Johnson',
    senderEmail: 'bob@example.com',
    avatar: 'assets/7.jpg',
    subject: 'Project Update',
    preview: 'Here is the latest update on the project...',
    time: '11:15 AM',
    date: '21 JUL 2019 11:15 AM',
    body: '<p>The project is progressing well. We have completed phase one ahead of schedule.</p>',
    folder: 'inbox',
    starred: false,
    selected: false
  },
  {
    id: 4,
    sender: 'Pavan Kumar',
    senderEmail: 'pavan@domain.com',
    avatar: 'assets/avtar.png',
    subject: 'Your message title goes here',
    preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    time: '8:03 PM',
    date: '22 JUL 2019 08:03 PM',
    body: `<p>Dear User,</p><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit...</p>`,
    folder: 'inbox',
    starred: false,
    selected: false,
    attachments: [
      { name: 'Project.pdf', size: '3,215 KB' },
      { name: 'Budget.xlsx', size: '1,845 KB' }
    ]
  },
  {
    id: 5,
    sender: 'Sarah Wilson',
    senderEmail: 'sarah@example.com',
    avatar: 'assets/fv.png',
    subject: 'Weekly Report',
    preview: 'Please find attached the weekly performance report...',
    time: '4:20 PM',
    date: '20 JUL 2019 16:20 PM',
    body: '<p>Hello team, attached is the weekly performance report for your review.</p>',
    folder: 'inbox',
    starred: true,
    selected: false,
    attachments: [
      { name: 'Weekly_Report.pdf', size: '2,345 KB' }
    ]
  },
  {
    id: 6,
    sender: 'Mike Thompson',
    senderEmail: 'mike@example.com',
    avatar: 'assets/g.png',
    subject: 'Vacation Request',
    preview: 'I would like to request vacation days for next month...',
    time: '9:15 AM',
    date: '19 JUL 2019 09:15 AM',
    body: '<p>Dear Manager, I would like to request vacation from August 15-20.</p>',
    folder: 'inbox',
    starred: false,
    selected: false
  },
  {
    id: 7,
    sender: 'Emma Davis',
    senderEmail: 'emma@example.com',
    avatar: 'assets/gh (1).png',
    subject: 'Team Lunch',
    preview: 'Let\'s plan a team lunch for next Friday...',
    time: '3:45 PM',
    date: '18 JUL 2019 15:45 PM',
    body: '<p>Hi everyone, let\'s plan a team lunch next Friday. Please suggest venues.</p>',
    folder: 'inbox',
    starred: false,
    selected: false
  },
  {
    id: 8,
    sender: 'David Brown',
    senderEmail: 'david@example.com',
    avatar: 'assets/gh (2).png',
    subject: 'Client Meeting Notes',
    preview: 'Here are the notes from yesterday\'s client meeting...',
    time: '10:30 AM',
    date: '17 JUL 2019 10:30 AM',
    body: '<p>Please find attached the meeting notes from our client discussion.</p>',
    folder: 'inbox',
    starred: true,
    selected: false,
    attachments: [
      { name: 'Meeting_Notes.docx', size: '1,567 KB' }
    ]
  },
  {
    id: 9,
    sender: 'Lisa Anderson',
    senderEmail: 'lisa@example.com',
    avatar: 'assets/h.avif',
    subject: 'Budget Approval',
    preview: 'The Q3 budget has been approved by management...',
    time: '5:10 PM',
    date: '16 JUL 2019 17:10 PM',
    body: '<p>Good news! The Q3 budget has been approved. We can proceed with our plans.</p>',
    folder: 'inbox',
    starred: false,
    selected: false
  },
  {
    id: 10,
    sender: 'Robert Garcia',
    senderEmail: 'robert@example.com',
    avatar: 'assets/hj.png',
    subject: 'Training Session',
    preview: 'New software training session scheduled for next week...',
    time: '11:55 AM',
    date: '15 JUL 2019 11:55 AM',
    body: '<p>There will be a training session for the new software next Tuesday.</p>',
    folder: 'inbox',
    starred: false,
    selected: false
  },
  {
    id: 11,
    sender: 'Jennifer Lee',
    senderEmail: 'jennifer@example.com',
    avatar: 'assets/j.jpg',
    subject: 'Website Update',
    preview: 'The website update is now live with new features...',
    time: '2:25 PM',
    date: '14 JUL 2019 14:25 PM',
    body: '<p>The website update has been successfully deployed with all new features.</p>',
    folder: 'inbox',
    starred: true,
    selected: false
  },
  {
    id: 12,
    sender: 'Kevin Martin',
    senderEmail: 'kevin@example.com',
    avatar: 'assets/k.avif',
    subject: 'System Maintenance',
    preview: 'Scheduled system maintenance this weekend...',
    time: '4:40 PM',
    date: '13 JUL 2019 16:40 PM',
    body: '<p>There will be system maintenance this Saturday from 10 PM to 2 AM.</p>',
    folder: 'inbox',
    starred: false,
    selected: false
  },
    {
      id: 1,
      sender: 'Johan Doe',
      senderEmail: 'johan@example.com',
      avatar: 'assets/1.jpg',
      subject: 'Lorem ipsum',
      preview: 'There are many variations of Ipsum available...',
      time: '2:45 PM',
      date: '22 JUL 2019 18:03 PM',
      body: `<p>Dear User,</p><p>Lorem ipsum dolorLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcLorem ipsum dolor sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbc sit amet, consectetuer adipiscing elasfvldafhcasdfcbad;fvbdvhfdlfhagdcfhbcfit...</p>`,
      folder: 'inbox',
      starred: false,
      selected: false,
      attachments: [
        { name: 'Mag.pdf', size: '5,215 KB' },
        { name: 'Document.docx', size: '2,145 KB' }
      ]
    },
    {
      id: 2,
      sender: 'Alice Smith',
      senderEmail: 'alice@example.com',
      avatar: 'assets/2.jpg',
      subject: 'Meeting Tomorrow',
      preview: 'Don\'t forget about our meeting tomorrow at 10 AM...',
      time: '1:30 PM',
      date: '21 JUL 2019 13:30 PM',
      body: '<p>Hi, just a reminder about our meeting tomorrow. Please bring the quarterly reports.</p>',
      folder: 'inbox',
      starred: true,
      selected: false
    },
    {
    id: 3,
    sender: 'Bob Johnson',
    senderEmail: 'bob@example.com',
    avatar: 'assets/7.jpg',
    subject: 'Project Update',
    preview: 'Here is the latest update on the project...',
    time: '11:15 AM',
    date: '21 JUL 2019 11:15 AM',
    body: '<p>The project is progressing well. We have completed phase one ahead of schedule.</p>',
    folder: 'inbox',
    starred: false,
    selected: false
  },
  {
    id: 4,
    sender: 'Pavan Kumar',
    senderEmail: 'pavan@domain.com',
    avatar: 'assets/avtar.png',
    subject: 'Your message title goes here',
    preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    time: '8:03 PM',
    date: '22 JUL 2019 08:03 PM',
    body: `<p>Dear User,</p><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit...</p>`,
    folder: 'inbox',
    starred: false,
    selected: false,
    attachments: [
      { name: 'Project.pdf', size: '3,215 KB' },
      { name: 'Budget.xlsx', size: '1,845 KB' }
    ]
  },
  {
    id: 5,
    sender: 'Sarah Wilson',
    senderEmail: 'sarah@example.com',
    avatar: 'assets/fv.png',
    subject: 'Weekly Report',
    preview: 'Please find attached the weekly performance report...',
    time: '4:20 PM',
    date: '20 JUL 2019 16:20 PM',
    body: '<p>Hello team, attached is the weekly performance report for your review.</p>',
    folder: 'inbox',
    starred: true,
    selected: false,
    attachments: [
      { name: 'Weekly_Report.pdf', size: '2,345 KB' }
    ]
  },
  {
    id: 6,
    sender: 'Mike Thompson',
    senderEmail: 'mike@example.com',
    avatar: 'assets/g.png',
    subject: 'Vacation Request',
    preview: 'I would like to request vacation days for next month...',
    time: '9:15 AM',
    date: '19 JUL 2019 09:15 AM',
    body: '<p>Dear Manager, I would like to request vacation from August 15-20.</p>',
    folder: 'inbox',
    starred: false,
    selected: false
  },
  {
    id: 7,
    sender: 'Emma Davis',
    senderEmail: 'emma@example.com',
    avatar: 'assets/gh (1).png',
    subject: 'Team Lunch',
    preview: 'Let\'s plan a team lunch for next Friday...',
    time: '3:45 PM',
    date: '18 JUL 2019 15:45 PM',
    body: '<p>Hi everyone, let\'s plan a team lunch next Friday. Please suggest venues.</p>',
    folder: 'inbox',
    starred: false,
    selected: false
  },
  {
    id: 86,
    sender: 'David Brown',
    senderEmail: 'david@example.com',
    avatar: 'assets/gh (2).png',
    subject: 'Client Meeting Notes',
    preview: 'Here are the notes from yesterday\'s client meeting...',
    time: '10:30 AM',
    date: '17 JUL 2019 10:30 AM',
    body: '<p>Please find attached the meeting notes from our client discussion.</p>',
    folder: 'inbox',
    starred: true,
    selected: false,
    attachments: [
      { name: 'Meeting_Notes.docx', size: '1,567 KB' }
    ]
  },
  {
    id: 87,
    sender: 'Lisa Anderson',
    senderEmail: 'lisa@example.com',
    avatar: 'assets/h.avif',
    subject: 'Budget Approval',
    preview: 'The Q3 budget has been approved by management...',
    time: '5:10 PM',
    date: '16 JUL 2019 17:10 PM',
    body: '<p>Good news! The Q3 budget has been approved. We can proceed with our plans.</p>',
    folder: 'inbox',
    starred: false,
    selected: false
  },
  {
    id: 88,
    sender: 'Robert Garcia',
    senderEmail: 'robert@example.com',
    avatar: 'assets/hj.png',
    subject: 'Training Session',
    preview: 'New software training session scheduled for next week...',
    time: '11:55 AM',
    date: '15 JUL 2019 11:55 AM',
    body: '<p>There will be a training session for the new software next Tuesday.</p>',
    folder: 'inbox',
    starred: false,
    selected: false
  },
  {
    id: 89,
    sender: 'Jennifer Lee',
    senderEmail: 'jennifer@example.com',
    avatar: 'assets/j.jpg',
    subject: 'Website Update',
    preview: 'The website update is now live with new features...',
    time: '2:25 PM',
    date: '14 JUL 2019 14:25 PM',
    body: '<p>The website update has been successfully deployed with all new features.</p>',
    folder: 'inbox',
    starred: true,
    selected: false
  },
  {
    id: 90,
    sender: 'Kevin Martin',
    senderEmail: 'kevin@example.com',
    avatar: 'assets/k.avif',
    subject: 'System Maintenance',
    preview: 'Scheduled system maintenance this weekend...',
    time: '4:40 PM',
    date: '13 JUL 2019 16:40 PM',
    body: '<p>There will be system maintenance this Saturday from 10 PM to 2 AM.</p>',
    folder: 'inbox',
    starred: false,
    selected: false
  },
  // Sent Folder - 12 emails
  {
    id: 13,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/kl.png',
    subject: 'Re: Project Update',
    preview: 'Thanks for the update Bob...',
    time: '10:00 AM',
    date: '20 JUL 2019 10:00 AM',
    body: '<p>Thanks for the update. Looking forward to the next phase.</p>',
    folder: 'sent',
    starred: false,
    selected: false
  },
  {
    id: 14,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/m.avif',
    subject: 'Meeting Confirmation',
    preview: 'Confirming our meeting for tomorrow at 2 PM...',
    time: '3:20 PM',
    date: '19 JUL 2019 15:20 PM',
    body: '<p>Hi team, confirming our meeting tomorrow at 2 PM in conference room B.</p>',
    folder: 'sent',
    starred: false,
    selected: false
  },
  {
    id: 15,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/ml.png',
    subject: 'Report Submission',
    preview: 'Submitted the monthly sales report...',
    time: '11:45 AM',
    date: '18 JUL 2019 11:45 AM',
    body: '<p>Dear Manager, I have submitted the monthly sales report for review.</p>',
    folder: 'sent',
    starred: true,
    selected: false
  },
  {
    id: 16,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/nb (1).png',
    subject: 'Follow Up: Client Proposal',
    preview: 'Following up on the client proposal sent last week...',
    time: '9:30 AM',
    date: '17 JUL 2019 09:30 AM',
    body: '<p>Hello, just following up on the proposal I sent last week.</p>',
    folder: 'sent',
    starred: false,
    selected: false
  },
  {
    id: 17,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/nb (2).png',
    subject: 'Vacation Approval',
    preview: 'Your vacation request has been approved...',
    time: '2:15 PM',
    date: '16 JUL 2019 14:15 PM',
    body: '<p>Your vacation request for August 15-20 has been approved.</p>',
    folder: 'sent',
    starred: false,
    selected: false
  },
  {
    id: 18,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/ml.png',
    subject: 'Training Materials',
    preview: 'Sending the training materials for next week...',
    time: '4:50 PM',
    date: '15 JUL 2019 16:50 PM',
    body: '<p>Please find attached the training materials for next week\'s session.</p>',
    folder: 'sent',
    starred: false,
    selected: false,
    attachments: [
      { name: 'Training_Guide.pdf', size: '3,890 KB' }
    ]
  },
  {
    id: 19,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/o.avif',
    subject: 'Weekly Update',
    preview: 'Weekly team update and progress report...',
    time: '10:20 AM',
    date: '14 JUL 2019 10:20 AM',
    body: '<p>Here is this week\'s update on our project progress and milestones.</p>',
    folder: 'sent',
    starred: true,
    selected: false
  },
  {
    id: 20,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/q.avif',
    subject: 'Budget Review',
    preview: 'Review of Q3 budget allocations...',
    time: '1:40 PM',
    date: '13 JUL 2019 13:40 PM',
    body: '<p>Please review the attached Q3 budget allocations and provide feedback.</p>',
    folder: 'sent',
    starred: false,
    selected: false,
    attachments: [
      { name: 'Q3_Budget.xlsx', size: '2,345 KB' }
    ]
  },
  {
    id: 21,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/s.avif',
    subject: 'Client Feedback',
    preview: 'Summary of client feedback from last meeting...',
    time: '11:10 AM',
    date: '12 JUL 2019 11:10 AM',
    body: '<p>Here is a summary of the client feedback from our last meeting.</p>',
    folder: 'sent',
    starred: false,
    selected: false
  },
  {
    id: 22,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/w.avif',
    subject: 'Team Announcement',
    preview: 'Important announcement regarding team structure...',
    time: '3:35 PM',
    date: '11 JUL 2019 15:35 PM',
    body: '<p>Important announcement about changes to our team structure.</p>',
    folder: 'sent',
    starred: true,
    selected: false
  },
  {
    id: 23,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/1.jpg',
    subject: 'Project Deadline',
    preview: 'Reminder about upcoming project deadline...',
    time: '9:55 AM',
    date: '10 JUL 2019 09:55 AM',
    body: '<p>Friendly reminder that the project deadline is next Friday.</p>',
    folder: 'sent',
    starred: false,
    selected: false
  },
  {
    id: 24,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/2.jpg',
    subject: 'Thank You Note',
    preview: 'Thank you for your hard work on the recent project...',
    time: '5:25 PM',
    date: '09 JUL 2019 17:25 PM',
    body: '<p>Thank you everyone for your hard work on the recent project.</p>',
    folder: 'sent',
    starred: false,
    selected: false
  },

  // Drafts Folder - 12 emails
  {
    id: 25,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/7.jpg',
    subject: 'Draft Email',
    preview: 'This is a draft email...',
    time: '9:45 AM',
    date: '20 JUL 2019 09:45 AM',
    body: '<p>This is a draft email that I haven\'t sent yet.</p>',
    folder: 'drafts',
    starred: false,
    selected: false
  },
  {
    id: 26,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/avtar.png',
    subject: 'Client Proposal Draft',
    preview: 'Draft version of the client proposal...',
    time: '2:30 PM',
    date: '19 JUL 2019 14:30 PM',
    body: '<p>Draft version of the client proposal for review.</p>',
    folder: 'drafts',
    starred: true,
    selected: false
  },
  {
    id: 27,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/fv.png',
    subject: 'Monthly Report Draft',
    preview: 'Working draft of the monthly report...',
    time: '11:15 AM',
    date: '18 JUL 2019 11:15 AM',
    body: '<p>Working draft of the monthly report - needs final review.</p>',
    folder: 'drafts',
    starred: false,
    selected: false
  },
  {
    id: 28,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/g.png',
    subject: 'Team Meeting Agenda',
    preview: 'Draft agenda for next team meeting...',
    time: '4:40 PM',
    date: '17 JUL 2019 16:40 PM',
    body: '<p>Draft agenda for our next team meeting - please add items.</p>',
    folder: 'drafts',
    starred: false,
    selected: false
  },
  {
    id: 29,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/gh (1).png',
    subject: 'Budget Request Draft',
    preview: 'Draft of the budget request for next quarter...',
    time: '10:05 AM',
    date: '16 JUL 2019 10:05 AM',
    body: '<p>Draft version of the budget request for Q4.</p>',
    folder: 'drafts',
    starred: true,
    selected: false
  },
  {
    id: 30,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/gh (2).png',
    subject: 'Project Update Draft',
    preview: 'Draft of project update for stakeholders...',
    time: '3:20 PM',
    date: '15 JUL 2019 15:20 PM',
    body: '<p>Draft of the project update to be sent to stakeholders.</p>',
    folder: 'drafts',
    starred: false,
    selected: false
  },
  {
    id: 31,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/h.avif',
    subject: 'Presentation Outline',
    preview: 'Draft outline for upcoming presentation...',
    time: '1:50 PM',
    date: '14 JUL 2019 13:50 PM',
    body: '<p>Draft outline for the upcoming client presentation.</p>',
    folder: 'drafts',
    starred: false,
    selected: false
  },
  {
    id: 32,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/hj.png',
    subject: 'Training Schedule Draft',
    preview: 'Draft of new training schedule...',
    time: '11:30 AM',
    date: '13 JUL 2019 11:30 AM',
    body: '<p>Draft version of the new training schedule.</p>',
    folder: 'drafts',
    starred: true,
    selected: false
  },
  {
    id: 33,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/j.jpg',
    subject: 'Policy Update Draft',
    preview: 'Draft of updated company policies...',
    time: '2:45 PM',
    date: '12 JUL 2019 14:45 PM',
    body: '<p>Draft of the updated company policies for review.</p>',
    folder: 'drafts',
    starred: false,
    selected: false
  },
  {
    id: 34,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/k.avif',
    subject: 'Website Content Draft',
    preview: 'Draft content for website update...',
    time: '10:55 AM',
    date: '11 JUL 2019 10:55 AM',
    body: '<p>Draft content for the upcoming website update.</p>',
    folder: 'drafts',
    starred: false,
    selected: false
  },
  {
    id: 35,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/kl.png',
    subject: 'Newsletter Draft',
    preview: 'Draft of monthly newsletter...',
    time: '4:10 PM',
    date: '10 JUL 2019 16:10 PM',
    body: '<p>Draft version of this month\'s newsletter.</p>',
    folder: 'drafts',
    starred: true,
    selected: false
  },
  {
    id: 36,
    sender: 'Me',
    senderEmail: 'me@example.com',
    avatar: 'assets/m.avif',
    subject: 'Performance Review Draft',
    preview: 'Draft of team performance reviews...',
    time: '9:25 AM',
    date: '09 JUL 2019 09:25 AM',
    body: '<p>Draft of the quarterly team performance reviews.</p>',
    folder: 'drafts',
    starred: false,
    selected: false
  }
    // ... rest of your email data remains the same
  ];

  filteredEmails = [...this.emails];

  constructor(private fb: FormBuilder) {
    this.composeForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['']
    });
  }

  ngOnInit(): void {
    this.filterEmails();
    this.checkScreenSize();
    this.updatePagination();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const width = window.innerWidth;
    if (width <= 1000) {
      this.sidebarVisible = false;
    } else {
      this.sidebarVisible = true;
    }
  }

  toggleFolders(): void {
    this.foldersCollapsed = !this.foldersCollapsed;
  }

  toggleLabels(): void {
    this.labelsCollapsed = !this.labelsCollapsed;
  }

  toggleContacts(): void {
    this.contactsCollapsed = !this.contactsCollapsed;
  }

  setActiveFolder(folder: string): void {
    this.activeFolder = folder;
    this.filterEmails();
    this.activeEmail = null;
    this.currentPage = 1;
    this.updatePagination();
    if (window.innerWidth < 1000) {
      this.sidebarVisible = false;
    }
  }

  getFolderCount(folder: string): number {
    return this.emails.filter(email => email.folder === folder).length;
  }

  filterEmails(): void {
    this.filteredEmails = this.emails.filter(email => {
      const matchesFolder = email.folder === this.activeFolder;
      const matchesSearch = !this.searchQuery || 
        email.sender.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        email.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        email.preview.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      return matchesFolder && matchesSearch;
    });
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEmails.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEmails = this.filteredEmails.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  openEmailModal(email: any): void {
    this.activeEmail = email;
    const modalElement = document.getElementById('emailDetailModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  closeEmailModal(): void {
    this.activeEmail = null;
    const modal = Modal.getInstance(document.getElementById('emailDetailModal')!);
    modal?.hide();
  }

  toggleEmailSelection(email: any): void {
    email.selected = !email.selected;
  }

  toggleSelectAll(): void {
    const allSelected = this.isAllSelected();
    this.paginatedEmails.forEach(email => email.selected = !allSelected);
  }

  isAllSelected(): boolean {
    return this.paginatedEmails.length > 0 && this.paginatedEmails.every(email => email.selected);
  }

  deleteSelected(): void {
    this.paginatedEmails
      .filter(email => email.selected)
      .forEach(email => {
        email.folder = 'trash';
        email.selected = false;
      });
    this.filterEmails();
    if (this.activeEmail && this.activeEmail.folder === 'trash') {
      this.closeEmailModal();
    }
  }

  replyToSelected(): void {
    if (this.activeEmail) {
      this.replyToEmail(this.activeEmail);
    }
  }

  forwardSelected(): void {
    if (this.activeEmail) {
      this.forwardEmail(this.activeEmail);
    }
  }

  refreshEmails(): void {
    this.filterEmails();
  }

  toggleStar(email: any): void {
    email.starred = !email.starred;
    if (email.starred && email.folder !== 'starred') {
      email.folder = 'starred';
      this.filterEmails();
    } else if (!email.starred && email.folder === 'starred') {
      email.folder = 'inbox';
      this.filterEmails();
    }
  }

  printEmail(): void {
    window.print();
  }

  deleteEmail(email: any): void {
    email.folder = 'trash';
    this.filterEmails();
    this.closeEmailModal();
  }

  forwardEmail(email: any): void {
    this.closeEmailModal();
    this.openComposeModal();
    this.composeForm.patchValue({
      subject: `Fwd: ${email.subject}`,
    });
    this.messageBody.nativeElement.innerHTML = `<br><br>---------- Forwarded message ---------<br>From: ${email.sender}<br>Date: ${email.date}<br>Subject: ${email.subject}<br><br>${email.body}`;
  }

  replyToEmail(email: any): void {
    this.closeEmailModal();
    this.openComposeModal();
    this.composeForm.patchValue({
      to: email.senderEmail,
      subject: `Re: ${email.subject}`
    });
    this.messageBody.nativeElement.innerHTML = `<br><br>---------- Original Message ---------<br>From: ${email.sender}<br>Date: ${email.date}<br>Subject: ${email.subject}<br><br>${email.body}`;
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  openComposeModal(): void {
    const modalElement = document.getElementById('composeModal');
    if (modalElement) {
      const modal = new Modal(modalElement, {
        backdrop: 'static',
        keyboard: false
      });
      modal.show();
    }
  }

  closeComposeModal(): void {
    const modal = Modal.getInstance(document.getElementById('composeModal')!);
    modal?.hide();
  }

  formatText(command: string): void {
    this.restoreSelection();
    document.execCommand(command, false, '');
    this.messageBody.nativeElement.focus();
  }

  saveSelection(): void {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      this.selection = sel.getRangeAt(0);
    }
  }

  restoreSelection(): void {
    if (this.selection) {
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(this.selection);
    }
  }

  insertLink(): void {
    const insertLinkModal = new Modal(document.getElementById('insertLinkModal')!);
    insertLinkModal.show();
  }

  insertLinkToText(): void {
    if (this.linkUrl) {
      this.restoreSelection();
      document.execCommand('createLink', false, this.linkUrl);
      this.messageBody.nativeElement.focus();
      
      const insertLinkModal = Modal.getInstance(document.getElementById('insertLinkModal')!);
      insertLinkModal?.hide();
      this.linkUrl = '';
    }
  }

  triggerImageUpload(): void {
    this.imageInput.nativeElement.click();
  }

  handleImageUpload(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        this.uploadedImages.push({
          name: file.name,
          url: e.target.result,
          file: file
        });
      };
      
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number): void {
    this.uploadedImages.splice(index, 1);
  }

  triggerFileUpload(): void {
    this.fileInput.nativeElement.click();
  }

  handleFileUpload(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.attachments.push({
        name: file.name,
        size: this.formatFileSize(file.size),
        file: file
      });
    }
  }

  removeAttachment(index: number): void {
    this.attachments.splice(index, 1);
  }

  onMessageInput(event: any): void {
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  sendEmail(): void {
    if (this.composeForm.valid) {
      const newEmail = {
        id: this.emails.length + 1,
        sender: 'Me',
        senderEmail: 'me@example.com',
        avatar: 'assets/images/avatars/me.jpg',
        subject: this.composeForm.value.subject || '(No Subject)',
        preview: this.messageBody.nativeElement.textContent?.substring(0, 50) + '...',
        time: 'Just now',
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        body: this.messageBody.nativeElement.innerHTML,
        folder: 'sent',
        starred: false,
        selected: false,
        attachments: [...this.attachments]
      };

      this.emails.push(newEmail);
      this.filterEmails();
      
      alert('Email sent successfully!');
      this.closeComposeModal();
      this.resetComposeForm();
    }
  }

  saveDraft(): void {
    const newEmail = {
      id: this.emails.length + 1,
      sender: 'Me',
      senderEmail: 'me@example.com',
      avatar: 'assets/images/avatars/me.jpg',
      subject: this.composeForm.value.subject || '(No Subject)',
      preview: this.messageBody.nativeElement.textContent?.substring(0, 50) + '...',
      time: 'Just now',
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      body: this.messageBody.nativeElement.innerHTML,
      folder: 'drafts',
      starred: false,
      selected: false,
      attachments: [...this.attachments]
    };

    this.emails.push(newEmail);
    this.filterEmails();
    
    alert('Draft saved successfully!');
    this.closeComposeModal();
    this.resetComposeForm();
  }

  discardEmail(): void {
    if (confirm('Are you sure you want to discard this email?')) {
      this.resetComposeForm();
      this.closeComposeModal();
    }
  }

  resetComposeForm(): void {
    this.composeForm.reset();
    this.attachments = [];
    this.uploadedImages = [];
    if (this.messageBody) {
      this.messageBody.nativeElement.innerHTML = 'Your Message Here...';
    }
  }
}