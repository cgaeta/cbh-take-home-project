const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Hashes event data when event has no hash key", () => {
    const key = deterministicPartitionKey({ someData: "abc123" });
    expect(key).toMatchSnapshot();
  });

  it("Returns the event's partition key, when less that 256 characters", () => {
    const key = deterministicPartitionKey({
      partitionKey: "short_partition_key",
    });
    expect(key).toBe("short_partition_key");
  });

  it("Returns stringified partition key when partition key is an object and stringified to fewer than 256 characters", () => {
    const key = deterministicPartitionKey({
      partitionKey: { keyIsAnObject: true },
    });
    expect(key).toBe("{\"keyIsAnObject\":true}");
  });

  it("Returns a hash when the partition key is 256 characters or more", () => {
    const partitionKey = "this is a long partition key over 256 characters that should ultimately get hashed and no long be recognizable, but still be hashed determinalistically and continue to pass the test no matter how many times the test gets run with this same key, which is important so that we can test this code and make sure it doesn't break";
    const key = deterministicPartitionKey({ partitionKey });

    expect(partitionKey.length).toBeGreaterThan(256);
    expect(key).toMatchSnapshot();
  });

  it("Returns a hash when the partition key is an object that stringifies to be over 256 characters", () => {
    const partitionKey = {
      isAnObject: true,
      isUsefulData: false,
      isFewerThan256CharactersStringified: false,
      isDataThatShouldBeSeenInAProdDatabase: false,
      idealNumberOfEngineersLookingAtThisParticularTestClosely: -1,
      numberOfTimesThisTestIsExpectedToFail: 0,
      isTestedWithJestSnapshots: true,
      propertyToMakeSureThisObjectStringifiesLongEnough: "please",
    };
    const key = deterministicPartitionKey({ partitionKey });

    expect(JSON.stringify(partitionKey).length).toBeGreaterThan(256);
    expect(key).toMatchSnapshot();
  });
});
