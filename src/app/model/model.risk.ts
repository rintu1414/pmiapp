export interface Risk {
  id: string;
  sourceReference: string;
  crossReference: string;
  date: string;
  riskCategory: string;
  riskDescription: string;
  pic: string;
  impact: string;
  likelihood: string;
  severity: string;
  response: string;
  responsePlan: string;
  targetDate: string;
  addToDo: string;
  status: string;
  convertToIssue: string;
  cost: number;
  currency: string;
  schedule: string;
  duration: string;
  impactDetails: string;
  rank: number;
  derivative: string;
}
