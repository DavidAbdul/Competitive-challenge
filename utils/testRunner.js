const Timer = require('./timer');

/**
 * Test runner utility
 */
class TestRunner {
    constructor(showTiming = false) {
        this.showTiming = showTiming;
        this.results = {
            passed: 0,
            failed: 0,
            total: 0,
            details: []
        };
    }

    /**
     * Run a single test case
     */
    runTest(testCase, solution) {
        const timer = new Timer();
        let result;
        let error = null;
        let passed = false;

        try {
            // Start timing
            timer.start();
            
            // Run the solution
            result = solution(...testCase.input);
            
            // Stop timing
            timer.stop();

            // Validate result
            if (testCase.validator) {
                passed = testCase.validator(result, testCase.expected);
            } else {
                passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
            }
        } catch (e) {
            error = e.message;
            timer.stop();
        }

        const testResult = {
            name: testCase.name,
            passed,
            expected: testCase.expected,
            received: result,
            error,
            time: timer.getFormattedTime(),
            timeMs: timer.getElapsedTime()?.milliseconds || 0
        };

        this.results.total++;
        if (passed) {
            this.results.passed++;
        } else {
            this.results.failed++;
        }
        this.results.details.push(testResult);

        return testResult;
    }

    /**
     * Run all test cases for a challenge
     */
    runAllTests(testCases, solution) {
        console.log('\n🧪 Running tests...\n');

        testCases.forEach(testCase => {
            const result = this.runTest(testCase, solution);
            this.printTestResult(result);
        });

        this.printSummary();
        return this.results;
    }

    /**
     * Print individual test result
     */
    printTestResult(result) {
        const icon = result.passed ? '✅' : '❌';
        const timeStr = this.showTiming ? ` (${result.time})` : '';
        
        console.log(`${icon} ${result.name}${timeStr}`);
        
        if (!result.passed) {
            if (result.error) {
                console.log(`   Error: ${result.error}`);
            } else {
                console.log(`   Expected: ${JSON.stringify(result.expected)}`);
                console.log(`   Received: ${JSON.stringify(result.received)}`);
            }
        }
    }

    /**
     * Print test summary
     */
    printSummary() {
        console.log('\n' + '='.repeat(50));
        console.log(`📊 Test Results: ${this.results.passed}/${this.results.total} passed`);
        
        if (this.showTiming) {
            const totalTime = this.results.details.reduce((sum, r) => sum + r.timeMs, 0);
            console.log(`⏱️  Total execution time: ${totalTime.toFixed(3)}ms`);
        }
        
        if (this.results.failed > 0) {
            console.log(`❌ ${this.results.failed} test(s) failed`);
        } else {
            console.log('🎉 All tests passed!');
        }
        console.log('='.repeat(50) + '\n');
    }

    /**
     * Get results object
     */
    getResults() {
        return this.results;
    }
}

module.exports = TestRunner;
