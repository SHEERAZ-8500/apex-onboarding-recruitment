import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


interface Post {
  code: string;
  name: string;
  location?: string;
  postType?: string;
  postCode?: string;
}

interface PostDetail {
  jobTitle: string;
  area: string;
  location: string;
  facility: string;
  post: string;
  employees: number;
}

@Component({
  selector: 'app-post',
  templateUrl: './post-assignment.component.html',
  styleUrls: ['./post-assignment.component.scss'],
})
export class PostAssignmentComponent {
  title = 'view';
  formTitle = ""
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.updatePagination();

    this.activatedRoute.data.subscribe(data => {
      this.title = data['title'];
      if (this.title === 'view') {

        // set view mode loigc
        //  this.fetchSkills()
      }
      if (this.title === 'edit') {
        this.formTitle = "Edit Post Assignment"

      }
      if (this.title === 'create') {
        this.formTitle = "Create New Post Assignment"


      }
    });
  }


  // ✅ Posts Data
  posts: Post[] = [
    { code: 'POSTA000001', name: 'Manager', location: 'Main Office', postType: 'Permanent', postCode: 'PC001' },
    { code: 'POSTA000002', name: 'Supervisor', location: 'Branch A', postType: 'Permanent', postCode: 'PC002' },
    { code: 'POSTA000003', name: 'Assistant', location: 'Branch B', postType: 'Temporary', postCode: 'PC003' },
    { code: 'POSTA000004', name: 'Clerk', location: 'Main Office', postType: 'Contract', postCode: 'PC004' },
    { code: 'POSTA000005', name: 'Officer', location: 'Headquarters', postType: 'Permanent', postCode: 'PC005' },
    { code: 'POSTA000006', name: 'Executive', location: 'Regional Office', postType: 'Permanent', postCode: 'PC006' },
    { code: 'POSTA000007', name: 'Coordinator', location: 'Main Office', postType: 'Temporary', postCode: 'PC007' },
    { code: 'POSTA000008', name: 'Specialist', location: 'Tech Center', postType: 'Permanent', postCode: 'PC008' },
  ];

  // ✅ Post Details Table Data (empty as per requirement)
  postDetails: PostDetail[] = [
    // Empty table as shown in screenshot
  ];

  // ✅ Posts List for Dropdown
  postsList: string[] = [
    'Manager',
    'Supervisor',
    'Assistant',
    'Clerk',
    'Officer',
    'Executive',
    'Coordinator',
    'Specialist',
    'Analyst',
    'Technician'
  ];


  // ✅ Form + State
  showForm = false;
  postCode = '';
  selectedPost = '';
  location = '';
  postType = '';
  postCodeField = '';
  isEdit = false;
  editIndex: number | null = null;
  searchText = '';

  // ✅ Pagination
  currentPage = 1;
  itemsPerPage = 8;
     paginatedPostsList: any[] = [];


  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredPosts().length / this.itemsPerPage);
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
    const filtered = this.filteredPosts();
    this.paginatedPostsList = filtered.slice(start, end);
  }



  onItemsPerChange(event: any) {
    this.currentPage = 1;
    this.updatePagination();
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
    this.router.navigate(['/panel/general-master-data/create-new-post-assignment']);



  }

  createPost() {
    if (!this.postCode || !this.selectedPost) return;

    this.posts.push({
      code: this.postCode,
      name: this.selectedPost,
      location: this.location,
      postType: this.postType,
      postCode: this.postCodeField
    });

    this.hideForm();
  }

  // ✅ Edit
  editPost() {
    this.router.navigate(['/panel/general-master-data/edit-post-assignment']);

  }

  updatePost() {
    if (this.editIndex === null) return;

    this.posts[this.editIndex] = {
      code: this.postCode,
      name: this.selectedPost,
      location: this.location,
      postType: this.postType,
      postCode: this.postCodeField
    };

    this.hideForm();
  }

  // ✅ Delete
  deletePost(index: number) {
    this.posts.splice(index, 1);

   if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    this.updatePagination();
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
    this.router.navigate(['/panel/general-master-data/view-all-post-assignment']);

  }

  resetForm() {
    this.postCode = '';
    this.selectedPost = '';
    this.location = '';
    this.postType = '';
    this.postCodeField = '';
    this.isEdit = false;
    this.editIndex = null;
  }

  hideForm() {
    this.resetForm();
    this.showForm = false;
  }

  // ✅ Search Filter
  filteredPosts() {
    if (!this.searchText.trim()) return this.posts;

    return this.posts.filter(post =>
      post.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
      post.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (post.location && post.location.toLowerCase().includes(this.searchText.toLowerCase())) ||
      (post.postType && post.postType.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  // ✅ Auto-generate code when post is selected
  onPostSelect() {
    if (this.selectedPost && !this.postCode) {
      // Generate code based on selected post
      const prefix = 'POSTA00000';
      const existingCount = this.posts.filter(p => p.name === this.selectedPost).length;
      this.postCode = `${prefix}${existingCount + 1}`;
    }
  }
}