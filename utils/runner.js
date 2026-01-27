const fs = require('fs');
const path = require('path');
const TestRunner = require('./testRunner');

/**
 * Main runner script
 */
class ChallengeRunner {
    constructor() {
        this.challengesDir = path.join(__dirname, '..', 'challenges');
        this.resultsDir = path.join(__dirname, '..', 'results');
        this.showTiming = process.argv.includes('--time');
        this.specificChallenge = process.argv[2] && !process.argv[2].startsWith('--') 
            ? process.argv[2] 
            : null;
    }

    /**
     * Get all challenge directories
     */
    getChallenges() {
        try {
            const items = fs.readdirSync(this.challengesDir, { withFileTypes: true });
            return items
                .filter(item => item.isDirectory())
                .map(item => item.name)
                .filter(name => {
                    if (this.specificChallenge) {
                        return name.includes(this.specificChallenge);
                    }
                    return true;
                });
        } catch (error) {
            console.error('❌ Error reading challenges directory:', error.message);
            return [];
        }
    }

    /**
     * Run a single challenge
     */
    runChallenge(challengeName) {
        const challengePath = path.join(this.challengesDir, challengeName);
        const testPath = path.join(challengePath, 'test.js');
        
        console.log(`\n${'='.repeat(60)}`);
        console.log(`🏆 Challenge: ${challengeName}`);
        console.log('='.repeat(60));

        try {
            // Clear require cache to get fresh version
            delete require.cache[require.resolve(testPath)];
            
            const { testCases, solution } = require(testPath);
            
            if (!testCases || !solution) {
                throw new Error('Test file must export testCases and solution');
            }

            const runner = new TestRunner(this.showTiming);
            const results = runner.runAllTests(testCases, solution);
            
            return {
                challenge: challengeName,
                ...results
            };
        } catch (error) {
            console.error(`\n❌ Error running challenge ${challengeName}:`, error.message);
            console.error('Stack:', error.stack);
            return {
                challenge: challengeName,
                error: error.message,
                passed: 0,
                failed: 0,
                total: 0
            };
        }
    }

    /**
     * Save results to file
     */
    saveResults(allResults) {
        if (!fs.existsSync(this.resultsDir)) {
            fs.mkdirSync(this.resultsDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `results_${timestamp}.json`;
        const filepath = path.join(this.resultsDir, filename);

        const resultsData = {
            timestamp: new Date().toISOString(),
            summary: {
                totalChallenges: allResults.length,
                passedChallenges: allResults.filter(r => r.failed === 0 && r.total > 0).length,
                totalTests: allResults.reduce((sum, r) => sum + r.total, 0),
                passedTests: allResults.reduce((sum, r) => sum + r.passed, 0),
                failedTests: allResults.reduce((sum, r) => sum + r.failed, 0)
            },
            challenges: allResults
        };

        try {
            fs.writeFileSync(filepath, JSON.stringify(resultsData, null, 2));
            console.log(`\n💾 Results saved to: ${filename}`);
        } catch (error) {
            console.error('❌ Error saving results:', error.message);
        }
    }

    /**
     * Run all challenges
     */
    run() {
        console.log('\n🚀 Coding Challenge Runner');
        console.log(`⏱️  Timing: ${this.showTiming ? 'Enabled' : 'Disabled'}`);
        
        const challenges = this.getChallenges();
        
        if (challenges.length === 0) {
            console.log('\n❌ No challenges found!');
            console.log('Make sure you have challenge directories in:', this.challengesDir);
            return;
        }

        console.log(`📋 Found ${challenges.length} challenge(s)\n`);

        const allResults = [];
        
        challenges.forEach(challenge => {
            const result = this.runChallenge(challenge);
            allResults.push(result);
        });

        // Print overall summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 OVERALL SUMMARY');
        console.log('='.repeat(60));
        
        const totalTests = allResults.reduce((sum, r) => sum + r.total, 0);
        const passedTests = allResults.reduce((sum, r) => sum + r.passed, 0);
        const failedTests = allResults.reduce((sum, r) => sum + r.failed, 0);
        
        console.log(`Total Challenges: ${challenges.length}`);
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ${passedTests}`);
        console.log(`Failed: ${failedTests}`);
        console.log(`Success Rate: ${totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(2) : 0}%`);
        console.log('='.repeat(60) + '\n');

        // Save results
        if (this.showTiming) {
            this.saveResults(allResults);
        }

        // Exit with appropriate code
        process.exit(failedTests > 0 ? 1 : 0);
    }
}

// Run if called directly
if (require.main === module) {
    const runner = new ChallengeRunner();
    runner.run();
}

module.exports = ChallengeRunner;
