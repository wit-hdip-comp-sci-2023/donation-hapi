import { set, push, get, child, update, query, orderByChild, equalTo, type Query, type DatabaseReference } from "firebase/database";

export async function find(dbRef: Query) {
  const snapshot = await get(dbRef);
  const objects: unknown[] = [];
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    objects.push({ _id: childKey, ...childData });
  });
  return objects;
}

export async function findOne(dbRef: DatabaseReference, id: string): Promise<unknown> {
  if (id) {
    const objRef = child(dbRef, id);
    const snapshot = await get(objRef);
    if (snapshot.exists()) {
      return { _id: id, ...snapshot.val() };
    }
  }
  return null;
}

export async function add(dbRef: DatabaseReference, obj: unknown): Promise<unknown> {
  const newObjRef = push(dbRef);
  await set(newObjRef, obj);
  const newObj = (await get(newObjRef)).val();
  newObj._id = newObjRef.key;
  return newObj;
}

export async function findBy(dbRef: Query, attribute: string, value: string | number | boolean | null): Promise<unknown[]> {
  const queryObj = query(dbRef, orderByChild(attribute), equalTo(value));
  const snapshot = await get(queryObj);

  const objects: unknown[] = [];
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    objects.push({ _id: childKey, ...childData });
  });
  return objects;
}

export async function edit(dbRef: DatabaseReference, obj: unknown) {
  const objCopy = JSON.parse(JSON.stringify(obj));
  const id = objCopy._id;
  delete objCopy._id;
  const objRef = child(dbRef, id);
  await update(objRef, objCopy);
}
