const fs = require('fs')
const ext = '.png'
const filenames = fs.readdirSync(`${__dirname}/../public/images/`).filter(filename => filename.includes(ext)).map(filename => filename.replace(ext, ''))

fs.writeFileSync(`${__dirname}/../images.json`, JSON.stringify(filenames, null, 2))

console.log('Images array in images.json have been updated.')
