// An addon is guaranteed to run only after all groups are loaded.
// This is helpful, if your group relies on all other definitions already being loaded.
// Addons that are dependant on other addons should be named something like
// "[PARENT ADDON NAME]-[EXTENSION NAME].js", to make sure that it would run after that addon ran.

const { combineStats, makeDeco, makeAuto, makeCeption } = require('../facilitators');
const g = require('../gunvals');

module.exports = ({ Class }) => {
  
  	// This addon is enabled by default.
	// If you want to disable, uncomment the line below.
  //return console.log('[revolutionistPack.js] Addon disabled by default');
  
  Class.revoautoTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    BODY: {
        FOV: 0.8,
    },
    COLOR: "grey",
        CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.turret, g.auto, g.power]),
                TYPE: "bullet",
            },
        },
    ],
}
    Class.solarioTurret1 = {
    PARENT: "genericTank",
    LABEL: "Turret",
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: 13,
    SHAPE: 0,
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.turret, g.auto, g.power]),
                TYPE: "bullet",
            },
        },
    ],
}
      Class.solarioTurret2 = {
    PARENT: "genericTank",
            CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    LABEL: "Turret",
    COLOR: 13,
    SHAPE: 3,
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.turret, g.auto, g.power]),
                TYPE: "bullet",
            },
        },
    ],
}
      Class.solarioTurret3 = {
    PARENT: "genericTank",
    LABEL: "Turret",
          CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],

    SHAPE: 4,
    COLOR: 13,
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.turret, g.auto, g.power]),
                TYPE: "bullet",
            },
        },
    ],
}
      Class.solarioTurret4 = {
    PARENT: "genericTank",
    LABEL: "Turret",
            CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: 13,
    SHAPE: 6,
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.turret, g.auto, g.power]),
                TYPE: "bullet",
            },
        },
    ],
}
  Class.turretBase = {
    LABEL: "Base",
    SHAPE: 'M 0 -1.1 A 1 1 0 0 0 0 1.1 A 1 1 0 0 0 0 -1.1 Z M 0 -1 A 0.001 0.001 0 0 1 0 1 A 0.001 0.001 0 0 1 0 -1',
    COLOR: 9,
    CONTROLLERS: [["spin", { independent: true }]],
    INDEPENDENT: true,
    TURRETS: [{
        POSITION: [4.65, 9.85, 0, 90, 220, 1],
        TYPE: "revoautoTurret",
    }, {
        POSITION: [4.65, 9.85, 0, 270, 220, 1],
        TYPE: "revoautoTurret",
    }]
};
    Class.solarioturretBase = {
    LABEL: "Base",
    SHAPE: 'M 0 -1.1 A 1 1 0 0 0 0 1.1 A 1 1 0 0 0 0 -1.1 Z M 0 -1 A 0.001 0.001 0 0 1 0 1 A 0.001 0.001 0 0 1 0 -1',
    COLOR: 13,
    CONTROLLERS: [["spin", { independent: true }]],
    INDEPENDENT: true,
    TURRETS: [{
        POSITION: [4.65, 9.85, 0, 90, 220, 1],
        TYPE: "solarioTurret1",
    }, {
        POSITION: [4.65, 9.85, 0, 180, 220, 1],
        TYPE: "solarioTurret2",
    }, {
        POSITION: [4.65, 9.85, 0, 270, 220, 1],
        TYPE: "solarioTurret3",
    }, {
        POSITION: [4.65, 9.85, 0, 0, 220, 1],
        TYPE: "solarioTurret4",
    }]
};
Class.revolution = {
    PARENT: "genericTank",
    LABEL: "Revolutionist",
    DANGER: 6,
    GUNS: [{
        POSITION: [20, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: "bullet",
        },
    },
          ],
    TURRETS: [{
        POSITION: [34, 0, 0, 0, 360, 0],
        TYPE: "turretBase",
    },
  ],
};
Class.solario = {
    PARENT: "genericTank",
    LABEL: "Solario",
    COLOR: 13,
    SHAPE: 'https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/2023_12_05_0sn_Kleki.png?v=1701808881532',
    SIZE: 15,
    DANGER: 6,
    GUNS: [{
        POSITION: [20, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: "bullet",
        },
    },
          ],
    TURRETS: [{
        POSITION: [34, 0, 0, 0, 360, 0],
        TYPE: "solarioturretBase",
    },
  ],
};
    Class.autorevol = makeAuto(Class.revolution, "Auto-Revolutionist");
    Class.revoceptionist = makeCeption(Class.revolution, "Revo-Ception");
  	Class.revolution.UPGRADES_TIER_0 = [];
    Class.addons.UPGRADES_TIER_0.push('revolution');
    Class.revolution.UPGRADES_TIER_0.push('revoceptionist', 'autorevol', 'solario');
}