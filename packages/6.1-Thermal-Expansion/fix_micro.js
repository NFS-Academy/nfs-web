const fs = require('fs');
let code = fs.readFileSync('components/simulation/MicroView.tsx', 'utf8');

code = code.replace(
  "const linePositions = useMemo(() => new Float32Array(numAtoms * 3), [numAtoms]);",
  "const linePositionsRef = useRef(new Float32Array(numAtoms * 3));\n  useEffect(() => { linePositionsRef.current = new Float32Array(numAtoms * 3); }, [numAtoms]);"
);

code = code.replace(
  "linePositions[i * 3] = px;",
  "linePositionsRef.current[i * 3] = px;"
);
code = code.replace(
  "linePositions[i * 3 + 1] = py;",
  "linePositionsRef.current[i * 3 + 1] = py;"
);
code = code.replace(
  "linePositions[i * 3 + 2] = pz;",
  "linePositionsRef.current[i * 3 + 2] = pz;"
);

code = code.replace(
  "lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));",
  "lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositionsRef.current, 3));"
);

fs.writeFileSync('components/simulation/MicroView.tsx', code);
