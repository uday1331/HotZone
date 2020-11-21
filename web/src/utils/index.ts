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
