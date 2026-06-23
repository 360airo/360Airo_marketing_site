const fs = require('fs');
const path = require('path');
const { GifReader } = require('omggif');

const gifPath = path.join(__dirname, '..', 'public', 'enhanced_video.gif');
const buf = fs.readFileSync(gifPath);

try {
  const reader = new GifReader(buf);
  console.log('GIF dimensions:', reader.width, 'x', reader.height);
  console.log('Number of frames:', reader.numFrames());
  
  const disposalMethods = new Set();
  for (let i = 0; i < reader.numFrames(); i++) {
    const info = reader.frameInfo(i);
    disposalMethods.add(info.disposal);
  }
  console.log('Disposal methods used in this GIF:', Array.from(disposalMethods));
} catch (e) {
  console.error('Error reading GIF:', e);
}
