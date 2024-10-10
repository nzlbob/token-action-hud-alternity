/**
 * Default categories and groups
 */

export const COMBAT_ID = 'combat';
export const RESISTANCE_ID = 'resistance';
export const WEAPONS_ID = 'weapons';
export const EQUIPMENT_ID = 'equipment';
export const EQUIPMENT_MEDICAL_ID = 'medical';
export const EQUIPMENT_SENSOR_ID = 'sensors';
export const ACTIONS_ID = 'actions';
export const VEHICLE_ID = 'vehicle';
export const VEHICLE_RESISTANCE_ID = 'vehicle_resistances';
export const VEHICLE_WEAPON_ID = 'vehicle_weapon';
export const VEHICLE_ACTIONS_ID = 'vehicle_actions';
export const ATTRIBUTES_ID = 'attributes';
export const SKILLS_ID = 'skills';
export const CREW_ID = 'crew';
export const COMBAT_MELEEW_ID = 'meleeW';
export const COMBAT_RANGEDW_ID = 'rangedW';
export const COMBAT_EXPLOS_ID = 'explos';
export const COMBAT_HEAVYW_ID = 'heavyWt';

export const PSIONIC_ID = 'psionic';
export const PSIONIC_CON_ID = 'con';
export const PSIONIC_INT_ID = 'int';
export const PSIONIC_WIL_ID = 'wil';
export const PSIONIC_PER_ID = 'per';



export let COMBAT_NAME = null;
export let RESISTANCE_NAME = null;
export let WEAPONS_NAME = null;
export let ACTIONS_NAME = null;
export let EQUIPMENT_NAME = null;
export let EQUIPMENT_MEDICAL_NAME = null;
export let EQUIPMENT_SENSOR_NAME = null;
export let VEHICLE_NAME = null;
export let VEHICLE_RESISTANCE_NAME = null;
export let VEHICLE_WEAPON_NAME = null;
export let VEHICLE_ACTIONS_NAME = null;
export let ATTRIBUTES_NAME = null;
export let SKILLS_NAME = null;
export let CREW_NAME = null;
export let DEFAULTS = null;
export let COMBAT_meleeW_NAME = "d100A.WeaponTypesMelee";
export let COMBAT_rangedW_NAME= "d100A.WeaponTypesRanged";
export let COMBAT_explos_NAME= "d100A.WeaponTypesExplosive";
export let COMBAT_heavyW_NAME= "d100A.WeaponTypesHeavy";

export let PSIONIC_NAME = null;
export let PSIONIC_CON_NAME = null;
export let PSIONIC_INT_NAME = null;
export let PSIONIC_WIL_NAME = null;
export let PSIONIC_PER_NAME = null;

Hooks.on('tokenActionHudCoreApiReady', async () => {

    COMBAT_NAME = game.i18n.localize('d100A.Tokenbar.COMBAT');
    RESISTANCE_NAME = game.i18n.localize('d100A.Tokenbar.RESISTANCE');
    WEAPONS_NAME = game.i18n.localize('d100A.Tokenbar.WEAPONS');
    ACTIONS_NAME = game.i18n.localize('d100A.Tokenbar.ACTIONS');
    VEHICLE_NAME = game.i18n.localize('d100A.Tokenbar.VEHICLE');
    EQUIPMENT_NAME = game.i18n.localize('d100A.Tokenbar.EQUIPMENT');
    EQUIPMENT_MEDICAL_NAME = game.i18n.localize('d100A.Tokenbar.MEDICAL');
    EQUIPMENT_SENSOR_NAME = game.i18n.localize('d100A.Tokenbar.SENSOR');
    VEHICLE_RESISTANCE_NAME = game.i18n.localize('d100A.Tokenbar.RESISTANCE');
    VEHICLE_WEAPON_NAME = game.i18n.localize('d100A.Tokenbar.VEHICLE_WEAPON');
    VEHICLE_ACTIONS_NAME = game.i18n.localize('d100A.Tokenbar.VEHICLE_ACTIONS');
    ATTRIBUTES_NAME = game.i18n.localize('d100A.Tokenbar.ATTRIBUTES');
    SKILLS_NAME = game.i18n.localize('d100A.Tokenbar.SKILLS');
    CREW_NAME = game.i18n.localize('d100A.Tokenbar.CREW');
    
   COMBAT_meleeW_NAME = game.i18n.localize("d100A.WeaponTypesMelee");
   COMBAT_rangedW_NAME= game.i18n.localize("d100A.WeaponTypesRanged");
   COMBAT_explos_NAME= game.i18n.localize("d100A.WeaponTypesExplosive");
   COMBAT_heavyW_NAME= game.i18n.localize("d100A.WeaponTypesHeavy");

  PSIONIC_NAME = game.i18n.localize("d100A.Tokenbar.PSIONIC");
PSIONIC_CON_NAME = game.i18n.localize("d100A.Tokenbar.CON");
PSIONIC_INT_NAME = game.i18n.localize("d100A.Tokenbar.INT");
PSIONIC_WIL_NAME = game.i18n.localize("d100A.Tokenbar.WIL");
PSIONIC_PER_NAME = game.i18n.localize("d100A.Tokenbar.PER");


    DEFAULTS = {
        layout: [
            {
                nestId: COMBAT_ID,
                id: COMBAT_ID,
                name: COMBAT_NAME,
                groups: [
                    {
                        nestId: 'combat_meleeW',
                        id: COMBAT_MELEEW_ID,
                        name: COMBAT_meleeW_NAME,
                        type: 'system'
                    },
                    {
                        nestId: 'combat_rangedW',
                        id: COMBAT_RANGEDW_ID,
                        name: COMBAT_rangedW_NAME,
                        type: 'system'
                    },
                    {
                        nestId: 'combat_explos',
                        id: COMBAT_EXPLOS_ID,
                        name: COMBAT_explos_NAME,
                        type: 'system'
                    },
                    {
                        nestId: 'combat_heavyW',
                        id: COMBAT_HEAVYW_ID,
                        name: COMBAT_heavyW_NAME,
                        type: 'system'
                    }
                ]
            },
            {
                nestId: EQUIPMENT_ID,
                id: EQUIPMENT_ID,
                name: EQUIPMENT_NAME,
                groups: [
                    {
                        nestId: 'equipment_medical',
                        id: EQUIPMENT_MEDICAL_ID,
                        name: EQUIPMENT_MEDICAL_NAME,
                        type: 'system'
                    },
                    {
                        nestId: 'equipment_sensor',
                        id: EQUIPMENT_SENSOR_ID,
                        name: EQUIPMENT_SENSOR_NAME,
                        type: 'system'
                    }
                ]
            },
            {
                
                nestId: PSIONIC_ID,
                id: PSIONIC_ID,
                name: PSIONIC_NAME,
                groups: [
                    {
                        nestId: 'psionic_con',
                        id: PSIONIC_CON_ID,
                        name: PSIONIC_CON_NAME,
                        type: 'system'
                    },
                    {
                        nestId: 'psionic_int',
                        id: PSIONIC_INT_ID,
                        name: PSIONIC_INT_NAME,
                        type: 'system'
                    },
                    
                    {
                        nestId: "psionic_wil",
                        id: PSIONIC_WIL_ID,
                        name: PSIONIC_WIL_NAME,
                        type: 'system'
                    },
                    {
                        nestId: 'psionic_per',
                        id: PSIONIC_PER_ID,
                        name: PSIONIC_PER_NAME,
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
            {id: PSIONIC_ID, name: PSIONIC_NAME, type: 'system'},
           // {id: ATTRIBUTES_ID, name: ATTRIBUTES_NAME, type: 'system'},
           // {id: SKILLS_ID, name: SKILLS_NAME, type: 'system'},
           // {id: CREW_ID, name: CREW_NAME, type: 'system'},
        ]
    }
})