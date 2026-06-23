const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const content = fs.readFileSync(filePath, 'utf-8');

const styleEndIndex = content.indexOf('</style>');
if (styleEndIndex !== -1) {
  const beforeStyleEnd = content.substring(0, styleEndIndex);
  const lineCount = beforeStyleEnd.split('\n').length;
  console.log('</style> is at line:', lineCount);
  
  const lines = content.split('\n');
  console.log('Lines after </style> (next 150 lines):\n', lines.slice(lineCount, lineCount + 150).join('\n'));
} else {
  console.log('</style> not found');
}
