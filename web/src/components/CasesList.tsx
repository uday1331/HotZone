import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { Space, Spin, Table } from "antd";

const { Title } = Typography; 

interface CaseType {
  virus: Object;
  case_no: number;
  confirmed: Date;
  origin: string;
  patient: Object;
  locations: Object;
}

const columns = [
  {
    title: "Pathogen",
    dataIndex: ["virus", "name"],
    key: "pathogen",
  },
  {
    title: "Case number",
    dataIndex: "case_no",
    key: "case_no",
  },
  {
    title: "Confirmed on",
    dataIndex: "confirmed",
    key: "confirmed",
  },
  {
    title: "Origin",
    dataIndex: "origin",
    key: "origin",
  },
  {
    title: "Patient Name",
    dataIndex: ["patient", "name"],
    key: "patient_name",
  },
  {
    title: "Actions",
    key: 'actions',
    render: (text: string, record: any) => (
      <Link to={`/case/${record.case_no}`}>Details</Link>
    )
  }
];

export const CasesList: React.FC = () => {
  const [cases, setCases] = useState<Array<CaseType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCasesList = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://group-q-hotzone.herokuapp.com/hotzone/cases.json");
        const casesList: Array<CaseType> = response.data;
        setCases(casesList);
        setLoading(false);
        setError("");
      } catch(e) {
        setCases([]);
        setError("failed to fetch cases data");
        setLoading(false);
      }
    }

    fetchCasesList();
  }, [])

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
    cases && (
      <>
        <Title level={2}>All cases</Title>
          <Table
            dataSource={cases}
            columns={columns}
          />
      </>
    )
  );
}