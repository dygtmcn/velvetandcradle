#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Velvet & Cradle Search Data Generator
 * Automatically crawls HTML files and updates search database
 */

// Configuration
const CONFIG = {
  targetFiles: ['blog-*.html', 'editorial.html'],
  excludeFiles: ['velvetandcradle-kilavuz.html'],
  outputFile: 'main.js',
  searchDataMarker: {
    start: '// --- Search Functionality ---',
    end: '// END SEARCH DATA'
  }
};

// Extract content from HTML file
function extractContentFromHTML(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract title
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(' — Velvet & Cradle', '').trim() : '';

  // Extract meta description
  const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);
  const excerpt = descMatch ? descMatch[1].trim() : '';

  // Extract h1 content
  const h1Matches = content.matchAll(/<h1[^>]*>(.*?)<\/h1>/gi);
  const h1Content = [];
  for (const match of h1Matches) {
    h1Content.push(match[1].replace(/<[^>]*>/g, '').trim());
  }

  // Extract product names from HTML (h3.product-name)
  const productNames = [];
  const productMatches = content.matchAll(/<h3\s+class="product-name"[^>]*>(.*?)<\/h3>/gi);
  for (const match of productMatches) {
    productNames.push(match[1].trim());
  }

  // Extract text from span and p tags
  const spanMatches = content.matchAll(/<span[^>]*>(.*?)<\/span>/gi);
  const pMatches = content.matchAll(/<p[^>]*>(.*?)<\/p>/gi);

  const allTextContent = [];

  // Add title content
  if (title) allTextContent.push(title);

  // Add meta description
  if (excerpt) allTextContent.push(excerpt);

  // Add h1 content
  h1Content.forEach(text => allTextContent.push(text));

  // Add product names
  productNames.forEach(name => allTextContent.push(name));

  // Add span content
  for (const match of spanMatches) {
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    if (text && text.length > 3) {
      allTextContent.push(text);
    }
  }

  // Add p content (but limit to avoid too much noise)
  for (const match of pMatches) {
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    if (text && text.length > 10 && text.length < 200) {
      allTextContent.push(text);
    }
  }

  // Extract keywords from all collected content
  const keywords = new Set();
  const allText = allTextContent.join(' ').toLowerCase();

  // Add product names and their individual words
  productNames.forEach(name => {
    keywords.add(name.toLowerCase());
    name.split(/\s+/).forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
      if (cleanWord.length > 2) {
        keywords.add(cleanWord);
      }
    });
  });

  // Extract meaningful words from all text content
  const words = allText.match(/\b[a-z]{3,}\b/g) || [];
  words.forEach(word => {
    // Filter out common words but keep design/style related terms
    const commonWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use', 'from', 'have', 'they', 'know', 'want', 'been', 'good', 'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just', 'like', 'long', 'make', 'many', 'over', 'such', 'take', 'than', 'them', 'well', 'were', 'will', 'your', 'about', 'after', 'again', 'before', 'first', 'found', 'great', 'house', 'large', 'right', 'small', 'still', 'such', 'those', 'under', 'where', 'while', 'world', 'would', 'write', 'years', 'young'];

    if (word.length > 2 && !commonWords.includes(word)) {
      keywords.add(word);
    }
  });

  // Add title words as keywords
  title.split(/\s+/).forEach(word => {
    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
    if (cleanWord.length > 2) {
      keywords.add(cleanWord);
    }
  });

  return {
    title,
    url: path.basename(filePath),
    excerpt,
    keywords: Array.from(keywords).filter(k => k.length > 2).sort()
  };
}

// Get all matching HTML files
function getTargetFiles() {
  const files = fs.readdirSync(__dirname);
  const targetFiles = [];

  files.forEach(file => {
    if (file.endsWith('.html')) {
      // Check if it matches our patterns
      if (file.startsWith('blog-') || file === 'editorial.html') {
        if (!CONFIG.excludeFiles.includes(file)) {
          targetFiles.push(file);
        }
      }
    }
  });

  return targetFiles.sort();
}

// Generate search data array
function generateSearchData() {
  const files = getTargetFiles();
  console.log(`Found ${files.length} files to process:`, files);

  const searchData = [];

  files.forEach(file => {
    try {
      const data = extractContentFromHTML(file);
      if (data.title && data.excerpt) {
        searchData.push(data);
        console.log(`✓ Processed: ${file} -> "${data.title}"`);
      } else {
        console.log(`⚠ Skipped ${file}: missing title or description`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  });

  return searchData;
}

// Update main.js with new search data
function updateMainJS(searchData) {
  const mainJSPath = path.join(__dirname, CONFIG.outputFile);

  if (!fs.existsSync(mainJSPath)) {
    console.error(`Error: ${CONFIG.outputFile} not found`);
    return false;
  }

  let content = fs.readFileSync(mainJSPath, 'utf8');

  // Generate new search data code
  const newSearchDataCode = `// --- Search Functionality ---
const searchData = ${JSON.stringify(searchData, null, 2)};

function initSearch() {`;

  // Find and replace the search data section
  const startIndex = content.indexOf(CONFIG.searchDataMarker.start);
  if (startIndex === -1) {
    console.error('Could not find search data start marker in main.js');
    return false;
  }

  const endIndex = content.indexOf('function initSearch() {', startIndex);
  if (endIndex === -1) {
    console.error('Could not find search data end marker in main.js');
    return false;
  }

  // Replace the search data section
  const beforeData = content.substring(0, startIndex);
  const afterData = content.substring(endIndex);

  const newContent = beforeData + newSearchDataCode + afterData.substring('function initSearch() {'.length);

  // Write back to file
  fs.writeFileSync(mainJSPath, newContent, 'utf8');

  return true;
}

// Main execution
function main() {
  console.log('🔍 Velvet & Cradle Search Data Generator');
  console.log('=====================================');

  try {
    const searchData = generateSearchData();

    if (searchData.length === 0) {
      console.log('No valid search data found');
      return;
    }

    console.log(`\n📊 Generated search data for ${searchData.length} pages`);

    if (updateMainJS(searchData)) {
      console.log(`✅ Successfully updated ${CONFIG.outputFile}`);
      console.log('\n📝 Search database includes:');
      searchData.forEach(item => {
        console.log(`   • ${item.title} (${item.keywords.length} keywords)`);
      });
    } else {
      console.error('❌ Failed to update main.js');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateSearchData, updateMainJS };