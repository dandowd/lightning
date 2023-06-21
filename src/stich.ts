export class StreamStitch {
  previous: string = ''

  public connect (rows: string[]): void {
    if (this.previous !== '') {
      const newStart = `${this.previous}${rows[0]}`

      try {
        JSON.parse(newStart)
      } catch (err) {
        // log error stating that we should be able to stitch but can't
      }

      rows[0] = newStart

      this.previous = ''
    }

    const corruptCanary = rows[rows.length - 1]
    try {
      JSON.parse(corruptCanary)
    } catch (err) {
      this.previous = corruptCanary
      rows.pop()
    }
  }
}
