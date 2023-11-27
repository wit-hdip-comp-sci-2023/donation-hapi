export type JwtPayload = {
  id: string;
  email: string;
  scope: string[];
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
};

export type LoggedInUser = {
  email: string;
  token: string;
  _id: string;
};

export type Candidate = {
  firstName: string;
  lastName: string;
  office: string;
  _id: string;
};

export type Donation = {
  amount: number;
  method: string;
  candidate: string | Candidate;
  donor: null | string | User;
  lat: number;
  lng: number;
  _id: string;
};

export type CandidateDonations = {
  candidate: Candidate;
  donations: Donation[];
};
