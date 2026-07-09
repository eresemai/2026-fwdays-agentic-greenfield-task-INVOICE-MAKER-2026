export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  address?: string;
  taxId?: string;
  createdAt: string;
  updatedAt: string;
}
