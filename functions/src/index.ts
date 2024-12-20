import { functions } from "./constants";
import { testEnv } from "./test";

import { onCallV2 } from "./onCall";
if (
	!process.env.FUNCTION_TARGET ||
	process.env.FUNCTION_TARGET === functions.onCallV2
) {
	testEnv("onCallV2");
	exports.onCallV2 = onCallV2;
}

import { batchV1, batchV2 } from "./batch";
if (
	!process.env.FUNCTION_TARGET ||
	process.env.FUNCTION_TARGET === functions.batchV1
) {
	testEnv("batchV1");
	exports.batchV1 = batchV1;
}

if (
	!process.env.FUNCTION_TARGET ||
	process.env.FUNCTION_TARGET === functions.batchV2
) {
	testEnv("batchV2");
	exports.batchV2 = batchV2;
}

import { eventCreateV2 } from "./event";
import { eventUpdateV2 } from "./event";

if (
	!process.env.FUNCTION_TARGET ||
	process.env.FUNCTION_TARGET === functions.eventCreateV2
) {
	testEnv("eventCreate");
	exports.eventCreateV2 = eventCreateV2;
}

if (
	!process.env.FUNCTION_TARGET ||
	process.env.FUNCTION_TARGET === functions.eventUpdateV2
) {
	testEnv("eventUpdate");
	exports.eventUpdateV2 = eventUpdateV2;
}
