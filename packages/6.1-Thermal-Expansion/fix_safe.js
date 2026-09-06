const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(/Will the railway remain safe\{" "\}/g, "রেললাইনটি কি নিরাপদ থাকবে{\" \"}");
code = code.replace(/"with an expansion gap"/g, '"প্রসারণ ফাঁক সহ"');
code = code.replace(/"without an expansion gap"/g, '"প্রসারণ ফাঁক ছাড়া"');

fs.writeFileSync('app/page.tsx', code);
