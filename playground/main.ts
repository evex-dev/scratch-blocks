import Blockly from '../src'

const workspace = Blockly.inject(document.getElementById('app'), {
  zoom: {
    controls: true
  },
  scrollbar: true,
  toolboxOptions: {
    color: true,
    inverted: true
  },
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true,
  },
})

globalThis.Blockly = Blockly
