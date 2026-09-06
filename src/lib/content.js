import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/curriculum');

export function getSimulationContent(simulationId) {
  // Recursively search for the mdx file with this name
  function findFile(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const result = findFile(fullPath);
        if (result) return result;
      } else if (file === `${simulationId}.mdx`) {
        return fullPath;
      }
    }
    return null;
  }

  const filePath = findFile(CONTENT_DIR);
  
  if (!filePath) {
    return null;
  }

  const fileContents = fs.readFileSync(/*turbopackIgnore: true*/ filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data,
    content
  };
}
