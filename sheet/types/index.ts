import { KeyedMutator } from 'swr';

export interface PageParams {
  page: number;
  pageSize: number;
}

export type AccountData = {
  id: number;
  name: string;
  mail: string;
  totalBalance: number;
  issueDate: number;
  balance: number;
  hasPaid: boolean;
};

export interface AccountDataRequestInput extends PageParams {
  value: string;
}

export interface AccountDataResult {
  data: AccountData[];
  total: number;
}

export type RefreshData = KeyedMutator<AccountDataResult>;
