import { DatabaseReference } from "firebase/database";

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

export type Store = {
  doc: DatabaseReference;

  find(): Promise<unknown[]>;
  findOne(id: string): Promise<unknown>;
  findBy(obj: unknown): Promise<unknown>;
  add(obj: unknown): Promise<unknown>;
  deleteOne(id: string): Promise<void>;
  delete(): Promise<void>;
  edit(obj: unknown): Promise<void>;
};

export type DbTypes = "mongo" | "firebase";

export type Db = {
  userStore: Store;
  candidateStore: Store;
  donationStore: Store;
  init(dbType: DbTypes): void;
};
