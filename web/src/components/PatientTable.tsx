import React, { useEffect, useState } from "react";
import axios from "axios";
import { Space, Spin, Table } from "antd";

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
        const response = await axios.get("http://localhost:8000/hotzone/patients.json");
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
      <Table
        dataSource={patients}
        columns={columns}
      />
    )
  )
  
}