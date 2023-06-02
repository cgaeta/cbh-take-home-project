const crypto = require("crypto");

// moving constants so that a) they're not declared on every call, and b) so they're available to other functions
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

/** Hash that we're using consistently across this exercise */
const createHash = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

/** Hashes an event object */
const hashEvent = (event) => {
  const data = JSON.stringify(event);
  return createHash(data);
};

/** Stringifies data if it isn't already a string */
const refineCandidate = (data) => {
  if (!data) return TRIVIAL_PARTITION_KEY;

  return typeof data !== "string" ? JSON.stringify(data) : data;
};

exports.deterministicPartitionKey = (event) => {
  let candidate;

  candidate = event && (event.partitionKey ?? hashEvent(event));

  candidate = refineCandidate(candidate);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }
  return candidate;
};
