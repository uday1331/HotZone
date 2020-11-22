import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "antd";
import { Space, Spin, Table } from "antd";

const { Title } = Typography;

interface PatientType {
  hkid: string;
  name: string;
  dob: Date;
}

const columns = [
  {
    title: "HKID",
    dataIndex: "hkid",
    key: "hkid",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Date of Birth",
    dataIndex: "dob",
    key: "dob",
  },
];

export const PatientTable: React.FC = () => {
  const [patients, setPatients] = useState<Array<PatientType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatientList = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://group-q-hotzone.herokuapp.com/hotzone/patients.json", {
          headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
          }
        });
        const patientList: Array<PatientType> = response.data;
        setPatients(patientList);
        setLoading(false);
        setError("");
      } catch(e) {
        setPatients([]);
        setError("failed to fetch patients data");
        setLoading(false);
      }
    }

    fetchPatientList();

  }, []);

  if (error && error !== "") {
    return <p>{error}</p>
  }

  if (loading) {
    return (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    );
  }

  return (
    patients && (
      <>
        <Title level={2}>All patients</Title>
          <Table
            dataSource={patients}
            columns={columns}
          />
      </>
    )
  );
}