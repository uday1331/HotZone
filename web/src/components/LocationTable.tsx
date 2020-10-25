import React, { useEffect, useState } from "react";
import { Space, Spin, Table } from "antd";
import axios from "axios";

interface ListType {
  id: string;
  x_coord: string;
  y_coord: string;
  name: string;
  address: string;
}

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "X Co-ordinate",
    dataIndex: "x_coord",
    key: "x_coord",
  },
  {
    title: "Y Co-ordinate",
    dataIndex: "y_coord",
    key: "y_coord",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

export const LocationTable: React.FC = () => {
  const [locations, setLocations] = useState<Array<ListType> | null>(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/hotzone/locations.json`).then((res) => {
      const tempLocations = res.data;
      setLocations(tempLocations);
    });

    setLocations(locations);
  }, []);

  if (!locations)
    return (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    );

  return <Table dataSource={locations} columns={columns} />;
};
