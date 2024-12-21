import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
// Firebaseアプリを初期化
admin.initializeApp();

// Firestoreインスタンスを作成してエクスポート
export const db = admin.firestore();

// method
export const outputLog = (message: string) => {
	functions.logger.debug("DEBUG: ", message);
};
export const errorLog = (message: string) => {
	functions.logger.error("ERROR: ", message);
};
