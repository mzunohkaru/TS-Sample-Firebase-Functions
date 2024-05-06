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
