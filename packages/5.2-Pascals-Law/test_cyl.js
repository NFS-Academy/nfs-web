import * as THREE from 'three';
const geometry = new THREE.CylinderGeometry( 10, 10, 2, 32 );
geometry.computeBoundingBox();
console.log(geometry.boundingBox);
