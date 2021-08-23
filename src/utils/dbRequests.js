export const getStands = async (db) => {
  try {
    const snapshot = await db.collection('stands').get();
    const array = snapshot.docs.map((stand) => {
      const processed = stand.data();
      processed.id = stand.id;
      return processed;
    });
    return array;
  } catch (error) {
    throw Error(error);
  }
};

export const getLinks = async (db) => {
  try {
    let snapshot = await db.collection('generalData').get();
    let links = {};
    snapshot.docs.forEach((doc) => {
      links[doc.id] = doc.data().data;
    });
    return links;
  } catch (error) {}
};

export const deleteStand = async (db, id) => {
  try {
    await db.collection('stands').doc(id).delete();
  } catch (error) {
    console.error(error);
  }
};

export const saveStand = async (db, stand) => {
  try {
    const ref = await db.collection('stands').doc(stand.id);
    stand.id = ref.id;
    ref.set(stand);
  } catch (error) {
    console.log(error);
  }
};
