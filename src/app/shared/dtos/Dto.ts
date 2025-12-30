// Define a class
export class AllFormsLisitngDto {
  createdDate: string;
  name: string;
  publicId: string;
  version: number;

  constructor(createdDate: string, name: string, publicId: string, version: number) {
    this.createdDate = createdDate;
    this.name = name;
    this.publicId = publicId;
    this.version = version;
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