import React, { useEffect, useState } from "react";
import { Space, Spin, Table, Input, Alert } from "antd";
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
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (loading) {
      axios
        .get(`https://hotzone3035552765.herokuapp.com/hotzone/locations.json`)
        .then((res) => {
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
                .post(
                  "https://hotzone3035552765.herokuapp.com/hotzone/locations/",
                  { name }
                )
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
