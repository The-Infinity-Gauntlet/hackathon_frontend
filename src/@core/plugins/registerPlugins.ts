import 'reflect-metadata'
import type { App } from 'vue'
import registerServices from '../di/registerServices'

export function registerPlugins(app: App) {
  const imports = import.meta.glob<{ default: (app: App) => void }>(
    ['./registered/**/*.{ts,js}'], // <- CORRETO AGORA
    { eager: true },
  )
  registerServices()

  const importPaths = Object.keys(imports).sort()

  for (const path of importPaths) {
    const plugin = imports[path]
    plugin.default?.(app)
  }
}
