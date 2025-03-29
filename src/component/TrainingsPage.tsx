import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  themeMaterial,
} from "ag-grid-community";
import type { Training } from "../types";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings"
    )
      .then((response) => response.json())
      .then((data) => setTrainings(data._embedded.trainings))
      .catch((error) => console.error("Error fetching trainings:", error));
  }, []);

  const [columnDefs] = useState<ColDef<Training>[]>([
    { field: "date", filter: true },
    { field: "duration", filter: true },
    { field: "activity", filter: true },
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
