const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const replacements = [
  ['"Heat Added"', '"তাপ প্রয়োগ করা হলো"'],
  ['"Atomic Vibration Increases"', '"অণুর কম্পন বৃদ্ধি পেল"'],
  ['"Average Atomic Distance Increases"', '"অণুগুলোর গড় দূরত্ব বৃদ্ধি পেল"'],
  ['"Object Expands"', '"বস্তুর প্রসারণ ঘটলো"'],
  ['"Engineering Structures Require Expansion Gaps"', '"প্রকৌশল অবকাঠামোতে প্রসারণ ফাঁকের প্রয়োজন হয়"']
];

for (let [search, rep] of replacements) {
    code = code.split(search).join(rep);
}

fs.writeFileSync('app/page.tsx', code);
