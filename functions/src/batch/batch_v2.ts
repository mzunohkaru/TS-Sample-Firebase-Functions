import * as admin from "firebase-admin";
import { onSchedule } from "firebase-functions/v2/scheduler";

import { db, outputLog, errorLog } from "../helper";
import { constants, PATHS } from "../constants";

/*
 * 毎日11時に全ユーザーのドキュメントを取得し、
 * check フィールドにサーバーの時間を設定して更新します。
 */
export const batchV2 = onSchedule(
	{
		schedule: "15 13 * * *",
		region: constants.DEFAULT_REGION,
		timeZone: constants.DEFAULT_TIMEZONE,
	},
	async (event) => {
		const failedUserIds: string[] = [];

		const usersSnapshot = await db.collection("user/v1/users").get();
		const batch = db.batch();

		for (const userDoc of usersSnapshot.docs) {
			const userId = userDoc.id;
			const userRef = db.collection(PATHS.USERS).doc(userId);
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
	},
);
