import { useEffect, useState } from 'react'

// Rileva supporto WebGL per decidere se mostrare la mappa 3D o il fallback 2D.
export function useWebGL(): boolean {
  const [ok, setOk] = useState(true)
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setOk(!!gl)
    } catch {
      setOk(false)
    }
  }, [])
  return ok
}
