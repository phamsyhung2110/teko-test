const testTimestamps = [
    new Date('2022-01-20T00:13:05Z'), // true
    new Date('2022-01-20T00:27:31Z'), // true
    new Date('2022-01-20T00:45:27Z'), // true
    new Date('2022-01-20T01:00:49Z'), // false
    new Date('2022-01-20T01:15:45Z'), // true
    new Date('2022-01-20T01:20:01Z'), // false
    new Date('2022-01-20T01:50:09Z'), // true
    new Date('2022-01-20T01:52:15Z'), // true
    new Date('2022-01-20T01:54:00Z'), // false
    new Date('2022-01-20T02:00:00Z'), // false
    new Date('2022-01-20T02:14:00Z'),
    new Date('2022-01-20T02:16:00Z'),
];

const R = 3;
const N = testTimestamps.length;


function checkTimestampsLimit() {
    const requestCounts = new Array(N).fill(0);
    let start = 0;
    let end = 0;
    let count = 0;

    while (end < N) {
        const timestamp = testTimestamps[end];

        while (testTimestamps[end] - testTimestamps[start] >= 3600000) {
            count -= requestCounts[start];
            start++;
        }

        if (count < R) {
            requestCounts[end]++;
            count++;
            console.log(`${timestamp.toISOString()}: true`);
        } else {
            console.log(`${timestamp.toISOString()}: false`);
        }

        end++;
    }
}

module.exports = checkTimestampsLimit