const fs = require('fs')

const assetSets = [
  {
    name: 'images',
    ext: 'png',
  },
  {
    name: 'sounds',
    ext: 'ogg', // TODO This should be read from config.
  }
]

assetSets.forEach(assetSet => {
  const ext = '.' + assetSet.ext
  const filenames = fs.readdirSync(`${__dirname}/../public/${assetSet.name}/`).filter(filename => filename.includes(ext)).map(filename => filename.replace(ext, ''))
  fs.writeFileSync(`${__dirname}/../src/game/${assetSet.name}.json`, JSON.stringify(filenames, null, 2))
  console.log(`Assets of type ${assetSet.name} have been written down into ${assetSet.name}.json.`)
})
