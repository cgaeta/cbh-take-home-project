const crypto = require("crypto");

// moving constants so that a) they're not declared on every call, and b) so they're available to other functions
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

/** Hash that we're using consistently across this exercise */
const createHash = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

/** Returns an event's partition key if present, otherwise returns the hashed event */
const getKeyCandidate = (event) => {
  if (!event) {
    return;
  } else if (event.partitionKey) return event.partitionKey;

  const data = JSON.stringify(event);
  return createHash(data);
};

/** Stringifies data if it isn't already a string */
const refineCandidate = (data) => {
  if (!data) return TRIVIAL_PARTITION_KEY;

  return typeof data !== "string" ? JSON.stringify(data) : data;
};

/** Returns a string if 256 characters or fewer, else returns a hash */
const validateLength = (key) =>
  key.length > MAX_PARTITION_KEY_LENGTH ? createHash(key) : key;

exports.deterministicPartitionKey = (event) => {
  let candidate = getKeyCandidate(event);

  candidate = refineCandidate(candidate);

  return validateLength(candidate);
};
