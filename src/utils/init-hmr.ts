import { copyFile, unlink } from 'fs/promises'

/**
 * This file is a workaround for a bug in gatsby-plugin-mdx and hot reloading.
 * Pages are created the first time you run gatsby via yarn start. If you make a change to an mdx file,
 * it does not get updated in the browser. This is because the mdx files are not within webpack's watch path until
 * a change is made to the pages parent layout component.
 * This script, which now runs along with yarn start, waits for the dev server to start,
 * then does a copy-in-place of the layout file to trigger the watch.
 * From then on, changes to mdx files will be reflected in the browser.
 * This script is only needed in development mode.
 */

const layout = './src/layouts/layout.tsx'
const layoutTmp = './src/layouts/layout.tmp'

const localhost = 'http://localhost:8000/home'

const main = async () => {
  const { ready } = await waitForServer()
  if (ready) {
    console.log('Server started, refreshing...')
    try {
      await copyFile(layout, layoutTmp)
      await copyFile(layoutTmp, layout)
      await unlink(layoutTmp)
    } catch (err) {
      console.log('🔴 Failed to initialize HMR', err)
    }
    console.log('🟢 Ready!')
  }
}

const makeRequest = async () => await fetch(localhost)

const waitForServer = async () => {
  return new Promise<{ ready: boolean }>((resolve, _) => {
    const intervalId = setInterval(async () => {
      try {
        const res = await makeRequest()
        if (res.status === 200) {
          clearInterval(intervalId)
          resolve({ ready: true })
        }
      } catch (err) {
        // swallow error - server isn't running yet
      }

      console.log('🟡 Waiting for server to start...')
    }, 5000)
  })
}

main()
