// Super Puzzle Fighter II Turbo screenshot
// This kata is inspired by the arcade puzzle game Super Puzzle Fighter II Turbo (seen above).
//
// In the game Super Puzzle Fighter II Turbo, the player controls pairs of blocks (referred to as "Gems") that drop into a pit-like playfield.
//
// 	In this kata, your objective is to write a function that, given a sequence of Gem pairs and movement instructions, will return the ending game state.
//
// 	Game Mechanics
// gems1
// The playfield is a matrix with 12 rows and 6 columns; it begins empty.
// 	Gems come in four different colors — red, blue, green, and yellow.
// 	Similar in style to other tile-matching video games, a pair of adjacent Gems will descend into the playfield. This pair can be moved left and right, and can be rotated clockwise and counter-clockwise. Once it lands onto an obstacle, the process repeats.
// 	If the pair lands on an obstacle, but one of the Gems has empty space below it, the pair will disjoint and the unsupported Gem will continue to descend until it lands onto an obstacle.
// 	In the image above (left), the green-blue Gem pair inside the white rectangular outline will disjoint, with the green Gem merging with the green Power Gem and the blue Gem landing on the yellow Gem, if allowed to drop straight down as is.
// 	Power Gems: Adjacent clusters of same-colored Gems in rectangular shapes, that are 2 x 2 or greater in width and height, will merge into one larger solid Gem, known as a Power Gem. In the image above (left), the larger blue Gem located at the bottom left is a 4 x 4 Power Gem. The green Gem just above it is a 2 x 3 Power Gem. In the image to the right, the green Gem that falls merges with the green Power Gem, transforming it into a 2 x 4 Power Gem.
// 	Each Gem pair descends from the Drop Alley, which is the top of the fourth column from the left, as shown above with the Gem pair inside the white dashed rectangle.
// 	Crash Gems are special Gems that, upon contact with a same-colored Gem, will destroy all connected Gems of the same color, including other Crash Gems of the same color. In the process, the Crash Gem will self-destruct.
// 	In the image above (left), a yellow Crash Gem (the yellow circle) is part of a descending Gem pair. If left to fall straight down as is, it will destroy all the connected yellow Gems, resulting in the image to the right. The blue Crash Gem remains until a blue Gem comes in contact with it.
// 	Rainbow Gems are a rare type of special Gem that destroy all Gems that match the color of the Gem it lands on, while self-destructing in the process. If it lands on the floor of the playfield, no other Gems will be destroyed.
// 	When rotating a Gem pair, the 2nd Gem will rotate around the 1st Gem. In the image above (left), the yellow Crash Gem will rotate around the red Gem. Note that a rotation may cause a shift in lateral position if a Gem pair is touching the left or right wall (to keep the Gems within the boundaries of the playfield).
// All movements for a Gem pair occur above the playfield before being dropped.
// 	There is only one descending Gem pair in play at any given time.
// 	In the image above (left), the red-yellow Gem pair (inside the dashed-rectangle) would appear after the green-blue Gem pair (inside the solid rectangle) has already settled.
// 	Power Gem Formation Priority
// gems4
// gems4a
// When a cluster of same-colored individual gems are set to form a Power Gem, but there is more than one possible configuration, priority goes to the potential Power Gem that is higher in elevation.
// 	In the first image above, after the green gems shatter, one of two possible Power Gems (that share resources) can be formed: a 2 x 2 block as shown in the image to the right, or a 2 x 2 block resting on the playfield floor. The Power Gem in the image to the right is the end result because it is higher in elevation.
// 	In the second image above, the individual red gems fall after the green gems (left image) have been cleared (middle image). The resulting Power Gem is shown on the right side, where the 2 x 3 forms due to its higher elevation.
//
// 	gems4b
// If two possible Power Gems with the same elevation can be formed, priority goes to the Power Gem that expands horizontally
// Above, a Rainbow Gem will land on the green gem (left), thereby destroying all green gems and allowing the individual red gems to fall (middle). Two possible Power Gems can form as a result, both having the same elevation. In this case, the result is the Power Gem on the right (as opposed to a 2 x 3 "vertical" Power Gem that occupies the 4th and 5th columns).
//
// gems3
// When a cluster of unmerged same-colored Gems drops and results in a merge, the individual Gems will combine before combining with Power Gems.
// 	In the image above (left), the green Crash Gem is about to eliminate the group of green Gems, allowing the 3 red Gems and 1 blue Gem to drop. The 3 red Gems will join the other 3 red Gems below, and form a 2 x 3 Power Gem before merging with the other 2 x 3 red Power Gem to its right, to finally become a 4 x 3 Power Gem. The result is the image to the right.
//
// 	gems2
// In the case where an existing Power Gem can expand by increasing vertically or horizontally, priority goes to horizontal growth.
// 	In the image above (left), a green Crash Gem is about to eliminate a cluster of green Gems, allowing the Gems above to drop and land on the remaining Gems below.
// 	Since priority goes to horizontal growth, the 2 x 2 red Power Gem will become a 3 x 2 Power Gem instead of a 2 x 3 Power Gem. The result is shown on the right.
//
// 	How Moves Work:
// 	At the start of a move, a Gem pair appears above the playfield.
// 	The pair falls, and each Gem in the pair land on another Gem or the playfield floor.
// 	All effects (eg. Power Gem formation, gem shattering due to Crash Gems or Rainbow Gems) initiated by any Gems will occur simultaneously.
// 	If any Gems are cleared (by Crash Gems or Rainbow Gems) in the process leaving some Gems suspended in air, all suspended Gems fall and land together.
// 	While step 4 makes an effect, repeat steps 3 and 4
// Below, the green Gem will combine with other adjacent ones to form a Power Gem, and at the same time the blue Crash Gem will shatter along with the two blue Gems below. The result is the middle frame, rather than the last frame.
//
// 	gems5
// Input
// Your function will receive a 2-D array/list. Each subarray has a length of 2 and consists of:
//
// 	a 2-character string representing a Gem pair
// a string of instructions for the Gem pair
// Each Gem is represented by the first letter of its color in uppercase — R, B, G, or Y.
// 	Crash Gems are represented by the first letter of its color in lowercase.
// 	A Rainbow Gem is represented as 0.
//
// Movement Instructions are as follows:
//
// 	L: move left
// R: move right
// A: rotate counter-clockwise
// B: rotate clockwise
// Output
// Your function will return the ending game state in the form of a string. The string should consist of all 12 rows joined by newline characters.
// 	If at any point in the game a stack of Gems goes above the top row, terminate the process and return the game state before the last move. This applies to Crash Gems and Rainbow Gems as well; their position is taken into account before their effect.
//
// 	Test Example
// let instructions = [
// 	['BR','LLL'],
// 	['BY','LL'],
// 	['BG','ALL'],
// 	['BY','BRR'],
// 	['RR','AR'],
// 	['GY','A'],
// 	['BB','AALLL'],
// 	['GR','A'],
// 	['RY','LL'],
// 	['GG','L'],
// 	['GY','BB'],
// 	['bR','ALLL'],
// 	['gy','AAL']
// ];
// let gameState = [
// 	'      ',
// 	'      ',
// 	'      ',
// 	'      ',
// 	'      ',
// 	'      ',
// 	'      ',
// 	'      ',
// 	'      ',
// 	'    R ',
// 	' R  YR',
// 	'RR  RB'
// ].join('\n');
//
// puzzleFighter(instructions) === gameState; //true
//
// /* STEP-BY-STEP MOVES SEQUENCE
//    (GAME STATE at end of each of the first 5 moves)
//
//  MOVE 1      MOVE 2      MOVE 3      MOVE 4      MOVE 5
// ║      ║    ║      ║    ║      ║    ║      ║    ║      ║
// ║      ║    ║      ║    ║      ║    ║      ║    ║      ║
// ║      ║    ║      ║    ║      ║    ║      ║    ║      ║
// ║      ║    ║      ║    ║      ║    ║      ║    ║      ║
// ║      ║    ║      ║    ║      ║    ║      ║    ║      ║
// ║      ║    ║      ║    ║      ║    ║      ║    ║      ║
// ║      ║    ║      ║    ║      ║    ║      ║    ║      ║
// ║      ║    ║      ║    ║      ║    ║      ║    ║      ║
// ║      ║    ║      ║    ║      ║    ║      ║    ║      ║
// ║      ║    ║      ║    ║ B    ║    ║ B    ║    ║ B    ║
// ║B     ║    ║BB    ║    ║BB    ║    ║BB    ║    ║BB  RR║
// ║R     ║    ║RY    ║    ║RYG   ║    ║RYG YB║    ║RYG YB║
// */
// Technical Details
// Input will always be valid.
// 	Full Test Suite: 10 fixed tests and 200 random tests
// The maximum number of moves in any given test is 100
// Use Python 3+ for the Python translation
// For JavaScript, most built-in prototypes are frozen, except Array and Function
// Special thanks goes out to @Blind4Basics for his contributions to this kata
//
// If you enjoyed this kata, be sure to check out my other katas.


//need help with debugging?
//uncomment the line below to see the game state for each Gem pair
seeStates = false;

/// ############################# helpers #############################
const angleToRad = (angle) => (Math.PI / 180) * angle;
class Vec2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	set(vec2) {
		this.x = vec2.x;
		this.y = vec2.y;
		return this;
	}
	add(vec2) {
		this.x += vec2.x;
		this.y += vec2.y;
		return this;
	}
	sub(vec2) {
		this.x -= vec2.x;
		this.y -= vec2.y;
		return this;
	}

	rotateOfVec2(vec2, rad) {
		return this.sub(vec2).rotate(rad).add(vec2);
	}
	rotate(rad) {
		const x = this.x;
		const y = this.y;
		const cos = Math.cos(rad);
		const sin = Math.sin(rad);
		this.x = cos * x + sin * y;
		this.y = cos * y - sin * x;
		return this;
	}
	round() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}
	hash() {
		return `${this.x}-${this.y}`;
	}

	clone() {
		return new this.constructor(this.x, this.y);
	}

	toObj() {
		return {x: this.x, y: this.y};
	}
	toArray() {
		return [this.x, this.y];
	}

	static fromObject(obj) {
		return new this(obj.x, obj.y);
	}
	static fromArray(array) {
		return new this(array[0], array[1]);
	}
}
const arrayDeleteItem = (array, item) => {
	const i = array.indexOf(item);
	if ( i < 0 )
		return false;

	array.splice(i, 1);
	return true;
}
/// ###################################################################

const GAME_WIDTH = 6;
const GAME_HEIGHT = 12;



const GEM_NORMAL  = 1;
const GEM_CRASH   = 2;
const GEM_RAINBOW = 3;

const GEM_COLOR_R = 1;
const GEM_COLOR_G = 2;
const GEM_COLOR_B = 3;
const GEM_COLOR_Y = 4;

const GEM_COLOR_MAP = [
	["R", GEM_COLOR_R,],
	["G", GEM_COLOR_G,],
	["B", GEM_COLOR_B,],
	["Y", GEM_COLOR_Y,],
];
const GEM_COLOR_FROM_CHAR_MAP = new Map(GEM_COLOR_MAP);
const GEM_CHAR_FROM_COLOR_MAP = new Map(GEM_COLOR_MAP.map(a => a.reverse()));

class GeometryBBox {
	constructor() {
		this.pos = new Vec2(0, 0);
		this._mins = new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
		this._maxs = new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
	}

	updateBBox() {
		this._mins.add(this.pos);
		this._maxs.add(this.pos);
		this.pos.x = 0;
		this.pos.y = 0;
		return this;
	}

	get mins() {
		return this._mins.clone().add(this.pos);
	}
	get maxs() {
		return this._maxs.clone().add(this.pos);
	}

	get width() {
		return this.maxs.x - this.mins.x + 1;
	}
	get height() {
		return this.maxs.y - this.mins.y + 1;
	}
	get square() {
		return this.width * this.height;
	}


	includesPoint(p) {
		return (
			this.mins.x <= p.x &&
			this.mins.y <= p.y &&
			this.maxs.x >= p.x &&
			this.maxs.y >= p.y
		);
	}
	intersectBBox(bbox, twoMode = true) {
		const p1 = bbox.mins.clone();
		const p2 = bbox.mins.clone();
		p2.x = bbox.maxs.x;

		const p3 = bbox.mins.clone();
		p3.y = bbox.maxs.y;
		const p4 = bbox.maxs.clone();

		return (
			this.includesPoint(p1) ||
			this.includesPoint(p2) ||
			this.includesPoint(p3) ||
			this.includesPoint(p4)
		) && (twoMode ? bbox.intersectBBox(this, false) : true);
	}
	includesBBox(bbox) {
		return (
			this.mins.x <= bbox.mins.x &&
			this.mins.y <= bbox.mins.y &&
			this.maxs.x >= bbox.maxs.x &&
			this.maxs.y >= bbox.maxs.y
		);
	}
}
class Gem extends GeometryBBox {
	constructor(type, color) {
		super();
		this._mins = new Vec2(0, 0);
		this._maxs = new Vec2(0, 0);

		this.type = type;
		this.color = color;
		this.pos = new Vec2();
	}

	toString() {
		switch(this.type) {
			case GEM_NORMAL : return GEM_CHAR_FROM_COLOR_MAP.get(this.color);
			case GEM_CRASH  : return GEM_CHAR_FROM_COLOR_MAP.get(this.color).toLowerCase();
			case GEM_RAINBOW: return "0";
		}
	}

	static fromChar(char) {
		if ( char === "0" )
			return new this(GEM_RAINBOW);

		const charUpper = char.toUpperCase();
		if ( !GEM_COLOR_FROM_CHAR_MAP.has(charUpper) )
			throw new Error(`Invalid gem char '${char}'`);

		return new this(char === charUpper ? GEM_NORMAL : GEM_CRASH,
			GEM_COLOR_FROM_CHAR_MAP.get(charUpper) );
	}
}
class PowerGem extends GeometryBBox {
	constructor(type, color, gems = []) {
		super();
		this.gems = [];

		this.type = type;
		this.color = color;

		this.addGems(gems);
	}

	addGems(gems) {
		this.updateBBox();
		this._mins.x = Math.min(this._mins.x, ...gems.map(gem => gem.mins.x));
		this._maxs.x = Math.max(this._maxs.x, ...gems.map(gem => gem.mins.x));
		this._mins.y = Math.min(this._mins.y, ...gems.map(gem => gem.mins.y));
		this._maxs.y = Math.max(this._maxs.y, ...gems.map(gem => gem.mins.y));
		this.gems.push(...gems);
	}
	addPowerGem(powerGem) {
		this.updateBBox();
		this._mins.x = Math.min(this._mins.x, powerGem.mins.x);
		this._maxs.x = Math.max(this._maxs.x, powerGem.maxs.x);
		this._mins.y = Math.min(this._mins.y, powerGem.mins.y);
		this._maxs.y = Math.max(this._maxs.y, powerGem.maxs.y);
		this.gems.push(...powerGem.gems);
	}

	toString() {
		return Gem.prototype.toString.bind(this)();
	}
}

class GemPair {
	constructor(gem1, gem2) {
		this.gems = [gem1, gem2];
		this.gems[0].pos.set(new Vec2(3, 0));
		this.gems[1].pos.set(new Vec2(3, 1));
	}

	normalizeX() {
		const moveVector = new Vec2();
		for(const gem of this.gems) {
			if ( gem.pos.x < 0 ) {
				moveVector.x++;
				break;
			}
			if ( gem.pos.x >= GAME_WIDTH ) {
				moveVector.x--;
				break;
			}
		}

		this.gems.map(gem => gem.pos.add(moveVector));
	}
	normalizeY() {
		const moveVector = new Vec2();
		for(const gem of this.gems) {
			if ( gem.pos.y < 0 ) {
				moveVector.y++;
				break;
			}
			if ( gem.pos.y >= GAME_HEIGHT ) {
				moveVector.y--;
				break;
			}
		}

		this.gems.map(gem => gem.pos.add(moveVector));
	}
	moveX(dist) {
		this.gems.map(gem => gem.pos.x += dist);
		this.normalizeX();
	}
	rotate(angle) {
		const [gem1, gem2] = this.gems;
		gem2.pos.rotateOfVec2(gem1.pos, angleToRad(angle)).round();
		this.normalizeX();
	}

	evalInstruction(cmdChar) {
		switch(cmdChar) {
			case "L": return this.moveX(-1);
			case "R": return this.moveX(+1);
			case "A": return this.rotate(+90);
			case "B": return this.rotate(-90);
			default : throw new Error(`Invalid gem cmd '${cmdChar}'`);
		}
	}
	evalInstructions(cmdChars) {
		[...cmdChars].map(cmdChar => this.evalInstruction(cmdChar));
		this.normalizeY();
	}

	static fromChars(chars) {
		return new this(Gem.fromChar(chars[0]), Gem.fromChar(chars[1]));
	}
}

class Game {
	constructor() {
		this.objects = [];
	}

	get gems() {
		return this.objects.filter(obj => obj instanceof Gem);
	}
	get powerGems() {
		return this.objects.filter(obj => obj instanceof PowerGem);
	}

	canAddObject(obj) {
		return this.objects
		.every(obj2 => !obj2.intersectBBox(obj));
	}
	addObject(obj) {
		this.objects.push(obj);
	}
	delObject(obj) {
		return arrayDeleteItem(this.objects, obj);
	}

	getGemByPosRaw(x, y) {
		return this.getGemByPos(new Vec2(x, y));
	}
	getGemByPos(pos) {
		const obj = this.getObjectByPos(pos);
		return obj instanceof Gem ? obj : null;
	}
	getGemsAroundPos(pos) {
		return this
		.getObjectsAroundPos(pos)
		.filter(obj => obj instanceof Gem);
	}

	getObjectByPos(pos) {
		return this.objects.find(obj => obj.includesPoint(pos))
	}
	getObjectByPosRaw(x, y) {
		return this.getObjectByPos(new Vec2(x, y));
	}
	getObjectsAroundPos(pos) {
		const rules = [
			[ 0, 1],
			[ 0,-2],
			[ 1, 1],
			[-2, 0],
		];

		const pos2 = pos.clone();
		return rules.map(rule => {
			pos2.x += rule[0];
			pos2.y += rule[1];
			return this.getObjectByPos(pos2);
		}).filter(Boolean);
	}
	getObjectsAroundObj(obj) {
		const points = [];
		for(let x = obj.mins.x; x <= obj.maxs.x; x++)
			points.push( new Vec2(x, obj.mins.y - 1), new Vec2(x, obj.maxs.y + 1) )
		for(let y = obj.mins.y; y <= obj.maxs.y; y++)
			points.push( new Vec2(obj.mins.x - 1, y), new Vec2(obj.maxs.x + 1, y) );

		return points
		.map(p => this.getObjectByPos(p))
		.filter(Boolean);
	}

	updateGravity() {
		return this.objects
		.sort((l, r) => r.maxs.y - l.maxs.y)
		.filter(obj => obj.maxs.y < GAME_HEIGHT - 1)
		.filter(obj => {
			for(let x = obj.mins.x; x <= obj.maxs.x; x++)
				if ( this.getObjectByPosRaw(x, obj.maxs.y + 1) )
					return false;
			return true;
		})
		.map(obj => obj.pos.y++)
			.length;
	}

	/// crash gem logic
	deleteObjsFromCrashGem(crashObj) {
		this.delObject(crashObj);
		this.getObjectsAroundObj(crashObj)
		.filter(obj => obj.color === crashObj.color)
		.map(obj => this.deleteObjsFromCrashGem(obj));
	}
	updateCrashGems() {
		return this.gems
		.filter(gem => gem.type === GEM_CRASH)
		.filter(gemCrash =>
			this.getObjectsAroundObj(gemCrash)
			.find(gem => gem.color === gemCrash.color) )
		.map(gemCrash =>
			this.deleteObjsFromCrashGem(gemCrash) )
			.length;
	}

	/// rainbow gem logic
	updateRainbowGems() {
		return this.gems
		.filter(gem => gem.type === GEM_RAINBOW)
		.sort((l, r) => l.maxs.y - r.maxs.y)
		.map(rainbowGem => {
			this.delObject(rainbowGem);

			const downObject = this.getObjectByPosRaw(rainbowGem.mins.x, rainbowGem.mins.y + 1);
			if ( !downObject || ![GEM_NORMAL, GEM_CRASH].includes(downObject.type) )
				return;

			this.objects
			.filter(obj => obj.color === downObject.color)
			.map(obj => this.delObject(obj));
		})
			.length;
	}

	///	collect power gems from gems
	searchPowerGemForGem(gem) {
		const rows = [];
		for(let y = gem.pos.y; y < GAME_HEIGHT; y++) {
			const row = [];
			for(let x = gem.pos.x; x < GAME_WIDTH; x++) {
				const gem2 = this.getGemByPosRaw(x, y);
				if ( !gem2 || gem2.color !== gem.color || gem2.block )
					break;

				row.push(gem2);
			}
			if ( row.length < 2 )
				break;

			rows.push(row);
		}

		if ( rows.length < 2 )
			return null;

		const minRowLength = Math.min(...rows.map(row => row.length));
		rows.map(row => row.splice(minRowLength));

		return new PowerGem(gem.type, gem.color, [].concat(...rows));
	}
	searchPowerGemsFromGems() {
		const powerGems = this.gems
		.map(gem => this.searchPowerGemForGem(gem))
		.filter(Boolean);

		const removeIncludesPowerGems = powerGems => {
			powerGems.sort((l, r) => r.square - l.square);

			const set = new Set();
			for(let i = 0; i < powerGems.length - 1; i++)
				for(let j = i + 1; j < powerGems.length; j++) {
					if ( powerGems[i].includesBBox(powerGems[j]) )
						set.add(powerGems[j]);
				}

			return powerGems.filter(powerGem => !set.has(powerGem));
		}

		const powerGemsObjColor = powerGems.reduce((obj, powerGem) =>
			( (obj[powerGem.color] = obj[powerGem.color] || []).push(powerGem), obj ), {});

		return [].concat(...Object.entries(powerGemsObjColor).map(([color, powerGems]) => {
			powerGems = removeIncludesPowerGems( powerGems.sort((l, r) => r.square - l.square) );

			const resultPowerGems = [];
			while(powerGems.length) {
				const powerGem = powerGems.shift();
				const intersectPowerGems = [
					powerGem,
					...powerGems.filter(powerGem2 => powerGem.intersectBBox(powerGem2))
				];

				powerGems = powerGems.filter(powerGem => !intersectPowerGems.includes(powerGem));

				intersectPowerGems.sort((l, r) => l.mins.y - r.mins.y);
				const finalPowerGem = intersectPowerGems.shift();
				resultPowerGems.push(finalPowerGem);
			}

			return resultPowerGems;
		}));
	}
	collectPowerGemsFromGems() {
		let count = 0;
		while(1) {
			const tmpPowerGems = this.searchPowerGemsFromGems();
			if ( !tmpPowerGems.length )
				break;

			tmpPowerGems.map(powerGem => powerGem.gems.map(gem => this.delObject(gem)) );
			tmpPowerGems.map(powerGem => this.addObject(powerGem));

			count += tmpPowerGems.length;
		}
		return count;
	}

	expandPowerGemsFromGems() {
		let count = 0;
		const powerGems = this.powerGems;

		const getGems = (gemsGroups, color, length) =>
			[].concat(...gemsGroups
			.map(gems =>
				gems
				.filter(gem => gem instanceof Gem)
				.filter(gem => gem.color === color) )
			.filter(gems => gems.length === length) );

		for(const powerGem of powerGems) {
			const gemsGroups = [[], []];
			for(let y = powerGem.mins.y; y <= powerGem.maxs.y; y++) {
				gemsGroups[0].push(this.getObjectByPosRaw(powerGem.mins.x - 1, y));
				gemsGroups[1].push(this.getObjectByPosRaw(powerGem.maxs.x + 1, y));
			}

			const gems = getGems(gemsGroups, powerGem.color, powerGem.height);
			if ( !gems.length )
				continue;

			count++;
			powerGem.addGems(gems);
			gems.map(gem => this.delObject(gem));
		}
		for(const powerGem of powerGems) {
			const gemsGroups = [[], []];
			for(let x = powerGem.mins.x; x <= powerGem.maxs.x; x++) {
				gemsGroups[0].push(this.getObjectByPosRaw(x, powerGem.mins.y - 1));
				gemsGroups[1].push(this.getObjectByPosRaw(x, powerGem.maxs.y + 1));
			}

			const gems = getGems(gemsGroups, powerGem.color, powerGem.width);
			if ( !gems.length )
				continue;

			count++;
			powerGem.addGems(gems);
			gems.map(gem => this.delObject(gem));
		}

		return count;
	}
	expandPowerGemsFromPowerGems() {
		let count = 0;

		repeat:
			while(1) {
				for(const powerGem of this.powerGems) {
					const powerGems2 = this.powerGems
					.filter(powerGem2 => powerGem2 !== powerGem)
					.filter(powerGem2 => powerGem2.color ===  powerGem.color)
					.filter(powerGem2 => (
						(powerGem2.maxs.x === powerGem.mins.x - 1 ||
							powerGem2.mins.x === powerGem.maxs.x + 1) &&
						powerGem2.maxs.y === powerGem.maxs.y &&
						powerGem2.mins.y === powerGem.mins.y
					) || (
						(powerGem2.maxs.y === powerGem.mins.y - 1 ||
							powerGem2.mins.y === powerGem.maxs.y + 1) &&
						powerGem2.maxs.x === powerGem.maxs.x &&
						powerGem2.mins.x === powerGem.mins.x
					));

					if ( !powerGems2.length )
						continue;

					powerGem.addPowerGem(powerGems2[0]);
					this.delObject(powerGems2[0]);
					count++;
					continue repeat;
				}
				break;
			}

		return count;
	}

	tick() {
		while(this.updateGravity()) {}

		return 0 |
			this.updateCrashGems() |
			this.updateRainbowGems() |

			this.collectPowerGemsFromGems() |
			this.expandPowerGemsFromGems() |
			this.expandPowerGemsFromPowerGems();
	}
	tickAll() {
		while(this.tick()) {}
	}

	toString() {
		const map = Array.from(Array(GAME_HEIGHT), () => Array(GAME_WIDTH).fill(" "));
		for(const obj of this.objects)
			for(let y = obj.mins.y; y <= obj.maxs.y; y++)
				for(let x = obj.mins.x; x <= obj.maxs.x; x++)
					map[y][x] = obj.toString();

		return map.map(a => a.join("")).join("\n");
	}

	_devPrintGems() {
		const WG = gem => ` ${gem} `;

		const borderItem = WG("*");

		let map = Array.from(Array(GAME_HEIGHT), () => Array(GAME_WIDTH).fill(WG(" ")));

		const map2 = [];

		for(const obj of this.objects)
			for(let y = obj.mins.y; y <= obj.maxs.y; y++)
				for(let x = obj.mins.x; x <= obj.maxs.x; x++)
					if ( obj instanceof PowerGem ) {
						if ( y === obj.mins.y ) {
							let y2 = y*2;
							map2[y2] = map2[y2] || [];
							map2[y2][x] = 1;
						} else
						if ( y === obj.maxs.y ) {
							let y2 = y*2 + 2;
							map2[y2] = map2[y2] || [];
							map2[y2][x] = 1;
						}

						if ( x === obj.mins.x )
							map[y][x] = `(${obj} `;
						else
						if ( x === obj.maxs.x )
							map[y][x] = ` ${obj})`;
						else
							map[y][x] = ` ${obj} `;
					} else
						map[y][x] = ` ${obj} `;

		map = map.map(row => [borderItem, ...row, borderItem]);
		for(let i = map.length; i >= 0; i--)
			map.splice(i, 0, Array(GAME_WIDTH+2).fill(borderItem));

		for(let y = 0; y < map.length; y += 2)
			map[y] = map[y].map((v, x) =>
				(map2[y] && map2[y][x - 1]) ? " - " : v
			);

		return map.map(a => a.join("")).join("\n");
	}
}

const DEV_MODE = false;
function puzzleFighter(inputArray, expected) {
	const game = new Game();

	for(let i = 0; i < inputArray.length; i++) {
		const [gemPairChars, instructions] = inputArray[i];

		const gemPair = GemPair.fromChars(gemPairChars);
		gemPair.evalInstructions(instructions);
		if ( !gemPair.gems.every(gem => game.canAddObject(gem)) )
			break;

		gemPair.gems.map(gem => game.addObject(gem));
		game.tickAll();

		if ( DEV_MODE ) {
			console.log([gemPairChars, instructions]);
			console.log(game._devPrintGems());
		}
	}

	return game.toString();
}