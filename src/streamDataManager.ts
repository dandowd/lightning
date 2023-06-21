import { StreamStitch } from './stich'

export class StreamDataManager {
  private dataFrame: string[] = []
  private readonly stitch: StreamStitch = new StreamStitch()

  public ingest (data: Buffer): void {
    const rows = data.toString().split('\n')
    this.stitch.connect(rows)

    this.dataFrame.push(...rows)
  }

  public flushFrame (): string[] {
    const currentFrame = this.dataFrame
    this.dataFrame = []

    return currentFrame
  }
}
