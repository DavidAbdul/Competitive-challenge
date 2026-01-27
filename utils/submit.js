const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const Validator = require('./validator');

/**
 * Submit script to help users submit their solutions
 */
class SubmitHelper {
    constructor() {
        this.validator = new Validator();
    }

    /**
     * Check if git is initialized
     */
    checkGit() {
        try {
            execSync('git rev-parse --git-dir', { stdio: 'ignore' });
            return true;
        } catch {
            console.error('❌ This is not a git repository');
            console.log('Run: git init');
            return false;
        }
    }

    /**
     * Get current branch
     */
    getCurrentBranch() {
        try {
            const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
            return branch;
        } catch {
            return null;
        }
    }

    /**
     * Check if there are uncommitted changes
     */
    hasUncommittedChanges() {
        try {
            const status = execSync('git status --porcelain', { encoding: 'utf8' });
            return status.trim().length > 0;
        } catch {
            return false;
        }
    }

    /**
     * Get user info from git config
     */
    getUserInfo() {
        try {
            const name = execSync('git config user.name', { encoding: 'utf8' }).trim();
            const email = execSync('git config user.email', { encoding: 'utf8' }).trim();
            return { name, email };
        } catch {
            return { name: 'Unknown', email: 'unknown@example.com' };
        }
    }

    /**
     * Main submit workflow
     */
    submit() {
        console.log('\n🚀 Coding Challenge Submit Helper\n');

        // Step 1: Check git
        if (!this.checkGit()) {
            return;
        }

        // Step 2: Validate solutions
        console.log('Step 1: Validating solutions...');
        const isValid = this.validator.validateAllChallenges();
        
        if (!isValid) {
            console.log('\n⚠️  Warning: Some solutions are incomplete');
            console.log('You can still submit, but incomplete solutions won\'t pass tests\n');
        }

        // Step 3: Check branch
        const branch = this.getCurrentBranch();
        console.log(`\nCurrent branch: ${branch}`);
        
        if (branch === 'main' || branch === 'master') {
            console.log('\n⚠️  Warning: You are on the main branch');
            console.log('It\'s recommended to create a solution branch:');
            console.log('   git checkout -b solucion/TU_NOMBRE\n');
        }

        // Step 4: Check for uncommitted changes
        if (this.hasUncommittedChanges()) {
            console.log('\n📝 You have uncommitted changes');
            console.log('\nTo commit your changes:');
            console.log('   git add .');
            const userInfo = this.getUserInfo();
            console.log(`   git commit -m "Solución de ${userInfo.name}"`);
            console.log(`   git push origin ${branch}`);
        } else {
            console.log('\n✅ No uncommitted changes');
            console.log('\nTo push your branch:');
            console.log(`   git push origin ${branch}`);
        }

        console.log('\n📤 Next steps:');
        console.log('1. Push your branch to GitHub');
        console.log('2. Go to the repository on GitHub');
        console.log('3. Click "Pull Request"');
        console.log('4. Select your branch and create the PR');
        console.log('\n✨ Good luck!\n');
    }
}

// Run if called directly
if (require.main === module) {
    const helper = new SubmitHelper();
    helper.submit();
}

module.exports = SubmitHelper;
