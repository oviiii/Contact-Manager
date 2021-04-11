import { NbComponentStatus } from '@nebular/theme';

export const CONTACT_STATUS = [
  {
    id: 1,
    name: 'Active',
  },
  {
    id: 2,
    name: 'Inactive',
  },
];

export enum ContactStatusEnum {
  Active = 1,
  Inactive = 2,
}

export const toasterTypes: NbComponentStatus[] = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
];

export const emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

export const phonePattern = /^(1-)?\d{3}-\d{3}-\d{4}$/;
