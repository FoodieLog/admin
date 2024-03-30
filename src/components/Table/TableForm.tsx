import { Table } from "antd";
import expandedRowRender from "./expandedRowRender";
import { TableProps } from "@/types";
import { useState } from "react";
import useUserStore from "@/store/useUserStore";
import { Key, RowSelectionType } from "antd/es/table/interface";
import useReportStore from "@/store/useReportStore";

function TableForm({ columns, data, expand = false, page }: TableProps) {
  const { setUserId, setNickName, setStatus } = useUserStore();
  const { setReportData } = useReportStore();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSelectChange = (selectedRowKeys: Key[], selectedRows: any[]) => {
    setSelectedRowKeys(selectedRowKeys);

    if (page === "user") {
      setUserId(selectedRows[0].userId);
      setNickName(selectedRows[0].nickName);
      setStatus(selectedRows[0].userStatus);
    }

    if (page === "report") {
      setReportData(selectedRows[0]);
    }
  };

  const rowSelection = {
    type: "radio" as RowSelectionType,
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <Table
        rowKey={(record) => (page === "user" ? record.userId : record.reportId)}
        rowSelection={rowSelection}
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
