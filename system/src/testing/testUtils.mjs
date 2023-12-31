/**
 * @file Utilities for our Quench tests
 */
const inputDelay = 120;

export const delay = ms =>
	new Promise(resolve => {
		setTimeout(resolve, ms);
	});

export const abilities = [
	"str",
	"dex",
	"con",
	"int",
	"wis",
	"cha",
];

export const itemTypes = [
	"Armor",
	"Basic",
	"Gem",
	"Spell",
	"Talent",
	"Weapon",
	"NPC Attack",
	"NPC Feature",
];

export const waitForInput = () => delay(inputDelay);

/* MOCKING FUNCTIONS */
export const createMockActorByKey = async (key, type) => {
	return Actor.create({
		name: `Test Actor ${key}: ${type}`,
		type,
	});
};

export const createMockItemByKey = async (key, type) => {
	return Item.create({
		name: `Test Item ${key}: ${type}`,
		type,
	});
};

export const createMockUserByKey = async key => {
	return User.create({
		name: `Test User ${key}`,
	});
};

/* CLEAN UP HELPERS */
export const cleanUpActorsByKey = async key => {
	game.actors
		?.filter(a => a.name.includes(`Test Actor ${key}`))
		.forEach(async a => await a.delete());
};

export const cleanUpItemsByKey = async key => {
	game.items
		?.filter(i => i.name.includes(`Test Item ${key}:`))
		.forEach(async i => await i.delete());
};

export const cleanUpUsersByKey = async key => {
	game.users
		?.filter(u => u.name === `Test User ${key}`)
		.forEach(async u => await u.delete());
};

/**
 * If there are messages, purge them.
 *
 * @returns {Promise} The promise from deleting messages
 */
export const trashChat = () =>
	game.messages?.size > 0
		? game.messages?.documentClass.deleteDocuments([], { deleteAll: true })
		: null;

/* UI CLOSE HELPERS */
export const openWindows = className =>
	Object.values(ui.windows).filter(o =>
		o.options.classes.includes(className)
	);

export const closeSheets = async () => {
	openWindows("sheet").forEach(async w => w.close());
	await waitForInput();
};

export const openDialogs = () =>
	Object.values(ui.windows).filter(o => o.options.classes.includes("dialog"));

export const closeDialogs = async () => {
	openDialogs()?.forEach(async o => {
		await o.close();
	});
};

/* HELPERS */
export const assignActorToUser = async (actor, user) => {
	return user.update({
		character: actor.id,
	});
};
