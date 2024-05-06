import * as functions from "firebase-functions";

// setting
export const regionFunctions = functions.region("us-west1");

// method
export const outputLog = (message: string) => {
  functions.logger.info("DEBUG: ", message);
};
