export type Store = {
  doc: any;

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
};
