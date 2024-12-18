export const constants = {
  MAX_BATCH_SIZE: 500,
  DEFAULT_REGION: "us-west1",
  DEFAULT_TIMEZONE: "Asia/Tokyo",
  USERS_PATH: "users",
} as const;

export const functions = {
  onCallV2: "onCallV2",
  batchV1: "batchV1",
  batchV2: "batchV2",
  eventCreateV2: "eventCreateV2",
  eventUpdateV2: "eventUpdateV2",
} as const;
