import * as React from "react";
import {
  Collapse,
  Space,
  Spin,
  Table,
  List,
  Form,
  Input,
  Typography,
  Button,
} from "antd";
import axios from "axios";

import { ClusterType } from "../interfaces";
import { casesColumns } from "../utils";

const { useState } = React;
const { Panel } = Collapse;
const { Title } = Typography;

export const Cluster: React.FC = () => {
  const [clusters, setClusters] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  const onFinish = async ({
    distance,
    time,
    minimum_cluster,
  }: {
    distance: string;
    time: string;
    minimum_cluster: string;
  }) => {
    //100-2-1
    setLoading(true);
    const res = await axios.get(
      `/hotzone/clusters/?distance=${distance}&time=${time}&minimum_cluster=${minimum_cluster}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    setClusters(res?.data);
    setLoading(false);
  };

  return (
    <>
      <Title level={2}>Clustering</Title>
      <Form {...layout} onFinish={onFinish}>
        <Form.Item
          label="Distance"
          name="distance"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Time" name="time" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Minimum Clusters"
          name="minimum_cluster"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Get Clusters
          </Button>
        </Form.Item>
      </Form>
      {loading ? (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      ) : (
        <>
          {Object.keys(clusters).map((id: string) => {
            const { cases, locations_involved } = clusters[id] as ClusterType;
            return (
              <>
                <Collapse>
                  <Panel
                    key={id}
                    header={`Cluster number: ${id} - ${cases.length} Cases and ${locations_involved.length} Locations`}
                  >
                    <Title level={3}>Cases</Title>
                    <Table
                      dataSource={cases}
                      columns={casesColumns}
                      pagination={false}
                    />
                    <Title level={3}>Locations</Title>
                    <List
                      size="small"
                      bordered
                      dataSource={locations_involved}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                  </Panel>
                </Collapse>
              </>
            );
          })}
        </>
      )}
    </>
  );
};
