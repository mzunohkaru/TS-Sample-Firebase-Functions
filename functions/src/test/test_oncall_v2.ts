import {onCall, HttpsError} from "firebase-functions/v2/https";

export const testOnCallV2 = onCall((request) => {
  // ユーザーが認証されていなければエラーを投げる
  if (!request.auth) {
    throw new HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }

  // データにnameが含まれていなければエラーを投げる
  if (!request.data.name) {
    console.log("data.name is not found");
    throw new HttpsError(
      "invalid-argument",
      "data.name is undefined.",
      request.data
    );
  }

  // 処理の結果を返す
  return {
    uid: request.auth!.uid,
    name: request.data.name,
    data: request.data,
  };
});
