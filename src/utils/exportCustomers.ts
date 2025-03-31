import { GridApi } from "ag-grid-community";

export const exportCustomers = (gridApi: GridApi | null) => {
  if (!gridApi) return;

  gridApi.exportDataAsCsv({
    columnKeys: [
      "firstname",
      "lastname",
      "email",
      "phone",
      "streetaddress",
      "postcode",
      "city",
    ],
    fileName: "customers_export.csv",
  });
};
