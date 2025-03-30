import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import type { Customer } from "../utils/types";
import { fetchCustomers } from "../utils/fetch";
import AddCustomer from "./AddCustomerDialog";
import EditCustomer from "./EditCustomerDialog";
import DeleteCustomerDialog from "./DeleteCustomerDialog";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const confirmAndDeleteCustomer = async () => {
    if (!customerToDelete) return;

    try {
      const response = await fetch(customerToDelete._links.customer.href, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error deleting customer");

      const updated = await fetchCustomers();
      setCustomers(updated);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setCustomerToDelete(null); // reset selected customer
    }
  };

  const columnDefs: ColDef<Customer>[] = [
    {
      headerName: "Actions",
      width: 170,
      cellRenderer: (params: ICellRendererParams) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            height: "100%",
          }}
        >
          <Button
            size="small"
            sx={{
              color: "#0077b6",
              borderColor: "#0077b6",
              "&:hover": {
                backgroundColor: "#e0f2f1",
                borderColor: "#005f87",
              },
            }}
            variant="outlined"
            onClick={() => handleEditButton(params)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => setCustomerToDelete(params.data)}
          >
            Delete
          </Button>
        </div>
      ),
    },
    { field: "firstname", filter: true, width: 120 },
    { field: "lastname", filter: true, width: 120 },
    { field: "email", filter: true, width: 150 },
    { field: "phone", filter: true, width: 120 },
    { field: "streetaddress", filter: true, width: 150 },
    { field: "postcode", filter: true, width: 120 },
    { field: "city", filter: true, width: 110 },
  ];

  return (
    <>
      <h2>Customers</h2>

      <AddCustomer
        fetchCustomer={async () => {
          const updated = await fetchCustomers();
          setCustomers(updated);
        }}
      />

      <div className="ag-theme-material" style={{ width: "95%", height: 500 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>

      <DeleteCustomerDialog
        customer={customerToDelete}
        onCancel={() => setCustomerToDelete(null)}
        onDelete={confirmAndDeleteCustomer}
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Customer deleted successfully"
      />
    </>
  );
}
