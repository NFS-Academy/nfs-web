const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(/"Macro View: Metal Rod"/g, '"ম্যাক্রো দৃশ্য: ধাতব দণ্ড"');
code = code.replace(/"Atomic View: Kinetic Vibration"/g, '"অণু দৃশ্য: গতিশীল কম্পন"');

fs.writeFileSync('app/page.tsx', code);
