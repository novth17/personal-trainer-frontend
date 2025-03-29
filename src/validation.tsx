import type { Customer, Training } from "./utils/types";

export function validateCustomer(customer: Customer): string | null {
  if (!customer.email.includes("@")) return "Input correct email format";
  if (!/^\d+$/.test(customer.postcode))
    return "Postcode must contain only numbers";
  return null;
}

export function validateTraining(training: Training): string | null {
  if (training.duration <= 0) return "Input correct duration";
  if (!training.date) return "Date is required";
  return null;
}
