import os

base_dir = "src/content/curriculum/physics"

chapters = {
    "ch1-physical-quantities": [
        ("1.1-slide-calipers.mdx", "Slide Calipers", 1, "Understanding the vernier scale and how to measure the diameter of a solid sphere using Slide Calipers.\n\n## The Formula\n\nLength $L$ is calculated as:\n\n$$ L = M + V \\times VC $$\n\nWhere:\n- $M$ = Main scale reading\n- $V$ = Vernier scale coincidence\n- $VC$ = Vernier constant")
    ],
    "ch2-motion": [
        ("2.1-equations-of-motion.mdx", "Equations of Motion", 2, "Kinematics and the equations governing linear motion with uniform acceleration.\n\n## Equations\n\n$$ v = u + at $$\n$$ s = ut + \\frac{1}{2}at^2 $$\n$$ v^2 = u^2 + 2as $$")
    ],
    "ch3-force": [
        ("3.1-newtons-laws.mdx", "Newton's Laws of Motion", 3, "Understanding Force, Mass, and Acceleration.\n\n## Newton's Second Law\n\nThe rate of change of momentum is directly proportional to the applied force.\n\n$$ F = m \\cdot a $$")
    ],
    "ch4-work-power-energy": [
        ("4.1-kinetic-energy.mdx", "Kinetic and Potential Energy", 4, "Conservation of mechanical energy.\n\n## Formulas\n\nKinetic Energy: $E_k = \\frac{1}{2}mv^2$\nPotential Energy: $E_p = mgh$")
    ],
    "ch5-matter-and-pressure": [
        ("5.1-buoyancy.mdx", "Buoyancy & Density Basics", 5, "Density and relative density.\n\n$$ \\rho = \\frac{m}{V} $$"),
        ("5.2-pascals-law.mdx", "Pascal's Law", 5, "Pressure applied to an enclosed fluid is transmitted undiminished.\n\n$$ P = \\frac{F}{A} $$"),
        ("5.4-torricelli.mdx", "Torricelli Experiment", 5, "Atmospheric pressure and the mercury barometer.\n\n$$ P = h \\cdot \\rho \\cdot g $$")
    ],
    "ch6-effect-of-heat": [
        ("6.1-thermal-expansion.mdx", "Thermal Expansion", 6, "Expansion of solids upon heating.\n\n$$ \\Delta L = \\alpha \\cdot L_0 \\cdot \\Delta T $$"),
        ("6.2-liquid-expansion.mdx", "Liquid Expansion", 6, "Real vs Apparent expansion of liquids.\n\n$$ \\gamma_r = \\gamma_a + \\gamma_g $$"),
        ("6.3-specific-heat.mdx", "Specific Heat", 6, "Heat capacity and specific heat.\n\n$$ Q = m \\cdot c \\cdot \\Delta T $$")
    ],
    "ch7-waves-and-sound": [
        ("7.1-wave-velocity.mdx", "Wave Velocity and Frequency", 7, "Relationship between velocity, frequency, and wavelength.\n\n$$ v = f \\lambda $$")
    ],
    "ch8-reflection-of-light": [
        ("8.1-mirrors.mdx", "Spherical Mirrors", 8, "Image formation in concave and convex mirrors.\n\n$$ \\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v} $$")
    ],
    "ch9-refraction-of-light": [
        ("9.1-snells-law.mdx", "Snell's Law", 9, "Refractive index and the laws of refraction.\n\n$$ n = \\frac{\\sin i}{\\sin r} $$")
    ],
    "ch10-static-electricity": [
        ("10.1-coulombs-law.mdx", "Coulomb's Law", 10, "Force between two static electric charges.\n\n$$ F = k \\frac{q_1 q_2}{r^2} $$")
    ],
    "ch11-current-electricity": [
        ("11.1-ohms-law.mdx", "Ohm's Law", 11, "Voltage, current, and resistance.\n\n$$ V = I \\cdot R $$")
    ],
    "ch12-magnetic-effect-of-current": [
        ("12.1-transformers.mdx", "Transformers", 12, "Step-up and step-down transformers.\n\n$$ \\frac{V_p}{V_s} = \\frac{N_p}{N_s} $$")
    ],
    "ch13-modern-physics-and-electronics": [
        ("13.1-radioactivity.mdx", "Radioactivity & Half-life", 13, "Decay constant and half-life of radioactive materials.\n\n$$ T_{1/2} = \\frac{0.693}{\\lambda} $$")
    ],
    "ch14-physics-to-save-life": [
        ("14.1-medical-physics.mdx", "Medical Physics", 14, "Physics principles behind X-Rays, MRI, and Ultrasonography.\n\n* X-Rays use high-energy electromagnetic radiation.\n* MRI uses strong magnetic fields and radio waves.")
    ]
}

template = """---
title: "{title}"
chapter: {chapter}
simulationId: "{sim_id}"
---

# {title}

{content}

## Interactive Simulation
This section is reserved for the native simulation canvas. When the canvas mounts, you will be able to control variables and see the theoretical formulas applied in real-time.
"""

for folder, files in chapters.items():
    folder_path = os.path.join(base_dir, folder)
    os.makedirs(folder_path, exist_ok=True)
    
    for filename, title, chapter, content in files:
        sim_id = filename.replace(".mdx", "")
        file_path = os.path.join(folder_path, filename)
        
        mdx_content = template.format(
            title=title,
            chapter=chapter,
            sim_id=sim_id,
            content=content
        )
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(mdx_content)

print("Generated MDX files for all 14 chapters successfully.")
