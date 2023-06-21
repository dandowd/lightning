import fs from 'fs'
import { spawn } from 'child_process'

describe('it should read from stdin', () => {
  jest.setTimeout(7000)
  let sut: ReturnType<typeof spawn>

  beforeEach(() => {
    sut = spawn('ts-node', ['./src/index.ts', '-a', './integration/assets.json'])
  })

  afterEach(() => {
    // Ensure that the process is killed after done() is called
    sut.kill()
  })

  it('should write struck area to stdout', (done) => {
    const streamData = fs.readFileSync('./lightning.json')

    const stdOut: string[] = []
    sut.stdout?.on('data', data => {
      const rows = data.toString().split('\n')
      rows.forEach((out: string) => {
        if (out !== '') {
          stdOut.push(out)
        }
      })
    })

    sut.stdin?.write(streamData)

    // wait for process to be called
    setTimeout(() => {
      expect(stdOut).toMatchSnapshot()
      done()
    }, 6000)
  })
})
