# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

My refactoring of `dpk.js` started with identifying specific operations being performed on the event and other pieces of data in the unrefactored `deterministicPartitionKey` function. For example, `getKeyCandidate` comes from the first set of logical branches that tested whether `event` was defined, then either took a defined `partitionKey` or hashed the event. I extracted discrete pieces of logic like this from `deterministicPartitionKey`. I also extracted a `createHash` function, as the same hash algorithm and digest were used repeatedly in the code; though the operation was simple and easy to copy / paste, extracting it to a distinct function makes it easier to avoid copying the hash incorrectly or accidentally modifying it in different places.

With this refactor, each operation can be reasoned about in its own scope, without having to keep track of how data flows within `deterministicPartitionKey`.
