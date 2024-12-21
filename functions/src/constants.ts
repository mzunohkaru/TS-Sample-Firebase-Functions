export const constants = {
	MAX_BATCH_SIZE: 500,
	DEFAULT_REGION: "asia-northeast1",
	DEFAULT_TIMEZONE: "Asia/Tokyo",
} as const;

export const functions = {
	onCallV2: "onCallV2",
	batchV1: "batchV1",
	batchV2: "batchV2",
	eventCreateV2: "eventCreateV2",
	eventUpdateV2: "eventUpdateV2",
} as const;

export const PATHS = {
	USERS: "users",
} as const;
