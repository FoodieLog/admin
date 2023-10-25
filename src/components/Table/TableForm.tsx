import { Table } from "antd";
import expandedRowRender from "./expandedRowRender";
import { TableProps } from "@/types";
import { useState } from "react";
import useUserStore from "@/store/useUserStore";

function TableForm({ columns, data, expand = false }: TableProps) {
  const { userId, setUserId, setNickName, status, setStatus } = useUserStore();
  const onClickRow = () => {};
  return (
    <div>
      <Table
        onRow={(record) => {
          return {
            onClick: (event) => {
              event.preventDefault();
              setUserId(record.userId);
              setNickName(record.nickName);
              setStatus(record.userStatus);
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
