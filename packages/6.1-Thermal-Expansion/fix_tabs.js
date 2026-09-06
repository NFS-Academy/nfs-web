const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(/"Basic Lab"/g, '"প্রাথমিক ল্যাব"');
code = code.replace(/"Material Race"/g, '"পদার্থ প্রতিযোগিতা"');
code = code.replace(/"Railway Safety"/g, '"নিরাপদ রেললাইন"');
code = code.replace(/"Experiment"/g, '"পরীক্ষা"');
code = code.replace(/"Applications"/g, '"প্রয়োগ"');
code = code.replace(/"Concept Flow"/g, '"শেখার সারসংক্ষেপ"');

fs.writeFileSync('app/page.tsx', code);
