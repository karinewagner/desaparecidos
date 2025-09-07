export type AlertType = "success" | "error" | "info";

export interface AlertProps {
  message: string;
  type?: AlertType;
  duration?: number;
  onClose: () => void;
}
