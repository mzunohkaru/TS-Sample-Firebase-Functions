import * as admin from "firebase-admin";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";

import { db, outputLog, errorLog } from "../helper";
import { constants } from "../constants";
import { userLogConverter } from "./user";

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
			errorLog(`beforeData and afterData are the same`);
			return;
		}

		await db
			.doc(`${constants.USERS_PATH}/${userId}/userLog/log`)
			.withConverter(userLogConverter)
			.set(
				{
					updatedAt: admin.firestore.Timestamp.now(),
					readCount: admin.firestore.FieldValue.increment(1),
				},
				{ merge: true },
			);
	},
);
