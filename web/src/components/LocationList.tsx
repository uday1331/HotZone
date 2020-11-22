import React, { useEffect, useState } from "react";
import { Space, Spin, Table } from "antd";
import axios from "axios";

import { LocationType } from "../interfaces";
import { locationListColumns } from "../utils";

export const LocationList: React.FC = () => {
  const [locations, setLocations] = useState<Array<LocationType>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      axios
        .get(`https://group-q-hotzone.herokuapp.com/hotzone/locations.json` , {
          headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
          }
        })
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

  return <Table dataSource={locations} columns={locationListColumns} />;
};
