import * as THREE from 'three';
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
geometry.computeBoundingBox();
console.log(geometry.boundingBox);
