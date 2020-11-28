import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Space, Spin, Table } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

import { LocationType } from "../interfaces";
import { locationListColumns } from "../utils";

export const LocationList: React.FC = () => {
  const [locations, setLocations] = useState<Array<LocationType>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      axios
        .get(
          `https://hotzone-group-q-final.herokuapp.com/hotzone/locations.json`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
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
      <Link to="/addlocation">
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          size="large"
          style={{
            marginBottom: 40,
          }}
        >
          Add Location
        </Button>
      </Link>
      <Table dataSource={locations} columns={locationListColumns} />
    </>
  );
};
