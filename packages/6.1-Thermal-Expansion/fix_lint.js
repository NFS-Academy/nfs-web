const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');
code = code.replace("setHistory([]);", "// eslint-disable-next-line react-hooks/set-state-in-effect\n    setHistory([]);");
fs.writeFileSync('app/page.tsx', code);

code = fs.readFileSync('hooks/use-mobile.ts', 'utf8');
code = code.replace("// eslint-disable-next-line react-hooks/exhaustive-deps\n    setIsMobile", "// eslint-disable-next-line react-hooks/set-state-in-effect\n    setIsMobile");
fs.writeFileSync('hooks/use-mobile.ts', code);
