import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
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
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

export const LocationTable: React.FC = () => {
  const [locations, setLocations] = useState();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/hotzone/locations.json`).then((res) => {
      const tempLocations = res.data;
      setLocations(tempLocations);
    });

    setLocations(locations);
  }, []);

  return <Table dataSource={locations} columns={columns} />;
};
