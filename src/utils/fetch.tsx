/**
 * Fetch helpers for Customer and Training data.
 *
 * Includes functions to fetch customers, trainings, and trainings with resolved customer info.
 * Handles basic fetch errors and returns typed results.
 */

import type { Customer, Training } from "./types";

const CUSTOMER_API_URL = import.meta.env.VITE_CUSTOMER_API_URL;
const TRAINING_API_URL = import.meta.env.VITE_TRAINING_API_URL;
const TRAINING_CUSTOMER_API_URL = import.meta.env.VITE_GET_TRAININGS_API_URL;

export async function fetchCustomers(): Promise<Customer[]> {
  const response = await fetch(CUSTOMER_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }
  const data = await response.json();
  return data._embedded.customers;
}

export async function fetchTrainings(): Promise<Training[]> {
  const response = await fetch(TRAINING_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch trainings");
  }
  const data = await response.json();
  return data._embedded.trainings;
}

export async function fetchTrainingsWithCustomers(): Promise<Training[]> {
  const response = await fetch(TRAINING_CUSTOMER_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch trainings with customers");
  }
  const data: Training[] = await response.json();
  return data;
}
