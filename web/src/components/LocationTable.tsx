import React, { useEffect, useState } from "react";
import { Space, Spin, Table, Input } from "antd";
import axios from "axios";

const { Search } = Input;

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
  const [locations, setLocations] = useState<Array<ListType>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const onSubmit = () => {};

  useEffect(() => {
    if (loading) {
      axios.get(`http://127.0.0.1:8000/hotzone/locations.json`).then((res) => {
        const tempLocations = res.data;
        setLocations(tempLocations);
        setLoading(false);
      });
    }
  }, [loading]);

  if (loading)
    return (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    );

  return (
    <Table
      dataSource={locations}
      columns={columns}
      footer={() => (
        <Search
          placeholder="Enter Location Name"
          allowClear
          loading={loading}
          enterButton="Add Location"
          size="large"
          onSearch={(name) => {
            axios
              .post("http://127.0.0.1:8000/hotzone/locations/", { name })
              .then((res) => {
                setLoading(true);
              })
              .catch((err) => console.log(err));
          }}
        />
      )}
    />
  );
};
