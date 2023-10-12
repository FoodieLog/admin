import { Table } from "antd";
import expandedRowRender from "./expandedRowRender";
import { TableProps } from "@/types";
import Modal from "@/components/Modal";
import { useState } from "react";

function TableForm({ columns, data, expand = false }: TableProps) {
  const [userId, setUserId] = useState(0);
  const onClickRow = () => {};
  return (
    <div>
      <Table
        onRow={(record) => {
          return {
            onClick: (event) => {
              event.preventDefault();
              setUserId(record.userId);
            },
          };
        }}
        columns={columns}
        dataSource={data}
        expandable={
          expand
            ? { expandedRowRender, defaultExpandedRowKeys: ["0"] }
            : undefined
        }
      />
    </div>
  );
}

export default TableForm;
