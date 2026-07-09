#!/usr/bin/env node

/**
 * DigitalGrow Documentation CLI
 * On-demand documentation access
 *
 * Usage: node cli.js [--option]
 * Example: node cli.js --quick-start
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0] || '--help';

const guides = {
  '--help': 'README.md',
  '--quick-start': 'QUICK-START.md',
  '--qs': 'QUICK-START.md',
  '--deployment': 'DEPLOYMENT.md',
  '--deploy': 'DEPLOYMENT.md',
  '--wordpress': 'WORDPRESS-GUIDE.md',
  '--wp': 'WORDPRESS-GUIDE.md',
  '--project-summary': 'PROJECT-SUMMARY.md',
  '--summary': 'PROJECT-SUMMARY.md'
};

if (command === '--list') {
  console.log('📚 Available Documentation:\n');
  Object.entries(guides).forEach(([cmd, file]) => {
    if (cmd !== '--help') {
      console.log(`  ${cmd.padEnd(18)} → ${file}`);
    }
  });
  console.log(`\nUsage: node cli.js [option]\nExample: node cli.js --quick-start`);
  process.exit(0);
}

const fileName = guides[command];
if (!fileName) {
  console.log(`❌ Unknown command: ${command}`);
  console.log(`\nUse: node cli.js --list\n`);
  process.exit(1);
}

const filePath = path.join(__dirname, fileName);

if (!fs.existsSync(filePath)) {
  console.log(`❌ Documentation file not found: ${fileName}`);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');
console.log(content);
