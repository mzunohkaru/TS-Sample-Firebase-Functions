import { onDocumentUpdated } from "firebase-functions/v2/firestore";

import { db, outputLog, errorLog } from "../helper";
import { constants } from "../constants";

/*
 * ユーザーログ (user/v1/user/{userId}/UserLog/{UserLogId}/監視対象)
 */

export const eventUpdateV2 = onDocumentUpdated(
  `${constants.USERS_PATH}/{userId}/UserLog/{UserLogId}`,
  async (event) => {
    const userId = event.params.userId;

    const beforeData = event.data?.before;
    const afterData = event.data?.after;
    outputLog(`beforeData: ${beforeData}`);
    outputLog(`afterData: ${afterData}`);

    if (beforeData !== afterData) {
      try {
        const userDoc = await db.doc(`${constants.USERS_PATH}/${userId}`).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const userPoint = userData?.point;
          outputLog(`UserData: ${userData}`);

          await db
            .doc(`${constants.USERS_PATH}/${userId}`)
            .update({ point: userPoint + 1 });
          outputLog(`User ${userId}'s point updated to ${userPoint + 1}`);
        } else {
          errorLog(`User document ${userId} does not exist`);
        }
      } catch (error) {
        errorLog(`Error updating user name: ${error}`);
      }
    }
  }
);
