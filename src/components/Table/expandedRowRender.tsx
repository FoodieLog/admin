import type { TableColumnsType } from "antd";
import { Badge, Dropdown, Space, Table } from "antd";

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

const expandedRowRender = () => {
  const columns: TableColumnsType<ExpandedDataType> = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Status",
      key: "state",
      render: () => <Badge status="success" text="Finished" />,
    },
    { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
  ];
  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      date: "2014-12-24 23:12:00",
      name: "This is production name",
      upgradeNum: "Upgraded: 56",
    });
  }
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
export default expandedRowRender;
