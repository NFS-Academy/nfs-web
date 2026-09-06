const fs = require('fs');
let content = fs.readFileSync('components/Controls.tsx', 'utf8');

const translations = {
  'Material': 'পদার্থ',
  'Bucket A': 'গরম বস্তু',
  'Bucket B': 'ঠান্ডা বস্তু',
  'Mass': 'ভর',
  'Temp': 'তাপমাত্রা',
  'Include Heat Loss to Environment': 'পরিবেশের সাথে তাপের আদান-প্রদান অন্তর্ভুক্ত করুন',
  'Simulation Speed': 'সিমুলেশনের গতি',
  'Normal': 'সাধারণ',
  'Fast': 'দ্রুত'
};

for (const [en, bn] of Object.entries(translations)) {
  content = content.replace(new RegExp(en, 'g'), bn);
}

content = content.replace("{MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}", "{MATERIALS.map(m => <option key={m} value={m}>{m === 'Water' ? 'পানি' : m === 'Iron' ? 'লোহা' : m === 'Copper' ? 'তামা' : m === 'Aluminum' ? 'অ্যালুমিনিয়াম' : m === 'H2O' ? 'পানি (H2O)' : m}</option>)}");

content = content.replace('<div className="flex flex-col gap-6">', '<div className="flex flex-col gap-6 font-heading">');

fs.writeFileSync('components/Controls.tsx', content);
