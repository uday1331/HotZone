import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  Input,
  Radio,
  notification,
  Space,
  Spin,
  message,
} from "antd";
import axios from "axios";

import { LocationType } from "../interfaces";

const { Title } = Typography;
const { Search } = Input;
const { Meta } = Card;

export const AddLocation: React.FC = () => {
  const [options, setOptions] = useState<Array<LocationType>>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [listLoading, setListLoading] = useState<boolean>(false);

  return (
    <>
      <Title level={2}>Add location to HotZone</Title>
      <Search
        placeholder="Enter Location Name"
        loading={false}
        enterButton="Search Location"
        size="large"
        style={{
          marginBottom: 40,
        }}
        onSearch={async (query) => {
          setListLoading(true);
          await axios
            .get(
              `https://group-q-hotzone.herokuapp.com/hotzone/locations/${query}`,
              {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              setOptions(res?.data);
            })
            .catch((err) => {
              message.error(`Error Finding Location`);
            });
          setListLoading(false);
        }}
      />
      {selected !== null && (
        <Button
          type="primary"
          style={{ width: "100%", marginBottom: 40 }}
          loading={addLoading}
          onClick={async () => {
            setAddLoading(true);
            await axios
              .post(
                "https://group-q-hotzone.herokuapp.com/hotzone/locations/",
                options[selected],
                {
                  headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                  },
                }
              )
              .then((res) => {
                message.success(
                  `Location Created: ${JSON.stringify(res.data)}`
                );
                setOptions([]);
                setSelected(null);
              })
              .catch((err) => {
                message.error(`Location Creation Error: ${err.response.data}`);
                setSelected(null);
              });
            setAddLoading(false);
          }}
        >
          Create Location
        </Button>
      )}
      {listLoading ? (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      ) : (
        <Radio.Group
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
          style={{ width: "100%" }}
        >
          {options?.map(({ name, address, x_coord, y_coord }, idx) => (
            <Card key={idx}>
              <Meta
                avatar={
                  <Radio value={idx}>
                    {name}
                    {address && `, ${address}`} - {x_coord}, {y_coord}
                  </Radio>
                }
              />
            </Card>
          ))}
        </Radio.Group>
      )}
    </>
  );
};
