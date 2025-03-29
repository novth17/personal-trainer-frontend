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
import Snackbar from "@mui/material/Snackbar";
import type { Customer } from "../types";
import { fetchCustomers } from "../fetch";
import AddCustomer from "./AddCustomerDialog";
import EditCustomer from "./EditCustomerDialog";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  //edit
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [columnDefs] = useState<ColDef<Customer>[]>([
    {
      width: 200,
      cellRenderer: (params: ICellRendererParams) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => handleEditButton(params)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => handleDeleteButton(params)}
          >
            Delete
          </Button>
        </div>
      ),
    },
    { field: "firstname", filter: true, width: 100 },
    { field: "lastname", filter: true, width: 150 },
    { field: "email", filter: true, width: 150 },
    { field: "phone", filter: true, width: 120 },
    { field: "streetaddress", filter: true },
    { field: "postcode", filter: true, width: 100 },
    { field: "city", filter: true, width: 100 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCustomers();
      setCustomers(result);
    };
    fetchData();
  }, []);

  const handleEditButton = (params: ICellRendererParams) => {
    const customerToEdit = params.data as Customer;
    setSelectedCustomer(customerToEdit);
    setEditDialogOpen(true);
  };

  const handleDeleteButton = (params: ICellRendererParams) => {
    if (window.confirm("Are you sure?")) {
      fetch(params.data._links.customer.href, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error when deleting customer");

          return response.json();
        })
        .then(() => fetchCustomers())
        .then(() => setSnackbarOpen(true))
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <h2>Customers</h2>
      <AddCustomer
        fetchCustomer={async () => {
          const updated = await fetchCustomers();
          setCustomers(updated);
        }}
      />

      <div style={{ width: "90%", height: 500 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          theme={themeMaterial}
        />
      </div>

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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Customer deleted successfully"
      />
    </>
  );
}
