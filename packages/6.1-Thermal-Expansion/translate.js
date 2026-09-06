const fs = require('fs');

function replaceAll(str, mapObj) {
    let re = new RegExp(Object.keys(mapObj).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("|"),"gi");
    return str.replace(re, function(matched){
        // Do case insensitive match, but return the exact mapping
        let matchStr = Object.keys(mapObj).find(k => k.toLowerCase() === matched.toLowerCase());
        return mapObj[matchStr];
    });
}

function exactReplace(str, search, replacement) {
    return str.split(search).join(replacement);
}

let page = fs.readFileSync('app/page.tsx', 'utf8');

const replacements = [
  ['Physics Simulation Lab', 'পদার্থবিজ্ঞান সিমুলেশন ল্যাব'],
  ['NCTB Physics: তাপীয় প্রসারণ (Thermal Expansion)', 'এনসিটিবি পদার্থবিজ্ঞান: তাপীয় প্রসারণ'],
  ["m === 'fundamental' ? 'Basic Lab'", "m === 'fundamental' ? 'প্রাথমিক ল্যাব'"],
  ["m === 'multimaterial' ? 'Material Race'", "m === 'multimaterial' ? 'পদার্থ প্রতিযোগিতা'"],
  ["m === 'railway' ? 'Railway Safety'", "m === 'railway' ? 'নিরাপদ রেললাইন'"],
  ["m === 'experiment' ? 'Experiment'", "m === 'experiment' ? 'পরীক্ষা'"],
  ["m === 'gallery' ? 'Applications'", "m === 'gallery' ? 'প্রয়োগ'"],
  ["'Concept Flow'", "'শেখার সারসংক্ষেপ'"],
  ['{mode} View', '{mode === "split" ? "বিভক্ত দৃশ্য" : mode === "rod" ? "দণ্ডের দৃশ্য" : "অণু দৃশ্য"}'],
  ['Multi-Material Race', 'পদার্থ প্রতিযোগিতা'],
  ['Prediction: Which rod expands the most?', 'পূর্বানুমান: কোন দণ্ডটি সবচেয়ে বেশি প্রসারিত হবে?'],
  ['You predicted:', 'আপনার পূর্বানুমান:'],
  ['The material with the highest coefficient is Aluminum!', 'অ্যালুমিনিয়াম এর প্রসারণ সহগ সবচেয়ে বেশি!'],
  ['Try Again', 'আবার চেষ্টা করুন'],
  ['>Result<', '>ফলাফল<'],
  ['Railway Buckling Simulation', 'রেললাইন বেঁকে যাওয়ার সিমুলেশন'],
  ['UNSAFE: Structural Buckling Detected', 'অনিরাপদ: লাইন বেঁকে গেছে'],
  ['>Prediction:<', '>পূর্বানুমান:<'],
  ['Will the railway remain safe ', 'রেললাইনটি কি নিরাপদ থাকবে '],
  ['"with an expansion gap"', '"প্রসারণ ফাঁক সহ"'],
  ['"without an expansion gap"', '"প্রসারণ ফাঁক ছাড়া"'],
  ['Yes, it&apos;s safe', 'হ্যাঁ, এটি নিরাপদ'],
  ['No, it will buckle', 'না, এটি বেঁকে যাবে'],
  ['With gaps, the tracks can expand safely!', 'ফাঁক থাকলে লাইন নিরাপদে প্রসারিত হতে পারে!'],
  ['Without gaps, the thermal stress caused buckling!', 'ফাঁক না থাকায় তাপীয় চাপে (stress) লাইনটি বেঁকে গেছে!'],
  ['>Reset<', '>রিসেট<'],
  ['Custom Experiment Mode', 'কাস্টম পরীক্ষা মোড'],
  ['>Material<', '>পদার্থ<'],
  ['Initial Temp (°C)', 'প্রাথমিক তাপমাত্রা (°C)'],
  ['Final Temp (°C)', 'চূড়ান্ত তাপমাত্রা (°C)'],
  ['Initial Length (m)', 'প্রাথমিক দৈর্ঘ্য (m)'],
  ['Run Experiment', 'পরীক্ষা শুরু করুন'],
  ['Calculation Results', 'গণনার ফলাফল'],
  ['Real-World Engineering', 'বাস্তব জীবনের প্রকৌশল'],
  ['How thermal expansion shapes modern infrastructure', 'কীভাবে তাপীয় প্রসারণ আধুনিক অবকাঠামো তৈরি করে'],
  ["title: 'Railway Tracks'", "title: 'রেললাইন'"],
  ["desc: 'Require expansion gaps to prevent buckling during summer heat.'", "desc: 'গ্রীষ্মের তাপে বেঁকে যাওয়া রোধ করতে প্রসারণ ফাঁকের প্রয়োজন।'"],
  ["title: 'Steel Bridge Expansion Joint'", "title: 'ইস্পাতের সেতুর প্রসারণ জোড়'"],
  ["desc: 'Comb-like interlocking joints allow the bridge deck to expand and contract.'", "desc: 'চিরুনির মতো জোড় সেতুর ডেককে প্রসারিত এবং সংকুচিত হতে দেয়।'"],
  ["title: 'Pipeline Expansion Loop'", "title: 'পাইপলাইনের প্রসারণ লুপ'"],
  ["desc: 'U-shaped loops absorb thermal expansion without breaking the pipes.'", "desc: 'U-আকৃতির লুপগুলি পাইপ না ভেঙে তাপীয় প্রসারণ শোষণ করে।'"],
  ["title: 'Concrete Road Expansion Joint'", "title: 'কংক্রিট রাস্তার প্রসারণ জোড়'"],
  ["desc: 'Filled with flexible materials (like bitumen) to prevent concrete slabs from cracking.'", "desc: 'কংক্রিটের স্ল্যাব ফাটল রোধ করতে নমনীয় উপকরণ (যেমন বিটুমেন) দিয়ে ভরা হয়।'"],
  ["title: 'Overhead Electric Transmission Wire'", "title: 'বিদ্যুৎ পরিবাহী তার'"],
  ["desc: 'Sag during summer due to expansion, tighten in winter.'", "desc: 'প্রসারণের কারণে গ্রীষ্মকালে ঝুলে যায় এবং শীতকালে টানটান হয়।'"],
  ['Concept Summary', 'শেখার সারসংক্ষেপ'],
  ["'Heat Added'", "'তাপ প্রয়োগ করা হলো'"],
  ["'Atomic Vibration Increases'", "'অণুর কম্পন বৃদ্ধি পেল'"],
  ["'Average Atomic Distance Increases'", "'অণুগুলোর গড় দূরত্ব বৃদ্ধি পেল'"],
  ["'Object Expands'", "'বস্তুর প্রসারণ ঘটলো'"],
  ["'Engineering Structures Require Expansion Gaps'", "'প্রকৌশল অবকাঠামোতে প্রসারণ ফাঁকের প্রয়োজন হয়'"],
  ['Expansion Gap Mode', 'প্রসারণ ফাঁক মোড'],
  ['>SAFE<', '>নিরাপদ<'],
  ['>UNSAFE<', '>অনিরাপদ<'],
  ['Mode A: Gap Present (Safe)', 'মোড A: ফাঁক রয়েছে (নিরাপদ)'],
  ['Mode B: No Gap (Danger)', 'মোড B: ফাঁক নেই (বিপজ্জনক)'],
  ['>Season<', '>ঋতু<'],
  ['>Winter<', '>শীতকাল<'],
  ['>Summer<', '>গ্রীষ্মকাল<'],
  ['Stress Level', 'চাপের মাত্রা (Stress Level)'],
  ['Material Properties', 'পদার্থের বৈশিষ্ট্য'],
  ['>Temperature<', '>তাপমাত্রা<'],
  ['Ice (0°)', 'বরফ (0°)'],
  ['Room (20°)', 'সাধারণ (20°)'],
  ['Boil (100°)', 'ফুটন্ত (100°)'],
  ['Red Hot', 'লাল তপ্ত'],
  ['> Slow', '> ধীর'],
  ['> Fast', '> দ্রুত'],
  ['Linear Expansion Coefficient:', 'রৈখিক প্রসারণ সহগ:'],
  ['Live Telemetry', 'সরাসরি পরিমাপ'],
  ['Initial Length (L₀)', 'প্রাথমিক দৈর্ঘ্য (L₀)'],
  ['Current Length (L)', 'বর্তমান দৈর্ঘ্য (L)'],
  ['Expansion (ΔL)', 'প্রসারণ (ΔL)'],
  ['Expansion %', 'প্রসারণের শতকরা হার'],
  ['Avg Atomic Gap', 'অণুগুলোর গড় দূরত্ব'],
  ["{m === 'fundamental' ? 'Basic Lab' : m === 'multimaterial' ? 'Material Race' : m === 'railway' ? 'Railway Safety' : m === 'experiment' ? 'Experiment' : m === 'gallery' ? 'Applications' : 'Concept Flow'}", 
   "{m === 'fundamental' ? 'প্রাথমিক ল্যাব' : m === 'multimaterial' ? 'পদার্থ প্রতিযোগিতা' : m === 'railway' ? 'নিরাপদ রেললাইন' : m === 'experiment' ? 'পরীক্ষা' : m === 'gallery' ? 'প্রয়োগ' : 'শেখার সারসংক্ষেপ'}"]
];

for (let [search, replacement] of replacements) {
    page = exactReplace(page, search, replacement);
}

// Map english material ids to bangla in multimaterial prediction options (buttons)
page = exactReplace(page, "{['iron', 'copper', 'aluminum', 'brass'].map", "{['iron', 'copper', 'aluminium', 'brass'].map");
// We need to map `m` to bangla name in buttons
page = exactReplace(page, ">{m}</button>", ">{m === 'iron' ? 'লোহা' : m === 'copper' ? 'তামা' : m === 'aluminium' ? 'অ্যালুমিনিয়াম' : 'পিতল'}</button>");
page = exactReplace(page, "You predicted: {prediction}.", "আপনার পূর্বানুমান: {prediction === 'iron' ? 'লোহা' : prediction === 'copper' ? 'তামা' : prediction === 'aluminium' ? 'অ্যালুমিনিয়াম' : 'পিতল'}.");

fs.writeFileSync('app/page.tsx', page);

// translate lib/physics.ts
let physics = fs.readFileSync('lib/physics.ts', 'utf8');
physics = exactReplace(physics, "name: 'Iron'", "name: 'লোহা'");
physics = exactReplace(physics, "name: 'Copper'", "name: 'তামা'");
physics = exactReplace(physics, "name: 'Aluminium'", "name: 'অ্যালুমিনিয়াম'");
physics = exactReplace(physics, "name: 'Brass'", "name: 'পিতল'");
fs.writeFileSync('lib/physics.ts', physics);

// translate components/simulation/GraphPanel.tsx
let graph = fs.readFileSync('components/simulation/GraphPanel.tsx', 'utf8');
graph = exactReplace(graph, "T-L Expansion Curve", "তাপমাত্রা–প্রসারণ গ্রাফ");
graph = exactReplace(graph, "Expansion (ΔL)", "প্রসারণ (ΔL)");
fs.writeFileSync('components/simulation/GraphPanel.tsx', graph);

console.log("DONE");
