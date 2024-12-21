import * as admin from "firebase-admin";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

import { db } from "../helper";
import { PATHS } from "../constants";
import { userLogConverter } from "./user";

/*
 * ユーザーログ (user/v1/user/{userId}/UserLog/{UserLogId}/監視対象)
 */

export const eventCreateV2 = onDocumentCreated(
	`${PATHS.USERS}/{userId}`,
	async (event) => {
		const userId = event.params.userId;

		await db
			.doc(`${PATHS.USERS}/${userId}/userLog/login`)
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
