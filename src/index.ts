process.stdin.on('data', data => {
  process.stdout.write(data)
}).on('error', error => {
  console.log(error)
})
