export interface TimeRange {
  start: string;
  end: string;
}

export interface Schedule {
  day: string;
  times: TimeRange[];
}

export interface Campaign {
  id?: number;
  type: string;
  startDate: string;
  endDate: string;
  schedule: Schedule[];
  createdAt?: string;
  updatedAt?: string;
}