export interface AlertProps { 
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}