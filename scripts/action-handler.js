import {
    ACTIONS_ID,
    ATTRIBUTES_ID, DEFAULTS,
    RESISTANCE_ID,
    SKILLS_ID, VEHICLE_ACTIONS_ID,
    VEHICLE_RESISTANCE_ID,
    VEHICLE_WEAPON_ID,
    WEAPONS_ID,
    EQUIPMENT_ID,
    EQUIPMENT_MEDICAL_ID,
    EQUIPMENT_SENSOR_ID,
    VEHICLE_ACTIONS_NAME,
    VEHICLE_RESISTANCE_NAME,
    VEHICLE_WEAPON_NAME,
    VEHICLE_ID, CREW_ID, CREW_NAME,
    COMBAT_MELEEW_ID,
    COMBAT_RANGEDW_ID,
    COMBAT_EXPLOS_ID,
    COMBAT_HEAVYW_ID,
    PSIONIC_ID,
    PSIONIC_CON_ID,
    PSIONIC_INT_ID,
    PSIONIC_WIL_ID,
    PSIONIC_PER_ID


} from './defaults.js';

export let ActionHandler = null
Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
        /** @override */
        async buildSystemActions(subCategoryIds) {
            const token = this?.token;
            if (!token) return;
            const actor = this?.actor;
            if (!actor) return;
            if (actor.type === 'container') return;
            const tokenId = token.id;

            if (actor.type !== 'vehicle' && actor.type !== 'starship') {
                /*   await this._buildCombatActionsCategory(actor, tokenId);
                   if (actor.getFlag('Alternityd100', 'crew') !== '') {
                       await this._buildVehicleCategory(actor, tokenId);
                   }
                   this._buildAttributesCategory(actor, tokenId);
                   this._buildSkillsCategory(actor, tokenId);*/
                return;
            }

            if (actor.type === 'vehicle' || actor.type === 'starship') {
               
                /*
                if (actor.system.embedded_pilot.value === true) {
                    await this._buildPilotCombatActionsCategory(actor, tokenId);
                    this._buildAttributesCategory(actor, tokenId);
                    this._buildSkillsCategory(actor, tokenId);
                } else {
                    await this._buildVehicleCategory(actor, tokenId, 'action');
                */
                if (!actor.system.crew.useNPCCrew) {
    
                    
                    for (const [name, role] of Object.entries(actor.system.crew)) {
                      //  for (let role of actor.system.crew) {
            
                            if(!["useNPCCrew","npcCrewQuality","npcData"].includes(name) )
                            for (let crewMember of role.actors) {
                              
                                console.log("x",crewMember,crewMember.testUserPermission(game.user, "OWNER"))
                                if (crewMember && (game.user.isGM || crewMember.testUserPermission(game.user, "OWNER"))) {
                                    await this._buildVehicleCategory(actor, tokenId, 'crew', crewMember);
                                }
                            }

                        }
                    
                }

            }
        }

        async _buildPilotCombatActionsCategory(actor, tokenId) {
            let macroType = "action";
            let items = actor.items;

            const resistances = [];
            let name;
            if (actor.system.type === "vehicle") {
                name = game.i18n.localize(game.Alternityd100.config.vehicleToughnessName);
            } else {
                name = game.i18n.localize(game.Alternityd100.config.starshipToughnessName);
            }
            let encodedValue = [macroType, "vehicletoughness"].join(this.delimiter);
            resistances.push({ name: name, id: "vehicletoughness", encodedValue: encodedValue });

            if (actor.system.shields.value > 0) {
                for (let arc in actor.system.shields.arcs) {
                    let name = game.i18n.localize(actor.system.shields.arcs[arc].label) +
                        " " + game.i18n.localize('Alternityd100.SHIELDS');
                    let encodedValue = [
                        macroType,
                        "vehicleshields" + arc
                    ].join(this.delimiter);
                    resistances.push({ name: name, id: arc, encodedValue: encodedValue });
                }
            }

            await this.addActions(resistances, { id: RESISTANCE_ID, type: 'system' });

            let weaponType;
            if (actor.type === "starship") {
                weaponType = "starship-weapon";
            } else {
                weaponType = "vehicle-weapon";
            }

            let weapons = items
                .filter((i) => i.type === weaponType && i.system.equipped.value)
                .sort((a, b) => a.name.localeCompare(b.name));

            let weaponActions = this._produceMap(weapons, macroType);
            await this.addActions(weaponActions, { id: WEAPONS_ID, type: 'system' });

            let vehicleActions = [];
            for (let action in game.Alternityd100.config.vehicle_actions) {
                if (game.Alternityd100.config.vehicle_actions[action].rollable) {
                    let name = '';
                    if (action === 'sensors') {
                        if (game.settings.get('Alternityd100', 'sensors')) {
                            for (let type in actor.system.sensors.types) {
                                name = game.i18n.localize(game.Alternityd100.config.vehicle_actions[action].name) + ": " +
                                    game.i18n.localize(actor.system.sensors.types[type].label);
                                let encodedValue = [
                                    macroType,
                                    game.Alternityd100.config.vehicle_actions[action].type + type
                                ].join(this.delimiter);
                                vehicleActions.push({
                                    name: name,
                                    id: type,
                                    encodedValue: encodedValue,
                                });
                            }
                        }
                    } else {
                        name = game.i18n.localize(game.Alternityd100.config.vehicle_actions[action].name);
                        let encodedValue = [
                            macroType,
                            game.Alternityd100.config.vehicle_actions[action].type,
                        ].join(this.delimiter);
                        vehicleActions.push({
                            name: name,
                            id: action,
                            encodedValue: encodedValue,
                        });
                    }
                }
            }
            await this.addActions(vehicleActions, { id: ACTIONS_ID, type: 'system' });
        }

        async _buildCombatActionsCategory(actor, tokenId) {
            let macroType = "item";
            let items = Array.from(actor.items);
            /*
                        const resistanceTypes = ["pr", "er"];
                        let resistances = [];
                   
                        for (let r of resistanceTypes) {
                            let name = game.i18n.localize(actor.system[r].label);
                            let encodedValue = [macroType, r].join(this.delimiter);
                            resistances.push({name: name, id: r, encodedValue: encodedValue});
                        }
            
                     await this.addActions(resistances, {id: RESISTANCE_ID, type: 'system'});
            
                     
               "meleeW": "d100A.WeaponTypesMelee",
               "rangedW": "d100A.WeaponTypesRanged",
               "explos": "d100A.WeaponTypesExplosive",
               "heavyW": "d100A.WeaponTypesHeavy"
            */
            let meleeWeapons = items
                .filter(
                    (i) => i.type === "weapon" && i.system.weaponType === "meleeW" && i.system.equipped)
                .sort((a, b) => a.name.localeCompare(b.name))
                .valueOf();
            let meleeActions = this._produceMap(meleeWeapons, macroType);

            let rangedWeapons = items
                .filter((i) => i.type === "weapon" && i.system.weaponType === "rangedW" && i.system.equipped)
                .sort((a, b) => a.name.localeCompare(b.name));
            let rangedActions = this._produceMap(rangedWeapons, macroType);

            let explosiveWeapons = items
                .filter((i) => i.type === "weapon" && i.system.weaponType === "explos" && i.system.equipped)
                .sort((a, b) => a.name.localeCompare(b.name));
            let explosiveActions = this._produceMap(explosiveWeapons, macroType);

            let heavyWeapons = items
                .filter((i) => i.type === "weapon" && i.system.weaponType === "heavyW" && i.system.equipped)
                .sort((a, b) => a.name.localeCompare(b.name));
            let heavyActions = this._produceMap(heavyWeapons, macroType);


            console.log("Weapons\n", actor, items, rangedWeapons, rangedActions, macroType)

            await this.addActions(meleeActions, { id: COMBAT_MELEEW_ID, type: 'system' });
            await this.addActions(rangedActions, { id: COMBAT_RANGEDW_ID, type: 'system' });
            await this.addActions(explosiveActions, { id: COMBAT_EXPLOS_ID, type: 'system' });
            await this.addActions(heavyActions, { id: COMBAT_HEAVYW_ID, type: 'system' });

            let medical = items
                .filter((i) => i.type === "medical")
                .sort((a, b) => a.name.localeCompare(b.name));
            let medicalActions = this._produceMap(medical, macroType);

            console.log("medical\n", actor, medical, medicalActions, macroType)
            await this.addActions(medicalActions, { id: EQUIPMENT_MEDICAL_ID, type: 'system' });


            let sensors = items
                .filter((i) => i.type === "sensor")
                .sort((a, b) => a.name.localeCompare(b.name));
            let sensorActions = this._produceMap(sensors, macroType);

            // console.log("sensors\n",actor, medical,medicalActions,macroType)
            await this.addActions(sensorActions, { id: EQUIPMENT_SENSOR_ID, type: 'system' });
            /**
             * 
             * PSIONICS
             * 
             */


            let psionicCon = items
                .filter(
                    (i) => i.type === "psionic" && i.system.ability === "con")
                .sort((a, b) => a.name.localeCompare(b.name))
                .valueOf();
            let psiConActions = this._produceMap(psionicCon, macroType);

            let psionicInt = items
                .filter((i) => i.type === "psionic" && i.system.ability === "int")
                .sort((a, b) => a.name.localeCompare(b.name));
            let psiIntActions = this._produceMap(psionicInt, macroType);

            let psionicWil = items
                .filter((i) => i.type === "psionic" && i.system.ability === "wil")
                .sort((a, b) => a.name.localeCompare(b.name));
            let psiWilActions = this._produceMap(psionicWil, macroType);

            let psionicPer = items
                .filter((i) => i.type === "psionic" && i.system.ability === "per")
                .sort((a, b) => a.name.localeCompare(b.name));
            let psiPerActions = this._produceMap(psionicPer, macroType);



            await this.addActions(psiConActions, { id: PSIONIC_CON_ID, type: 'system' });
            await this.addActions(psiIntActions, { id: PSIONIC_INT_ID, type: 'system' });
            await this.addActions(psiWilActions, { id: PSIONIC_WIL_ID, type: 'system' });
            await this.addActions(psiPerActions, { id: PSIONIC_PER_ID, type: 'system' });


            console.log("This", this, psiWilActions, psionicWil, psiWilActions)

            let combatActions = [];
            for (let action in game.Alternityd100.config.actions) {
                if (game.Alternityd100.config.actions[action].rollable) {
                    let name = game.i18n.localize(game.Alternityd100.config.actions[action].name);
                    let encodedValue = [
                        macroType,
                        game.Alternityd100.config.actions[action].type,
                    ].join(this.delimiter);
                    combatActions.push({
                        name: name,
                        id: action,
                        encodedValue: encodedValue,
                    });
                    if (name === game.i18n.localize("Alternityd100.ACTION_PARRY")) {
                        for (let weapon = 0; weapon < meleeWeapons.length; weapon++) {
                            const name =
                                game.i18n.localize("Alternityd100.ACTION_PARRY") +
                                " (" +
                                meleeWeapons[weapon].name +
                                ")";
                            const encodedValue = [
                                "parry",
                                meleeWeapons[weapon].id,
                            ].join(this.delimiter);
                            combatActions.push({
                                name: name,
                                encodedValue: encodedValue,
                                id: meleeWeapons[weapon].id,
                            });
                        }
                    }
                }
            }
            await this.addActions(combatActions, { id: ACTIONS_ID, type: 'system' });
        }

        async _buildVehicleCategory(actor, tokenId, categoryName, crewMember) {
            
            
            let macroType;
            let crewId;



            if (categoryName === 'crew') {
                macroType = "crew";
                crewId = crewMember.uuid;
            } else {
                macroType = "action";
            }
            console.log("vehicle", (actor.type === 'vehicle' || actor.type === 'starship'), actor)
            const vehicle = (actor.type === 'vehicle' || actor.type === 'starship') ?
                actor.system : actor.system.vehicle
            console.log(vehicle)

            /*
                const vehicleType = (actor.type === 'vehicle' || actor.type === 'starship') ?
                    actor.type : actor.system.vehicle.type
    
                const items = (actor.type === 'vehicle' || actor.type === 'starship') ?
                    actor.items : actor.system.vehicle.vehicle_weapons
    
                let resistances = [];
                let name;
    
                if (vehicleType === "vehicle") {
                    name = game.i18n.localize(game.Alternityd100.config.vehicleToughnessName);
                } else {
                    name = game.i18n.localize(game.Alternityd100.config.starshipToughnessName);
                }
                let encodedValue = '';
                if (crewId) {
                    encodedValue = [macroType, "vehicletoughness", crewId].join(this.delimiter);
                } else {
                    encodedValue = [macroType, "vehicletoughness"].join(this.delimiter);
                }
                resistances.push({name: name, id: "vehicletoughness", encodedValue: encodedValue});
    
                if (vehicle.shields?.value > 0) {
                    for (let arc in vehicle.shields.arcs) {
                        let name = game.i18n.localize(vehicle.shields.arcs[arc].label) +
                            " " + game.i18n.localize('Alternityd100.SHIELDS');
                        let v = [
                            macroType,
                            "vehicleshields" + arc
                        ]
                        if (crewId) v.push(crewId);
                        let encodedValue = v.join(this.delimiter);
                        resistances.push({name: name, id: arc, encodedValue: encodedValue});
                    }
                }
    
                let vehicleWeapons = '';
                if (crewId) {
                    vehicleWeapons = this._produceCrewWeaponMap(
                        items.filter(i => i.type === vehicleType + '-weapon' && i.system?.equipped.value),
                        macroType, crewId);
                } else {
                    vehicleWeapons = this._produceMap(
                        items.filter(i => i.type === vehicleType + '-weapon' && i.system?.equipped.value), macroType);
                }
    
                let vehicleActions = [];
                for (let action in game.Alternityd100.config.vehicle_actions) {
                    if (game.Alternityd100.config.vehicle_actions[action].rollable) {
                        let name = '';
                        if (action === 'sensors') {
                            if (game.settings.get('Alternityd100', 'sensors')) {
                                for (let type in vehicle.sensors.types) {
                                    name = game.i18n.localize(game.Alternityd100.config.vehicle_actions[action].name) + ": " +
                                        game.i18n.localize(vehicle.sensors.types[type].label);
                                    let v = [
                                        macroType,
                                        game.Alternityd100.config.vehicle_actions[action].type + type
                                    ];
                                    if (crewId) v.push(crewId);
                                    let encodedValue = v.join(this.delimiter);
                                    vehicleActions.push({
                                        name: name,
                                        id: type,
                                        encodedValue: encodedValue,
                                    });
                                }
                            }
                        } else {
                            name = game.i18n.localize(game.Alternityd100.config.vehicle_actions[action].name);
                            let v = [
                                macroType,
                                game.Alternityd100.config.vehicle_actions[action].type
                            ]
                            if (crewId) v.push(crewId);
                            let encodedValue = v.join(this.delimiter);
                            vehicleActions.push({
                                name: name,
                                id: action,
                                encodedValue: encodedValue,
                            });
                        }
                    }
                }
    
                if (categoryName === 'crew') {
                    const crewGroup = {nestId: 'crew_crew', id: 'crew', type: 'system'};
    
                    const newCrew = {
                        id: CREW_ID + crewMember.uuid,
                        name: crewMember.name,
                        type: 'system'
                    };
    
                    const groups = [
                        {
                            id: crewMember.uuid + VEHICLE_RESISTANCE_ID,
                            name: VEHICLE_RESISTANCE_NAME,
                            type: 'system'
                        },
                        {
                            id: crewMember.uuid + VEHICLE_WEAPON_ID,
                            name: VEHICLE_WEAPON_NAME,
                            type: 'system'
                        },
                        {
                            id: crewMember.uuid + VEHICLE_ACTIONS_ID,
                            name: VEHICLE_ACTIONS_NAME,
                            type: 'system'
                        }
                    ]
    
                    await this.addGroup(newCrew, crewGroup);
                    for (let i = 0; i < groups.length; i++) {
                        await this.addGroup(groups[i], newCrew);
                    }
    
                    await this.addActions(resistances, {id: crewMember.uuid + VEHICLE_RESISTANCE_ID, type: 'system'});
                    await this.addActions(vehicleWeapons, {id: crewMember.uuid + VEHICLE_WEAPON_ID, type: 'system'});
                    await this.addActions(vehicleActions, {id: crewMember.uuid + VEHICLE_ACTIONS_ID, type: 'system'});
                } else {
                    await this.addActions(resistances, {id: VEHICLE_RESISTANCE_ID, type: 'system'});
                    await this.addActions(vehicleWeapons, {id: VEHICLE_WEAPON_ID, type: 'system'})
                    await this.addActions(vehicleActions, {id: VEHICLE_ACTIONS_ID, type: 'system'});
                }
    
                */
        }

        _buildAttributesCategory(actor, tokenId) {
            /*
            let macroType = "attribute";
            let attributes = actor.system.attributes;

            let actions = Object.entries(attributes).map((e) => {
                let name = game.Alternityd100.config.attributes[e[0]].name;
                let encodedValue = [macroType, e[0]].join(this.delimiter);
                return {name: name, id: e[0], encodedValue: encodedValue};
            });

            if (game.settings.get('Alternityd100', 'metaphysics_attribute_optional')) {
                actions = actions.filter(a => a.id !== 'met');
            }

            this.addActions(actions, {id: ATTRIBUTES_ID, type: 'system'});
            */
        }

        _buildSkillsCategory(actor, tokenId) {
            let macroType = "skill";
            let items = actor.items;
            let skills = items.filter(
                (i) => i.type === "skill" || i.type === "specialization"
            );
            skills.sort((a, b) => a.name.localeCompare(b.name));
            let skillActions = this._produceMap(skills, macroType);
            this.addActions(skillActions, { id: SKILLS_ID, type: 'system' });
        }

        /** @private */
        _produceMap(itemSet, macroType) {
            return itemSet
                .filter((i) => !!i)
                .map((i) => {
                    let encodedValue = [macroType, i.id].join(
                        this.delimiter
                    );
                    return { name: i.name, encodedValue: encodedValue, id: i.id };
                });
        }

        _produceCrewWeaponMap(itemSet, macroType, crewId) {
            return itemSet
                .filter((i) => !!i)
                .map((i) => {
                    let encodedValue = [macroType, i.id, crewId].join(
                        this.delimiter
                    );
                    return { name: i.name, encodedValue: encodedValue, id: i.id };
                });
        }
    }
})

