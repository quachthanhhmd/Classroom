type NotiState = 'success' | 'error' | 'warning' | 'info';
export interface INotiReducer {
  state: NotiState;
  message: string;
  open: boolean;
}