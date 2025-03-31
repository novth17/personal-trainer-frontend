import { useRef } from "react";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  ICellRendererParams,
  GridApi,
} from "ag-grid-community";
import Snackbar from "@mui/material/Snackbar";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Customer } from "../../utils/types";
import { fetchCustomers } from "../../utils/fetch";
import AddCustomer from "./AddCustomerDialog";
import EditCustomer from "./EditCustomerDialog";
import DeleteCustomerDialog from "./DeleteCustomerDialog";
import AddTrainingDialog from "../training/AddTrainingDialog";
import { exportCustomers } from "../../utils/exportCustomers";
import { Tooltip } from "@mui/material";


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
  const gridApiRef = useRef<GridApi | null>(null);

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
      width: 130,
      cellRenderer: (params: ICellRendererParams) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.3rem",
            height: "100%",
          }}
        >
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleEditButton(params)}
            sx={{
              color: "#0077b6",
              "&:hover": {
                backgroundColor: "#e0f7fa",
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => setCustomerToDelete(params.data)}
            sx={{
              color: "#d32f2f",
              "&:hover": {
                backgroundColor: "#fce4ec",
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          <AddTrainingDialog
            customer={params.data}
            onTrainingAdded={async () => {}}
          />
        </div>
      ),
    },
    { field: "firstname", filter: true, width: 120 },
    { field: "lastname", filter: true, width: 120 },
    { field: "email", filter: true, width: 180 },
    { field: "phone", filter: true, width: 120 },
    { field: "streetaddress", filter: true, width: 170 },
    { field: "postcode", filter: true, width: 120 },
    { field: "city", filter: true, width: 110 },
  ];

  return (
    <>
      <h2>Customers</h2>

      <div
        style={{
          display: "flex",
          marginBottom: "1rem",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <AddCustomer
          fetchCustomer={async () => {
            const updated = await fetchCustomers();
            setCustomers(updated);
          }}
        />

        <Tooltip title="Export to CSV">
          <IconButton
            aria-label="Export customers"
            onClick={() => exportCustomers(gridApiRef.current)}
            sx={{
              color: "#2e7d32",
              backgroundColor: "#e8f5e9",
              "&:hover": {
                backgroundColor: "#c8e6c9",
              },
              marginTop: "-17px",
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>
      </div>

      <div className="ag-theme-material" style={{ width: "95%", height: 500 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          onGridReady={(params) => {
            gridApiRef.current = params.api;
          }}
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
