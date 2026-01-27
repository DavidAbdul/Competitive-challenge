const fs = require('fs');
const path = require('path');

/**
 * Script de verificación del proyecto
 * Verifica que toda la estructura esté correcta
 */

console.log('\n🔍 Verificando estructura del proyecto...\n');

let errors = 0;
let warnings = 0;

// Archivos requeridos
const requiredFiles = [
    'README.md',
    'package.json',
    '.gitignore',
    'LICENSE',
    'START.md',
    'QUICKSTART.md'
];

// Directorios requeridos
const requiredDirs = [
    'challenges',
    'utils',
    'results',
    '.github/workflows'
];

// Challenges requeridos
const requiredChallenges = [
    'challenges/challenge1-two-sum',
    'challenges/challenge2-binary-search',
    'challenges/challenge3-linked-list'
];

// Utils requeridos
const requiredUtils = [
    'utils/timer.js',
    'utils/testRunner.js',
    'utils/runner.js',
    'utils/validator.js',
    'utils/submit.js'
];

function checkFile(filepath) {
    if (fs.existsSync(filepath)) {
        console.log(`✅ ${filepath}`);
        return true;
    } else {
        console.log(`❌ ${filepath} - FALTA`);
        errors++;
        return false;
    }
}

function checkDir(dirpath) {
    if (fs.existsSync(dirpath) && fs.statSync(dirpath).isDirectory()) {
        console.log(`✅ ${dirpath}/`);
        return true;
    } else {
        console.log(`❌ ${dirpath}/ - FALTA`);
        errors++;
        return false;
    }
}

function checkChallenge(challengePath) {
    const files = ['README.md', 'solution.js', 'test.js'];
    const challengeName = path.basename(challengePath);
    
    if (!fs.existsSync(challengePath)) {
        console.log(`❌ ${challengeName} - FALTA`);
        errors++;
        return false;
    }
    
    console.log(`\n📁 ${challengeName}:`);
    let allOk = true;
    
    files.forEach(file => {
        const filepath = path.join(challengePath, file);
        if (!checkFile(filepath)) {
            allOk = false;
        }
    });
    
    return allOk;
}

// Verificar archivos principales
console.log('📄 Archivos principales:');
requiredFiles.forEach(checkFile);

// Verificar directorios
console.log('\n📂 Directorios:');
requiredDirs.forEach(checkDir);

// Verificar utils
console.log('\n⚙️ Utils:');
requiredUtils.forEach(checkFile);

// Verificar challenges
console.log('\n🎯 Challenges:');
requiredChallenges.forEach(checkChallenge);

// Verificar GitHub Actions
console.log('\n🤖 GitHub Actions:');
checkFile('.github/workflows/test.yml');

// Verificar package.json
console.log('\n📦 Verificando package.json...');
try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const requiredScripts = ['test', 'test:time', 'submit', 'validate'];
    requiredScripts.forEach(script => {
        if (pkg.scripts && pkg.scripts[script]) {
            console.log(`✅ Script: ${script}`);
        } else {
            console.log(`❌ Script: ${script} - FALTA`);
            errors++;
        }
    });
} catch (e) {
    console.log(`❌ Error leyendo package.json: ${e.message}`);
    errors++;
}

// Verificar que las soluciones están vacías (placeholders)
console.log('\n📝 Verificando plantillas de soluciones...');
requiredChallenges.forEach(challengePath => {
    const solutionPath = path.join(challengePath, 'solution.js');
    
    if (fs.existsSync(solutionPath)) {
        const content = fs.readFileSync(solutionPath, 'utf8');
        
        if (content.includes('ESCRIBE TU CÓDIGO AQUÍ')) {
            console.log(`✅ ${path.basename(challengePath)} - Plantilla correcta`);
        } else {
            console.log(`⚠️  ${path.basename(challengePath)} - Puede contener solución`);
            warnings++;
        }
    }
});

// Resumen
console.log('\n' + '='.repeat(60));
console.log('📊 RESUMEN DE VERIFICACIÓN');
console.log('='.repeat(60));

if (errors === 0 && warnings === 0) {
    console.log('✅ TODO PERFECTO! El proyecto está listo para usar.');
    console.log('\n📋 Próximos pasos:');
    console.log('1. Lee START.md para empezar');
    console.log('2. Ejecutar: npm install');
    console.log('3. Resolver challenges y probar: npm test');
} else {
    if (errors > 0) {
        console.log(`❌ ${errors} error(es) encontrado(s)`);
        console.log('Por favor, corrige los archivos faltantes.');
    }
    if (warnings > 0) {
        console.log(`⚠️  ${warnings} advertencia(s)`);
    }
}

console.log('='.repeat(60) + '\n');

// Exit code
process.exit(errors > 0 ? 1 : 0);
