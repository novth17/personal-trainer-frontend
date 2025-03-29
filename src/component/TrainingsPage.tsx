import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  themeMaterial,
} from "ag-grid-community";
import dayjs from "dayjs";
import type { Training } from "../types";
import { fetchTrainingsWithCustomers } from "../fetch";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTrainingsWithCustomers();
      setTrainings(result);
    };
    fetchData();
  }, []);

  const [columnDefs] = useState<ColDef<Training>[]>([
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
    </div>
  );
}
