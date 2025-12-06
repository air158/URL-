export interface ParamEntry {
  id: string;
  key: string;
  value: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}