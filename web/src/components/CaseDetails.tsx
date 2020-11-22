import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { 
  Layout, 
  Typography,
  Breadcrumb,
  Descriptions,
  Space,
  Spin,
  Collapse,
} from "antd";

const { Panel } = Collapse;
const { Content } = Layout;
const { Title } = Typography; 

interface ParamType {
  case_no: string
}

interface VirusType {
  disease: string;
  max_infectious: number;
  name: string;
}

interface PatientType {
  dob: string;
  hkid: string;
  name: string;
}

interface VisitType {
  case: string;
  category: string;
  date_from: string;
  date_to: string;
  location: LocationType;
}

interface LocationType {
  address: string;
  id: number;
  name: string;
  x_coord: number;
  y_coord: number;
}

interface CaseType {
  virus: VirusType;
  case_no: number;
  confirmed: Date;
  origin: string;
  patient: PatientType;
  locations: Array<VisitType>;
}

export const CaseDetails: React.FC = () => {
  const { case_no } = useParams<ParamType>();
  const [caseDetails, setCaseDetails] = useState<CaseType>({} as CaseType);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchCaseOne = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://group-q-hotzone.herokuapp.com/hotzone/case/${case_no}`, {  
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`
        }});
        const data: CaseType = response.data;
        data.locations.sort((v1: VisitType, v2: VisitType) => {
          return v1.date_from > v2.date_to ? 1 : -1
        })
        setCaseDetails(data);
        setLoading(false);
        setError("");
      } catch(e) {
        setCaseDetails({} as CaseType);
        setLoading(false);
        setError("failed to fetch case data");
      }
    }

    fetchCaseOne();
  }, [case_no]);

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
    caseDetails.confirmed && (
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
        <Descriptions title="Case details">
          <Descriptions.Item label="Infecting pathogen">
            {caseDetails.virus.name}
          </Descriptions.Item>
          <Descriptions.Item label="Confirmed date">
            {caseDetails.confirmed}
          </Descriptions.Item>
          <Descriptions.Item label="Origin">
            {caseDetails.origin === "I" ? "Imported" : "Local"}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="Patient">
          <Descriptions.Item label="HKID">
            {caseDetails.patient.hkid}
          </Descriptions.Item>
          <Descriptions.Item label="Name">
            {caseDetails.patient.name}
          </Descriptions.Item>
          <Descriptions.Item label="Date of birth">
            {caseDetails.patient.dob}
          </Descriptions.Item>
        </Descriptions>
        <Title level={3}>Locations visited</Title>
        <Collapse>
          {caseDetails.locations.map((visit: VisitType, index) => (
          <Panel 
            key={`${visit.location.name} ${visit.date_from}`} 
            header={`${visit.location.name} | From: ${visit.date_from} - To: ${visit.date_to}`}
          >
            <Descriptions>
              <Descriptions.Item label="Location ID">
                {visit.location.id}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {visit.location.address}
              </Descriptions.Item>
              <Descriptions.Item label="X coordinates">
                {visit.location.x_coord}
              </Descriptions.Item>
              <Descriptions.Item label="Y coordinates">
                {visit.location.y_coord}
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          ))}
        </Collapse>
      </Content>
    )
  );
}