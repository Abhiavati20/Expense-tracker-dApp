import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'
import { metaMask, injected,  } from 'wagmi/connectors'

export function getConfig() {
  return createConfig({
    chains: [arbitrumSepolia],
    connectors: [
      injected(),
      metaMask(),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [arbitrumSepolia.id]: http(),
    },
  })
}

// declare module 'wagmi' {
//   interface Register {
//     config: ReturnType<typeof getConfig>
//   }
// }
