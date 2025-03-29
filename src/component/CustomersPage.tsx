import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  themeMaterial,
  ICellRendererParams,
} from "ag-grid-community";
import Button from "@mui/material/Button";
import type { Customer } from "../types";
import { fetchCustomers } from "../fetch";
import AddCustomer from "./AddCustomerDialog";
import EditCustomer from "./EditCustomerDialog";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCustomers();
      setCustomers(result);
    };
    fetchData();
  }, []);

  const handleEdit = (params: ICellRendererParams) => {
    const customerToEdit = params.data as Customer;
    setSelectedCustomer(customerToEdit);
    setEditDialogOpen(true);
  };

  const [columnDefs] = useState<ColDef<Customer>[]>([
    {
      headerName: "Actions",
      cellRenderer: (params: ICellRendererParams) => (
        <Button
          size="small"
          variant="outlined"
          onClick={() => handleEdit(params)}
        >
          Edit
        </Button>
      ),
      width: 120,
    },
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
      <AddCustomer
        fetchCustomer={async () => {
          const updated = await fetchCustomers();
          setCustomers(updated);
        }}
      />
      <EditCustomer
        open={editDialogOpen}
        customer={selectedCustomer}
        onClose={() => setEditDialogOpen(false)}
        onSave={async () => {
          setEditDialogOpen(false);
          const updated = await fetchCustomers();
          setCustomers(updated);
        }}
      />

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
