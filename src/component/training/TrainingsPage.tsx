import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  themeMaterial,
} from "ag-grid-community";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Training } from "../../utils/types";
import { fetchTrainingsWithCustomers } from "../../utils/fetch";
import DeleteTrainingDialog from "./DeleteTrainingDialog";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [trainingToDelete, setTrainingToDelete] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTrainingsWithCustomers();
      setTrainings(result);
    };
    fetchData();
  }, []);

  const handleConfirmDelete = async () => {
    if (trainingToDelete) {
      await fetch(trainingToDelete, { method: "DELETE" });
      const updated = await fetchTrainingsWithCustomers();
      setTrainings(updated);
      setDeleteDialogOpen(false);
      setTrainingToDelete(null);
    }
  };

  const [columnDefs] = useState<ColDef<Training>[]>([
    {
      headerName: "Actions",
      field: "links[0].href",
      cellRenderer: (params: any) => (
        <IconButton
          aria-label="delete"
          color="error"
          size="small"
          onClick={() => {
            setTrainingToDelete(params.value);
            setDeleteDialogOpen(true);
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
      width: 90,
      filter: false,
      sortable: false,
    },
    {
      field: "date",
      headerName: "Date",
      valueGetter: (params) => {
        if (params.data && params.data.date) {
          return dayjs(params.data.date).format("DD.MM.YYYY HH:mm");
        }
      },
      filter: true,
    },
    { field: "duration", filter: true },
    { field: "activity", filter: true },
    {
      field: "customer",
      headerName: "Customer",
      valueGetter: (params) => {
        if (
          params.data &&
          params.data.customer &&
          params.data.customer.firstname &&
          params.data.customer.lastname
        ) {
          return `${params.data.customer.firstname} ${params.data.customer.lastname}`;
        } else {
          return "Unknown customer";
        }
      },
      filter: true,
    },
  ]);

  return (
    <div style={{ width: "90%", height: 500 }}>
      <h2>Trainings</h2>
      <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
        theme={themeMaterial}
      />
      <DeleteTrainingDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
