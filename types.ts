export interface Contact {
  [key: string]: string | undefined;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  prefix?: string;
  suffix?: string;
  fullName?: string;
  email?: string;
  email2?: string;
  email3?: string;
  phoneHome?: string;
  phoneMobile?: string;
  phoneWork?: string;
  organization?: string;
  jobTitle?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  website?: string;
  notes?: string;
  group?: string;
}

export enum AppState {
  IDLE = 'IDLE',
  VALIDATING = 'VALIDATING',
  PREVIEW = 'PREVIEW',
  CONVERTING = 'CONVERTING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}
