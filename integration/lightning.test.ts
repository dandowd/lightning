import fs from 'fs'
import { spawn } from 'child_process'

describe('it should read from stdin', () => {
  jest.setTimeout(7000)
  let sut: ReturnType<typeof spawn>

  beforeEach(() => {
    sut = spawn('ts-node', ['./src/index.ts', '-a', './assets.json'])
  })

  afterEach(() => {
    // Ensure that the process is killed after done() is called
    sut.kill()
  })

  it('should write struck area to stdout', (done) => {
    const streamData = fs.readFileSync('./lightning.json')

    const stdOut: string[] = []
    sut.stdout?.on('data', data => {
      stdOut.push(data.toString())
    })

    sut.stdin?.setDefaultEncoding('utf-8')
    sut.stdin?.write(streamData)

    // wait for process to be called
    setTimeout(() => {
      expect(stdOut).toMatchSnapshot()
      done()
    }, 6000)
  })
})
