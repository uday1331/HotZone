import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Layout, Typography, Breadcrumb } from "antd";

const { Content } = Layout;
const { Title } = Typography; 

interface ParamType {
  case_no: string
}

interface CaseType {
  virus: Object;
  case_no: number;
  confirmed: Date;
  origin: string;
  patient: Object;
  locations: Object;
}

export const CaseDetails: React.FC = () => {
  const { case_no } = useParams<ParamType>();
  const [caseDetails, setCaseDetails] = useState<CaseType>({} as CaseType);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchCaseOne = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/hotzone/case/${case_no}`, {  
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`
        }});
        const data: CaseType = response.data;
        setCaseDetails(data);
        setError("");
      } catch(e) {
        setCaseDetails({} as CaseType);
        setError("failed to fetch case data");
      }
    }

    fetchCaseOne();
  }, [case_no]);

  if (error && error !== "") {
    return <p>{error}</p>
  }

  return (
    caseDetails && (
      <Content style={{ textAlign: 'left' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/cases">Cases</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {`Case number: #${case_no}`}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Title level={2}>{`Case details`}</Title>
      </Content>
    )
  );
}