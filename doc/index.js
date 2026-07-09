#!/usr/bin/env node

/**
 * DigitalGrow Documentation Index
 * Quick reference when no arguments provided
 *
 * Usage: node index.js
 */

const fs = require('fs');
const path = require('path');

// Read and display README
const readmePath = path.join(__dirname, 'README.md');
const content = fs.readFileSync(readmePath, 'utf-8');

console.clear();
console.log(content);
console.log('\n💡 Tip: Use `node cli.js --list` for all available commands\n');
