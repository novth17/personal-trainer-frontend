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

//for ADD a training
export const fetchTrainingByPost = async (training: any) => {
  const response = await fetch(import.meta.env.VITE_TRAINING_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(training),
  });

  if (!response.ok) {
    throw new Error("Error adding training");
  }

  return response.json();
};

//for DELETE a training
export const fetchTrainingByDelete = async (id: number | string) => {
  const response = await fetch(`${import.meta.env.VITE_TRAINING_API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting training");
  }
};

//for DELETE a customer
export const fetchCustomerByDelete = async (url: string) => {
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting customer");
  }
};

// for ADD a customer
export const fetchCustomerByPost = (customer: any) => {
  return fetch(import.meta.env.VITE_CUSTOMER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error adding customer");
    }
    return response.json(); // no await here
  });
};
