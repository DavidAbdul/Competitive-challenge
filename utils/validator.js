const fs = require('fs');
const path = require('path');

/**
 * Validator to check if solution is not empty/placeholder
 */
class Validator {
    constructor() {
        this.challengesDir = path.join(__dirname, '..', 'challenges');
    }

    /**
     * Check if solution file has actual code (not just placeholder)
     */
    validateSolution(solutionPath) {
        try {
            const content = fs.readFileSync(solutionPath, 'utf8');
            
            // Check if file contains common placeholder comments
            const placeholders = [
                '// ESCRIBE TU CÓDIGO AQUÍ',
                '//ESCRIBE TU CÓDIGO AQUÍ',
                'ESCRIBE TU CÓDIGO AQUÍ'
            ];

            const hasPlaceholder = placeholders.some(p => content.includes(p));
            
            // Check if function is empty or minimal
            const codeLines = content
                .split('\n')
                .filter(line => {
                    const trimmed = line.trim();
                    return trimmed && 
                           !trimmed.startsWith('//') && 
                           !trimmed.startsWith('/*') && 
                           !trimmed.startsWith('*') &&
                           !trimmed.startsWith('function') &&
                           !trimmed.startsWith('module.exports') &&
                           !trimmed.includes('/**') &&
                           trimmed !== '{' &&
                           trimmed !== '}';
                })
                .length;

            return {
                valid: !hasPlaceholder && codeLines > 0,
                hasPlaceholder,
                codeLines,
                path: solutionPath
            };
        } catch (error) {
            return {
                valid: false,
                error: error.message,
                path: solutionPath
            };
        }
    }

    /**
     * Validate all challenges
     */
    validateAllChallenges() {
        console.log('\n🔍 Validating solutions...\n');

        const challenges = fs.readdirSync(this.challengesDir, { withFileTypes: true })
            .filter(item => item.isDirectory())
            .map(item => item.name);

        const results = [];
        let allValid = true;

        challenges.forEach(challenge => {
            const solutionPath = path.join(this.challengesDir, challenge, 'solution.js');
            const result = this.validateSolution(solutionPath);
            results.push({
                challenge,
                ...result
            });

            const icon = result.valid ? '✅' : '⚠️';
            console.log(`${icon} ${challenge}`);
            
            if (!result.valid) {
                allValid = false;
                if (result.hasPlaceholder) {
                    console.log('   → Contains placeholder code');
                }
                if (result.codeLines === 0) {
                    console.log('   → Solution is empty');
                }
                if (result.error) {
                    console.log(`   → Error: ${result.error}`);
                }
            }
        });

        console.log('\n' + '='.repeat(50));
        if (allValid) {
            console.log('✅ All solutions have been implemented!');
        } else {
            console.log('⚠️  Some solutions are incomplete');
            console.log('Please complete all challenges before submitting');
        }
        console.log('='.repeat(50) + '\n');

        return allValid;
    }
}

// Run if called directly
if (require.main === module) {
    const validator = new Validator();
    const isValid = validator.validateAllChallenges();
    process.exit(isValid ? 0 : 1);
}

module.exports = Validator;
