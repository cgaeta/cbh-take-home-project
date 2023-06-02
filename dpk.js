const {
  getKeyCandidate,
  refineCandidate,
  validateLength,
} = require("./keyHelpers");

exports.deterministicPartitionKey = (event) => {
  let candidate = getKeyCandidate(event);

  candidate = refineCandidate(candidate);

  return validateLength(candidate);
};
