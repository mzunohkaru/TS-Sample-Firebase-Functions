import * as admin from 'firebase-admin';

import { db, regionFunctions, outputLog, errorLog } from "../helper";
import { constants } from "../constants";

/*
 * 毎日11時に全ユーザーのドキュメントを取得し、
 * check フィールドにサーバーの時間を設定して更新します。
 */

export const batchV1 = regionFunctions.pubsub
  .schedule("every day 11:00")
  .timeZone("Asia/Tokyo")
  .onRun(async (context) => {
    const failedUserIds: string[] = [];

    const usersSnapshot = await db.collection("user/v1/users").get();
    const batch = db.batch();

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const userRef = await db.collection(constants.USERS_PATH).doc(userId);
      try {
        batch.update(userRef, {
          check: admin.firestore.FieldValue.serverTimestamp(),
        });
      } catch (error) {
        failedUserIds.push(userDoc.id);
      }
    }

    try {
      await batch.commit();
      outputLog("All user timestamps updated successfully.");
    } catch (error) {
      errorLog(`Batch update error: ${error}`);
    }
  });
