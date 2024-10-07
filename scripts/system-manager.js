import { ActionHandler as ActionHandler } from "./action-handler.js";
import { RollHandler as Core } from "./roll-handler.js";
import { DEFAULTS } from './defaults.js';

export let SystemManager = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
  SystemManager = class SystemManager extends coreModule.api.SystemManager {

    /** @override */
    getActionHandler(categoryManager) {
      let actionHandler = new ActionHandler();
      return actionHandler;
    }

    /** @override */
    getAvailableRollHandlers() {
      let choices = {core: "Core Alternityd100"};

      return choices;
    }

    /** @override */
    getRollHandler(handlerId) {
      return new Core();
    }

    async registerDefaults () {
      return DEFAULTS
    }

    registerSettings(coreUpdate) {

    }

  }
})
