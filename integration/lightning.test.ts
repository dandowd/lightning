import { spawn } from 'child_process'

describe('it should read from stdin', () => {
  let sut: ReturnType<typeof spawn>

  beforeEach(() => {
    sut = spawn('ts-node', ['../src/index.ts'], { cwd: __dirname })
  })

  afterEach(() => {
    // Ensure that the process is killed after done() is called
    sut.kill()
  })

  it('should read from stdin', (done) => {
    sut.stdout?.on('data', data => {
      expect(data.toString()).toBe('log: hello')
      done()
    })

    sut.stdin?.setDefaultEncoding('utf-8')
    sut.stdout?.pipe(process.stdout)

    sut.stdin?.write('log: hello')
  })
})
