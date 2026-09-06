import dynamic from 'next/dynamic';

export const SimulationRegistry = {
  // Chapter 5: Matter and Pressure
  '5.1-buoyancy': dynamic(() => import('./physics/ch5-matter-and-pressure/sim-5.1-buoyancy'), {
    loading: () => <SimulationLoader id="5.1-buoyancy" />
  }),
  '5.2-pascals-law': dynamic(() => import('./physics/ch5-matter-and-pressure/sim-5.2-pascals-law'), {
    loading: () => <SimulationLoader id="5.2-pascals-law" />
  }),
  '5.3-archimedes': dynamic(() => import('./physics/ch5-matter-and-pressure/sim-5.3-archimedes'), {
    loading: () => <SimulationLoader id="5.3-archimedes" />
  }),
  '5.4-torricelli': dynamic(() => import('./physics/ch5-matter-and-pressure/sim-5.4-torricelli'), {
    loading: () => <SimulationLoader id="5.4-torricelli" />
  }),

  // Chapter 6: Thermodynamics
  '6.1-thermal-expansion': dynamic(() => import('./physics/ch6-heat-and-thermodynamics/sim-6.1-thermal-expansion'), {
    loading: () => <SimulationLoader id="6.1-thermal-expansion" />
  }),
  '6.2-liquid-expansion': dynamic(() => import('./physics/ch6-heat-and-thermodynamics/sim-6.2-liquid-expansion'), {
    loading: () => <SimulationLoader id="6.2-liquid-expansion" />
  }),
  '6.3-specific-heat': dynamic(() => import('./physics/ch6-heat-and-thermodynamics/sim-6.3-specific-heat'), {
    loading: () => <SimulationLoader id="6.3-specific-heat" />
  }),
  '6.4-heat-exchange': dynamic(() => import('./physics/ch6-heat-and-thermodynamics/sim-6.4-heat-exchange'), {
    loading: () => <SimulationLoader id="6.4-heat-exchange" />
  }),
};

function SimulationLoader({ id }) {
  return (
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center bg-[#050505]">
      <div className="w-12 h-12 border-2 border-[#1A1A1A] border-t-[#00FFCC] rounded-full animate-spin mb-4" />
      <div className="text-[#888] font-mono text-[10px] uppercase tracking-widest text-center">
        Mounting Simulation Component…<br/>
        <span className="text-white font-bold">{id}</span>
      </div>
    </div>
  );
}
