import { NextResponse } from 'next/server';
import { store, getConceptPayload } from '@/lib/data/store.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  switch (action) {
    case 'bootstrap':
      return NextResponse.json({
        grades: store.grades,
        subjects: store.subjects,
        chapters: store.chapters,
        featuredConcepts: store.concepts.slice(0, 6),
        plans: store.plans
      });
    
    case 'grades':
      return NextResponse.json({ grades: store.grades });

    case 'subjects':
      const gradeId = searchParams.get('gradeId');
      return NextResponse.json({ 
        subjects: store.subjects.filter(s => s.gradeId === gradeId) 
      });

    case 'chapters':
      const subjectId = searchParams.get('subjectId');
      return NextResponse.json({ 
        chapters: store.chapters.filter(c => c.subjectId === subjectId) 
      });

    case 'concepts':
      const chapterId = searchParams.get('chapterId');
      return NextResponse.json({ 
        concepts: store.concepts.filter(c => c.chapterId === chapterId) 
      });

    case 'conceptPayload':
      const conceptId = searchParams.get('conceptId');
      const concept = getConceptPayload(conceptId);
      if (!concept) return NextResponse.json({ message: "Concept not found." }, { status: 404 });
      return NextResponse.json({ concept });

    default:
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }
}
