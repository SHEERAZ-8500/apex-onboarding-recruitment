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
