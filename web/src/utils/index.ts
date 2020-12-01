export const locationColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "X Co-ordinate",
    dataIndex: "x_coord",
    key: "x_coord",
  },
  {
    title: "Y Co-ordinate",
    dataIndex: "y_coord",
    key: "y_coord",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

export const locationListColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  ...locationColumns,
];

export const casesColumns = [
  {
    title: "X Co-ordinate",
    dataIndex: "x",
    key: "x",
  },
  {
    title: "Y Co-ordinate",
    dataIndex: "y",
    key: "y",
  },
  {
    title: "Day",
    dataIndex: "day",
    key: "day",
  },
  {
    title: "Case Number",
    dataIndex: "caseNo",
    key: "caseNo",
  },
];
