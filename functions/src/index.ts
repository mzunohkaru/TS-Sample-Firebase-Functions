import { functions } from "./constants";

import { onCallV2 } from "./onCall";

if (
  !process.env.FUNCTION_NAME ||
  process.env.FUNCTION_NAME === functions.onCall
) {
  testEnv();
  exports.onCall = onCallV2;
}

import { batchV1, batchV2 } from "./batch";
if (
  !process.env.FUNCTION_NAME ||
  process.env.FUNCTION_NAME === functions.batchV1
) {
  testEnv();
  exports.batch = batchV1;
}

if (
  !process.env.FUNCTION_NAME ||
  process.env.FUNCTION_NAME === functions.batchV2
) {
  testEnv();
  exports.batch = batchV2;
}

import { eventUpdateV2 } from "./event";
import { testEnv } from "./test";

if (
  !process.env.FUNCTION_NAME ||
  process.env.FUNCTION_NAME === functions.event
) {
  testEnv();
  exports.event = eventUpdateV2;
}
