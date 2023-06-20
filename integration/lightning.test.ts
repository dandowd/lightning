import { spawn } from 'child_process'

describe('it should read from stdin', () => {
  let sut: ReturnType<typeof spawn>

  beforeEach(() => {
    sut = spawn('ts-node', ['./src/index.ts'])
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

  it('should write to stdout once per area', (done) => {
    const streamData = `{"flashType":1,"strikeTime":1446760903089,"latitude":33.7320437,"longitude":-96.7257525,"peakAmps":2613,"reserved":"000","icHeight":12287,"receivedTime":1446760915221,"numberOfSensors":7,"multiplicity":13}
    {"flashType":1,"strikeTime":1446760903116,"latitude":33.7629128,"longitude":-96.6864843,"peakAmps":-2011,"reserved":"000","icHeight":13258,"receivedTime":1446760915221,"numberOfSensors":13,"multiplicity":13}
    {"flashType":1,"strikeTime":1446760903180,"latitude":33.7373298,"longitude":-96.7196966,"peakAmps":17386,"reserved":"000","icHeight":19128,"receivedTime":1446760915221,"numberOfSensors":17,"multiplicity":13}`

    sut.stdout?.on('data', data => {
      expect(data.toString()).toBe('lightning alert for 035: Mclure Ford')
      done()
    })

    sut.stdin?.setDefaultEncoding('utf-8')
    sut.stdout?.pipe(process.stdout)

    sut.stdin?.write(streamData)
  })
})
