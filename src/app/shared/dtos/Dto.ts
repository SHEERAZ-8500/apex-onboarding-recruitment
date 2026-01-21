// RequisitionDto for RequisitionComponent


export class InterviewSchedulingDto {
  interviewDate: string = '';
  interviewStartTime: string = '';
  selectedLocation: string = '';
  meetingURL: string = '';
  selectedInterviewer: string = '';
  selectedStatus: string = '';
  remarks: string = '';
  interviewRemarks: string = '';
  selectedCandidate: string = '';

  constructor(init?: Partial<InterviewSchedulingDto>) {
    Object.assign(this, init);
  }
}
// Define a class
export class AllFormsLisitngDto {
  createdDate: string;
  name: string;
  publicId: string;
  version: number;
  status: string;

  constructor(createdDate: string, name: string, publicId: string, version: number, status: string) {
    this.createdDate = createdDate;
    this.name = name;
    this.publicId = publicId;
    this.version = version;
    this.status = status;
  }
}

export class FormDto {
  formCode!: string;
  displayName!: string;
  systemDefined!: boolean;
  status!: string;
   constructor(data?: Partial<FormDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}


export class FormSubmissionDto {
  publicId!: string;
  formDefinitionPublicId!: string;
  formName!: string;
  submittedAt!: string;
  submittedBy!: string;


  constructor(data?: Partial<FormSubmissionDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}



export class RequestionLookupDto {
  code: string = '';
  name: string = '';
  description: string = '';
  status: boolean = true;
  internetAddress: string = '';
  emailAddress: string = '';
  telephone: string = '';

  constructor(init?: Partial<RequestionLookupDto>) {
    Object.assign(this, init);
  }
}

export class DynamicFieldDto {
  fieldCode: string = '';
  label: string = '';
  fieldType: string = '';
  systemDefined: boolean = false;
  createdDate: string = '';
  lookupTable: string = '';
  nullable: boolean = true;
  displayOrder: number = 0;
  required: boolean = false;
  linkedComponent: string = '';
  active: boolean = true;
  dbColumnName: string = '';
  maxLength: number | null = null;
  enumClass: string = '';
  enumValues: string[] = [];
  rowColumns: any[] = [];

  // UI state properties
  isDropdownOpen?: boolean = false;
  options?: any[] = [];
  optionsLoaded?: boolean = false;

  constructor(init?: Partial<DynamicFieldDto>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}

export class CreateFormDto {
  code: string = '';
  name: string = '';

  constructor(init?: Partial<CreateFormDto>) {
    Object.assign(this, init);
  }
}


export class CreateColumnDto {
  name: string = '';
  type: string = '';
  maxLength: number | null = null;
  precision: number | null = null;
  scale: number | null = null;
  nullable: boolean = true;
  displayOrder: number | null = null;

  constructor(init?: Partial<CreateColumnDto>) {
    Object.assign(this, init);
  }
}


export class createNewColumnInIndependentTableDto {
  name: string = '';
  type: string = '';
  maxLength: number | null = null;
  precision: number | null = null;
  scale: number | null = null;
  nullable: boolean = true;
  displayOrder: number | null = null;
  active: boolean = true;
  lookupComponentCode: string = '';



  constructor(init?: Partial<createNewColumnInIndependentTableDto>) {
    Object.assign(this, init);
  }
}


export class ReqFormDto {
  requisitionNumber: number | null = null;
  requisitionName: string = '';
  designationName: string = '';
  noOfInterviews: number | null = null;
  noOfEmployeeIntraCountry: number | null = null;
  noOfEmployeeInterCountry: number | null = null;
  requiredDate: Date | null = null;
  trainingRequired: boolean = true;
  description: string = '';
  status: boolean = true;

  constructor(init?: Partial<ReqFormDto>) {
    Object.assign(this, init);
  }
}


// CandidateDto for CandidatesComponent
export class CandidateDto {
  id: number | null = null;
  firstName: string = '';
  lastName: string = '';
  requisition: string = '';
  email: string = '';
  contact1: string = '';
  contact2: string = '';
  applicationDate: Date | null = null;
  department: string = '';
  designation: string = '';
  dob: Date | null = null;
  expectedDOJ: Date | null = null;
  gender: string = '';
  linkedIn: string = '';
  religion: string = '';
  country: string = '';
  city: string = '';
  category: string = '';
  onboardingStatus: string = '';
  candidateStatus: string = '';
  remarks: string = '';

  // Company Details
  companyName: string = '';
  companyFrom: Date | null = null;
  companyTo: Date | null = null;
  position: string = '';
  lastSalary: number | null = null;
  companyRemarks: string = '';

  // Skills
  skillName: string = '';
  skillRating: string = '';
  skillRemarks: string = '';

  // Qualification
  qualificationName: string = '';
  passingYear: string = '';
  institute: string = '';
  grade: string = '';
  qualificationRemarks: string = '';

  // Attachments
  attachmentId: string = '';
  fileName: string = '';
  attachmentRemarks: string = '';

  constructor(init?: Partial<CandidateDto>) {
    Object.assign(this, init);
  }
}


export class FinalScreeningFormDto {
  id: number | null = null;
  candidateID: number | null = null;
  status: string = '';
  DOJ: string = '';
  finalDeciosionRemarks: string = '';
  payElement: string = '';
  effectiveDate: string = '';
  payFrequency: string = '';
  amount: number | null = null;
  remarks: string = '';

  constructor(init?: Partial<FinalScreeningFormDto>) {
    Object.assign(this, init);
  }
}





export class FieldConfigDto {
  source: 'CURRENT_USER' | string = 'CURRENT_USER';
  editable: boolean = false;
  selection: 'SINGLE' | 'MULTIPLE' = 'SINGLE';
}



export class RequisitionBackendFieldsDto {
  fieldCode: string = 'hiring_manager';
  label: string = 'Hiring Manager';
  fieldType: 'LOOKUP_TABLE' | string = 'LOOKUP_TABLE';
  systemDefined: boolean = true;
  createdDate: string = '';
  lookupTable: string = 'app_user';
  nullable: boolean = true;
  displayOrder: number = 7;
  lifecycleStatus: 'ACTIVE' | string = 'ACTIVE';
  required: boolean = false;
  linkedComponent: string = 'app_user';
  fieldConfig: FieldConfigDto = new FieldConfigDto();
  active: boolean = true;
  constructor(init?: Partial<RequisitionDto>) {
    if (init) {
      Object.assign(this, init);
    } 
  }
}


export class RequisitionDto {
  // requisitionId: number | null = null;
  requisition_name: string = '';
  department: string = '';
  job_title: string = '';
  designation: string = '';
  required_count: number | null = null;
  required_date: string = '';
  job_description: string = '';
  hiring_manager: string = '';
  is_active: boolean = false;

  constructor(init?: Partial<RequisitionDto>) {
    Object.assign(this, init);
  }
}


export class LookupDto {
  code: string = '';
  description: string = '';
  name: string = '';
  publicId: string = '';

  constructor(init?: Partial<LookupDto>) {
    if (init) {
      Object.assign(this, init);
    }
  } }


