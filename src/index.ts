import { Blockly } from './global-patches'

// l10n
import './inject-locales'
// assets
import './inject-assets'

// Blockly core
import '../tmp/core/blockly'
import '../tmp/core/inject'
import '../tmp/blocks_common/colour'
import '../tmp/blocks_common/math'
import '../tmp/blocks_common/matrix'
import '../tmp/blocks_common/note'
import '../tmp/blocks_common/text'

// Vertical blocks
import '../tmp/blocks_vertical/procedures'
import '../tmp/blocks_vertical/default_toolbox'
import '../tmp/blocks_vertical/vertical_extensions'
// Load blocks
import '../tmp/blocks_vertical/motion'
import '../tmp/blocks_vertical/looks'
import '../tmp/blocks_vertical/sound'
import '../tmp/blocks_vertical/event'
import '../tmp/blocks_vertical/control'
import '../tmp/blocks_vertical/sensing'
import '../tmp/blocks_vertical/operators'
import '../tmp/blocks_vertical/data'

import '../tmp/blocks_vertical/extensions'

export default Blockly
