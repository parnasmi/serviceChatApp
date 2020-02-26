import db from "store/db";

const createRef = (collection, docId) => {
  return db.doc(`${collection}/${docId}`);
};

export default {
  createRef
};
