
export let RollHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
  RollHandler = class RollHandler extends coreModule.api.RollHandler {

    /** @override */
    async handleActionClick(event, encodedValue) {
      let payload = encodedValue.split("|");

      if (payload[0] !== 'crew') {
        if (payload.length !== 2) {
          super.throwInvalidValueErr();
        }
      } else {
        if (payload.length !== 3) {
          super.throwInvalidValueErr();
        }
      }

      const macroType = payload[0];
      const actionId = payload[1];

      let crewId;
      macroType === 'crew' ? crewId = payload[2] : '';
console.log("handleActionClick\n",event,"\n", encodedValue,"\n",macroType,"\n",actionId)
      switch (macroType) {
        case "action":
          this.actor.rollAction(actionId);
          break;
        case "item":
          this.rollItemMacro(event, actionId);
          break;
        case "parry":
          this.rollItemMacro(event, actionId, true);
          break;
        case "attribute":
          this.actor.rollAttribute(actionId);
          break;
        case "skill":
          this.rollItemMacro(event, actionId);
          break;
        case "crew":
          const actor = await game.Alternityd100.getActorFromUuid(crewId);
          await actor.rollAction(actionId);
          break;
        default:
          break;
      }
    }
    rollAttack
    rollItemMacro(event, actionId, parry = false) {
      this.actor.items.find((i) => i.id === actionId).rollAttack();
    }
  }
})
