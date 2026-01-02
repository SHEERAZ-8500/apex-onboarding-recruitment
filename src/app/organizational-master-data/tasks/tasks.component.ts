import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
    title = 'view';
  formTitle=""
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
        this.updatePagination();

    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {
        
        // set view mode loigc
      //  this.fetchSkills()
      }
      if  (this.title === 'edit'){
        this.formTitle="Edit Tasks"

      }
       if  (this.title === 'create'){
                this.formTitle="Create New Tasks"


      }
    });
  }

  // ✅ Dropdown Options
  dropdownOptions = {
    projects: [
      { code: 'PROJ001', name: 'E-commerce Website Development' },
      { code: 'PROJ002', name: 'Mobile Banking App' },
      { code: 'PROJ003', name: 'Inventory Management System' },
      { code: 'PROJ004', name: 'HR Management Software' },
      { code: 'PROJ005', name: 'School Management System' },
      { code: 'PROJ006', name: 'Hospital Management System' },
      { code: 'PROJ007', name: 'Real Estate Portal' },
      { code: 'PROJ008', name: 'Food Delivery App' },
      { code: 'PROJ009', name: 'Social Media Platform' },
      { code: 'PROJ010', name: 'Fitness Tracking App' }
    ],
    
    assignedToOptions: [
      { code: 'EMP001', name: 'John Smith', area: 'Frontend Development' },
      { code: 'EMP002', name: 'Emma Johnson', area: 'Backend Development' },
      { code: 'EMP003', name: 'Michael Brown', area: 'Database Management' },
      { code: 'EMP004', name: 'Sarah Davis', area: 'UI/UX Design' },
      { code: 'EMP005', name: 'Robert Wilson', area: 'Quality Assurance' },
      { code: 'EMP006', name: 'Lisa Anderson', area: 'Project Management' },
      { code: 'EMP007', name: 'David Miller', area: 'DevOps' },
      { code: 'EMP008', name: 'Jennifer Taylor', area: 'Mobile Development' },
      { code: 'EMP009', name: 'James Moore', area: 'Frontend Development' },
      { code: 'EMP010', name: 'Patricia Lee', area: 'Backend Development' }
    ],

    // Areas for the table display
    areas: [
      'Frontend Development',
      'Backend Development',
      'Database Management',
      'UI/UX Design',
      'Quality Assurance',
      'Project Management',
      'DevOps',
      'Mobile Development',
      'System Architecture',
      'Business Analysis'
    ]
  };

  // ✅ Tasks Data
  tasks = [
    {
      code: 'TASK001',
      name: 'Login Page Design',
      area: 'Frontend Development',
      assignToName: 'John Smith',
      assignToCode: 'EMP001',
      days: 3,
      hours: 24
    },
    {
      code: 'TASK002',
      name: 'API Integration',
      area: 'Backend Development',
      assignToName: 'Emma Johnson',
      assignToCode: 'EMP002',
      days: 5,
      hours: 40
    },
    {
      code: 'TASK003',
      name: 'Database Schema Design',
      area: 'Database Management',
      assignToName: 'Michael Brown',
      assignToCode: 'EMP003',
      days: 4,
      hours: 32
    },
    {
      code: 'TASK004',
      name: 'Mobile App UI Design',
      area: 'UI/UX Design',
      assignToName: 'Sarah Davis',
      assignToCode: 'EMP004',
      days: 6,
      hours: 48
    },
    {
      code: 'TASK005',
      name: 'Testing Framework Setup',
      area: 'Quality Assurance',
      assignToName: 'Robert Wilson',
      assignToCode: 'EMP005',
      days: 2,
      hours: 16
    }
  ];

 

  // ✅ Form Fields
  taskCode = '';
  selectedProject = '';
  taskName = '';
  assignedTo = '';
  days: number | null = null;
  hours: number | null = null;

  // ✅ State Variables
  showForm = false;
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 5;
     paginatedTasksList: any[] = [];


  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredTasks().length / this.itemsPerPage);
  }

   get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // ✅ Helper Methods
  getSelectedProjectName(): string {
    const project = this.dropdownOptions.projects.find(p => p.code === this.selectedProject);
    return project ? project.name : '';
  }

  getAssignedPersonName(): string {
    const person = this.dropdownOptions.assignedToOptions.find(p => p.code === this.assignedTo);
    return person ? person.name : '';
  }

  getAssignedPersonArea(): string {
    const person = this.dropdownOptions.assignedToOptions.find(p => p.code === this.assignedTo);
    return person ? person.area : '';
  }

  onProjectChange() {
    // Auto-populate task name based on project if not already set
    if (!this.taskName && this.selectedProject) {
      const project = this.dropdownOptions.projects.find(p => p.code === this.selectedProject);
      if (project) {
        this.taskName = `Task for ${project.name}`;
      }
    }
  }

  // ✅ Form Validation
  isFormValid(): boolean {
    return !!(
      this.taskCode &&
      this.selectedProject &&
      this.taskName &&
      this.assignedTo &&
      this.days !== null && this.days > 0 &&
      this.hours !== null && this.hours > 0
    );
  }

  // ✅ Pagination Data

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
        this.updatePagination();

  }


      updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const filtered = this.filteredTasks();
    this.paginatedTasksList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
            this.router.navigate(['/panel/organizational-master-data/create-new-tasks']);

  }

  createTask() {
    if (!this.isFormValid()) return;

    const assignedPerson = this.dropdownOptions.assignedToOptions.find(p => p.code === this.assignedTo);
    
    this.tasks.push({
      code: this.taskCode,
      name: this.taskName,
      area: assignedPerson ? assignedPerson.area : 'General',
      assignToName: this.getAssignedPersonName(),
      assignToCode: this.assignedTo,
      days: this.days || 0,
      hours: this.hours || 0
    });

    this.hideForm();
  }

  // ✅ Edit
  editTask() {
   
                this.router.navigate(['/panel/organizational-master-data/edit-tasks']);

    
   
  }

  updateTask() {
    if (this.editIndex === null || !this.isFormValid()) return;

    const assignedPerson = this.dropdownOptions.assignedToOptions.find(p => p.code === this.assignedTo);
    
    this.tasks[this.editIndex] = {
      code: this.taskCode,
      name: this.taskName,
      area: assignedPerson ? assignedPerson.area : 'General',
      assignToName: this.getAssignedPersonName(),
      assignToCode: this.assignedTo,
      days: this.days || 0,
      hours: this.hours || 0
    };

    this.hideForm();
  }

  // ✅ Delete
  deleteTask(index: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks.splice(index, 1);

      if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
        this.router.navigate(['/panel/organizational-master-data/view-all-tasks']);

  }

  resetForm() {
    this.taskCode = '';
    this.selectedProject = '';
    this.taskName = '';
    this.assignedTo = '';
    this.days = null;
    this.hours = null;
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredTasks() {
    if (!this.searchText.trim()) return this.tasks;

    const searchLower = this.searchText.toLowerCase();
    return this.tasks.filter(task =>
      task.code.toLowerCase().includes(searchLower) ||
      task.name.toLowerCase().includes(searchLower) ||
      task.area.toLowerCase().includes(searchLower) ||
      task.assignToName.toLowerCase().includes(searchLower) ||
      task.assignToCode.toLowerCase().includes(searchLower)
    );
  }
}