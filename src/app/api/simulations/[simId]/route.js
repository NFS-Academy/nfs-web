import { NextResponse } from 'next/server';
import { store } from '@/lib/data/store.js';

export async function GET(request, { params }) {
  const { simId } = await params;
  
  const simulation = store.simulations.find((item) => item.id === simId);
  if (!simulation) return NextResponse.json({ message: "Simulation not found." }, { status: 404 });

  const concept = store.concepts.find((item) => item.id === simulation.conceptId);
  const formulas = (concept?.formulas || []).map((id) => store.formulas.find((formula) => formula.id === id)).filter(Boolean);

  return NextResponse.json({
    simulation: {
      ...simulation,
      conceptTitle: concept?.title || "",
      formulas
    }
  });
}

export async function POST(request, { params }) {
  const { simId } = await params;
  
  const simulation = store.simulations.find((item) => item.id === simId);
  if (!simulation) return NextResponse.json({ message: "Simulation not found." }, { status: 404 });

  const body = await request.json();

  const attempt = {
    id: `attempt_${Date.now()}`,
    userId: 'anonymous', // Authentication omitted for free tier phase
    simulationId: simulation.id,
    values: body.values || {},
    result: body.result || {},
    createdAt: new Date().toISOString()
  };

  store.attempts.push(attempt);
  return NextResponse.json({ attempt }, { status: 201 });
}
