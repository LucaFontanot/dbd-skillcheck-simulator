import GameState from "./gameState";

const state = GameState.getState();

function zeroPad(num: number, places: number) {
  return String(num).padStart(places, '0');

}

function getDayString() {
  let d = new Date();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  return `${year}${zeroPad(month, 2)}${zeroPad(day, 2)}`;
}

function addPerks(prop: {}, propDay: {}, value: number, perks: {}) {
  console.log(prop)
  for (let perk in perks) {
    if (!prop[perk]) {
      prop[perk] = 0;
    }
    if (perks[perk].active) {
      prop[perk] += value;
    }
  }
  let day = getDayString();

  for (let perk in perks) {
    if (!propDay[perk]) {
      propDay[perk] = {};
    }
    if (!propDay[perk][day]) {
      propDay[perk][day] = 0;
    }
    if (perks[perk].active) {
      propDay[perk][day] += value;
    }
  }
}

function addEffects(prop: {}, propDay: {}, value: number, effects: {}) {
  for (let effect in effects) {
    if (!prop[effect]) {
      prop[effect] = 0;
    }
    if (effects[effect].active){
      prop[effect] += value;
    }
  }
  let day = getDayString();
  for (let effect in effects) {
    if (!propDay[effect]) {
      propDay[effect] = {};
    }
    if (!propDay[effect][day]) {
      propDay[effect][day] = 0;
    }
    if (effects[effect].active) {
      propDay[effect][day] += value;
    }
  }
}

export function addGenerator(perks: {} | null = null, effects: {} | null = null) {
  let day = getDayString();
  state.stats.generators++;
  if (!state.stats.generatorsDay[day]) {
    state.stats.generatorsDay[day] = 0;
  }
  state.stats.generatorsDay[day]++;
  if (perks) {
    addPerks(state.stats.generatorsWithPerks, state.stats.generatorsWithPerksDay, 1, perks);
  }
  if (effects) {
    addEffects(state.stats.generatorsWithEffects, state.stats.generatorsWithEffects, 1, effects);
  }
  GameState.saveState();
}

export function addGeneratorSkillCheckGreat(perks: {} | null = null, effects: {} | null = null) {
  let day = getDayString();
  state.stats.generatorGreatSkillChecks++;
  if (!state.stats.generatorGreatSkillChecksDay[day]) {
    state.stats.generatorGreatSkillChecksDay[day] = 0;
  }
  state.stats.generatorGreatSkillChecksDay[day]++;
  if (perks) {
    addPerks(state.stats.generatorGreatSkillChecksPerks, state.stats.generatorGreatSkillChecksPerksDay, 1, perks);
  }
  if (effects) {
    addEffects(state.stats.generatorGreatSkillChecksEffects, state.stats.generatorGreatSkillChecksEffectsDay, 1, effects);
  }
  GameState.saveState();
}

export function addGeneratorSkillCheckGood(perks: {} | null = null, effects: {} | null = null) {
  let day = getDayString();
  state.stats.generatorGoodSkillChecks++;
  if (!state.stats.generatorGoodSkillChecksDay[day]) {
    state.stats.generatorGoodSkillChecksDay[day] = 0;
  }
  state.stats.generatorGoodSkillChecksDay[day]++;
  if (perks) {
    addPerks(state.stats.generatorGoodSkillChecksPerks, state.stats.generatorGoodSkillChecksPerksDay, 1, perks);
  }
  if (effects) {
    addEffects(state.stats.generatorGoodSkillChecksEffects, state.stats.generatorGoodSkillChecksEffectsDay, 1, effects);
  }
  GameState.saveState();
}

export function addGeneratorSkillCheckFail(perks: {} | null = null, effects: {} | null = null) {
  let day = getDayString();
  state.stats.generatorSkillCheckFails++;
  if (!state.stats.generatorSkillCheckFailsDay[day]) {
    state.stats.generatorSkillCheckFailsDay[day] = 0;
  }
  state.stats.generatorSkillCheckFailsDay[day]++;
  if (perks) {
    addPerks(state.stats.generatorSkillCheckFailsPerks, state.stats.generatorSkillCheckFailsPerksDay, 1, perks);
  }
  if (effects) {
    addEffects(state.stats.generatorSkillCheckFailsEffects, state.stats.generatorSkillCheckFailsEffectsDay, 1, effects);
  }
  GameState.saveState();
}

export function addGeneratorTime(time: number) {
  state.stats.generatorsTime += time;
  let day = getDayString();
  if (!state.stats.generatorsTimeDay[day]) {
    state.stats.generatorsTimeDay[day] = 0;
  }
  state.stats.generatorsTimeDay[day] += time;
  GameState.saveState();
}

export function addDs(effects: {} | null = null) {
  state.stats.ds++;
  let day = getDayString();
  if (!state.stats.dsDay[day]) {
    state.stats.dsDay[day] = 0;
  }
  state.stats.dsDay[day]++;
  if (effects){
    addEffects(state.stats.dsEffects, state.stats.dsDayEffects, 1, effects);
  }
  GameState.saveState();
}


export function addDsFail(effects: {} | null = null) {
  state.stats.dsFail++;
  let day = getDayString();
  if (!state.stats.dsFailDay[day]) {
    state.stats.dsFailDay[day] = 0;
  }
  state.stats.dsFailDay[day]++;
  if (effects) {
    addEffects(state.stats.dsFailEffects, state.stats.dsFailDayEffects, 1, effects);
  }
  GameState.saveState();
}

export function addGlyph(effects: {} | null = null) {
  state.stats.gliph++;
  let day = getDayString();
  if (!state.stats.gliphDay[day]) {
    state.stats.gliphDay[day] = 0;
  }
  state.stats.gliphDay[day]++;
  if (effects) {
    addEffects(state.stats.gliphEffects, state.stats.gliphDayEffects, 1, effects);
  }
  GameState.saveState();
}

export function addGlyphSuccess(effects: {} | null = null) {
  state.stats.gliphSuccess++;
  let day = getDayString();
  if (!state.stats.gliphSuccessDay[day]) {
    state.stats.gliphSuccessDay[day] = 0;
  }
  state.stats.gliphSuccessDay[day]++;
  if (effects) {
    addEffects(state.stats.gliphSuccessEffects, state.stats.gliphSuccessDayEffects, 1, effects);
  }
  GameState.saveState();
}

export function addGlyphFail(effects: {} | null = null) {
  state.stats.gliphFail++;
  let day = getDayString();
  if (!state.stats.gliphFailDay[day]) {
    state.stats.gliphFailDay[day] = 0;
  }
  state.stats.gliphFailDay[day]++;
  if (effects) {
    addEffects(state.stats.gliphFailEffects, state.stats.gliphFailDayEffects, 1, effects);
  }
  GameState.saveState();
}
