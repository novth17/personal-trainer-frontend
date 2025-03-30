import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  themeMaterial,
  ICellRendererParams,
} from "ag-grid-community";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Training } from "../../utils/types";
import { fetchTrainingsWithCustomers } from "../../utils/fetch";
import DeleteTrainingDialog from "./DeleteTrainingDialog";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [trainingToDelete, setTrainingToDelete] = useState<Training | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // ✅ Fetch trainings on initial render
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTrainingsWithCustomers();
      setTrainings(result);
    };
    fetchData();
  }, []);

  // ✅ Delete training and refresh data
  const confirmDeleteTraining = async () => {
    if (!trainingToDelete) return;

    try {
      const response = await fetch(trainingToDelete._links.training.href, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error deleting training");

      const updated = await fetchTrainingsWithCustomers();
      setTrainings(updated);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setTrainingToDelete(null);
    }
  };

  const columnDefs: ColDef<Training>[] = [
    {
      headerName: "Actions",
      width: 90,
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
            aria-label="delete"
            size="small"
            color="error"
            onClick={() => setTrainingToDelete(params.data)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ),
      filter: false,
      sortable: false,
    },
    {
      field: "date",
      headerName: "Date",
      valueGetter: (params) =>
        params.data?.date
          ? dayjs(params.data.date).format("DD.MM.YYYY HH:mm")
          : "",
      filter: true,
    },
    { field: "duration", filter: true },
    { field: "activity", filter: true },
    {
      field: "customer",
      headerName: "Customer",
      valueGetter: (params) => {
        const c = params.data?.customer;
        return c?.firstname && c?.lastname ? `${c.firstname} ${c.lastname}` : "Unknown customer";
      },
      filter: true,
    },
  ];

  return (
    <>
      <h2>Trainings</h2>

      <div className="ag-theme-material" style={{ width: "90%", height: 500 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          theme={themeMaterial}
        />
      </div>

      <DeleteTrainingDialog
        training={trainingToDelete}
        onCancel={() => setTrainingToDelete(null)}
        onDelete={confirmDeleteTraining}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Training deleted successfully!"
      />
    </>
  );
}
