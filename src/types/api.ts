// Formato do corpo de erro devolvido pela API Spring Boot
export interface ErroApi {
  status: number;
  error: string;
  message?: string;
  errors?: { field?: string; defaultMessage?: string }[];
}
