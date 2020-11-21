import React, { useState } from "react";
import { Button, Card, Input, Radio, notification } from "antd";
import axios from "axios";

import { LocationType } from "../interfaces";

const { Search } = Input;
const { Meta } = Card;

export const AddLocation: React.FC = () => {
  const [options, setOptions] = useState<Array<LocationType>>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <Search
        placeholder="Enter Location Name"
        allowClear
        loading={false}
        enterButton="Search Location"
        size="large"
        style={{
          marginBottom: 40,
        }}
        onSearch={async (query) =>
          await axios
            .get(
              `https://group-q-hotzone.herokuapp.com/hotzone/locations/${query}`
            )
            .then((res) => {
              setOptions(res?.data);
            })
        }
      />
      <Radio.Group
        onChange={(e) => setSelected(e.target.value)}
        value={selected}
        style={{ width: "100%" }}
      >
        {options.map(({ name, address, x_coord, y_coord }, idx) => (
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
      {selected !== null && (
        <Button
          type="primary"
          style={{ width: "100%" }}
          loading={loading}
          onClick={async () => {
            setLoading(true);
            await axios
              .post(
                "https://group-q-hotzone.herokuapp.com/hotzone/locations/",
                options[selected]
              )
              .then((res) => {
                notification["success"]({
                  message: "Location Created",
                  description: JSON.stringify(res.data),
                });
                setOptions([]);
                setSelected(null);
              })
              .catch((err) => {
                notification["error"]({
                  message: "Error Creating Location",
                  description: err.response.data,
                });
              });
            setLoading(false);
          }}
        >
          Create Location
        </Button>
      )}
    </>
  );
};
