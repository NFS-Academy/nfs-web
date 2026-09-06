const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(/You predicted: \{prediction\}\. The material with the highest\s*coefficient is Aluminum!/g, "আপনার পূর্বানুমান: {prediction === 'iron' ? 'লোহা' : prediction === 'copper' ? 'তামা' : prediction === 'aluminium' ? 'অ্যালুমিনিয়াম' : 'পিতল'}। অ্যালুমিনিয়াম এর প্রসারণ সহগ সবচেয়ে বেশি!");
code = code.replace(/You predicted it would be \{prediction\}\./g, "আপনার পূর্বানুমান: {prediction === 'safe' ? 'নিরাপদ' : 'অনিরাপদ'}।");
code = code.replace(/"With gaps, the tracks can expand safely!"/g, '"ফাঁক থাকলে লাইন নিরাপদে প্রসারিত হতে পারে!"');
code = code.replace(/"Without gaps, the thermal stress caused buckling!"/g, '"ফাঁক না থাকায় তাপীয় চাপে (stress) লাইনটি বেঁকে গেছে!"');
code = code.replace(/>\s*Prediction:\s*</g, '>পূর্বানুমান:<');

fs.writeFileSync('app/page.tsx', code);
