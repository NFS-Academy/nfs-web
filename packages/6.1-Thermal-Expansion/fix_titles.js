const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const replacements = [
  ['"Railway Tracks"', '"রেললাইন"'],
  ['"Require expansion gaps to prevent buckling during summer heat."', '"গ্রীষ্মের তাপে বেঁকে যাওয়া রোধ করতে প্রসারণ ফাঁকের প্রয়োজন।"'],
  ['"Steel Bridge Expansion Joint"', '"ইস্পাতের সেতুর প্রসারণ জোড়"'],
  ['"Comb-like interlocking joints allow the bridge deck to expand and contract."', '"চিরুনির মতো জোড় সেতুর ডেককে প্রসারিত এবং সংকুচিত হতে দেয়।"'],
  ['"Pipeline Expansion Loop"', '"পাইপলাইনের প্রসারণ লুপ"'],
  ['"U-shaped loops absorb thermal expansion without breaking the pipes."', '"U-আকৃতির লুপগুলি পাইপ না ভেঙে তাপীয় প্রসারণ শোষণ করে।"'],
  ['"Concrete Road Expansion Joint"', '"কংক্রিট রাস্তার প্রসারণ জোড়"'],
  ['"Filled with flexible materials (like bitumen) to prevent concrete slabs from cracking."', '"কংক্রিটের স্ল্যাব ফাটল রোধ করতে নমনীয় উপকরণ (যেমন বিটুমেন) দিয়ে ভরা হয়।"'],
  ['"Overhead Electric Transmission Wire"', '"বিদ্যুৎ পরিবাহী তার"'],
  ['"Sag during summer due to expansion, tighten in winter."', '"প্রসারণের কারণে গ্রীষ্মকালে ঝুলে যায় এবং শীতকালে টানটান হয়।"']
];

for (let [search, rep] of replacements) {
    code = code.split(search).join(rep);
}

fs.writeFileSync('app/page.tsx', code);
