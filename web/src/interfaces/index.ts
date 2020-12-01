interface LocationType {
  id: string;
  x_coord: string;
  y_coord: string;
  name: string;
  address: string;
}

interface ClusterType {
  cases: Array<{
    x: string;
    y: string;
    day: number;
    caseNo: number;
  }>;
  locations_involved: Array<string>;
}

export type { LocationType, ClusterType };
