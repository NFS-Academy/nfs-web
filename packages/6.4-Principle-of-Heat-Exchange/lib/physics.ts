export const SPECIFIC_HEAT = {
  Water: 4.184,
  Iron: 0.450,
  Copper: 0.385,
  Aluminum: 0.897,
  Ice: 2.108,
  Steam: 1.996
};

export const LATENT_HEAT_FUSION = 334;
export const LATENT_HEAT_VAPORIZATION = 2260;

export interface PhysicsBody {
  mass: number;
  temp: number;
  material: string;
  massIce: number;
  massLiquid: number;
  massSteam: number;
}

export function applyHeat(body: PhysicsBody, q: number) {
  if (body.material !== 'Water') {
    const c = SPECIFIC_HEAT[body.material as keyof typeof SPECIFIC_HEAT] || 4.184;
    body.temp += q / (body.mass * c);
    return;
  }
  
  let remainingQ = q;
  for (let i = 0; i < 10 && Math.abs(remainingQ) > 1e-6; i++) {
    if (body.temp < 0) {
      const c = SPECIFIC_HEAT.Ice;
      const maxQ = (0 - body.temp) * body.mass * c;
      if (remainingQ > 0 && remainingQ >= maxQ) {
        remainingQ -= maxQ;
        body.temp = 0;
      } else {
        body.temp += remainingQ / (body.mass * c);
        remainingQ = 0;
      }
    } else if (body.temp === 0) {
      if (remainingQ > 0) {
        if (body.massIce > 0) {
          const maxQ = body.massIce * LATENT_HEAT_FUSION;
          if (remainingQ >= maxQ) {
            remainingQ -= maxQ;
            body.massLiquid += body.massIce;
            body.massIce = 0;
          } else {
            const melted = remainingQ / LATENT_HEAT_FUSION;
            body.massIce -= melted;
            body.massLiquid += melted;
            remainingQ = 0;
          }
        } else {
          body.temp += 1e-5;
        }
      } else {
        if (body.massLiquid > 0) {
          const maxQ = - (body.massLiquid * LATENT_HEAT_FUSION);
          if (remainingQ <= maxQ) {
            remainingQ -= maxQ;
            body.massIce += body.massLiquid;
            body.massLiquid = 0;
          } else {
            const frozen = -remainingQ / LATENT_HEAT_FUSION;
            body.massLiquid -= frozen;
            body.massIce += frozen;
            remainingQ = 0;
          }
        } else {
          body.temp -= 1e-5;
        }
      }
    } else if (body.temp > 0 && body.temp < 100) {
      const c = SPECIFIC_HEAT.Water;
      if (remainingQ > 0) {
        const maxQ = (100 - body.temp) * body.mass * c;
        if (remainingQ >= maxQ) {
          remainingQ -= maxQ;
          body.temp = 100;
        } else {
          body.temp += remainingQ / (body.mass * c);
          remainingQ = 0;
        }
      } else {
        const maxQ = (0 - body.temp) * body.mass * c;
        if (remainingQ <= maxQ) {
          remainingQ -= maxQ;
          body.temp = 0;
        } else {
          body.temp += remainingQ / (body.mass * c);
          remainingQ = 0;
        }
      }
    } else if (body.temp === 100) {
      if (remainingQ > 0) {
        if (body.massLiquid > 0) {
          const maxQ = body.massLiquid * LATENT_HEAT_VAPORIZATION;
          if (remainingQ >= maxQ) {
            remainingQ -= maxQ;
            body.massSteam += body.massLiquid;
            body.massLiquid = 0;
          } else {
            const boiled = remainingQ / LATENT_HEAT_VAPORIZATION;
            body.massLiquid -= boiled;
            body.massSteam += boiled;
            remainingQ = 0;
          }
        } else {
          body.temp += 1e-5;
        }
      } else {
        if (body.massSteam > 0) {
          const maxQ = - (body.massSteam * LATENT_HEAT_VAPORIZATION);
          if (remainingQ <= maxQ) {
            remainingQ -= maxQ;
            body.massLiquid += body.massSteam;
            body.massSteam = 0;
          } else {
            const condensed = -remainingQ / LATENT_HEAT_VAPORIZATION;
            body.massSteam -= condensed;
            body.massLiquid += condensed;
            remainingQ = 0;
          }
        } else {
          body.temp -= 1e-5;
        }
      }
    } else if (body.temp > 100) {
      const c = SPECIFIC_HEAT.Steam;
      if (remainingQ < 0) {
        const maxQ = (100 - body.temp) * body.mass * c;
        if (remainingQ <= maxQ) {
          remainingQ -= maxQ;
          body.temp = 100;
        } else {
          body.temp += remainingQ / (body.mass * c);
          remainingQ = 0;
        }
      } else {
        body.temp += remainingQ / (body.mass * c);
        remainingQ = 0;
      }
    }
  }
}
