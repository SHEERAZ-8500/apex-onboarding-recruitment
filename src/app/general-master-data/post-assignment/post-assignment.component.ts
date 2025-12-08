import { Component } from '@angular/core';

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

  get currentPageStart() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.filteredPosts().length / this.itemsPerPage);
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
  paginatedPosts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPosts().slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // ✅ Add New
  onNew() {
    this.resetForm();
    this.showForm = true;
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
  editPost(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.showForm = true;

    const post = this.posts[index];
    this.postCode = post.code;
    this.selectedPost = post.name;
    this.location = post.location || '';
    this.postType = post.postType || '';
    this.postCodeField = post.postCode || '';
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

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  // ✅ Form Control
  cancelForm() {
    this.hideForm();
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