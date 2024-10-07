import { SystemManager } from './system-manager.js'
import { MODULE, REQUIRED_CORE_MODULE_VERSION } from './constants.js'

export let ActionHandler = null;
Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    const module = game.modules.get(MODULE.ID);
    module.api = {
        requiredCoreModuleVersion: REQUIRED_CORE_MODULE_VERSION,
        SystemManager
    }
    Hooks.call('tokenActionHudSystemReady', module)
})
