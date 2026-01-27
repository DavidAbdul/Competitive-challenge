/**
 * Timer utility for measuring execution time
 */
class Timer {
    constructor() {
        this.startTime = null;
        this.endTime = null;
    }

    start() {
        this.startTime = process.hrtime.bigint();
    }

    stop() {
        this.endTime = process.hrtime.bigint();
        return this.getElapsedTime();
    }

    getElapsedTime() {
        if (!this.startTime || !this.endTime) {
            return null;
        }
        
        const elapsed = Number(this.endTime - this.startTime);
        return {
            nanoseconds: elapsed,
            microseconds: elapsed / 1000,
            milliseconds: elapsed / 1000000,
            seconds: elapsed / 1000000000
        };
    }

    getFormattedTime() {
        const time = this.getElapsedTime();
        if (!time) return 'N/A';
        
        if (time.seconds >= 1) {
            return `${time.seconds.toFixed(3)}s`;
        } else if (time.milliseconds >= 1) {
            return `${time.milliseconds.toFixed(3)}ms`;
        } else if (time.microseconds >= 1) {
            return `${time.microseconds.toFixed(3)}μs`;
        } else {
            return `${time.nanoseconds}ns`;
        }
    }

    reset() {
        this.startTime = null;
        this.endTime = null;
    }
}

module.exports = Timer;
