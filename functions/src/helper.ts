import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Firebaseアプリを初期化
admin.initializeApp();

// Firestoreインスタンスを作成してエクスポート
export const db = admin.firestore();

// setting
export const regionFunctions = functions.region("us-west1");

// method
export const outputLog = (message: string) => {
	functions.logger.debug("DEBUG: ", message);
};
export const errorLog = (message: string) => {
	functions.logger.error("ERROR: ", message);
};
