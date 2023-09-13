"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

function DataTable({ rows, columns, page, pageSize }: any) {
  return (
    <div className="">
      <DataGrid
        className="w-full h-full"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page, pageSize },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
export default DataTable;
