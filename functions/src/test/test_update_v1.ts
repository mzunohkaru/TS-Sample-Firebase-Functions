import { onDocumentUpdated } from "firebase-functions/v2/firestore";

import { regionFunctions, outputLog } from "../helper";
import { constants } from "../constants";

/*
 * ユーザーの値が更新されたら、ログを出力する
 */

export const testUpdateV1 = regionFunctions.firestore
  .document(`${constants.USERS_PATH}/{userId}`)
  .onUpdate(async (change, context) => {
    const beforeData = change.before.data();
    const afterData = change.after.data();
    const changedFields: any = [];
    Object.keys(afterData).forEach((key) => {
      if (afterData[key] !== beforeData[key]) {
        changedFields.push(key);
      }
    });
    const userId = context.params.userId;
    outputLog(
      `User ID: ${userId}, Changed Fields: ${changedFields.join(", ")}`
    );
  });

export const testUpdateV2 = onDocumentUpdated(
  `${constants.USERS_PATH}/{userId}`,
  (event) => {
    const beforeData = event.data?.before;
    const afterData = event.data?.after;

    const beforeDataJson = beforeData
      ? JSON.stringify(beforeData.data())
      : "{}";
    const afterDataJson = afterData ? JSON.stringify(afterData.data()) : "{}";

    const userId = event.params.userId;
    outputLog(
      `User ID: ${userId}, Before Fields: ${beforeDataJson}, After Fields: ${afterDataJson}}`
    );
  }
);
