import * as admin from "firebase-admin";
import {
  onDocumentUpdated,
  QueryDocumentSnapshot,
} from "firebase-functions/v2/firestore";

import { db, outputLog, errorLog } from "../helper";
import { constants } from "../constants";

/*
 * ユーザーログ (user/v1/user/{userId}/UserLog/{UserLogId}/監視対象)
 */

export const eventUpdateV2 = onDocumentUpdated(
  `${constants.USERS_PATH}/{userId}`,
  async (event) => {
    const userId = event.params.userId;

    const beforeData = event.data?.before;
    const afterData = event.data?.after;
    outputLog(`beforeData: ${beforeData}`);
    outputLog(`afterData: ${afterData}`);

    if (beforeData === afterData) {
      return;
    }

    await db
      .doc(`${constants.USERS_PATH}/${userId}`)
      .withConverter(userConverter)
      .set(
        {
          readCount: admin.firestore.FieldValue.increment(1),
        },
        { merge: true },
      );
  },
);

type Users = {
  name: string;
  age: number;
  male: boolean;
  createdAt: admin.firestore.Timestamp;
  readCount: admin.firestore.FieldValue;
};

const userConverter = {
  toFirestore: (user: Users) => user,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Users,
};
