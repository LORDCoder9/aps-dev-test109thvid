const { combineStats, addAura } = require('../facilitators.js');
const { base, gunCalcNames, basePolygonDamage, basePolygonHealth, dfltskl, statnames } = require('../constants.js');
const g = require('../gunvals.js');

// TESTBED TANKS
exports.menu = {
    PARENT: ["genericTank"],
    LABEL: "",
    SKILL_CAP: [
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
    ],
    IGNORED_BY_AI: true,
    TURRETS: [],
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
    ],
};
exports.developer = {
    PARENT: ["menu"],
    LABEL: "Developer",
    BODY: {
        SHIELD: 1000,
        REGEN: 10,
        HEALTH: 100,
        DAMAGE: 10,
        DENSITY: 20,
        FOV: 2,
    },
    RESET_CHILDREN: true,
    INVISIBLE: [0, 0],
    SHAPE: [
        [-1, -0.8],
        [-0.8, -1],
        [0.8, -1],
        [1, -0.8],
        [0.2, 0],
        [1, 0.8],
        [0.8, 1],
        [-0.8, 1],
        [-1, 0.8],
    ],
    GUNS: [
        {
            /*** LENGTH WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                TYPE: "developerBullet",
            },
        },
    ],
};
exports.spectator = {
    PARENT: ["menu"],
    LABEL: "Spectator",
    ALPHA: 0,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: "never",
    ARENA_CLOSER: true,
    SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 255],
    BODY: {
        SPEED: 5,
        FOV: 2.5,
        DAMAGE: 0,
        HEALTH: 1e100,
        SHIELD: 1e100,
        REGEN: 1e100,
    },
    GUNS: [],
};

exports.bosses = {
    PARENT: ["menu"],
    LABEL: "Bosses",
};
exports.sentries = {
    PARENT: ["menu"],
    LABEL: "Sentries",
    COLOR: "pink",
    UPGRADE_COLOR: "pink",
    SHAPE: 3.5,
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "genericEntity",
        },
    ],
};
exports.elites = {
    PARENT: ["menu"],
    LABEL: "Elites",
    COLOR: "pink",
    UPGRADE_COLOR: "pink",
    SHAPE: 3.5,
};
exports.mysticals = {
    PARENT: ["menu"],
    LABEL: "Mysticals",
    COLOR: "gold",
    UPGRADE_COLOR: "gold",
    SHAPE: 4,
};
exports.nesters = {
    PARENT: ["menu"],
    LABEL: "Nesters",
    COLOR: "purple",
    UPGRADE_COLOR: "purple",
    SHAPE: 5.5,
};
exports.rogues = {
    PARENT: ["menu"],
    LABEL: "Rogues",
    COLOR: "darkGrey",
    UPGRADE_COLOR: "darkGrey",
    SHAPE: 6,
};
exports.rammers = {
    PARENT: ["menu"],
    LABEL: "Rammers",
    COLOR: "teal",
    UPGRADE_COLOR: "teal",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",
        },
    ],
};
exports.terrestrials = {
    PARENT: ["menu"],
    LABEL: "Terrestrials",
    COLOR: "orange",
    UPGRADE_COLOR: "orange",
    SHAPE: 7,
};
exports.celestials = {
    PARENT: ["menu"],
    LABEL: "Celestials",
    COLOR: "lightGreen",
    UPGRADE_COLOR: "lightGreen",
    SHAPE: 9,
};
exports.eternals = {
    PARENT: ["menu"],
    LABEL: "Eternals",
    COLOR: "teal",
    UPGRADE_COLOR: "teal",
    SHAPE: 11,
};
exports.devBosses = {
    PARENT: ["menu"],
    LABEL: "Developers",
    COLOR: "lightGreen",
    UPGRADE_COLOR: "rainbow",
    SHAPE: 4,
};

exports.tanks = {
    PARENT: ["menu"],
    LABEL: "Tanks",
};
exports.unavailable = {
    PARENT: ["menu"],
    LABEL: "Unavailable",
};
exports.dominators = {
    PARENT: ["menu"],
    LABEL: "Dominators",
    TURRETS: [
        {
            POSITION: [22, 0, 0, 0, 360, 0],
            TYPE: "dominationBody",
        },
    ],
};
exports.sanctuaries = {
    PARENT: ["menu"],
    LABEL: "Sanctuaries",
    TURRETS: [
        {
            POSITION: [22, 0, 0, 0, 360, 0],
            TYPE: "dominationBody",
        },
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ],
};
exports.funTanks = {
    PARENT: ["menu"],
    LABEL: "Fun Tanks",
};
exports.testingTanks = {
    PARENT: ["menu"],
    LABEL: "Testing Tanks",
};

// GENERATORS
function compileMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let str = matrix[y][x],
            LABEL = str[0].toUpperCase() + str.slice(1).replace(/[A-Z]/g, m => ' ' + m) + " Generator",
            code = str + 'Generator';
        exports[code] = matrix[y][x] = {
            PARENT: "spectator",
            LABEL,
            SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
            TURRETS: [{
                POSITION: [5 + y * 2, 0, 0, 0, 0, 1],
                TYPE: str,
            }],
            GUNS: [{
                POSITION: [14, 12, 1, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                    TYPE: "bullet"
                }
            }, {
                POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                    INDEPENDENT_CHILDREN: true,
                    TYPE: str
                },
            }],
        };
    }
}

function connectMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let top = (y + matrixHeight - 1) % matrixHeight,
            bottom = (y + matrixHeight + 1) % matrixHeight,
            left = (x + matrixWidth - 1) % matrixWidth,
            right = (x + matrixWidth + 1) % matrixWidth,

        center = matrix[y     ][x    ];
        top    = matrix[top   ][x    ];
        bottom = matrix[bottom][x    ];
        left   = matrix[y     ][left ];
        right  = matrix[y     ][right];

        matrix[y][x].UPGRADES_TIER_0 = [
            "developer" ,  top    , "spectator",
             left       ,  center ,  right      ,
            "basic"     ,  bottom ,  matrix2Entrance
        ];
    }
}
let generatorMatrix = [
    [ "egg"           , "gem"                , "jewel"                  , "crasher"             , "sentry"               , "shinySentry"        , "EggRelic"           ],
    [ "square"        , "shinySquare"        , "legendarySquare"        , "shadowSquare"        , "rainbowSquare"        , "transSquare"        , "SquareRelic"        ],
    [ "triangle"      , "shinyTriangle"      , "legendaryTriangle"      , "shadowTriangle"      , "rainbowTriangle"      , "transTriangle"      , "TriangleRelic"      ],
    [ "pentagon"      , "shinyPentagon"      , "legendaryPentagon"      , "shadowPentagon"      , "rainbowPentagon"      , "transPentagon"      , "PentagonRelic"      ],
    [ "betaPentagon"  , "shinyBetaPentagon"  , "legendaryBetaPentagon"  , "shadowBetaPentagon"  , "rainbowBetaPentagon"  , "transBetaPentagon"  , "BetaPentagonRelic"  ],
    [ "alphaPentagon" , "shinyAlphaPentagon" , "legendaryAlphaPentagon" , "shadowAlphaPentagon" , "rainbowAlphaPentagon" , "transAlphaPentagon" , "AlphaPentagonRelic" ],
    [ "sphere"        , "cube"               , "tetrahedron"            , "octahedron"          , "dodecahedron"         , "icosahedron"        , "tesseract"          ],
],

gemRelicMatrix = [];
for (let tier of [ "", "Egg", "Square", "Triangle", "Pentagon", "BetaPentagon", "AlphaPentagon" ]) {
    let row = [];
    for (let gem of [ "Power", "Space", "Reality", "Soul", "Time", "Mind" ]) {
        row.push(gem + (tier ? tier + 'Relic' : 'Gem'));
    }
    gemRelicMatrix.push(row);
}

compileMatrix(generatorMatrix);
compileMatrix(gemRelicMatrix);

// Tensor = N-Dimensional Array, BASICALLY
let labyTensor = [];
for (let tier = 0; tier < 6; tier++) {
    let row = [];
    for (let poly of [ "Egg", "Square", "Triangle", "Pentagon", "Hexagon" ]) {
        let column = [];
        for (let shiny of [ "", "Shiny", "Legendary", "Shadow", "Rainbow", "Trans" ]) {
            let str = `laby${tier}${shiny}${poly}`,
                LABEL = str[0].toUpperCase() + str.slice(1).replace(/\d/, d => ["", "Beta", "Alpha", "Omega", "Gamma", "Delta"][d]).replace(/[A-Z]/g, m => ' ' + m) + " Generator",
                code = str + 'Generator';
            column.push(exports[code] = {
                PARENT: "spectator",
                LABEL,
                SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
                TURRETS: [{
                    POSITION: [5 + tier * 2, 0, 0, 0, 0, 1],
                    TYPE: str,
                }],
                GUNS: [{
                    POSITION: [14, 12, 1, 4, 0, 0, 0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                        TYPE: "bullet"
                    }
                }, {
                    POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                        INDEPENDENT_CHILDREN: true,
                        TYPE: str
                    },
                }],
            });
        }
        row.push(column);
    }
    labyTensor.push(row);
}

connectMatrix(generatorMatrix, 'PowerGemGenerator');
connectMatrix(gemRelicMatrix, 'laby0EggGenerator');

let tensorLength = labyTensor[0][0].length,
    tensorWidth = labyTensor[0].length,
    tensorHeight = labyTensor.length;
for (let x = 0; x < tensorWidth; x++) for (let y = 0; y < tensorHeight; y++) for (let z = 0; z < tensorLength; z++) {
    let top = (y + tensorHeight - 1) % tensorHeight,
        bottom = (y + tensorHeight + 1) % tensorHeight,
        left = (x + tensorWidth - 1) % tensorWidth,
        right = (x + tensorWidth + 1) % tensorWidth,
        front = (z + tensorLength - 1) % tensorLength,
        back = (z + tensorLength + 1) % tensorLength,

    center = labyTensor[y     ][x    ][z    ];
    top    = labyTensor[top   ][x    ][z    ];
    bottom = labyTensor[bottom][x    ][z    ];
    left   = labyTensor[y     ][left ][z    ];
    right  = labyTensor[y     ][right][z    ];
    front  = labyTensor[y     ][x    ][front];
    back   = labyTensor[y     ][x    ][back ];

    labyTensor[y][x][z].UPGRADES_TIER_0 = [
        "developer" ,  top                , "spectator",
         left       ,  center             ,  right     ,
        "basic"     ,  bottom             , "eggGenerator",
         front      , "PowerGemGenerator" ,  back
    ];
}

exports.diamondShape = {
    PARENT: ["basic"],
    LABEL: "Diamond Test Shape",
    SHAPE: 4.5
};

exports.rotatedTrap = {
    PARENT: ["basic"],
    LABEL: "Rotated Trap Test Shape",
    SHAPE: -3.5
};

exports.mummyHat = {
    SHAPE: 4.5,
    COLOR: -1
};
exports.mummy = {
    PARENT: ["drone"],
    SHAPE: 4,
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 360, 1],
        TYPE: ["mummyHat"]
    }]
};
exports.mummifier = {
    PARENT: ["genericTank"],
    LABEL: "Mummifier",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    SHAPE: 4,
    MAX_CHILDREN: 10,
    GUNS: [{
        POSITION: [5.5, 13, 1.1, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: "mummy",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
        }
    },{
        POSITION: [5.5, 13, 1.1, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: "mummy",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
        }
    }],
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 360, 1],
        TYPE: ["mummyHat"]
    }]
};

exports.colorMan = {
    PARENT: ["genericTank"],
    LABEL: "Testing Animated Colors",
    SHAPE: 4,
    COLOR: "rainbow",
    TURRETS: [{
        POSITION: [20, -20, -20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedBlueRed" }
    },{
        POSITION: [20,  0 , -20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedBlueGrey" }
    },{
        POSITION: [20,  20, -20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedGreyBlue" }
    },{
        POSITION: [20, -20,  0 , 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedRedGrey" }
    },{
        POSITION: [20,  20,  0 , 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedGreyRed" }
    },{
        POSITION: [20,  20,  20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedLesbian" }
    },{
        POSITION: [20,  0 ,  20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedTrans" }
    },{
        POSITION: [20,  20,  20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedBi" }
    }]
};

exports.miscTestHelper2 = {
    PARENT: ["genericTank"],
    LABEL: "Turret Reload Test 3",
    MIRROR_MASTER_ANGLE: true,
    COLOR: -1,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noRandom]),
                TYPE: "bullet",
                COLOR: -1,
            },
        },
    ],
};
exports.miscTestHelper = {
    PARENT: ["genericTank"],
    LABEL: "Turret Reload Test 2",
    //MIRROR_MASTER_ANGLE: true,
    COLOR: {
        BASE: -1,
        BRIGHTNESS_SHIFT: 15,
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noRandom]),
                TYPE: "bullet",
                COLOR: -1,
            },
        },
    ],
    TURRETS: [
        {
          POSITION: [20, 0, 20, 30, 0, 1],
          TYPE: "miscTestHelper2",
        }
    ]
};
exports.miscTest = {
    PARENT: ["genericTank"],
    LABEL: "Turret Reload Test",
    COLOR: "teal",
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noRandom]),
                TYPE: "bullet",
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [20, 0, 20, 30, 0, 1],
            TYPE: "miscTestHelper",
        }
    ]
};
exports.mmaTest2 = {
    PARENT: ["genericTank"],
    MIRROR_MASTER_ANGLE: true,
    GUNS: [{
            POSITION: [40, 4, 1, -20, 0, 0, 0],
        }],
}
exports.mmaTest1 = {
    PARENT: ["genericTank"],
    COLOR: -1,
    // Somehow, removing the gun below causes a crash when the tank is chosen ??????
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
        }
    ],
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "mmaTest2",
        }
    ]
}
exports.mmaTest = {
    PARENT: ["genericTank"],
    LABEL: "Mirror Master Angle Test",
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "mmaTest2",
        },
        {
            POSITION: [20, 0, 20, 0, 360, 1],
            TYPE: "mmaTest1",
        },
    ]
}

exports.vulnturrettest_turret = {
    PARENT: "genericTank",
    HITS_OWN_TYPE: 'hard',
    LABEL: 'Shield',
    COLOR: 'teal',
}

exports.vulnturrettest = {
    PARENT: ["genericTank"],
    LABEL: "Vulurable Turret Test",
    TOOLTIP: 'warning: vuln turrets aren\'t done yet',
    BODY: {
        FOV: 2,
    },
    DANGER: 6,
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet'
        }
    }],
    TURRETS: (() => {
        let output = []
        for (let i = 0; i < 10; i++) {
            output.push({
                POSITION: {SIZE: 20, X: 40, ANGLE: (360/10)*i},
                TYPE: "vulnturrettest_turret",
                VULNERABLE: true
            })
        }
        return output
    })(),
};

// unfinished
exports.alphaGunTest = {
    PARENT: "basic",
    LABEL: "Alpha Gun Test",
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            ALPHA: 0.5
        }
    }]
}

exports.onTest = {
    PARENT: 'genericTank',
    LABEL: '`ON` property test',
    TOOLTIP: [
        'Refer to exports.onTest to know more ',
        'On collide is a bit buggy right now, please use other methods until its fixed'
    ],
    ON: [{
        event: "fire",
        handler: ({ body, gun }) => {
            switch (gun.identifier) {
                case 'mainGun':
                    body.sendMessage('fired main gun')
                    break;
                case 'secondaryGun':
                    body.sendMessage('fired secondary gun')
                    break;
            }
        }
    }, {
        event: "altFire",
        handler: ({ body, gun }) => {
            body.sendMessage('fired alt gun')
        }
    }, {
        event: "death",
        handler: ({ body, killers, killTools }) => {
            body.sendMessage('you died')
        }
    }, {
        event: "collide",
        handler: ({ instance, other }) => {
            instance.sendMessage('collide!')
        }
    }, {
        event: "damage",
        handler: ({ body, damageInflictor, damageTool }) => {
            body.SIZE += damageInflictor[0].SIZE / 2
            damageInflictor[0].kill()
        }
    }],
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'mainGun'
        }
    }, {
        POSITION: { ANGLE: 90 },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            ALT_FIRE: true
        }
    }, {
        POSITION: { ANGLE: 180, DELAY: 0.5 },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'secondaryGun'
        }
    }]
}

exports.auraBasicGen = addAura();
exports.auraBasic = {
    PARENT: ["genericTank"],
    LABEL: "Aura Basic",
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [18, 0, 0, 0, 0, 0],
            TYPE: "auraBasicGen",
            VULNERABLE: true,
        }
    ],
};
exports.auraHealerGen = addAura(-1);
exports.auraHealer = {
    PARENT: ["genericTank"],
    LABEL: "Aura Healer",
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "auraHealerGen",
        }
    ],
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [8, 9, -0.5, 12.5, 0, 0, 0],
        },
        {
            POSITION: [18, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer]),
                TYPE: "healerBullet",
            },
        },
    ],
};

exports.ghoster_ghostForm = {
    PARENT: ['genericTank'],
    TOOLTIP: 'You are now in ghost form, roam around and find your next target. Will turn back in 5 seconds',
    LABEL: 'Ghoster',
    BODY: {
        SPEED: 20,
        ACCELERATION: 10,
        FOV: base.FOV + 1,
    },
    GUNS: [{
        POSITION: { WIDTH: 20, LENGTH: 20 },
    }],
    ALPHA: 0.6,
}

exports.ghoster = {
    PARENT: ['genericTank'],
    LABEL: 'Ghoster',
    TOOLTIP: 'Shooting will turn you into a ghost for 5 seconds',
    BODY: {
        SPEED: base.SPEED,
        ACCELERATION: base.ACCEL,
    },
    ON: [
        {
            event: 'fire',
            handler: ({ body }) => {
                body.define(Class.ghoster_ghostForm)
                setTimeout(() => {
                    body.SPEED = 1e-99
                    body.ACCEL = 1e-99
                    body.FOV *= 2
                    body.alpha = 1
                }, 2000)
                setTimeout(() => {
                    body.SPEED = base.SPEED
                    body.define(Class.ghoster)
                }, 2500)
            }
        }
    ],
    GUNS: [{
        POSITION: {WIDTH: 20, LENGTH: 20},
        PROPERTIES: {
            TYPE: 'bullet',
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
        }
    }],
    ALPHA: 1,
}

exports.switcheroo = {
    PARENT: ['basic'],
    LABEL: 'Switcheroo',
    UPGRADES_TIER_0: [],
    RESET_UPGRADE_MENU: true,
    ON: [
        {
            event: "fire",
            handler: ({ body, globalMasterStore: store, gun }) => {
                if (gun.identifier != 'switcherooGun') return
                store.switcheroo_i ??= 0;
                store.switcheroo_i++;
                store.switcheroo_i %= 6;
                body.define(Class.basic.UPGRADES_TIER_1[store.switcheroo_i]);
                setTimeout(() => body.define("switcheroo"), 6000);
            }
        }
    ],
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'switcherooGun'
        }
    }]
}

// FUN
exports.florr_tank_eye = {
    PARENT: "genericTank",
    BORDERLESS: true,
    MIRROR_MASTER_ANGLE: true,
    SHAPE: 'M 0 -1.5 C -1 -1.5 -1 1.5 0 1.5 C 1 1.5 1 -1.5 0 -1.5'
}
exports.florr_tank_smile = {
    PARENT: "genericTank",
    COLOR: 'black',
    BORDERLESS: true,
    MIRROR_MASTER_ANGLE: true,
    SHAPE: 'M 5 1.5 C 3 -2.5 -3 -2.5 -5 1.5 L -4 2 C -2 -1.5 2 -1.5 4 2 L 5 1.5'
}
exports.florr_tank = {
    PARENT: "genericTank",
    COLOR: 'yellow',
    LABEL: 'Flower',
    STAT_NAMES: {
        BODY_DAMAGE: 'Flower Thorns',
        BULLET_SPEED: 'Petal Speed',
        BULLET_HEALTH: 'Petal Health',
        BULLET_PEN: 'Petal Penetration',
        BULLET_DAMAGE: 'Petal Damage',
        RELOAD: 'Petal Cooldown',
        MOVE_SPEED: 'Flower Speed',
        SHIELD_REGEN: 'Photosynthesis',
        SHIELD_CAP: 'Vacuole Capacity',
    },
    GUNS: (() => {
        let output = []
        for (let i = 0; i < 32; i++) {
            output.push({
                POSITION: {
                    WIDTH: 10, 
                    LENGTH: 1, 
                    X: -2, 
                    ANGLE: (360/8)*i, 
                    DELAY: i < 8 ? 1 : i < 16 ? 2 : i < 24 ? 3 : i < 32 ? 4 : 5
                },
                PROPERTIES: {
                    TYPE: 'bullet',
                    SHOOT_SETTINGS: combineStats([g.basic, {spread: 0}])
                }
            })
        }
        return output
    })(),
    TURRETS: [
        {
            POSITION: { SIZE: 3.5, X: -3, Y: 2, LAYER: 1, ANGLE: -90 },
            TYPE: ["florr_tank_eye", {COLOR: 'black'}]
        },
        {
            POSITION: { SIZE: 3.5, X: 3, Y: 2, LAYER: 1, ANGLE: -90 },
            TYPE: ["florr_tank_eye", {COLOR: 'black'}]
        },
        {
            POSITION: { SIZE: 1.75, X: -3.5, Y: 2.5, LAYER: 1, ANGLE: -90 },
            TYPE: ["florr_tank_eye", { COLOR: 'white' }]
        },
        {
            POSITION: { SIZE: 1.75, X: 2.5, Y: 2.5, LAYER: 1, ANGLE: -90 },
            TYPE: ["florr_tank_eye", { COLOR: 'white' }]
        },
        {
            POSITION: { SIZE: 1.25, Y: -4, LAYER: 1, ANGLE: -90 },
            TYPE: ["florr_tank_smile"]
        }
    ]
}

exports.vanquisher = {
    PARENT: ["genericTank"],
    DANGER: 8,
    LABEL: "Vanquisher",
    STAT_NAMES: statnames.generic,
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    //destroyer
    GUNS: [{
        POSITION: [21, 14, 1, 0, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
            TYPE: "bullet"
        }

    //builder
    },{
        POSITION: [18, 12, 1, 0, 0, 0, 0],
    },{
        POSITION: [2, 12, 1.1, 18, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: "setTrap"
        }

    //launcher
    },{
        POSITION: [10, 9, 1, 9, 0, 90, 0],
    },{
        POSITION: [17, 13, 1, 0, 0, 90, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty]), TYPE: "minimissile", STAT_CALCULATOR: gunCalcNames.sustained }

    //shotgun
    },{
        POSITION: [4, 3, 1, 11, -3, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [4, 3, 1, 11, 3, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [4, 4, 1, 13, 0, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 4, 1, 12, -1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 4, 1, 11, 1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 3, 1, 13, -1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [1, 3, 1, 13, 1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [1, 2, 1, 13, 2, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "casing" }
    }, {
        POSITION: [1, 2, 1, 13, -2, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]), TYPE: "casing" }
    }, {
        POSITION: [15, 14, 1, 6, 0, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), TYPE: "casing" }
    }, {
        POSITION: [8, 14, -1.3, 4, 0, 270, 0],
    }]
};
exports.armyOfOneBullet = {
    PARENT: ["bullet"],
    LABEL: "Unstoppable",
    TURRETS: [
        {
            /** SIZE         X             Y         ANGLE        ARC */
            POSITION: [18.5, 0, 0, 0, 360, 0],
            TYPE: ["spikeBody", { COLOR: null }],
        },
        {
            POSITION: [18.5, 0, 0, 180, 360, 0],
            TYPE: ["spikeBody", { COLOR: null }],
        },
    ],
};
exports.armyOfOne = {
    PARENT: ["genericTank"],
    LABEL: "Army Of One",
    DANGER: 9,
    SKILL_CAP: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    BODY: {
        SPEED: 0.5 * base.SPEED,
        FOV: 1.8 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [21, 19, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.destroy, g.destroy, g.destroy, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.doublereload, g.doublereload, g.doublereload, g.doublereload]),
                TYPE: "armyOfOneBullet",
            },
        },{
            POSITION: [21, 11, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.destroy, g.destroy, g.destroy, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.doublereload, g.doublereload, g.doublereload, g.doublereload, g.fake]),
                TYPE: "bullet",
            },
        }
    ],
};
exports.godbasic = {
    PARENT: ["genericTank"],
    LABEL: "God Basic",
    SKILL_CAP: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    SKILL: [ 31, 31, 31, 31, 31, 31, 31, 31, 31, 31 ],
    BODY: {
        ACCELERATION: base.ACCEL * 1,
        SPEED: base.SPEED * 1,
        HEALTH: base.HEALTH * 1,
        DAMAGE: base.DAMAGE * 1,
        PENETRATION: base.PENETRATION * 1,
        SHIELD: base.SHIELD * 1,
        REGEN: base.REGEN * 1,
        FOV: base.FOV * 1,
        DENSITY: base.DENSITY * 1,
        PUSHABILITY: 1,
        HETERO: 3,
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
                COLOR: "grey",
                LABEL: "",
                STAT_CALCULATOR: 0,
                WAIT_TO_CYCLE: false,
                AUTOFIRE: false,
                SYNCS_SKILLS: false,
                MAX_CHILDREN: 0,
                ALT_FIRE: false,
                NEGATIVE_RECOIL: false,
            },
        },
    ],
};
exports.maximumOverdrive = {
    PARENT: ["overdrive"],
    LABEL: "Maximum Overdrive",
    SKILL_CAP: Array(10).fill(255),
    SKILL: Array(10).fill(255),
};
exports.weirdAutoBasic = {
    PARENT: "genericTank",
    LABEL: "Weirdly defined Auto-Basic",
    GUNS: [{
        POSITION: {
            LENGTH: 20,
            WIDTH: 10
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, [0.8, 0.8, 1.5, 1, 0.8, 0.8, 0.9, 1, 1, 1, 1, 2, 1]]),
            TYPE: "bullet"
        },
    }],
    TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["autoTurret", {
            CONTROLLERS: ["nearestDifferentMaster"],
            INDEPENDENT: true
        }]
    }]
};

exports.levels = {
    PARENT: ["menu"],
    LABEL: "Level Switcher",
    UPGRADES_TIER_0: []
};
for (let i = 0; i < 12; i++) {
    let LEVEL = i * c.TIER_MULTIPLIER;
    exports["level" + LEVEL] = {
        PARENT: ["levels"],
        LEVEL,
        LABEL: "Level " + LEVEL
    };
    exports.levels.UPGRADES_TIER_0.push("level" + LEVEL);
}

exports.teams = {
    PARENT: ["menu"],
    LABEL: "Team Switcher",
    UPGRADES_TIER_0: []
};
for (let i = 1; i <= 8; i++) {
    let TEAM = i;
    exports["Team" + TEAM] = {
        PARENT: ["teams"],
        TEAM: -TEAM,
        COLOR: getTeamColor(-TEAM),
        LABEL: "Team " + TEAM
    };
    exports.teams.UPGRADES_TIER_0.push("Team" + TEAM);
}
exports['Team' + TEAM_ROOM] = {
    PARENT: ["teams"],
    TEAM: TEAM_ROOM,
    COLOR: "yellow",
    LABEL: "Room Team"
};
exports['Team' + TEAM_ENEMIES] = {
    PARENT: ["teams"],
    TEAM: TEAM_ENEMIES,
    COLOR: "yellow",
    LABEL: "Enemies Team"
};
exports.teams.UPGRADES_TIER_0.push('Team' + TEAM_ROOM, 'Team' + TEAM_ENEMIES);

exports.testing = {
    PARENT: ["menu"],
    LABEL: "Testing"
};

exports.addons = {
    PARENT: "menu",
    LABEL: "Addon Entities",
    UPGRADES_TIER_0: []
};
exports.addons2 = {
    PARENT: "menu",
    LABEL: "Addon BOSS!",
    UPGRADES_TIER_0: []
};
exports.ikeBullet = {
    PARENT: ["homingBullet"],
    SHAPE: "M -1 -1 L -1 1 L 0 1 A 1 1 0 0 0 0 -1 L -1 -1",
    BODY: {
        PUSHABILITY: 0,
    },
    INDEPENDENT: false,
    DIE_AT_LOW_SPEED: true,
    HITS_OWN_TYPE: "never",
    ARENA_CLOSER: true,
};
exports.ikeBase = {
    PARENT: ["dominator"],
    LABEL: "IKE Turret",
    SIZE: 64,
    BODY: {
        SPEED: 0,
        FOV: 1.5,
        PUSHABILITY: 0,
        HEALTH: 1180,
        RAGE_MULTIPLIER: 25,
    },
    GUNS: [
        {
            POSITION: [18, 6.75, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [5, 6.75, -1.6, 6.75, 0, 0, 0],
        },
        {
            POSITION: [4.25, 8.25, 1, 17.25, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.iketurret]),
                TYPE: [ "ikeBullet", { LAYER: 12 } ],
            },
        },
    ],
};
exports.APSbody = {
    PARENT: ["miniboss"],
    LABEL: "APS",
    DANGER: 8,
    COLOR: 60,
    SHAPE: 8,
    SIZE: 30,
    FACING_TYPE: "autospin",
    VALUE: 3e5,
    BODY: {
        FOV: 0.5,
        SPEED: 0.1 * base.SPEED,
        HEALTH: 12 * base.HEALTH,
        DAMAGE: 2.5 * base.DAMAGE,
    },
};exports.APS1 = {
    PARENT: ["APSbody"],
    LABEL: "APS-1",
    GUNS: [],
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: [
                "engineer",
                {
                    COLOR: 60,
                },
            ],
        },
    ],
};
for (let i = 0; i < 4; i++) {
    exports.APS1.GUNS.push(
        {
            POSITION: [6, 6, 1.2, 6, 0, 90*i+45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, {reload: 0.6, size: 0.5}]),
                TYPE: ["drone", { INDEPENDENT: true }],
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            },
        },
        {
            POSITION: [5.5, 8, 1, 6, 0, 90*i+90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                TYPE: "bullet",
                LABEL: "Devastator",
            },
        },
    )
    exports.APS1.TURRETS.push(
        {
            POSITION: [5, 11, 0, 90*i+90, 160, 0],
            TYPE: ["auto4gun", { INDEPENDENT: false }],
        },
        {
            POSITION: [5, 11, 0, 90*i+45, 160, 0],
            TYPE: ["sprayer", { INDEPENDENT: false }],
        },
    )
};
exports.bigmach4gun = {
    PARENT: ["genericTank"],
    LABEL: "",
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 16,
    GUNS: [
        {
            POSITION: [14, 6, 1.4, 0, -6, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.mach, g.power, g.halfreload, ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 6, 1.4, 0, 6, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.mach, g.power, g.halfreload, ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1.4, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.mach, g.power, g.halfreload, ]),
                TYPE: "bullet",
            },
        },
    ],
};
exports.machineAutoTurret = {
    PARENT: ["genericTank"],
    LABEL: "Turret",
    COLOR: 16,
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    GUNS: [
        {
            POSITION: [14, 11, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow, {reload: 0.5, maxSpeed: 0.7}]),
                TYPE: "bullet",
            },
        },
    ],
};
exports.APS1pillbox = {
    LABEL: "Pillbox",
    PARENT: ["trap"],
    SHAPE: -4,
    MOTION_TYPE: "motor",
    CONTROLLERS: ["goToMasterTarget", "nearestDifferentMaster"],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: "bigmach4gun",
        },
    ],
};
exports.APS1pillboxturret = {
    PARENT: ["genericTank"],
    DANGER: 7,
    LABEL: "Engineer",
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    GUNS: [{
        POSITION: [4.25, 14, 1.25, 7.75, 0, 0, 0]
        }, {
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        }, {
            POSITION: [3, 14, 1, 15.5, 0, 0, 0],
        }, {
            POSITION: [2, 14, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 6,
                SHOOT_SETTINGS: combineStats([g.trap, g.block, {reload: 2.2, health: 1.3}]),
                TYPE: "APS1pillbox",
                SYNCS_SKILLS: true,
                DESTROY_OLDEST_CHILD: true,
            }, }, {
            POSITION: [4, 14, 1, 8, 0, 0, 0],
        },
    ],
};

exports.APS1plus = {
    PARENT: ["APSbody"],
    LABEL: "APS(+)-1",
    SHAPE: 12,
    SIZE: 60,
    VALUE: 2e6,
    BODY: {
        FOV: 0.5,
        SPEED: 0.05 * base.SPEED,
        HEALTH: 24 * base.HEALTH,
        DAMAGE: 4.5 * base.DAMAGE,
    },
    GUNS: [],
    TURRETS: [],
};

for (let i = 0; i < 4; i++) {
    exports.APS1plus.GUNS.push(
        {
            POSITION: [5.5, 4, 1.2, 6, 0, 90*i+90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, {reload: 0.3, size: 0.5}]),
                TYPE: ["drone", { INDEPENDENT: true }],
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 8,
            },
        },
        {
            POSITION: [5, 4, 1, 6, 0, 90*i+30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                TYPE: "bullet",
                LABEL: "Devastator",
            },
        },
        {
            POSITION: [5, 4, 1, 6, 0, 90*i+60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                TYPE: "bullet",
                LABEL: "Devastator",
            },
        },
    )
    exports.APS1plus.TURRETS.push(
        {
            POSITION: [3, 11, 0, 90*i+30, 160, 0],
            TYPE: ["auto4gun", { INDEPENDENT: false }],
        },
        {
            POSITION: [3, 11, 0, 90*i+60, 160, 0],
            TYPE: ["auto4gun", { INDEPENDENT: false }],
        },
        {
            POSITION: [3, 11, 0, 90*i+90, 160, 0],
            TYPE: ["sprayer", { INDEPENDENT: false }],
        },
        {
            POSITION: [3, 7.5, 0, 90*i+22.5, 240, 1],
            TYPE: ["bigmach4gun", { INDEPENDENT: true }],
        },
        {
            POSITION: [3, 7.5, 0, 90*i+67.5, 240, 1],
            TYPE: ["bigmach4gun", { INDEPENDENT: true }],
        },
    )
};
exports.APS1plus.TURRETS.push(
        {
            POSITION: [7, 0, 0, 0, 360, 1],
            TYPE: [
                "APS1pillboxturret",
                {
                    COLOR: 60,
                },
            ],
        },
        
)
exports.APS1plusplus = {
    PARENT: ["APSbody"],
    LABEL: "APS(++)-1 (by Chompy610)",
    SHAPE: 16,
    SIZE: 90,
    VALUE: 2e6,
    BODY: {
        FOV: 0.5,
        SPEED: 0.01 * base.SPEED,
        HEALTH: 48 * base.HEALTH,
        DAMAGE: 4.25 * base.DAMAGE,
    },
    GUNS: [],
    TURRETS: [],
};
for (let i = 0; i < 8; i++) {
    exports.APS1plusplus.GUNS.push(
        {
            POSITION: [5, 2.5, 1.2, 6, 0, 45*i+22.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, {reload: 0.6, size: 0.5}]),
                TYPE: ["drone", { INDEPENDENT: true }],
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 8,
            },
        },
        {
            POSITION: [5, 2.5, 1, 6, 0, 45*i+45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                TYPE: "bullet",
                LABEL: "Devastator",
            },
        },
    )
    exports.APS1plusplus.TURRETS.push(
        {
            POSITION: [2, 10.5, 0, 45*i+45, 160, 0],
            TYPE: ["auto4gun", { INDEPENDENT: false }],
        },
        {
            POSITION: [2, 10.5, 0, 45*i+22.5, 160, 0],
            TYPE: ["sprayer", { INDEPENDENT: false }],
        },
        {
            POSITION: [2, 7.5, 0, 45*i+33.75, 240, 1],
            TYPE: ["machineAutoTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [3, 5, 0, 45*i+11.25, 240, 1],
            TYPE: ["bigmach4gun", { INDEPENDENT: true }],
        },
    )
};
exports.APS1plusplus.TURRETS.push(
        {
            POSITION: [6, 0, 0, 0, 360, 1],
            TYPE: [
                "APS1pillboxturret",
                {
                    COLOR: 60,
                },
            ],
        },
)
exports.autoturretTrap = {
    PARENT: "trap",
    LABEL: "Thrown Auto-Trap",
    TURRETS: [{
        POSITION: [8,0,0,180,360,1],
        TYPE: ["autoTurret",{INDEPENDENT: true, CONTROLLERS: ["nearestDifferentMaster"]}]
    }]
}
exports.jups_Pentamond3_base = {
    PARENT: "genericTank",
    LABEL: "Base",
    COLOR: 0,
    SHAPE: 5,
    CONTROLLERS: [["spin", { independent: true, speed: -0.01 }]],
    GUNS: (()=>{
        var gs = [];
        for(var i=0;i<5;i++){
            [
                {
                    POSITION: [12,4,1,0,1.75,72*i+35+10,0]
                },
                {
                    POSITION: [11,5,1,0,1.75,72*i+35+10,0]
                },
                {
                    POSITION: [2,5,1.5,12,1.75,72*i+35+10,0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.anni, g.halfreload, g.halfspeed, g.halfrange]),
                        TYPE: "autoturretTrap",
                        STAT_CALCULATOR: gunCalcNames.trap
                    },
                },
                {
                    POSITION: [12,4,1,0,-1.75,72*i+35-10,0]
                },
                {
                    POSITION: [11,5,1,0,-1.75,72*i+35-10,0]
                },
                {
                    POSITION: [2,5,1.5,12,-1.75,72*i+35-10,0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.anni, g.halfreload, g.halfspeed, g.halfrange]),
                        TYPE: "autoturretTrap",
                        STAT_CALCULATOR: gunCalcNames.trap
                    },
                },
            ].forEach(e=>{gs.push(e)})
        }
        return gs;
    })(),
}
exports.jups_Pentamond3_petal = {
    PARENT: ["genericEntity"],
    LABEL: "Petal",
    SHAPE: 5,
    COLOR: 8,
    CONTROLLERS: [["spin", {independent:true, speed: 0.5}]]
};
exports.jups_Pentamond3_petals = {
    PARENT: ["drone"],
    TYPE: "drone",
    LABEL: "Petal",
    SHAPE: 0,
    AI: {
        BLIND: true,
    },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.03,
        HEALTH: 0.3,
        DAMAGE: 3.375,
        SPEED: 10,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 1,
    },
    TURRETS: [{
        POSITION: [22,0,0,180,360,0],
        TYPE: ["jups_Pentamond3_petal",{INDEPENDENT:true}]
    }]
};
exports.jups_Pentamond3_shoulder = {
    PARENT: "genericEntity",
    SHAPE: 5,
    COLOR: 1,
}
exports.jups_Pentamond3_top_bullet = {
    PARENT: "bullet",
    CONTROLLERS: [["spin",{independent:true, speed:0.5}]],
    FACING_TYPE: "fastspin",
    GUNS: (()=>{
        var gs = [];
        for(var i=0;i<5;i++){
            [
                {
                    POSITION: [13,8,1,0,0,i*72,0]
                },
                {
                    POSITION: [2,8,1.3,13,0,i*72,0],
                    PROPERTIES: {
                        AUTOFIRE: true,
                        SHOOT_SETTINGS: combineStats([
                            g.trap,
                            g.halfrange,
                            [0.25, 1, 1, 1, 1, 1, 1, 0.5, 1, 0.3, 1, 1, 1],
                        ]),
                        TYPE: [
                            "trap",
                            {
                                PERSISTS_AFTER_DEATH: true,
                            },
                        ],
                    }
                }
            ].forEach(e=>{gs.push(e)})
        }
        return gs;
    })()
}
exports.jups_Pentamond3_top = {
    PARENT: "genericTank",
    SHAPE: 0,
    COLOR: 8,
    BODY: {
        FOV: 1
    },
    GUNS: [
        {
            POSITION: [2,12,1.3,15,0,0,0]
        },
        {
            POSITION: [16,16,1,0,0,0,0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    [5,1,1,0.5,10,1,1,3,1.5,1,1,1,1]
                ]),
                TYPE: "jups_Pentamond3_top_bullet"
            }
        },
        {
            POSITION: [10,20,0.8,0,0,0,0]
        },
        {
            POSITION: [12,8,1,0,0,0,0],
            PROPERTIES: {
                COLOR: 17
            }
        },
        {
            POSITION: [2,8,1.3,12,0,0,0],
            PROPERTIES: {
                COLOR: 17
            }
        }
    ]
}
exports.jups_Pentamond3 = {
    PARENT: "miniboss",
    LABEL: "Pentamond-3 (by Orcinus Trapper)",
    COLOR: 0,
    SHAPE: 5,
    SIZE: 70,
    VALUE: 1.75e6,
    GUNS: (()=>{
        var gs = [];
        for(var i=0;i<5;i++){
            [
                {
                    POSITION: [4,2,1.5,8,2,72*i-20,0]
                },
                {
                    POSITION: [1,3,5/3,12,2,72*i-20,0]
                },
                {
                    POSITION: [4,2,1.5,8,-2,72*i+20,0]
                },
                {
                    POSITION: [1,3,5/3,12,-2,72*i+20,0]
                },
                
                {
                    POSITION: [1,3,1,13,0,72*i,0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([
                            g.drone,
                            g.morespeed,
                            g.morespeed,
                        ]),
                        TYPE: ["jups_Pentamond3_petals",{INDEPENDENT: true}],
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                        WAIT_TO_CYCLE: true,
                        MAX_CHILDREN: 3
                    }
                },
                {
                    POSITION: [3,3*Math.sin(Math.PI/5),0.001,10.3224112985,8.57663053496,72*i-42.9427245326,0],
                    PROPERTIES: {COLOR: 8}
                },
                {
                    POSITION: [3,3*Math.sin(Math.PI/5),0.001,10.3224112985,-8.57663053496,72*i+42.9427245326,0],
                    PROPERTIES: {COLOR: 8}
                },
                {
                    POSITION: [3,3*Math.sin(Math.PI/5),0.001,14,0,72*i,0],
                    PROPERTIES:{COLOR:8}
                },
                {
                    POSITION: [4,3,1,9,0,72*i,0]
                },
                {
                    POSITION: [1,3,4/3,13,0,72*i,0]
                },

                
                {
                    POSITION: [10,0.5,1,0,2,72*i+35,0]
                },
                {
                    POSITION: [0.25,0.5,1.5,10,2,72*i+35,0.1],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.halfreload, g.halfreload, g.morespeed]),
                        TYPE: "trap",
                        STAT_CALCULATOR: gunCalcNames.trap
                    },
                },
                {
                    POSITION: [10,0.5,1,0,-2,72*i+35,0]
                },
                {
                    POSITION: [0.25,0.5,1.5,10,-2,72*i+35,0.1],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.halfreload, g.halfreload, g.morespeed]),
                        TYPE: "trap",
                        STAT_CALCULATOR: gunCalcNames.trap
                    },
                },
                {
                    POSITION: [10.5,0.5,1,0,1,72*i+35,0]
                },
                {
                    POSITION: [0.25,0.5,1.5,10.5,1,72*i+35,0.05],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.halfreload, g.halfreload, g.morespeed]),
                        TYPE: "trap",
                        STAT_CALCULATOR: gunCalcNames.trap
                    },
                },
                {
                    POSITION: [10.5,0.5,1,0,-1,72*i+35,0]
                },
                {
                    POSITION: [0.25,0.5,1.5,10.5,-1,72*i+35,0.05],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.halfreload, g.halfreload, g.morespeed]),
                        TYPE: "trap",
                        STAT_CALCULATOR: gunCalcNames.trap
                    },
                },
                {
                    POSITION: [11,0.5,1,0,0,72*i+35,0]
                },
                {
                    POSITION: [0.25,0.5,1.5,11,0,72*i+35,0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.halfreload, g.halfreload, g.morespeed]),
                        TYPE: "trap",
                        STAT_CALCULATOR: gunCalcNames.trap
                    },
                }
            ].forEach(e=>{gs.push(e)})
        }
        return gs;
    })(),
    TURRETS: [
        
    ],
    TURRETS: (()=>{
        var gs = [
            {
                POSITION: [20, 0, 0, 180, 360, 0],
                TYPE: "jups_Pentamond3_base",
            },
        ];
        for(var i=0;i<5;i++){
            [
                {
                    POSITION: [3, 13, -2, 72*i+20, 80, 0],
                    TYPE: ["swarmTurret",{INDEPENDENT: true, CONTROLLERS: ["nearestDifferentMaster"], COLOR: 8}]
                },
                {
                    POSITION: [3, 13, 2, 72*i-20, 80, 0],
                    TYPE: ["swarmTurret",{INDEPENDENT: true, CONTROLLERS: ["nearestDifferentMaster"], COLOR: 8}]
                },
                {
                    POSITION: [4, 14, 0, 72*i, 0, 0],
                    TYPE: ["genericEntity",{COLOR:1}]
                },
                {
                    POSITION: [5,8,0,72*i,0,1],
                    TYPE: ["jups_Pentamond3_shoulder"]
                }
            ].forEach(e=>{gs.push(e)})
        }
        gs.push(
            {
                POSITION: [10,0,0,180,360,1],
                TYPE: ["jups_Pentamond3_top",{INDEPENDENT: true, CONTROLLERS: ["nearestDifferentMaster"]}]
            }
        )
        return gs
    })()
}

// ROGUE EMPRESS
exports.guard = {
    PARENT: ["genericTank"],
    LABEL: "Guard",
    DANGER: 10,
    COLOR: "gold",
    SHAPE: 9,
    SIZE: 15,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    SKILL_CAP: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    HAS_NO_RECOIL: true,
    VALUE: 1e5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    AI: {
      NO_LEAD: true,
      STRAFE: true,
    },
    BODY: {
      FOV: 0.8,
      ACCELERATION: 0.8,
      DAMAGE: base.DAMAGE,
      HEALTH: 0.8 * base.HEALTH,
      SPEED: 0.45 * base.SPEED,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: "smoothToTarget",
    HITS_OWN_TYPE: "hard",
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
  };
  exports.guardGunner = {
    PARENT: ["guard"],
    LABEL: "Guard Gunner",
    UPGRADE_LABEL: "Guard Gunner",
    GUNS: [
      {
        POSITION: [18, 10, 1, 0, 5, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [18, 10, 1, 0, -5, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [17, 10, 1, 0, 5, 0, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [17, 10, 1, 0, -5, 0, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [16, 10, 1, 0, 5, 0, 1 / 4, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [16, 10, 1, 0, -5, 0, 1 / 4, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [15, 10, 1, 0, -5, 0, 3 / 4, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [15, 10, 1, 0, 5, 0, 2 / 4, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [14, 10, 1, 0, -5, 0, 2 / 4, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [14, 10, 1, 0, 5, 0, 3 / 4, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [19, 13.5, 1.2, 0, 0, 0, 0,],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.mach]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [21, 11.5, 1.2, 0, 0, 0, 2 / 3],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.mach]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [23, 10, 1.2, 0, 0, 0, 1 / 3],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.mach]),
          TYPE: "bullet",
        },
      },
    ],
  };
  exports.autoSmasherDrone = {
    PARENT: ["drone"],
    LABEL: "Auto-Smasher Drone",
    COLOR: 18,
    DANGER: 6,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    BODY: {
      PUSHABILITY: 0.3,
      HEALTH: 0.25 * 5,
      DAMAGE: 3.265 / 5,
      SPEED: 2,
      DENSITY: 0.1,
      RESIST: 3,
      FOV: 100,
    },
    SHAPE: 0,
    GUNS: [],
    TURRETS: [{
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smasherBody",
    },
      {
        POSITION: [11, 0, 0, 0, 360, 1],
        TYPE: ["auto4gun", {
          INDEPENDENT: true
        }],
      },
    ],
  }
  exports.rogueEmpressLowerBody = {
    PARENT: ["genericTank"],
    LABEL: "Rogue Empress Lower Body",
    CONTROLLERS: [
      ["spin", {
        independent: true,
        speed: -0.005
      }]
    ],
    FACING_TYPE: ["spin", {
      speed: -0.005
    }],
    COLOR: 17,
    SIZE: 100,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SHAPE: 12,
    FOV: 10,
    MAX_CHILDREN: 12,
    GUNS: [],
  }
  for (let i = 0; i < 12; i++) {
    exports.rogueEmpressLowerBody.GUNS.push({
      POSITION: [2.5, 3, -1.8, 9, 0, 360 / 12 * i, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.celeslower, g.pound, g.summoner, g.one_third_reload, g.halfreload, g.lessreload, g.one_third_reload, g.slow, g.one_third_reload, g.slow, g.halfreload, g.lessreload, g.lessreload, {
          size: 2.1
        }]),
        TYPE: ["autoSmasherDrone", {
          INDEPENDENT: true,
        }],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
      },
    }, )
  }
  exports.askshybridMissile = {
    PARENT: ["missile"],
    LABEL: "Auto-Smasher-Trap-Skimmer Hybrid Missile",
    HITS_OWN_TYPE: "never",
    DANGER: 6,
    COLOR: 18,
    SHAPE: 0,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    BODY: {
      FOV: 1.05 * base.FOV,
      DENSITY: 2 * base.DENSITY,
    },
    GUNS: [
      {
        POSITION: [4, 6, 1.6, 13, -2, 90, 0.5],
      },
      {
        POSITION: [4, 6, 1.6, 13, 2, -90, 0.5],
      },
        {
      POSITION: [14, 6, 1, 0, -2, 150, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ]),
        TYPE: [
          "bullet",
          {
            PERSISTS_AFTER_DEATH: true,
          },
        ],
        STAT_CALCULATOR: gunCalcNames.thruster,
      },
    },
      {
        POSITION: [14, 6, 1, 0, 2, 210, 0],
        PROPERTIES: {
          AUTOFIRE: true,
          SHOOT_SETTINGS: combineStats([
            g.basic,
            [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          ]),
          TYPE: [
            "bullet",
            {
              PERSISTS_AFTER_DEATH: true,
            },
          ],
          STAT_CALCULATOR: gunCalcNames.thruster,
        },
      },
      {
        POSITION: [5, 7, 1, 9, -2, 90, 0],
        PROPERTIES: {
          AUTOFIRE: true,
          SHOOT_SETTINGS: combineStats([
            g.trap,
            g.halfrange,
            [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          ]),
          TYPE: [
            "trap",
            {
              PERSISTS_AFTER_DEATH: true,
            },
          ],
        },
      },
      {
        POSITION: [5, 7, 1, 9, 2, -90, 0],
        PROPERTIES: {
          AUTOFIRE: true,
          SHOOT_SETTINGS: combineStats([
            g.trap,
            g.halfrange,
            [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          ]),
          TYPE: [
            "trap",
            {
              PERSISTS_AFTER_DEATH: true,
            },
          ],
        },
      },
    ],
    TURRETS: [{
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smasherBody",
    },
      {
        POSITION: [11, 0, 0, 0, 360, 1],
        TYPE: ["auto4gun", {
          INDEPENDENT: true
        }],
      },
    ],
  }
  exports.askshybridTurret = {
    PARENT: ["genericTank"],
    LABEL: "Triple-Auto-Smasher-Trap-Skimmer Hybrid Turret",
    BODY: {
      FOV: 10,
    },
    COLOR: 16,
    CONTROLLERS: [
      "canRepel",
      "onlyAcceptInArc",
      "mapAltToFire",
      "nearestDifferentMaster",
    ],
    GUNS: [{
      POSITION: [3, 10, 1.2, 15, 0, 0, 0],
    },
      {
        POSITION: [16, 18, -0.7, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.pound,
            g.arty,
            g.skim,
            g.morespeed,
            g.one_third_reload,
            g.lessreload,
            g.halfreload,
            g.one_third_reload,
            g.halfreload,
            g.lessreload,
            {
              range: 3
            },
          ]),
          TYPE: "askshybridMissile",
        },
      },
    ],
  };
  exports.rogueEmpressBottomBody = {
    PARENT: ["genericTank"],
    LABEL: "Rogue Empress Bottom Body",
    CONTROLLERS: [
      ["spin", {
        independent: true,
        speed: 0.005
      }]
    ],
    FACING_TYPE: ["spin", {
      speed: 0.005
    }],
    COLOR: 17,
    SIZE: 100,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SHAPE: 9,
    FOV: 1,
    TURRETS: [],
  };
  for (let i = 0; i < 9; i++) {
    exports.rogueEmpressBottomBody.TURRETS.push({
      POSITION: [6.5, 9, 0, 360 / 9 * (i + 0.5), 160, 0],
      TYPE: ["askshybridTurret", {
        INDEPENDENT: true,
      }],
    }, )
  };
  exports.rogueEmpressMiddleBody = {
    PARENT: ["genericTank"],
    LABEL: "Rogue Empress Middle Body",
    CONTROLLERS: [
      ["spin", {
        independent: true,
        speed: -0.005
      }]
    ],
    FACING_TYPE: ["spin", {
      speed: -0.005
    }],
    COLOR: 17,
    SIZE: 100,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SHAPE: 6,
    FOV: 1,
    TURRETS: [],
  };
  for (let i = 0; i < 6; i++) {
    exports.rogueEmpressMiddleBody.TURRETS.push({
      POSITION: [8.5, 9, 0, 360 / 6 * (i + 0.5), 160, 0],
      TYPE: ["guardGunner", {
        INDEPENDENT: true,
        COLOR: 16,
      }],
    }, )
  }
  exports.rogueAnni = {
    PARENT: ["miniboss"],
    LABEL: "Rogue Devastator",
    COLOR: 17,
    SHAPE: 6,
    SIZE: 30,
    VALUE: 5e5,
    FACING_TYPE: ["autospin"],
    AUTOSPIN: true,
    AUTOFIRE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'onlyAcceptInArc'],
    BODY: {
      FOV: 1.4,
      SPEED: 0.05 * base.SPEED,
      HEALTH: 16 * base.HEALTH,
      SHIELD: 3 * base.SHIELD,
    },
    GUNS: [{
      POSITION: [4, 6, -1.6, 8, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.destroy, g.anni, g.halfrecoil, g.lessreload, g.basic]),
        TYPE: ["bullet"],
        AUTOFIRE: true
      }
    },
      {
        POSITION: [4, 6, -1.6, 8, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.destroy, g.anni, g.halfrecoil, g.lessreload, g.basic]),
          TYPE: ["bullet"],
          AUTOFIRE: true
        }
      },
      {
        POSITION: [4, 6, -1.6, 8, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.destroy, g.anni, g.halfrecoil, g.lessreload, g.basic]),
          TYPE: ["bullet"],
          AUTOFIRE: true
        }
      },
      {
        POSITION: [4, 6, -1.6, 8, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.destroy, g.anni, g.halfrecoil, g.lessreload, g.basic]),
          TYPE: ["bullet"],
          AUTOFIRE: true
        }
      },
      {
        POSITION: [4, 6, -1.6, 8, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.destroy, g.anni, g.halfrecoil, g.lessreload, g.basic]),
          TYPE: ["bullet"],
          AUTOFIRE: true
        }
      },
      {
        POSITION: [4, 6, -1.6, 8, 0, 300, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.destroy, g.anni, g.halfrecoil, g.lessreload, g.basic]),
          TYPE: ["bullet"],
          AUTOFIRE: true
        }
      },
      {
        POSITION: [11, 7, 0.6, 0, 0, 30, 0],
        PROPERTIES: {
          TYPE: "swarm",
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
          STAT_CALCULATOR: gunCalcNames.swarm,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true
        }
      },
      {
        POSITION: [11, 7, 0.6, 0, 0, 90, 0],
        PROPERTIES: {
          TYPE: "swarm",
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
          STAT_CALCULATOR: gunCalcNames.swarm,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true
        }
      },
      {
        POSITION: [11, 7, 0.6, 0, 0, 150, 0],
        PROPERTIES: {
          TYPE: "swarm",
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
          STAT_CALCULATOR: gunCalcNames.swarm,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true
        }
      },
      {
        POSITION: [11, 7, 0.6, 0, 0, 210, 0],
        PROPERTIES: {
          TYPE: "swarm",
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
          STAT_CALCULATOR: gunCalcNames.swarm,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true
        }
      },
      {
        POSITION: [11, 7, 0.6, 0, 0, 270, 0],
        PROPERTIES: {
          TYPE: "swarm",
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
          STAT_CALCULATOR: gunCalcNames.swarm,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true
        }
      },
      {
        POSITION: [11, 7, 0.6, 0, 0, 330, 0],
        PROPERTIES: {
          TYPE: "swarm",
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
          STAT_CALCULATOR: gunCalcNames.swarm,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true
        }
      },
    ],
  }
  exports.rogueEmpressPillbox = {
    PARENT: ["unsetTrap"],
    LABEL: "Rogue Empress Pillbox",
    BODY: {
      SPEED: 1,
      DENSITY: 5,
    },
    DIE_AT_RANGE: false,
    TURRETS: [{
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: "legionaryTwin",
    }, ],
  }
  exports.assemblerDotRE = {
    LABEL: '',
    SHAPE: -4,
    COLOR: 16
  };
  exports.assemblerTrapRE = {
    PARENT: ['setTrap'],
    LABEL: "Assembler Trap",
    BODY: {
      SPEED: 0.7,
      ACCEL: 0.75
    },
    TURRETS: [
      {
        /**        SIZE X  Y  ANGLE ARC */
        POSITION: [4, 0, 0, 0,    360, 1],
        TYPE: 'assemblerDotRE'
      }
    ],
    HITS_OWN_TYPE: 'assembler'
  };
  exports.assemblerturret = {
    PARENT: ['genericTank'],
    DANGER: 7,
    LABEL: 'Assembler',
    STAT_NAMES: statnames.trap,
    BODY: {
      FOV: 2 * base.FOV,
      BULLET_SPEED: 1.1 * base.BULLET_SPEED,
    },
    AUTOFIRE: true,
    GUNS: [
      {
        POSITION: [18, 12, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [2, 12, 1.1, 18, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.block]),
          TYPE: 'assemblerTrapRE',
          MAX_CHILDREN: 8
        }
      }
    ],
    TURRETS: [
      {
        /**        SIZE X   Y  ANGLE ARC */
        POSITION: [2.5, 14, 0, 0,    360, 1],
        TYPE: 'assemblerDot'
      }
    ]
  };
  exports.rogueEmpressTopBody = {
    PARENT: ["genericTank"],
    LABEL: "Rogue Empress Top Body",
    SIZE: 100,
    COLOR: 17,
    MAX_CHILDREN: 5,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SHAPE: 3,
    TURRETS: [],
    CONTROLLERS: [
      ["spin", {
        speed: 0.1,
      }]
    ],
    GUNS: [{
      POSITION: [5, 14, 1.6, 6, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.destroy, g.veryfast, g.mini, {
          maxSpeed: 3
        }]),
        TYPE: ["legionaryPillbox", {
          AUTOFIRE: true,
        }],
        STAT_CALCULATOR: gunCalcNames.trap,
      },
    },
      {
        POSITION: [5, 14, 1.6, 6, 0, -60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.destroy, g.veryfast, g.mini, {
            maxSpeed: 3
          }]),
          TYPE: ["legionaryPillbox", {
            AUTOFIRE: true,
          }],
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [5, 14, 1.6, 6, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.destroy, g.veryfast, g.mini, {
            maxSpeed: 3
          }]),
          TYPE: ["legionaryPillbox", {
            AUTOFIRE: true,
          }],
          STAT_CALCULATOR: gunCalcNames.trap,
        },
      },
      {
        POSITION: [5, 8, 1.6, 9, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([{"reload":60,"shudder":0.1,"size":0.7,"damage":0.75,"speed":3,"spray":0.1},{"reload":0.3,"size":1.125,"health":0.4,"damage":0.345,"pen":0.4,"density":0.8},{"shudder":2,"health":0.4,"damage":0.4,"pen":1.2,"range":0.75,"spray":2},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"SIZE":45}]),
          TYPE: ["alviss", {
            INDEPENDENT: true,
          }],
        },
      },
      {
        POSITION: [5, 8, 1.6, 9, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([{"reload":60,"shudder":0.1,"size":0.7,"damage":0.75,"speed":3,"spray":0.1},{"reload":0.3,"size":1.125,"health":0.4,"damage":0.345,"pen":0.4,"density":0.8},{"shudder":2,"health":0.4,"damage":0.4,"pen":1.2,"range":0.75,"spray":2},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"SIZE":45}]),
          TYPE: ["tyr", {
            INDEPENDENT: true,
          }],
        },
      },
      {
        POSITION: [5, 8, 1.6, 9, 0, 360, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([{"reload":60,"shudder":0.1,"size":0.7,"damage":0.75,"speed":3,"spray":0.1},{"reload":0.3,"size":1.125,"health":0.4,"damage":0.345,"pen":0.4,"density":0.8},{"shudder":2,"health":0.4,"damage":0.4,"pen":1.2,"range":0.75,"spray":2},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"SIZE":45}]),
          TYPE: ["fiolnir", {
            INDEPENDENT: true,
          }],
        },
      },
      {
        POSITION: [5, 8, 1.6, 9, 0, 120, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([{"reload":60,"shudder":0.1,"size":0.7,"damage":0.75,"speed":3,"spray":0.1},{"reload":0.3,"size":1.125,"health":0.4,"damage":0.345,"pen":0.4,"density":0.8},{"shudder":2,"health":0.4,"damage":0.4,"pen":1.2,"range":0.75,"spray":2},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"SIZE":28}]),
          TYPE: ["rogueArmada", {
            INDEPENDENT: true,
          }],
        },
      },
      {
        POSITION: [5, 8, 1.6, 9, 0, 240, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([{"reload":60,"shudder":0.1,"size":0.7,"damage":0.75,"speed":3,"spray":0.1},{"reload":0.3,"size":1.125,"health":0.4,"damage":0.345,"pen":0.4,"density":0.8},{"shudder":2,"health":0.4,"damage":0.4,"pen":1.2,"range":0.75,"spray":2},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"reload":1.333},{"reload":1.5},{"reload":1.5},{"reload":2},{"reload":1.5},{"SIZE":28}]),
          TYPE: ["roguePalisade", {
            INDEPENDENT: true,
          }],
        },
      },
    ],
  }
  for (let i = 0; i < 3; i++) {
    exports.rogueEmpressTopBody.TURRETS.push({
      POSITION: [16, 12, 0, 360 / 3 * (i + 0.5), 180, 0],
      TYPE: ["assemblerturret", {
      }],
    }, )
  }
  exports.rogueWarrior = {
    PARENT: ["genericTank"],
    LABEL: "Rogue Warrior",
    COLOR: 18,
    CONTROLLERS: [
      ["spin", {
        independent: true,
      }]
    ],
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    GUNS: [],
    TURRETS: [],
  };
  for (let i = 0; i < 3; i++) {
    exports.rogueWarrior.GUNS.push({
      POSITION: [17, 8, 1, 0, 0, 120 * i, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.sniper, g.doublereload]),
        TYPE: "bullet",
      },
    }, {
      POSITION: [13, 8, 1, 0, 0, 120 * i + 60, 0],
    }, {
      POSITION: [4, 8, 1.7, 13, 0, 120 * i + 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.doublereload, ]),
        TYPE: "trap",
        STAT_CALCULATOR: gunCalcNames.trap,
      },
    }, )
    exports.rogueWarrior.TURRETS.push({
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: ["auto4gun"]
    }, )
  };
  exports.rogueEmpressBase = {
    PARENT: ["genericTank"],
    LABEL: "Rogue Empress Base",
    FACING_TYPE: "autospin",
    DANGER: 4,
    SHAPE: 12,
    COLOR: 17,
    SIZE: 150,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    BROADCAST_MESSAGE: "The Rogue Empress Has Fallen!",
    BODY: {
      SPEED: base.SPEED * 0.005,
    },
    TURRETS: [],
  }
  for (let i = 0; i < 12; i++) {
    exports.rogueEmpressBase.TURRETS.push({
      POSITION: [5, 8.5, 0, 360 / 12 * (i + 1), 30, 0],
      TYPE: ["baseTrapTurret", {
        INDEPENDENT: true,
      }],
    }, )
  }
  exports.rogueEmpress = {
    PARENT: ["eternal"],
    LABEL: "Rogue Empress (by Umbra)",
    AI: {
      STRAFE: true,
    },
    NAME: "Supernova",
    FACING_TYPE: "autospin",
    DANGER: 50, //How dangerous it is according to AI
    SHAPE: 12,
    COLOR: 17,
    SIZE: 150,
    VALUE: 1e9,
    SKILL_CAP: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    SKILL: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    BROADCAST_MESSAGE: "The Rogue Empress Has Fallen!",
    BODY: {
      SPEED: base.SPEED * 0.005,
      HEALTH: base.HEALTH * 1.5,
    },
    TURRETS: [{
      POSITION: [15.5, 0, 0, 0, 360, 1],
      TYPE: ["rogueEmpressLowerBody"],
    },
      {
        POSITION: [11, 0, 0, 0, 360, 1],
        TYPE: ["rogueEmpressBottomBody"],
      },
      {
        POSITION: [6.5, 0, 0, 0, 360, 1],
        TYPE: ["rogueEmpressMiddleBody"],
      },
      {
        POSITION: [2, 0, 0, 0, 360, 1],
        TYPE: ["rogueEmpressTopBody"],
      },
      {
        POSITION: [0.6, 0, 0, 0, 360, 1],
        TYPE: ["rogueWarrior"],
      },
    ],
  };
  for (let i = 0; i < 12; i++) {
    exports.rogueEmpress.TURRETS.push({
      POSITION: [5, 8.5, 0, 360 / 12 * (i + 1), 30, 0],
      TYPE: ["baseTrapTurret", {
        INDEPENDENT: true,
      }],
    }, )
  }
  exports.dumBoosterMinion = {
    PARENT: ["minion"],
    LABEL: "anti-braincell rocket",
    BODY: {
        ACCELERATION: base.ACCEL * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                    g.minion,
                ]),
                TYPE: "bullet",
                LABEL: "Front",
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                    g.minion,
                ]),
                TYPE: "bullet",
                LABEL: "Front",
            },
        },
        {
            POSITION: [13, 8, 1, 0, -1, 140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [13, 8, 1, 0, 1, 220, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "dumStarHat",
        },
    ],
};
exports.dumStarHat = {
    PARENT: ["genericTank"],
    SHAPE: -5,
};
exports.dumBoss = {
    PARENT: ["miniboss"],
    LABEL: "braincell killer (by 𝙳\\\\ʍƃᗡᗡɐdO∀#4940)",
    COLOR: "#e1e6a1",
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    VALUE: 5e5,
    SHAPE: -6,
    SIZE: 25,
    BODY: {
        FOV: 1,
        HEALTH: 900,
        SHIELD: 4,
        REGEN: base.REGEN * 0.05,
        SPEED: 1.75,
        DAMAGE: 4,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [32, 4, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [5, 4, -2, 8, 0, 0, 0],
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [32, 4, 1, 0, 0, 120, 0],
        },
        {
            POSITION: [5, 4, -2, 8, 0, 120, 0],
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [32, 4, 1, 0, 0, 240, 0],
        },
        {
            POSITION: [5, 4, -2, 8, 0, 240, 0],
        },
    ],
    TURRETS: [
        {
            POSITION: [9, 32, 0, 0, 360, 1],
            TYPE: "dumBossLayer2",
        },
        {
            POSITION: [9, 32, 0, 120, 360, 1],
            TYPE: "dumBossLayer2",
        },
        {
            POSITION: [9, 32, 0, 240, 360, 1],
            TYPE: "dumBossLayer2",
        },
        {
            POSITION: [14, 0, 0, 0, 360, 1],
            TYPE: "dumBossLayer2Type2",
        },
    ],
};
for(let i = 0; i < 6; i++) {
    exports.dumBoss.GUNS.push(
        {
            POSITION: [4, 6, 1.7, -12, 0, 360/6*i+30+180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: "dumBoosterMinion",
                STAT_CALCULATOR: gunCalcNames.drone,
                MAX_CHILDREN: 2,
                AUTOFIRE: true,
            },
        },
    )
};
exports.dumBossLayer2 = {
    PARENT: ["genericTank"],
    SHAPE: -3,
    COLOR: "#faffb5",
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [38, 4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, { reload: 6, shudder: 0.0001, damage: 1.25, pen: 1, speed: 2, maxSpeed: 2, density: 2, spray: 0.001, resist: 0.5 },]),
                TYPE: ["rocketeerMissile", {COLOR: "#ff0000"}],
            },
        },
        {
            POSITION: [30, 6, -2, 0, 0, 0, 0],
        },
        {
            POSITION: [8, 5.5, 1, 0, 0, 60, 0],
        },
        {
            POSITION: [2, 5.5, 1.7, 8, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.destroy, g.doublereload, g.doublereload, g.doublereload]),
                TYPE: "unsetTrap",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [8, 5.5, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [2, 5.5, 1.7, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.destroy, g.doublereload, g.doublereload, g.doublereload]),
                TYPE: "unsetTrap",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [8, 5.5, 1, 0, 0, 300, 0],
        },
        {
            POSITION: [2, 5.5, 1.7, 8, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.pound, g.destroy, g.doublereload, g.doublereload, g.doublereload]),
                TYPE: "unsetTrap",
                AUTOFIRE: true,
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [9, 14, 0, 0, 360, 1],
            TYPE: "genericTank",
        },
        {
            POSITION: [9, 14, 0, 120, 360, 1],
            TYPE: "genericTank",
        },
        {
            POSITION: [9, 14, 0, 240, 360, 1],
            TYPE: "genericTank",
        },
    ],
};
exports.dumBossLayer2Type2 = {
    PARENT: ["genericTank"],
    CONTROLLERS: [["spin", { independent: true, speed: 0.02 }]],
    SHAPE: 4,
    GUNS: [],
    HAS_NO_RECOIL: true,
    TURRETS: [
        {
            POSITION: [4, 10, 0, 45, 360, 1],
            TYPE: "autoTurret",
        },
        {
            POSITION: [4, 10, 0,135, 360, 1],
            TYPE: "autoTurret",
        },
        {
            POSITION: [4, 10, 0, 225, 360, 1],
            TYPE: "autoTurret",
        },
        {
            POSITION: [4, 10, 0, 315, 360, 1],
            TYPE: "autoTurret",
        },
        {
            POSITION: [12, 0, 0, 0, 360, 1],
            TYPE: "dumBlockTurret",
        },
    ],
};
exports.dumBlockTurret = {
    PARENT: ["genericTank"],
    LABEL: "Spike Launcher Turret",
    BODY: {
        FOV: 0.8,
    },
    COLOR: 16,
    GUNS: [
        {
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [3, 14, 1, 15.5, 0, 0, 0],
        },
        {
            POSITION: [3, 14, 0, 15.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.destroy, g.doublereload]),
                TYPE: "dumPillbox",
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [4, 14, 1, 8, 0, 0, 0],
        },
    ],
    TURRETS: [],
};
exports.dumPillbox = {
    LABEL: "Spike",
    PARENT: ["trap"],
    SHAPE: -4,
    MOTION_TYPE: "motor",
    CONTROLLERS: ["goToMasterTarget", "nearestDifferentMaster"],
    INDEPENDENT: true,
    BODY: {
        SPEED: 4,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [
        {
            POSITION: [12, 0, 0, 0, 360, 1],
            TYPE: "dumPillboxTurretTurret",
        },
        {
            POSITION: [12, 0, 0, 0, 360, 1],
            TYPE: "dumSpawnerTurret",
        },
    ],
};
exports.dumPillboxTurretTurret = {
    PARENT: ["genericTank"],
    CONTROLLERS: [["spin", { independent: true, speed: 0.2 }]],
    GUNS: [
        {
            POSITION: [60, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [60, 7, 1, 0, 0, 90, 0],
        },
        {
            POSITION: [60, 7, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [60, 7, 1, 0, 0, 270, 0],
        },
    ],
    TURRETS: [
        {
            POSITION: [7, 60, 0, 0, 360, 1],
            TYPE: "dumPillboxTurret",
        },
        {
            POSITION: [7, 60, 0, 90, 360, 1],
            TYPE: "dumPillboxTurret",
        },
        {
            POSITION: [7, 60, 0, 180, 360, 1],
            TYPE: "dumPillboxTurret",
        },
        {
            POSITION: [7, 60, 0, 270, 360, 1],
            TYPE: "dumPillboxTurret",
        },
    ],
}
exports.dumPillboxTurret = {
    PARENT: ["genericTank"],
    CONTROLLERS: [["spin", { independent: true, speed: 0.4 }]],
    GUNS: [],
};
for(let i = 0; i < 8; i++) {
    exports.dumPillboxTurret.GUNS.push(
        {
            POSITION: [85, 15, 0.01, 0, 0, 360/8*i, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, speed: 0.1, maxSpeed: 0.1, range: 0.1 }]),
              TYPE: ["bullet", { ALPHA: 0 }],
              AUTOFIRE: true,
            },
        },
        {
            POSITION: [65, 15, 0.01, 0, 0, 360/8*i, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, speed: 0.1, maxSpeed: 0.1, range: 0.1 }]),
              TYPE: ["bullet", { ALPHA: 0 }],
              AUTOFIRE: true,
            },
        },
        {
            POSITION: [45, 15, 0.01, 0, 0, 360/8*i, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, speed: 0.1, maxSpeed: 0.1, range: 0.1 }]),
              TYPE: ["bullet", { ALPHA: 0 }],
              AUTOFIRE: true,
            },
        },
        {
            POSITION: [25, 15, 0.01, 0, 0, 360/8*i, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, { reload: 0.4, speed: 0.1, maxSpeed: 0.1, range: 0.1 }]),
              TYPE: ["bullet", { ALPHA: 0 }],
              AUTOFIRE: true,
            },
        },
        {
            POSITION: [0, 15, 1, 0, 0, 360/8*i, 999999999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.pound, g.fast]),
                TYPE: ["dumShrapnel", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true
            },
        },
        {
            POSITION: [90, 15, 0.0001, 0, 0, 360/8*i, 0],
        },
    )
};
exports.dumShrapnel = {
    PARENT: ["bullet"],
    LABEL: "Shrapnel",
    COLOR: 16,
    SHAPE: "M -3 0.5 L 9 -0 L -3 -0.5 L -3 0.5",
};
exports.dumSpawnerTurret = {
    PARENT: ["genericTank"],
    MAX_CHILDREN: 4,
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1, 15.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.destroy, g.veryfast, {size: 2.5}]),
                TYPE: "minion",
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [12, 14, 1, 0, 0, 0, 0],
        },
    ],
};
exports.twilightBossBooster = {
    PARENT: ["bullet"],
    TYPE: "bullet",  
    BODY: {
       ACCELERATION: base.ACCEL * 3,
       SPEED: base.SPEED * 2,
       HEALTH: base.HEALTH * 1.1,
       DAMAGE: base.DAMAGE * 1.3,
       PENETRATION: base.PENETRATION * 4,
       SHIELD: base.SHIELD * 0,
       REGEN: base.REGEN * 0,
       DENSITY: base.DENSITY * 0.3,
    },
    GUNS: [ {
          POSITION: [ 18, 8, 1, 0, 0, -150, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
             TYPE: "bullet",
             LABEL: 'gunClacNames.thruster',
          }, }, {
          POSITION: [ 18, 8, 1, 0, 0, 150, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
             TYPE: "bullet",
             LABEL: 'gunClacNames.thruster',
          }, }, {
          POSITION: [ 20, 8, 1, 0, 0, 0, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
             TYPE: "bullet",
             LABEL: 'Front',
          }, }, 
      ],
 };
    exports.twilightBossTwinMinion = {
    PARENT: ["minion"],
    LABEL: '',
    TYPE: 'minion',
    SHAPE: 0,
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,
    DAMAGE_EFFECTS: false,
    BODY: {
       ACCELERATION: base.ACCEL * 0.9,
       SPEED: base.SPEED * 1.4,
       HEALTH: base.HEALTH * 0.875,
       DAMAGE: base.DAMAGE,
       PENETRATION: base.PENETRATION * 1.8,
       SHIELD: base.SHIELD * 0,
       REGEN: base.REGEN * 0,
       DENSITY: base.DENSITY * 0.7,
    },
    GUNS: [ {
          POSITION: [ 18, 8, 1, 0, 5.5, 0, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
             TYPE: "bullet",
             LABEL: 'Twin Minion',
          }, }, {
          POSITION: [ 18, 8, 1, 0, -5.5, 0, 0.5, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
             TYPE: "bullet",
             LABEL: 'Twin Minion',
          }, }, 
      ],
 };
     exports.twilightBossLayer5 = {
    PARENT: ["genericTank"],
    LABEL: '',
    SHAPE: 5,
    SIZE: 45,
    CONTROLLERS: [["spin", { independent: true, speed: -0.005 }]],    
    COLOR: '#dab3ff',    
    MAX_CHILDREN: 50,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],     
    GUNS: [ {
          POSITION: [ 12, 7, -2, 0, 0, -35, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.battle, g.power]),
             TYPE: "autoswarm",
          }, }, {
          POSITION: [ 12, 7, -2, 0, 0, -107.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.battle, g.power]),
             TYPE: "autoswarm",
          }, }, {
          POSITION: [ 12, 7, -2, 0, 0, -179.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.battle, g.power]),
             TYPE: "autoswarm",
          }, }, {
          POSITION: [ 12, 7, -2, 0, 0, 108, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.battle, g.power]),
             TYPE: "autoswarm",
          }, }, {
          POSITION: [ 12, 7, -2, 0, 0, 36, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.battle, g.power]),
             TYPE: "autoswarm",
          }, }, 
      ],
 };
    
    exports.twilightBossLayer4 = {
    PARENT: ["genericTank"],
    LABEL: '4',
    SHAPE: 7,
    SIZE: 45,
    CONTROLLERS: [["spin", { independent: true, speed: 0.005 }]],    
    COLOR: '#dab3ff',    
    MAX_CHILDREN: 21,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9], 
    GUNS: [ {
          POSITION: [ 12, 4, 2.25, 0, 0, -25.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.overdrive]),
             TYPE: "turretedDrone",
          }, }, {
          POSITION: [ 12, 4, 2.25, 0, 0, -77, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.overdrive]),
             TYPE: "turretedDrone",
          }, }, {
          POSITION: [ 12, 4, 2.25, 0, 0, -128.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.overdrive]),
             TYPE: "turretedDrone",
          }, }, {
          POSITION: [ 12, 4, 2.25, 0, 0, -179.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.overdrive]),
             TYPE: "turretedDrone",
          }, }, {
          POSITION: [ 12, 4, 2.25, 0, 0, 129, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.overdrive]),
             TYPE: "turretedDrone",
          }, }, {
          POSITION: [ 12, 4, 2.25, 0, 0, 78, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.overdrive]),
             TYPE: "turretedDrone",
          }, }, {
          POSITION: [ 12, 4, 2.25, 0, 0, 26.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.overdrive]),
             TYPE: "turretedDrone",
          }, }, 
      ],
 };
    exports.twilightBossLayer3 = {
    PARENT: ["genericTank"],
    LABEL: '3',
    SHAPE: 9,
    CONTROLLERS: [["spin", { independent: true, speed: -0.005 }]],    
    COLOR: '#dab3ff',    
    SIZE: 45,
    MAX_CHILDREN: 18,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9], 
    GUNS: [ {
          POSITION: [ 12, 7, 1, 0, 0, -19, 0, ],
          }, {
          POSITION: [ 12, 7, 1, 0, 0, -60, 0, ],
          }, {
          POSITION: [ 12, 7, 1, 0, 0, -100, 0, ],
          }, {
          POSITION: [ 12, 7, 1, 0, 0, -139.5, 0, ],
          }, {
          POSITION: [ 12, 7, 1, 0, 0, 180, 0, ],
          }, {
          POSITION: [ 12, 7, 1, 0, 0, 140.5, 0, ],
          }, {
          POSITION: [ 12, 7, 1, 0, 0, 99.5, 0, ],
          }, {
          POSITION: [ 12, 7, 1, 0, 0, 60.5, 0, ],
          }, {
          POSITION: [ 12, 7, 1, 0, 0, 20, 0, ],
          }, {
          POSITION: [ 2, 7, 1, 15.5, 0, -18.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.factory, g.power]),
             TYPE: "twilightBossTwinMinion",
          }, }, {
          POSITION: [ 2, 7, 1, 15.5, 0, -59.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.factory, g.power]),
             TYPE: "twilightBossTwinMinion",
          }, }, {
          POSITION: [ 2, 7, 1, 15.5, 0, -100, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.factory, g.power]),
             TYPE: "twilightBossTwinMinion",
          }, }, {
          POSITION: [ 2, 7, 1, 15.5, 0, -138.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.factory, g.power]),
             TYPE: "twilightBossTwinMinion",
          }, }, {
          POSITION: [ 2, 7, 1, 15.5, 0, -180, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.factory, g.power]),
             TYPE: "twilightBossTwinMinion",
          }, }, {
          POSITION: [ 2, 7, 1, 15.5, 0, 142, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.factory, g.power]),
             TYPE: "twilightBossTwinMinion",
          }, }, {
          POSITION: [ 2, 7, 1, 15.5, 0, 99.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.factory, g.power]),
             TYPE: "twilightBossTwinMinion",
          }, }, {
          POSITION: [ 2, 7, 1, 15.5, 0, 61, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.factory, g.power]),
             TYPE: "twilightBossTwinMinion",
          }, }, {
          POSITION: [ 2, 7, 1, 15.5, 0, 20, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.factory, g.power]),
             TYPE: "twilightBossTwinMinion",
          }, }, {
          POSITION: [ 5, 7, 1, 10.5, 0, -18.5, 0, ],
          }, {
          POSITION: [ 5, 7, 1, 10.5, 0, -59.5, 0, ],
          }, {
          POSITION: [ 5, 7, 1, 10.5, 0, -100, 0, ],
          }, {
          POSITION: [ 5, 7, 1, 10.5, 0, -138.5, 0, ],
          }, {
          POSITION: [ 5, 7, 1, 10.5, 0, 180, 0, ],
          }, {
          POSITION: [ 5, 7, 1, 10.5, 0, 142, 0, ],
          }, {
          POSITION: [ 5, 7, 1, 10.5, 0, 99.5, 0, ],
          }, {
          POSITION: [ 5, 7, 1, 10.5, 0, 61, 0, ],
          }, {
          POSITION: [ 5, 7, 1, 10.5, 0, 19.5, 0, ],
          }, 
      ],
 };
 
 
    exports.twilightBossLayer2 = {
    PARENT: ["genericTank"],
    LABEL: '2',
    CONTROLLERS: [["spin", { independent: true, speed: 0.005 }]],    
    SHAPE: 11,
    COLOR: '#dab3ff',
    SIZE: 50,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],    
    GUNS: [ {
          POSITION: [ 14, 5, 1.25, 0, 0, -15, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.single]),
             TYPE: "twilightBossBooster",
          }, }, {
          POSITION: [ 14, 5, 1.25, 0, 0, -49, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.single]),
             TYPE: "twilightBossBooster",
          }, }, {
          POSITION: [ 14, 5, 1.25, 0, 0, -81.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.single]),
             TYPE: "twilightBossBooster",
          }, }, {
          POSITION: [ 14, 5, 1.25, 0, 0, -115.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.single]),
             TYPE: "twilightBossBooster",
          }, }, {
          POSITION: [ 14, 5, 1.25, 0, 0, -148.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.single]),
             TYPE: "twilightBossBooster",
          }, }, {
          POSITION: [ 14, 5, 1.25, 0, 0, 179.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.single]),
             TYPE: "twilightBossBooster",
          }, }, {
          POSITION: [ 14, 5, 1.25, 0, 0, 146.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.single]),
             TYPE: "twilightBossBooster",
          }, }, {
          POSITION: [ 14, 5, 1.25, 0, 0, 115, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.single]),
             TYPE: "twilightBossBooster",
          }, }, {
          POSITION: [ 14, 5, 1.25, 0, 0, 81.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.single]),
             TYPE: "twilightBossBooster",
          }, }, {
          POSITION: [ 14, 5, 1.25, 0, 0, 49, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.single]),
             TYPE: "twilightBossBooster",
          }, }, {
          POSITION: [ 14, 5, 1.25, 0, 0, 17, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.single]),
             TYPE: "twilightBossBooster",
          }, }, {
          POSITION: [ 1, 5, 1.25, 13, 0, -15, 0, ],
          }, {
          POSITION: [ 1, 5, 1.25, 13, 0, -49, 0, ],
          }, {
          POSITION: [ 1, 5, 1.25, 13, 0, -81.5, 0, ],
          }, {
          POSITION: [ 1, 5, 1.25, 13, 0, -115, 0, ],
          }, {
          POSITION: [ 1, 5, 1.25, 13, 0, -148, 0, ],
          }, {
          POSITION: [ 1, 5, 1.25, 13, 0, 180, 0, ],
          }, {
          POSITION: [ 1, 5, 1.25, 13, 0, 146.5, 0, ],
          }, {
          POSITION: [ 1, 5, 1.25, 13, 0, 115, 0, ],
          }, {
          POSITION: [ 1, 5, 1.25, 13, 0, 81, 0, ],
          }, {
          POSITION: [ 1, 5, 1.25, 13, 0, 48.5, 0, ],
          }, {
          POSITION: [ 1, 5, 1.25, 13, 0, 17, 0, ],
          }, {
          POSITION: [ 2, 2, 1, 10.5, 0, -15, 0, ],
          }, {
          POSITION: [ 2, 2, 1, 10.5, 0, -48.5, 0, ],
          }, {
          POSITION: [ 2, 2, 1, 10.5, 0, -81.5, 0, ],
          }, {
          POSITION: [ 2, 2, 1, 10.5, 0, -115.5, 0, ],
          }, {
          POSITION: [ 2, 2, 1, 10.5, 0, -148.5, 0, ],
          }, {
          POSITION: [ 2, 2, 1, 10.5, 0, 179.5, 0, ],
          }, {
          POSITION: [ 2, 2, 1, 10.5, 0, 146.5, 0, ],
          }, {
          POSITION: [ 2, 2, 1, 10.5, 0, 115, 0, ],
          }, {
          POSITION: [ 2, 2, 1, 10.5, 0, 81, 0, ],
          }, {
          POSITION: [ 2, 2, 1, 10.5, 0, 49, 0, ],
          }, {
          POSITION: [ 2, 2, 1, 10.5, 0, 17, 0, ],
          }, 
      ],
 };
    exports.twilightBoss = {
    PARENT: ["eternal"],
    LABEL: 'The Overseer of Bosses (by Twilight)',
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],      
    CONTROLLERS: [["spin", { independent: true, speed: -0.005 }]],    
    SHAPE: 13,
    SIZE: 150,
    COLOR: '#dab3ff',
    FACING_TYPE: "smoothToTarget",
    VALUE: 16e6,
    MAX_CHILDREN: 39,
    BODY: {
       ACCELERATION: base.ACCEL * 0.6,
       SPEED: base.SPEED * 0.5,
       HEALTH: 5400,
       DAMAGE: base.DAMAGE * 6.6,
       PENETRATION: base.PENETRATION * 7,
       SHIELD: base.SHIELD * 100.5,
       REGEN: base.REGEN * 2,
       FOV: base.FOV * 2.2,
       DENSITY: base.DENSITY * 40,
    },
    GUNS: [ {
          POSITION: [ 15, 4.8, 1, 0, 0, -15, 0, ],
          }, {
          POSITION: [ 15, 4.8, 1, 0, 0, -42, 0, ],
          }, {
          POSITION: [ 15, 4.8, 1, 0, 0, -69.5, 0, ],
          }, {
          POSITION: [ 15, 4.8, 1, 0, 0, -96.5, 0, ],
          }, {
          POSITION: [ 15, 4.8, 1, 0, 0, -125, 0, ],
          }, {
          POSITION: [ 15, 4.8, 1, 0, 0, -153.5, 0, ],
          }, {
          POSITION: [ 15, 4.8, 1, 0, 0, 179.5, 0, ],
          }, {
          POSITION: [ 15, 4.8, 1, 0, 0, 151.5, 0, ],
          }, {
          POSITION: [ 15, 4.8, 1, 0, 0, 123.5, 0, ],
          }, {
          POSITION: [ 15, 4.8, 1, 0, 0, 97, 0, ],
          }, {
          POSITION: [ 15, 4.8, 1, 0, 0, 69, 0, ],
          }, {
          POSITION: [ 15, 4.8, 1, 0, 0, 41.5, 0, ],
          }, {
          POSITION: [ 15, 4.8, 1, 0, 0, 13.5, 0, ],
          }, {
          POSITION: [ 3, 7, 1.5, 15, 0, -15, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]),
             TYPE: "trap",
          }, }, {
          POSITION: [ 3, 7, 1.5, 15, 0, -42, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]),
             TYPE: "trap",
             AUTOFIRE: true, 
          }, }, {
          POSITION: [ 3, 7, 1.5, 15, 0, -70, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]),
             TYPE: "trap",
          }, }, {
          POSITION: [ 3, 7, 1.5, 15, 0, -96.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]),
             TYPE: "trap",
          }, }, {
          POSITION: [ 3, 7, 1.5, 15, 0, -125, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]),
             TYPE: "trap",
          }, }, {
          POSITION: [ 3, 7, 1.5, 15, 0, -153, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]),
             TYPE: "trap",
          }, }, {
          POSITION: [ 3, 7, 1.5, 15, 0, -179.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]),
             TYPE: "trap",
          }, }, {
          POSITION: [ 3, 7, 1.5, 15, 0, 151, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]),
             TYPE: "trap",
          }, }, {
          POSITION: [ 3, 7, 1.5, 15, 0, 123, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]),
             TYPE: "trap",
          }, }, {
          POSITION: [ 3, 7, 1.5, 15, 0, 96.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]),
             TYPE: "trap",
          }, }, {
          POSITION: [ 3, 7, 1.5, 15, 0, 68, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]),
             TYPE: "trap",
          }, }, {
          POSITION: [ 3, 7, 1.5, 15, 0, 40.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]),
             TYPE: "trap",
          }, }, {
          POSITION: [ 3, 7, 1.5, 15, 0, 13.5, 0, ],
          PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.power, g.trap, g.single]),
             TYPE: "trap",
          }, }, 
      ],
        TURRETS: [
         {
             POSITION: [15.5, 0, 0, 0, 360, 1],
             TYPE: ["twilightBossLayer2"],
         },
         {
             POSITION: [11, 0, 0, 0, 360, 1],
             TYPE: ["twilightBossLayer3"],
         },
         {
             POSITION: [6.5, 0, 0, 0, 360, 1],
             TYPE: ["twilightBossLayer4"],
         },
        {
             POSITION: [2, 0, 0, 0, 360, 1],
             TYPE: ["twilightBossLayer5"],
         },
     ],
 };
 exports.basicsturret = {
    PARENT: ["genericTank"],
    CONTROLLERS: ["mapTargetToGoal"],
    HAS_NO_RECOIL: true,
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet",
        },},],
    DANGER: 0,
    INDEPENDENT: false,
};
exports.annisturret = {
    PARENT: ["annihilator"],
    CONTROLLERS: ["mapTargetToGoal"],
    HAS_NO_RECOIL: true,
    DANGER: 0,
    INDEPENDENT: false,
};
exports.pentasturret = {
    PARENT: ["pentaShot"],
    CONTROLLERS: ["mapTargetToGoal"],
    HAS_NO_RECOIL: true,
    DANGER: 0,
    INDEPENDENT: false,
};
exports.oversturret = {
    PARENT: ["overlord"],
    CONTROLLERS: ["mapTargetToGoal"],
    HAS_NO_RECOIL: true,
    DANGER: 0,
    INDEPENDENT: false,
};
exports.octosturret = {
    PARENT: ["octoTank"],
    CONTROLLERS: ["spin"],
    HAS_NO_RECOIL: true,
    DANGER: 0,
    INDEPENDENT: false,
};
exports.rangersturret = {
    PARENT: ["ranger"],
    CONTROLLERS: ["mapTargetToGoal"],
    HAS_NO_RECOIL: true,
    DANGER: 0,
    INDEPENDENT: false
};
exports.machinesturret = {
    PARENT: ["machineGunner"],
    CONTROLLERS: ["mapTargetToGoal"],
    HAS_NO_RECOIL: true,
    DANGER: 0,
    INDEPENDENT: false
};
exports.mothersturret = {
    PARENT: ["mothership"],
    CONTROLLERS: ["mapTargetToGoal"],
    HAS_NO_RECOIL: true,
    DANGER: 0,
    INDEPENDENT: false
};
exports.absolutechaos = {
    PARENT: ["genericTank"],
    HAS_NO_RECOIL: true,
    BODY: {
        FOV: 3,
    },
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet",
        },
    }, ],
    LABEL: "chaos (by forgor)",
    TURRETS: [ /*MIDDLE LAYER */ {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, 21, 0, 360],
            TYPE: ["basicsturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, -21, 0, 360],
            TYPE: ["basicsturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, 42, 0, 360],
            TYPE: ["annisturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, -42, 0, 360],
            TYPE: ["annisturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, 63, 0, 360],
            TYPE: ["basicsturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, -63, 0, 360],
            TYPE: ["basicsturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, 84, 0, 360],
            TYPE: ["annisturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, -84, 0, 360],
            TYPE: ["annisturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, 105, 0, 360],
            TYPE: ["basicsturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, -105, 0, 360],
            TYPE: ["basicsturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, 126, 0, 360],
            TYPE: ["pentasturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, -126, 0, 360],
            TYPE: ["pentasturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, 147, 0, 360],
            TYPE: ["oversturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, -147, 0, 360],
            TYPE: ["oversturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, 168, 0, 360],
            TYPE: ["octosturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, -168, 0, 360],
            TYPE: ["octosturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, 189, 0, 360],
            TYPE: ["rangersturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 0, -189, 0, 360],
            TYPE: ["rangersturret"]
        },
        /* FRONT LAYER*/
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, 21, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, -21, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, 42, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, -42, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, 63, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, -63, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, 84, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, -84, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, 105, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, -105, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, 126, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, -126, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, 147, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, -147, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, 168, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, -168, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, 189, 0, 360],
            TYPE: ["machinesturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 21, -189, 0, 360],
            TYPE: ["machinesturret"]
        },
        /*BACK LAYER*/
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [55, -63, 84, 0, 360],
            TYPE: ["mothersturret"]
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [55, -63, -84, 0, 360],
            TYPE: ["mothersturret"]
        },
    ],
};
exports.badDreadnoughtDrone = {
    PARENT: ["minion"],
    LABEL: "Dreadnought",
    BODY: {
      FOV: base.FOV * 1.2,
      HEALTH: base.HEALTH * 0.4,
      SHIELD: base.SHIELD * 0.4,
      DENSITY: base.DENSITY * 0.3,
    },
    TURRETS: [
      {
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [20, -4, 0, 0, 0, 0],
        TYPE: "genericEntity",
      },
    ],
    GUNS: [
      {
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm]),
          TYPE: "swarm",
          STAT_CALCULATOR: gunCalcNames.swarm,
        },
      },
      {
        POSITION: [6, 16, 1, 16, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.fake]),
          TYPE: "swarm",
          STAT_CALCULATOR: gunCalcNames.swarm,
        },
      },
      {
        POSITION: [1, 3, 1, 3, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.puregunner,
            g.machgun,
            g.thruster,
            [0.1, 3, 1, 1, 1, 1, 1, 1, 1, 0.075, 1, 2, 1],
          ]),
          TYPE: "bullet",
        },
      },
    ],
  };
  exports.ironclad = {
    PARENT: ["miniboss"],
    LABEL: "Ironclad",
    COLOR: 17,
    SHAPE: 3,
    SIZE: 27,
    VARIES_IN_SIZE: true,
    VALUE: 15e4,
    BODY: {
      FOV: 1.25,
      SPEED: 3,
      HEALTH: 150,
      DAMAGE: 2.5 * base.DAMAGE,
    },
    FACING_TYPE: "toTarget",
    GUNS: [
      {
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [4, 6, 0.6, 7, 9, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
          TYPE: exports.autoswarm,
          STAT_CALCULATOR: gunCalcNames.swarm,
        },
      },
      {
        POSITION: [4, 6, 0.6, 7, 3, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
          TYPE: exports.autoswarm,
          STAT_CALCULATOR: gunCalcNames.swarm,
        },
      },
      {
        POSITION: [4, 6, 0.6, 7, -3, 60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
          TYPE: exports.autoswarm,
          STAT_CALCULATOR: gunCalcNames.swarm,
        },
      },
      {
        POSITION: [4, 6, 0.6, 7, -9, 60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
          TYPE: exports.autoswarm,
          STAT_CALCULATOR: gunCalcNames.swarm,
        },
      },
      {
        POSITION: [4, 6, 0.6, 7, 9, -60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
          TYPE: exports.autoswarm,
          STAT_CALCULATOR: gunCalcNames.swarm,
        },
      },
      {
        POSITION: [4, 6, 0.6, 7, 3, -60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
          TYPE: exports.autoswarm,
          STAT_CALCULATOR: gunCalcNames.swarm,
        },
      },
      {
        POSITION: [4, 6, 0.6, 7, -3, -60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
          TYPE: exports.autoswarm,
          STAT_CALCULATOR: gunCalcNames.swarm,
        },
      },
      {
        POSITION: [4, 6, 0.6, 7, -9, -60, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
          TYPE: exports.autoswarm,
          STAT_CALCULATOR: gunCalcNames.swarm,
        },
      },
      {
        /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [4.5, 14, 1, 9.5, 0, 180, 0],
      },
      {
        POSITION: [2, 16, 1, 13, 0, 180, 0],
        PROPERTIES: {
          MAX_CHILDREN: 3,
          SHOOT_SETTINGS: combineStats([
            g.factory,
            g.babyfactory,
            [1, 1, 1, 0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          ]),
          TYPE: exports.badDreadnoughtDrone,
          STAT_CALCULATOR: gunCalcNames.drone,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
        },
      },
      {
        POSITION: [10.5, 16, 1, 0, 0, 180, 0],
      },
    ],
    TURRETS: [
      {
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [7, 5, 0, 0, 360, 1],
        TYPE: [
          "bigauto4gun",
          {
            INDEPENDENT: true,
            COLOR: 17,
          },
        ],
      },
      {
        POSITION: [5, 7, 4.5, 90, 360, 1],
        TYPE: [
          "autoTankGun",
          {
            INDEPENDENT: true,
            COLOR: 17,
          },
        ],
      },
      {
        POSITION: [5, 7, -4.5, 270, 360, 1],
        TYPE: [
         "autoTankGun",
          {
            INDEPENDENT: true,
            COLOR: 17,
          },
        ],
      },
    ],
  };
  exports.APSplus14gun = {
    PARENT: ["genericTank"],
    LABEL: 'Mecha Gun',
    BODY: {
        FOV: 1
    },
    COLOR: 16,
    GUNS: [{ /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [  9,     3.75,      1,      12,    4,     0,     0.5,  ], 
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.mecha, g.boss]),
        TYPE: "bullet",
    }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [  9,     3.75,      1,      12,    -4,     0,     0.75,  ], 
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.mecha, g.boss]),
        TYPE: "bullet",
    }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [  10.5,   3.75,      1,     12,    -2,     0,     0.25,  ], 
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.mecha, g.boss]),
        TYPE: "bullet",
    }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [  10.5,   3.75,      1,     12,    2,     0,     0,  ], 
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.mecha, g.boss]),
        TYPE: "bullet",
    }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [  9,    14,      1,      5,     0,     0,      0,   ], 
    }]
};
  exports.APS14gun = {
    PARENT: ["genericTank"],
    LABEL: 'Mecha Gun',
    BODY: {
        FOV: 1
    },
    COLOR: 16,
    GUNS: [{ /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [  9,     4,      1,      12,    3.75,     0,     1/3,  ], 
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.mecha, g.boss]),
        TYPE: "bullet",
    }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [  9,     4,      1,      12,    -3.75,     0,     2/3,  ], 
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.mecha, g.boss]),
        TYPE: "bullet",
    }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [  10.5,   4,      1,     12,    0,     0,     0,  ], 
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.mecha, g.boss]),
        TYPE: "bullet",
    }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [  9,    14,      1,      5,     0,     0,      0,   ], 
    }]
};
  exports.APS14 = {
    PARENT: ["APSbody"],
    LABEL: "APS-14",
    SHAPE: 0,
    COLOR: "#3EE0DC" /*"invertRed"*/,
    FACING_TYPE: 'toTarget',
    BODY: {
        SPEED: 1.3 * base.SPEED,
    },
    GUNS: [
        {
            POSITION: [14, 3, 4, -1.5, 3.75, 180, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([ g.basic, g.twin, g.puregunner, g.machgun, g.thruster, g.morereload, ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 4, -1.5, -3.75, 180, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([ g.basic, g.twin, g.puregunner, g.machgun, g.thruster, g.morereload, ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 4, 3, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([ g.basic, g.twin, g.puregunner, g.machgun, g.thruster, g.morereload, ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 3.5, 1, 0, 6.625, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 3.5, 1, 0, -6.625, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, -5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [21, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 0, 1 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 2 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0],
        },],
    TURRETS: [{
        POSITION: [9, 0, 12, 0, 90, 0],
        TYPE: "APS14gun",
    },{
        POSITION: [9, 0, -12, 0, 90, 0],
        TYPE:"APS14gun",
    }],
};

exports.APSplus14 = {
    PARENT: ["APSbody"],
    LABEL: "APS(+)-14",
    SHAPE: 0,
    SIZE: 60,
    COLOR: "#3EE0DC" /*"invertRed"*/,
    FACING_TYPE: 'toTarget',
    BODY: {
        SPEED: 1.2 * base.SPEED,
        HEALTH: 24 * base.HEALTH,
        DAMAGE: 4.5 * base.DAMAGE,
    },
    GUNS: [
        {
            POSITION: [14, 3, 4, -3, 5, 180, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun, g.thruster, g.morereload, ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 4, -3, -5, 180, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun, g.thruster, g.morereload, ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 4, 0, 2.5, 180, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun, g.thruster, g.morereload, ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 4, 0, -2.5, 180, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun, g.thruster, g.morereload, ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 4, 3, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun, g.thruster, g.morereload, ]),
                TYPE: "bullet",
            },
        },

 

{
        POSITION: [22, 2, 1, 0, 4.5, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.pellet, g.bore, g.boss]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [22, 2, 1, 0, -4.5, 0, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.pellet, g.bore, g.boss]),
            TYPE: "bullet"
        }
    }, 
        {
            POSITION: [12, 3.5, 1, 0, 6.625, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 3.5, 1, 0, -6.625, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, -5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.boss]),
                TYPE: "bullet",
            },
        },

        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [25, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [23, 8, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21, 8, 1, 0, 0, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.boss]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0],
        },],
    TURRETS: [{
        POSITION: [9, 0, 12, 0, 90, 0],
        TYPE: "APSplus14gun",
    },{
        POSITION: [9, 0, -12, 0, 90, 0],
        TYPE:"APSplus14gun",
        
    },
    {
        POSITION: [10, 0, 0, 0, 90, 1],
        TYPE:"revoceptionist",
        
    }],
};
exports.twinMinion = {
    PARENT: ["genericTank"],
    LABEL: "Minion",
    TYPE: "minion",
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: "hardWithBuffer",
    FACING_TYPE: "smoothToTarget",
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
        RECOIL_MULTIPLIER: 0.5
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        "nearestDifferentMaster",
        "mapAltToFire",
        "minion",
        "canRepel",
        "hangOutNearMaster",
    ],
    GUNS: [
        {
            POSITION: [17, 7, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
                WAIT_TO_CYCLE: true,
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 7, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
                WAIT_TO_CYCLE: true,
                TYPE: "bullet",
            },
        },
    ],
};
exports.outpost = {
    PARENT: ["genericTank"],
    LABEL: "Outpost",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
    },
    GUNS: [
        {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4.5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1.5, 13, 0.96, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 1,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: "twinMinion",
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11.5, 20, 0.70, 0, 0, 0, 0],
        },
    ],
};
let ulmgun = [];
for (let i = 0; i < 12; i++) {
    ulmgun.push({
        POSITION:[4, 10.5, 0, ((360/12)*i), 90, 0],
        TYPE: "antiTankMachineGunArm",
    },
    {
        POSITION:[3, 8, 0, (180/12)+((360/12)*i), 90, 1],
        TYPE: "outpost",
    },
    )
};
exports.UltimateMb = {
    PARENT: ["concordia"],
    SIZE:65,
    BODY: {FOV:1.1},

    TURRETS: [...ulmgun,
        {
            POSITION:[9, 0, 0, 0, 360, 1],
            TYPE: "trapperDominator",
        },
        {
            POSITION:[4, 0, 0, 0, 360, 1],
            TYPE: "octosturret",
        },
    ],
}
exports.developer.UPGRADES_TIER_0 = ["tanks", "bosses", "spectator", "levels", "teams", "eggGenerator", "testing", "addons","addons2"];
    exports.tanks.UPGRADES_TIER_0 = ["basic", "unavailable", "spectator", "dominators", "sanctuaries", "mothership", "baseProtector", "antiTankMachineGun", "arenaCloser"];
    exports.addons2.UPGRADES_TIER_0 = ["APS1plusplus","jups_Pentamond3","rogueEmpress","dumBoss","twilightBoss","absolutechaos","ironclad",
"APSplus14","UltimateMb"
];

        exports.unavailable.UPGRADES_TIER_0 = ["healer"];
        exports.dominators.UPGRADES_TIER_0 = ["destroyerDominator", "gunnerDominator", "trapperDominator"];
        exports.sanctuaries.UPGRADES_TIER_0 = ["sanctuaryTier1", "sanctuaryTier2", "sanctuaryTier3", "sanctuaryTier4", "sanctuaryTier5", "sanctuaryTier6"];

    exports.bosses.UPGRADES_TIER_0 = ["sentries", "elites", "mysticals", "nesters", "rogues", "rammers", "terrestrials", "celestials", "eternals", "devBosses"];
        exports.sentries.UPGRADES_TIER_0 = ["sentrySwarm", "sentryGun", "sentryTrap", "shinySentrySwarm", "shinySentryGun", "shinySentryTrap", "sentinelMinigun", "sentinelLauncher", "sentinelCrossbow"];
        exports.elites.UPGRADES_TIER_0 = ["eliteDestroyer", "eliteGunner", "eliteSprayer", "eliteBattleship", "eliteSpawner", "eliteTrapGuard", "eliteSpinner", "eliteSkimmer", "legionaryCrasher", "guardian", "defender", "sprayerLegion"];
        exports.mysticals.UPGRADES_TIER_0 = ["sorcerer", "summoner", "enchantress", "exorcistor", "shaman"];
        exports.nesters.UPGRADES_TIER_0 = ["nestKeeper", "nestWarden", "nestGuardian"];
        exports.rogues.UPGRADES_TIER_0 = ["roguePalisade", "rogueArmada", "alviss", "tyr", "fiolnir"];
	    exports.rammers.UPGRADES_TIER_0 = ["bob", "nemesis"];
        exports.terrestrials.UPGRADES_TIER_0 = ["ares", "gersemi", "ezekiel", "eris", "selene"];
        exports.celestials.UPGRADES_TIER_0 = ["paladin", "freyja", "zaphkiel", "nyx", "theia", "atlas", "rhea", "alviss", "tyr", "fiolnir"];
        exports.eternals.UPGRADES_TIER_0 = ["ragnarok", "kronos"];
        exports.devBosses.UPGRADES_TIER_0 = ["taureonBoss", "zenphiaBoss", "dogeiscutBoss", "trplnrBoss"];

    exports.testing.UPGRADES_TIER_0 = ["funTanks", "testingTanks"];
        exports.funTanks.UPGRADES_TIER_0 = ["florr_tank", "vanquisher", "armyOfOne", "godbasic", "maximumOverdrive", "mummifier", "auraBasic", "auraHealer", "weirdAutoBasic", "ghoster", "switcheroo", "tracker3", ["developer", "developer"]];
        exports.testingTanks.UPGRADES_TIER_0 = ["diamondShape", "rotatedTrap", "colorMan", "miscTest", "mmaTest", "vulnturrettest", "onTest", "alphaGunTest", "testLayeredBoss"];
