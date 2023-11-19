import { ref, set, push, get, child, update, remove, query, orderByChild, equalTo } from "firebase/database";

export async function find(dbRef) {
  const snapshot = await get(dbRef);
  const objects = [];
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    objects.push({ _id: childKey, ...childData });
  });
  return objects;
}

export async function findOne(dbRef, id) {
  if (id) {
    const objRef = child(dbRef, id);
    const snapshot = await get(objRef);
    if (snapshot.exists()) {
      return { _id: id, ...snapshot.val() };
    }
  }
  return null;
}

export async function add(dbRef, obj) {
  const newObjRef = push(dbRef);
  await set(newObjRef, obj);
  const newObj = (await get(newObjRef)).val();
  newObj._id = newObjRef.key;
  return newObj;
}

export async function findBy(dbRef, attribute, value) {
  const queryObj = query(dbRef, orderByChild(attribute), equalTo(value));
  const snapshot = await get(queryObj);

  const objects = [];
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    objects.push({ _id: childKey, ...childData });
  });
  return objects;
}

export async function edit(dbRef, obj) {
  const objCopy = JSON.parse(JSON.stringify(obj));
  const id = objCopy._id;
  delete objCopy._id;
  const objRef = child(dbRef, id);
  await update(objRef, objCopy);
}
