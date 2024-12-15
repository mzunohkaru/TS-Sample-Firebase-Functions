import * as admin from "firebase-admin";
import { QueryDocumentSnapshot } from "firebase-functions/v2/firestore";

export type UserLog = {
  updatedAt: admin.firestore.Timestamp;
  readCount: admin.firestore.FieldValue;
};

export const userLogConverter = {
  toFirestore: (userLog: UserLog) => userLog,
  fromFirestore: (snapshot: QueryDocumentSnapshot) =>
    snapshot.data() as UserLog,
};
