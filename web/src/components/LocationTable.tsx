import React, { useEffect, useState } from "react";
import { Space, Spin, Table, Input, Alert } from "antd";
import axios from "axios";

import { LocationType } from "../interfaces";

const { Search } = Input;

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
  const [locations, setLocations] = useState<Array<LocationType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (loading) {
      axios.get(`http://localhost:8000/hotzone/locations.json`).then((res) => {
        setLocations(res?.data);
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
    <>
      {alert ? (
        <Alert
          style={{ marginBottom: 10 }}
          banner
          message={alert.message}
          type={alert.type}
          showIcon
          closable
        />
      ) : null}

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
                .post("http://localhost:8000/hotzone/locations/", { name })
                .then((res) => {
                  setLoading(true);
                  setAlert({
                    type: "success",
                    message: "Successfully Created",
                  });
                })
                .catch((err) => {
                  setAlert({
                    type: "error",
                    message: err.response.data,
                  });
                });
            }}
          />
        )}
      />
    </>
  );
};
