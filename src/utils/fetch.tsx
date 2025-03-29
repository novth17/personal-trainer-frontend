/**
 * Fetch helpers for Customer and Training data.
 *
 * Includes functions to fetch customers, trainings, and trainings with resolved customer info.
 * Handles basic fetch errors and returns typed results.
 */

import type { Customer, Training } from "./types";

const CUSTOMER_API_URL = import.meta.env.VITE_CUSTOMER_API_URL;
const TRAINING_API_URL = import.meta.env.VITE_TRAINING_API_URL;

export async function fetchCustomers(): Promise<Customer[]> {
  const response = await fetch(CUSTOMER_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }
  const data = await response.json();
  return data._embedded.customers;
}

export async function fetchTrainings(): Promise<Training[]> {
  const res = await fetch(TRAINING_API_URL);
  const data = await res.json();
  return data._embedded.trainings;
}

export async function fetchTrainingsWithCustomers(): Promise<Training[]> {
  const response = await fetch(import.meta.env.VITE_TRAINING_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch trainings with customers");
  }

  const data = await response.json();
  const rawTrainings = data._embedded.trainings;

  const trainingsWithCustomer = await Promise.all(
    rawTrainings.map(async (t: any) => {
      let customer = {
        firstname: "Unknown",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
      };

      try {
        const res = await fetch(t._links.customer.href);
        customer = await res.json();
      } catch (e) {
        console.error("Failed to fetch customer", e);
      }

      return {
        date: t.date,
        duration: t.duration,
        activity: t.activity,
        customer,
      };
    })
  );

  return trainingsWithCustomer;
}
