import { Canvas, useFrame } from '@react-three/fiber'
import {
  BufferGeometry,
  CatmullRomCurve3,
  DoubleSide,
  Float32BufferAttribute,
  Mesh,
  Path,
  Shape,
  ShapeGeometry,
  ShaderMaterial,
  TubeGeometry,
  Vector3,
} from 'three'
import { useEffect, useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import './App.css'

type ProgressRef = MutableRefObject<number>

function seededValue(index: number) {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453
  return value - Math.floor(value)
}

const portalVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const portalFragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uPass;

  void main() {
    vec2 point = (vUv - 0.5) * 2.0;
    float radius = length(point);
    float angle = atan(point.y, point.x);
    float currentAngle = angle + radius * 6.5 - uTime * 0.18;
    float folds = sin(currentAngle * 5.0 + sin(angle * 3.0 + uTime * 0.12) * 1.25);
    float veil = smoothstep(-0.8, 0.75, folds) * (1.0 - smoothstep(0.24, 1.0, radius));
    float strands = 0.5 + 0.5 * sin(angle * 7.0 + radius * 23.0 - uTime * 0.24 + sin(angle * 3.0) * 1.4);
    float halo = exp(-radius * 2.75);
    float glint = pow(max(0.0, sin(currentAngle * 2.0 - uTime * 0.08)), 12.0);

    vec3 deep = vec3(0.025, 0.05, 0.055);
    vec3 blue = vec3(0.09, 0.34, 0.32);
    vec3 pale = vec3(0.67, 0.82, 0.68);
    vec3 ember = vec3(0.54, 0.28, 0.13);
    float aperture = exp(-abs(point.x + sin(point.y * 3.0 + uTime * 0.12) * 0.035) * 17.0);
    vec3 color = deep + blue * (0.28 + veil * 1.1);
    color += blue * pow(strands, 7.0) * 0.74;
    color += mix(ember, pale, smoothstep(-0.3, 0.8, point.y)) * halo * 0.86;
    color += vec3(0.62, 0.86, 0.72) * aperture * (1.0 - smoothstep(0.2, 1.0, radius)) * 0.32;
    color += vec3(0.72, 0.88, 0.74) * glint * 0.4;

    float membrane = 0.34 + veil * 0.2 + halo * 0.1;
    float passing = 1.0 - smoothstep(0.34, 0.48, uPass);
    gl_FragColor = vec4(color, membrane * passing);
  }
`

function makePortalShape(width: number, bottom: number, shoulder: number, peak: number) {
  const shape = new Shape()
  shape.moveTo(-width, bottom)
  shape.lineTo(-width, shoulder)
  shape.bezierCurveTo(-width, shoulder + 1.2, -width * 0.78, peak - 0.98, 0, peak)
  shape.bezierCurveTo(width * 0.78, peak - 0.98, width, shoulder + 1.2, width, shoulder)
  shape.lineTo(width, bottom)
  shape.closePath()
  return shape
}

function makeFrameShape() {
  const frame = makePortalShape(2.55, -3.3, 0.35, 4.75)
  const opening = new Path()
  opening.moveTo(-1.91, -3.12)
  opening.lineTo(-1.91, 0.28)
  opening.bezierCurveTo(-1.91, 1.48, -1.49, 2.93, 0, 3.91)
  opening.bezierCurveTo(1.49, 2.93, 1.91, 1.48, 1.91, 0.28)
  opening.lineTo(1.91, -3.12)
  opening.closePath()
  frame.holes.push(opening)
  return frame
}

function makeArchCurve() {
  return new CatmullRomCurve3([
    new Vector3(-2.42, -3.18, 0),
    new Vector3(-2.42, 0.3, 0),
    new Vector3(-2.2, 1.75, 0),
    new Vector3(-1.54, 3.24, 0),
    new Vector3(0, 4.55, 0),
    new Vector3(1.54, 3.24, 0),
    new Vector3(2.2, 1.75, 0),
    new Vector3(2.42, 0.3, 0),
    new Vector3(2.42, -3.18, 0),
  ])
}

function Portal({ progressRef }: { progressRef: ProgressRef }) {
  const glowMaterial = useRef<ShaderMaterial>(null)
  const frameShape = useMemo(() => makeFrameShape(), [])
  const innerShape = useMemo(() => makePortalShape(1.91, -3.1, 0.28, 3.91), [])
  const innerGeometry = useMemo(() => new ShapeGeometry(innerShape, 36), [innerShape])
  const outerTrace = useMemo(() => new TubeGeometry(makeArchCurve(), 120, 0.052, 8, false), [])
  const innerTrace = useMemo(() => new TubeGeometry(makeArchCurve(), 120, 0.018, 6, false), [])

  useFrame(({ clock }) => {
    if (glowMaterial.current) {
      glowMaterial.current.uniforms.uTime.value = clock.elapsedTime
      glowMaterial.current.uniforms.uPass.value = progressRef.current
    }
  })

  return (
    <group position={[0, 0.05, 0]}>
      <mesh position={[0, 0, -0.29]}>
        <extrudeGeometry args={[frameShape, { depth: 0.58, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: 0.075, bevelThickness: 0.09, curveSegments: 28 }]} />
        <meshStandardMaterial color="#282b2a" metalness={0.72} roughness={0.37} />
      </mesh>

      <mesh geometry={outerTrace} position={[0, 0, 0.34]}>
        <meshStandardMaterial color="#8d8064" metalness={0.88} roughness={0.28} emissive="#312a1b" emissiveIntensity={0.65} />
      </mesh>
      <mesh geometry={innerTrace} position={[0, 0, 0.355]}>
        <meshStandardMaterial color="#7eb1a6" metalness={0.8} roughness={0.2} emissive="#2b817b" emissiveIntensity={1.4} />
      </mesh>

      <mesh geometry={innerGeometry} position={[0, 0, -0.16]}>
        <shaderMaterial
          ref={glowMaterial}
          vertexShader={portalVertexShader}
          fragmentShader={portalFragmentShader}
          uniforms={{ uTime: { value: 0 }, uPass: { value: 0 } }}
          side={DoubleSide}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, -3.18, 0.16]}>
        <boxGeometry args={[5.55, 0.34, 1.2]} />
        <meshStandardMaterial color="#292826" metalness={0.62} roughness={0.42} />
      </mesh>
      <mesh position={[0, -3.38, 0.2]}>
        <boxGeometry args={[6.7, 0.16, 1.55]} />
        <meshStandardMaterial color="#171b1d" metalness={0.46} roughness={0.5} />
      </mesh>
    </group>
  )
}

function Pillar({ x, z, height, lean = 0 }: { x: number; z: number; height: number; lean?: number }) {
  const y = -3.22 + height / 2
  return (
    <group position={[x, y, z]} rotation={[0, 0, lean]}>
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.75, 0.94, height, 7, 1]} />
        <meshStandardMaterial color="#1d2426" metalness={0.48} roughness={0.58} />
      </mesh>
      <mesh position={[0, height / 2 + 0.22, 0]}>
        <boxGeometry args={[2.35, 0.44, 2.1]} />
        <meshStandardMaterial color="#292b29" metalness={0.56} roughness={0.4} />
      </mesh>
      <mesh position={[0, -height / 2 + 0.2, 0]}>
        <boxGeometry args={[2.15, 0.42, 1.95]} />
        <meshStandardMaterial color="#242727" metalness={0.52} roughness={0.48} />
      </mesh>
      {[-0.52, 0.52].map((offset) => (
        <mesh key={offset} position={[offset, 0, 0.66]}>
          <boxGeometry args={[0.035, height * 0.82, 0.025]} />
          <meshStandardMaterial color="#647168" metalness={0.65} roughness={0.34} emissive="#172621" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function FloatingFragments() {
  const fragments = useRef<Array<Mesh | null>>([])
  const items = useMemo(() => {
    return Array.from({ length: 22 }, (_, index) => {
      const random = (offset: number) => seededValue(index * 7 + offset + 19)
      return {
        position: [(index % 2 === 0 ? -1 : 1) * (15 + random(0) * 18), 2 + random(1) * 11, -38 - random(2) * 45] as [number, number, number],
        scale: [0.05 + random(3) * 0.16, 0.12 + random(4) * 0.36, 0.04 + random(5) * 0.08] as [number, number, number],
        rotation: random(6) * Math.PI,
        speed: 0.025 + random(7) * 0.09,
        index,
      }
    })
  }, [])

  useFrame((_, delta) => {
    items.forEach((item, index) => {
      const mesh = fragments.current[index]
      if (mesh) mesh.rotation.y += delta * item.speed
    })
  })

  return (
    <group>
      {items.map((item, index) => (
        <mesh
          key={item.index}
          ref={(mesh) => {
            if (mesh) fragments.current[index] = mesh
          }}
          position={item.position}
          scale={item.scale}
          rotation={[item.rotation, item.rotation * 0.6, item.rotation * 0.4]}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#586560" metalness={0.64} roughness={0.33} emissive="#182824" emissiveIntensity={0.55} />
        </mesh>
      ))}
    </group>
  )
}

function Dust() {
  const points = useRef<import('three').Points>(null)
  const dustGeometry = useMemo(() => {
    const positions = new Float32Array(950 * 3)
    for (let i = 0; i < 950; i += 1) {
      positions[i * 3] = (seededValue(i * 3 + 125) - 0.5) * 24
      positions[i * 3 + 1] = (seededValue(i * 3 + 126) - 0.5) * 14
      positions[i * 3 + 2] = -34 + seededValue(i * 3 + 127) * 51
    }
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return geometry
  }, [])

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.003
  })

  return (
    <points ref={points} geometry={dustGeometry}>
      <pointsMaterial color="#a6b9aa" size={0.035} sizeAttenuation transparent opacity={0.52} depthWrite={false} />
    </points>
  )
}

function Floor() {
  const floorMaterial = useMemo(() => new ShaderMaterial({
    uniforms: {},
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      precision highp float;
      varying vec3 vWorldPosition;
      void main() {
        vec2 gridPoint = vWorldPosition.xz * 0.5;
        vec2 cell = abs(fract(gridPoint - 0.5) - 0.5) / fwidth(gridPoint);
        float grid = 1.0 - min(min(cell.x, cell.y), 1.0);
        float fineGrid = smoothstep(0.42, 0.02, min(cell.x, cell.y));
        float glow = exp(-abs(vWorldPosition.x) * 0.24) * exp(-abs(vWorldPosition.z) * 0.055);
        float edgeFade = 1.0 - smoothstep(42.0, 112.0, length(vWorldPosition.xz));
        float beyond = smoothstep(-8.0, -28.0, vWorldPosition.z);
        float waterline = sin(vWorldPosition.x * 0.56 + sin(vWorldPosition.z * 0.13) * 2.0)
          * sin(vWorldPosition.z * 0.38 + vWorldPosition.x * 0.12);
        float water = pow(max(0.0, 1.0 - abs(waterline)), 18.0) * beyond;
        vec3 base = vec3(0.008, 0.012, 0.015);
        vec3 reflected = vec3(0.055, 0.12, 0.105) * glow * 0.48;
        float line = max(grid * 0.16, fineGrid * 0.045) * edgeFade * (1.0 - beyond * 0.9);
        vec3 sea = vec3(0.12, 0.2, 0.19) * water * edgeFade * 0.65;
        gl_FragColor = vec4(base + reflected + vec3(0.19, 0.31, 0.25) * line + sea, 1.0);
      }
    `,
    side: DoubleSide,
    toneMapped: false,
  }), [])

  return (
    <mesh position={[0, -3.42, -55]} rotation={[-Math.PI / 2, 0, 0]} material={floorMaterial}>
      <planeGeometry args={[180, 180, 1, 1]} />
    </mesh>
  )
}

function World({ progressRef }: { progressRef: ProgressRef }) {
  const cameraTarget = useMemo(() => new Vector3(), [])
  const cameraPosition = useMemo(() => new Vector3(), [])
  const flightPath = useMemo(() => new CatmullRomCurve3([
    new Vector3(0, 1.02, 14.5),
    new Vector3(-0.12, 0.96, 8),
    new Vector3(-0.2, 0.88, 3.2),
    new Vector3(-0.12, 0.76, -4),
    new Vector3(0.22, 0.86, -14),
    new Vector3(0.42, 1.25, -30),
    new Vector3(0.2, 2.1, -50),
    new Vector3(0, 3.2, -72),
  ]), [])

  useFrame(({ camera }, delta) => {
    const progress = progressRef.current
    flightPath.getPoint(progress, cameraPosition)
    const ease = 1 - Math.exp(-3.2 * delta)

    camera.position.lerp(cameraPosition, ease)
    const direction = flightPath.getTangent(progress)
    cameraTarget.set(
      camera.position.x + direction.x * 12,
      camera.position.y + direction.y * 12 + Math.sin(progress * Math.PI) * 0.28,
      camera.position.z + direction.z * 12,
    )
    camera.lookAt(cameraTarget)
  })

  return (
    <>
      <color attach="background" args={['#05080a']} />
      <fog attach="fog" args={['#0a1114', 32, 132]} />
      <ambientLight intensity={0.32} color="#9baea3" />
      <hemisphereLight args={['#8da79e', '#090b0c', 0.55]} />
      <spotLight position={[0, 10, 3]} angle={0.31} penumbra={0.9} intensity={95} color="#a5b7a3" distance={30} />
      <pointLight position={[0, 0.6, 1.3]} intensity={11} color="#56a69a" distance={12} />
      <pointLight position={[0, 0.2, -0.7]} intensity={13} color="#c27c46" distance={8} />
      <pointLight position={[-7, 3, -9]} intensity={8} color="#597f84" distance={15} />
      <Portal progressRef={progressRef} />

      {[-1, 1].flatMap((side) => [
        <Pillar key={`${side}-near`} x={side * 5.2} z={-1.8} height={13.5} lean={side * -0.018} />,
        <Pillar key={`${side}-middle`} x={side * 6.3} z={-12.5} height={15.8} lean={side * 0.026} />,
        <Pillar key={`${side}-far`} x={side * 5.7} z={-25.5} height={12.8} lean={side * -0.035} />,
      ])}

      <mesh position={[0, 4.15, -5.6]} rotation={[0.48, 0, 0.1]}>
        <torusGeometry args={[5.55, 0.055, 8, 120]} />
        <meshStandardMaterial color="#343831" metalness={0.78} roughness={0.31} emissive="#22251c" emissiveIntensity={0.38} />
      </mesh>
      <mesh position={[0, 1.9, -2.5]} rotation={[0, 0, Math.PI]}>
        <cylinderGeometry args={[0.12, 2.8, 10, 48, 1, true]} />
        <meshBasicMaterial color="#4c7770" transparent opacity={0.045} side={DoubleSide} depthWrite={false} />
      </mesh>

      <DreamWorld />

      <Floor />
      <FloatingFragments />
      <Dust />
    </>
  )
}

function DreamWorld() {
  const steps = useMemo(() => Array.from({ length: 22 }, (_, index) => {
    const depth = index / 21
    return {
      position: [Math.sin(depth * Math.PI) * 0.6, -3.08 + depth * 3.0, -8 - index * 1.75] as [number, number, number],
      width: 3.4 + Math.sin(depth * Math.PI) * 1.4,
      length: 1.9 + depth * 0.3,
      index,
    }
  }), [])

  return (
    <group>
      {steps.map((step) => (
        <mesh key={step.index} position={step.position} castShadow receiveShadow>
          <boxGeometry args={[step.width, 0.22, step.length]} />
          <meshStandardMaterial color={step.index % 3 === 0 ? '#4b514b' : '#242d2e'} metalness={0.56} roughness={0.38} emissive="#293e3a" emissiveIntensity={0.22} />
        </mesh>
      ))}

      <mesh position={[0, 0.05, -48]} rotation={[0, 0, 0.08]}>
        <cylinderGeometry args={[4.8, 6.3, 1.1, 9, 1]} />
        <meshStandardMaterial color="#343b39" metalness={0.72} roughness={0.3} emissive="#283d39" emissiveIntensity={0.28} />
      </mesh>
      <mesh position={[0, 8.5, -51]} rotation={[0, 0, 0.08]} castShadow>
        <cylinderGeometry args={[0.18, 1.55, 16, 7, 1]} />
        <meshStandardMaterial color="#69716a" metalness={0.7} roughness={0.25} emissive="#354b45" emissiveIntensity={0.34} />
      </mesh>
      <mesh position={[0, 5.1, -50.6]} rotation={[0.12, 0, 0.08]}>
        <torusGeometry args={[3.15, 0.045, 8, 96]} />
        <meshStandardMaterial color="#9a906c" metalness={0.83} roughness={0.22} emissive="#746344" emissiveIntensity={0.8} />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={side} position={[side * 10, -0.2, -37]} rotation={[0, 0, side * -0.025]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.6, 1.3, 17, 5, 1]} />
            <meshStandardMaterial color="#222b2d" metalness={0.62} roughness={0.4} />
          </mesh>
          <mesh position={[0, 8.6, 0]}>
            <torusGeometry args={[1.3, 0.035, 6, 48]} />
            <meshStandardMaterial color="#66786f" emissive="#3d6558" emissiveIntensity={0.9} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 11, -98]}>
        <sphereGeometry args={[9, 48, 32]} />
        <meshStandardMaterial color="#b9b5a1" emissive="#827d67" emissiveIntensity={0.42} roughness={0.95} />
      </mesh>
      <mesh position={[0, 11, -98]} rotation={[0.16, 0, -0.08]}>
        <torusGeometry args={[12.4, 0.075, 8, 128]} />
        <meshStandardMaterial color="#817d6b" metalness={0.8} roughness={0.28} emissive="#625a43" emissiveIntensity={0.75} />
      </mesh>
      <pointLight position={[0, 9, -50]} intensity={26} color="#91b2a4" distance={42} />
      <pointLight position={[0, 12, -90]} intensity={38} color="#b6aa82" distance={68} />
    </group>
  )
}

function App() {
  const scrollProgress = useRef(0)

  useEffect(() => {
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight
      const progress = distance > 0 ? window.scrollY / distance : 0
      scrollProgress.current = Math.min(1, Math.max(0, progress))
      document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress.current}`)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="experience">
      <Canvas
        className="world-canvas"
        dpr={[1, 1.5]}
        camera={{ fov: 39, near: 0.1, far: 100, position: [0, 1.02, 14.5] }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        fallback={<div className="webgl-fallback">This experience needs a browser with WebGL support.</div>}
        aria-hidden="true"
      >
        <World progressRef={scrollProgress} />
      </Canvas>

      <header className="masthead">
        <a className="wordmark" href="#threshold" aria-label="The Veil — beginning">
          <span className="wordmark-symbol" aria-hidden="true"><i /><i /><i /></span>
          <span>THE VEIL</span>
        </a>
        <div className="masthead-meta"><span>FIELD NOTE 001</span><span>AN INTERACTIVE DREAM</span></div>
      </header>

      <div className="chapter-index" aria-hidden="true">
        <span>01</span><span className="index-rule" /><span>03</span>
      </div>

      <main className="story">
        <section id="threshold" className="chapter chapter--threshold" aria-labelledby="chapter-one-title">
          <div className="chapter-copy">
            <p className="eyebrow"><span>01</span><span className="eyebrow-line" /> THE THRESHOLD</p>
            <h1 id="chapter-one-title">The world<br />forgets its shape.</h1>
            <p className="chapter-note">Somewhere between the last thought<br />and the first light, a door appears.</p>
          </div>
          <a className="scroll-cue" href="#descent">
            <span>SCROLL TO DESCEND</span>
            <span className="scroll-stem" aria-hidden="true" />
          </a>
        </section>

        <section id="descent" className="chapter chapter--descent" aria-labelledby="chapter-two-title">
          <div className="chapter-copy chapter-copy--right">
            <p className="eyebrow"><span>02</span><span className="eyebrow-line" /> THE DESCENT</p>
            <h2 id="chapter-two-title">A silence<br />with a pulse.</h2>
            <p className="chapter-note">The architecture is older than memory.<br />It knows the way through.</p>
          </div>
        </section>

        <section id="beyond" className="chapter chapter--beyond" aria-labelledby="chapter-three-title">
          <div className="chapter-copy">
            <p className="eyebrow"><span>03</span><span className="eyebrow-line" /> WHAT LIES BEYOND</p>
            <h2 id="chapter-three-title">You were<br />expected.</h2>
            <p className="chapter-note">The veil closes softly behind you.<br />The dream is only beginning.</p>
          </div>
          <a className="return-link" href="#threshold">RETURN TO THE THRESHOLD <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <footer className="frame-footer" aria-hidden="true">
        <span>AN EXPLORATION OF THE UNSEEN</span>
        <span className="footer-coordinate">54°21′ N&nbsp;&nbsp; 18°39′ E</span>
      </footer>
      <div className="progress-line" aria-hidden="true"><span /></div>
    </div>
  )
}

export default App
