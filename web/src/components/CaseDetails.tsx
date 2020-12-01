import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Layout,
  Typography,
  Breadcrumb,
  Descriptions,
  Space,
  Spin,
  Collapse,
  Button,
  Modal,
  Select,
  DatePicker,
  message
} from "antd";

const { Panel } = Collapse;
const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
 
interface ParamType {
  case_no: string;
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
  id: number;
  virus: VirusType;
  case_no: number;
  confirmed: Date;
  origin: string;
  patient: PatientType;
  locations: Array<VisitType>;
}

export const CaseDetails: React.FC = () => {
  const history = useHistory();

  const { case_no } = useParams<ParamType>();
  const [caseDetails, setCaseDetails] = useState<CaseType>({} as CaseType);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [addVisitModalVisible, setAddVisitModalVisible] = useState(false);
  const [locationOptions, setLocationOptions] = useState<LocationType[]>([]);

  //fields for creating a vist
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [locationId, setLocationId] = useState<number>();
  const [addVisitLoading, setAddVisitLoading] = useState(false);

  useEffect(() => {
    const fetchCaseOne = async () => {
      setLoading(true);
      try {
        const caseResponse = await axios.get(
          `/hotzone/case/${case_no}`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        const caseData: CaseType = caseResponse.data;
        caseData.locations.sort((v1: VisitType, v2: VisitType) => {
          return v1.date_from > v2.date_to ? 1 : -1;
        });

        const locationsResponse = await axios.get(
          `/hotzone/locations/`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        const locationsData: LocationType[] = locationsResponse.data;

        setCaseDetails(caseData);
        setLocationOptions(locationsData);
        setLoading(false);
        setError("");
      } catch (e) {
        setCaseDetails({} as CaseType);
        setLoading(false);
        setError("failed to fetch case data");
      }
    };

    fetchCaseOne();
  }, [case_no]);

  if (error && error !== "") {
    return <p>{error}</p>;
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
      <Content style={{ textAlign: "left" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/cases">Cases</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{`Case number: #${case_no}`}</Breadcrumb.Item>
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

        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
          <Title style={{ margin: 0 }} level={3}>Locations visited</Title>
          <Button style={{ marginLeft: "12px" }} shape="round" type="primary"
          onClick={() => setAddVisitModalVisible(true)}>
            Add Visit
          </Button>
        </div>

        <Modal
          title="Add Visit"
          centered
          visible={addVisitModalVisible}
          footer={null}
          closable
          onCancel={() => setAddVisitModalVisible(false)}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <RangePicker onCalendarChange={(_, dateStrings) => {
              setStartDate(dateStrings[0]);
              setEndDate(dateStrings[1]);
            }} />

            <Select
              placeholder="Category"
              onSelect={val => setCategory(val as string)}
            >
              <Option value="V">
                Visit
              </Option>
              <Option value="R">
                Residence
              </Option>
              <Option value="W">
                Workplace
              </Option>
            </Select>

          </div>

          <Select
            style={{ width: "100%" }}
            showSearch
            placeholder="Add a location"
            onSelect={id => setLocationId(id as number)}
            optionFilterProp="title"
            filterOption={(input, option) =>
              option?.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              locationOptions?.map(location => (
                <Option value={location.id} title={location.name}>
                  <div>
                    <p>{location.name}</p>
                    <p>{location.address}</p>
                    <p>{`X: ${location.x_coord} Y: ${location.y_coord}`}</p>
                  </div>
                </Option>
              ))
            }
          </Select>

          <Button
          style={{ marginTop: "12px" }}
            type="primary"
            shape="round"
            loading={addVisitLoading}
            onClick={async () => {
              if (startDate && endDate && category && locationId) {
                try {
                  setAddVisitLoading(true);
                  const response = await axios.post(
                    "/hotzone/visit/",
                    {
                      "case": caseDetails.id,
                      "location": locationId,
                      "date_from": startDate,
                      "date_to": endDate,
                      "category": category
                    },
                    {
                      headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                      },
                    }
                  );
                  message.success("visit added successfully!");
                  setAddVisitLoading(false);
                  setAddVisitModalVisible(false);
                  history.go(0);
                } catch (e) {
                  message.error("something went wrong! Try again.");
                  setAddVisitLoading(false);
                } 
              } else {
                message.error("please select all fields")
              }
            }}
          >
            Create Visit
          </Button>
        </Modal>

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
};
