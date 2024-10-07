/**
 * Default categories and groups
 */

export const COMBAT_ID = 'combat';
export const RESISTANCE_ID = 'resistance';
export const WEAPONS_ID = 'weapons';
export const ACTIONS_ID = 'actions';
export const VEHICLE_ID = 'vehicle';
export const VEHICLE_RESISTANCE_ID = 'vehicle_resistances';
export const VEHICLE_WEAPON_ID = 'vehicle_weapon';
export const VEHICLE_ACTIONS_ID = 'vehicle_actions';
export const ATTRIBUTES_ID = 'attributes';
export const SKILLS_ID = 'skills';
export const CREW_ID = 'crew';

export let COMBAT_NAME = null;
export let RESISTANCE_NAME = null;
export let WEAPONS_NAME = null;
export let ACTIONS_NAME = null;
export let VEHICLE_NAME = null;
export let VEHICLE_RESISTANCE_NAME = null;
export let VEHICLE_WEAPON_NAME = null;
export let VEHICLE_ACTIONS_NAME = null;
export let ATTRIBUTES_NAME = null;
export let SKILLS_NAME = null;
export let CREW_NAME = null;

export let DEFAULTS = null;

Hooks.on('tokenActionHudCoreApiReady', async () => {

    COMBAT_NAME = game.i18n.localize('d100A.Tokenbar.COMBAT');
    RESISTANCE_NAME = game.i18n.localize('d100A.Tokenbar.RESISTANCE');
    WEAPONS_NAME = game.i18n.localize('d100A.Tokenbar.WEAPONS');
    ACTIONS_NAME = game.i18n.localize('d100A.Tokenbar.ACTIONS');
    VEHICLE_NAME = game.i18n.localize('d100A.Tokenbar.VEHICLE');
    VEHICLE_RESISTANCE_NAME = game.i18n.localize('d100A.Tokenbar.RESISTANCE');
    VEHICLE_WEAPON_NAME = game.i18n.localize('d100A.Tokenbar.VEHICLE_WEAPON');
    VEHICLE_ACTIONS_NAME = game.i18n.localize('d100A.Tokenbar.VEHICLE_ACTIONS');
    ATTRIBUTES_NAME = game.i18n.localize('d100A.Tokenbar.ATTRIBUTES');
    SKILLS_NAME = game.i18n.localize('d100A.Tokenbar.SKILLS');
    CREW_NAME = game.i18n.localize('d100A.Tokenbar.CREW');

    DEFAULTS = {
        layout: [
            {
                nestId: COMBAT_ID,
                id: COMBAT_ID,
                name: COMBAT_NAME,
                groups: [
                    {
                        nestId: 'combat_resistances',
                        id: RESISTANCE_ID,
                        name: RESISTANCE_NAME,
                        type: 'system'
                    },
                    {
                        nestId: 'combat_weapons',
                        id: WEAPONS_ID,
                        name: WEAPONS_NAME,
                        type: 'system'
                    },
                    {
                        nestId: 'combat_actions',
                        id: ACTIONS_ID,
                        name: ACTIONS_NAME,
                        type: 'system'
                    }
                ]
            },
            {
                nestId: VEHICLE_ID,
                id: VEHICLE_ID,
                name: VEHICLE_NAME,
                groups: [
                    {
                        nestId: 'vehicle_resistances',
                        id: VEHICLE_RESISTANCE_ID,
                        name: VEHICLE_RESISTANCE_NAME,
                        type: 'system'
                    },
                    {
                        nestId: 'vehicle_weapons',
                        id: VEHICLE_WEAPON_ID,
                        name: VEHICLE_WEAPON_NAME,
                        type: 'system'
                    },
                    {
                        nestId: 'vehicle_actions',
                        id: VEHICLE_ACTIONS_ID,
                        name: VEHICLE_ACTIONS_NAME,
                        type: 'system'
                    }
                ]
            },
            {
                nestId: ATTRIBUTES_ID,
                id: ATTRIBUTES_ID,
                name: ATTRIBUTES_NAME,
                groups: [
                    {
                        nestId: 'attributes_attributes',
                        id: ATTRIBUTES_ID,
                        name: ATTRIBUTES_NAME,
                        type: 'system'
                    }
                ]
            },
            {
                nestId: SKILLS_ID,
                id: SKILLS_ID,
                name: SKILLS_NAME,
                groups: [
                    {
                        nestId: 'skills_skills',
                        id: SKILLS_ID,
                        name: SKILLS_NAME,
                        type: 'system'
                    }
                ]
            },
            {
                nestId: CREW_ID,
                id: CREW_ID,
                name: CREW_NAME,
                groups: [
                    {
                        nestId: 'crew_crew',
                        id: CREW_ID,
                        name: CREW_NAME,
                        type: 'system'
                    }
                ]
            },
        ],
        groups: [
            {id: COMBAT_ID, name: COMBAT_NAME, type: 'system'},
            {id: VEHICLE_ID, name: VEHICLE_NAME, type: 'system'},
            {id: ATTRIBUTES_ID, name: ATTRIBUTES_NAME, type: 'system'},
            {id: SKILLS_ID, name: SKILLS_NAME, type: 'system'},
            {id: CREW_ID, name: CREW_NAME, type: 'system'},
        ]
    }
})