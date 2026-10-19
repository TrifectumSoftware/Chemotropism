// Chemotropism: players start in the JAVD void dimension.
// Respawn (config/respawn-server.toml) redirects default spawning to javd:void.
// JAVD's void dimension is completely empty, so build a platform before anyone joins.

const VOID_DIMENSION = 'javd:void'
const PLATFORM_Y = 63
const SPAWN_Y = 64
const PLATFORM_RADIUS = 4

ServerEvents.loaded(event => {
  const { server } = event

  // Idempotent: refills the same 9x9 starting platform on every server start.
  server.runCommandSilent(
    `execute in ${VOID_DIMENSION} run fill ${-PLATFORM_RADIUS} ${PLATFORM_Y} ${-PLATFORM_RADIUS} ${PLATFORM_RADIUS} ${PLATFORM_Y} ${PLATFORM_RADIUS} minecraft:stone`
  )

  // Keep the spawn exactly on the platform instead of scattering players
  // within the default 10-block spawn radius.
  server.runCommandSilent('gamerule spawnRadius 0')

  // In 1.21.1 /setworldspawn only works in the Overworld, but the spawn
  // coordinates are global. Respawn reuses them when spawning in javd:void.
  server.runCommandSilent(`setworldspawn 0 ${SPAWN_Y} 0`)
})
