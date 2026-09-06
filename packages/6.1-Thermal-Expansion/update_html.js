const fs = require('fs');
let code = fs.readFileSync('components/simulation/MultiMaterialView.tsx', 'utf8');

code = code.replace(
  "import { Text } from '@react-three/drei';",
  "import { Html } from '@react-three/drei';"
);

code = code.replace(
  /<Text position=\{\[-0\.5, 0, 0\]\} fontSize=\{0\.3\} color="#fff" anchorX="right" anchorY="middle">[\s\S]*?<\/Text>/,
  `<Html position={[-0.5, 0, 0]} center>
        <div style={{ color: '#fff', whiteSpace: 'nowrap', fontSize: '12px', fontWeight: 'bold', paddingRight: '20px' }}>
          {material.name}
        </div>
      </Html>`
);

fs.writeFileSync('components/simulation/MultiMaterialView.tsx', code);
console.log("DONE HTML");
