import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  themeMaterial,
} from "ag-grid-community";
import type { Customer } from "../types";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"
    )
      .then((response) => response.json())
      .then((data) => setCustomers(data._embedded.customers))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const [columnDefs] = useState<ColDef<Customer>[]>([
    { field: "firstname", filter: true },
    { field: "lastname", filter: true },
    { field: "email", filter: true },
    { field: "phone", filter: true },
    { field: "streetaddress", filter: true },
    { field: "postcode", filter: true },
    { field: "city", filter: true },
  ]);

  return (
    <div style={{ width: "90%", height: 500 }}>
      <h2>Customers</h2>
      <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
        theme={themeMaterial}
      />
    </div>
  );
}
