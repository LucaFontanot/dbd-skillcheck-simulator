const Static = {
  perks: {
    lullaby: {
      prop: "lullaby",
      name: "Hex: Huntress Lullaby",
      icon: '/src/assets/perks/killer/huntressLullaby.png',
      tip: "Each time a Survivor is hooked, Hex: Huntress Lullaby grows in power and gains 1 Token, up to a maximum of 5 Tokens.\nEach Token reduces the timer between the Skill Check Warning cue and the Skill Check appearing for both Repair and Healing Skill Checks:\n" +
        "    1 Token: reduction of -14 %.\n" +
        "    2 Tokens: reduction of -28 %.\n" +
        "    3 Tokens: reduction of -42 %.\n" +
        "    4 Tokens: reduction of -56 %.\n" +
        "    5 Tokens: complete suppression of the Warning cue.",
      tokenRange: [1, 2, 3, 4, 5],
      type: "debuff"
    },
    oppression: {
      prop: "oppression",
      type: "debuff",
      name: "Oppression",
      icon: '/src/assets/perks/killer/oppression.png',
      tip: "Performing the Damage Generator Action on a generator activates Oppression:\n" +
        "    Causes up to 3 additional Generators to also start regressing.\n" +
        "    Triggers a difficult SkillCheck on all Survivors currently repairing one of those Generators.",
    },
    ruin: {
      prop: "ruin",
      name: "[OLD] Hex: Ruin",
      type: "debuff",
      icon: '/src/assets/perks/killer/hexRuin.png',
      tip: "All Survivors are affected by Hex: Ruin, which causes the following:\n" +
        "    Good Skill Checks result in 3/4/5 % regression on the Generator.\n" +
        "    Great Skill Checks grant 0 % bonus progression on the Generator.",
      tierRange: [1, 2, 3],
    },
    coulrophobia: {
      prop: "coulrophobia",
      name: "Coulrophobia",
      type: "debuff",
      icon: '/src/assets/perks/killer/coulrophobia.png',
      tip: "Increases the Rotation speed of Healing SkillChecks by +50 %",
    },
    unnervingPresence: {
      prop: "unnervingPresence",
      name: "HEX: Unnerving Presence",
      type: "debuff",
      icon: '/src/assets/perks/killer/unnervingPresence.png',
      tip: "Survivors repairing or healing within your Terror Radius suffer from the following effects:\n" +
        "    Increases the Trigger odds of Skill Check by 10 %.\n" +
        "    Decreases the Success zone of Skill Checks by 40/50/60 %.",
      tierRange: [1, 2, 3],
    },
    mercilessStorm:{
      prop: "mercilessStorm",
      name: "Merciless Storm",
      type: "debuff",
      icon: '/src/assets/perks/killer/mercilessStorm.webp',
      tip:"Whenever a Generator is repaired to 90 %, Survivors repairing it are faced with continuous Skill Checks."
    },
    deadline: {
      prop: "deadline",
      name: "Deadline",
      type: "buff",
      icon: '/src/assets/perks/survivor/deadline.png',
      tip: "Increases the Odds of triggering Skill Checks by 6/8/10 % while repairing or healing.\n" +
        "        Causes Skill Checks to appear in random places.\n" +
        "    Reduces the penalty for missed Skill Checks by -50 %.",
    },
    thisisnothappening: {
      prop: "thisisnothappening",
      name: "This is not happening",
      type: "buff",
      icon: '/src/assets/perks/survivor/thisIsNotHappening.png',
      tip: "Increases the Success zone of Great Skill Checks while Repairing",
    },
    stakeout:{
      prop: "stakeout",
      name: "Stake Out",
      type: "buff",
      icon: '/src/assets/perks/survivor/stakeOut.png',
      tip: "Stake Out gains 1 Token, up to a maximum of 2/3/4 Tokens.\n" +
        "    When Stake Out has at least 1 Token, Good Skill Checks consume 1 Token and are considered Great Skill Checks, granting an additional Progression bonus of +1 %.",
      tokenRange: [1, 2, 3, 4],
    },
    fasttrack:{
      prop: "fasttrack",
      name: "Fast Track",
      type: "buff",
      icon: '/src/assets/perks/survivor/fastTrack.png',
      tip: "Whenever another Survivor is hooked, Fast Track gains 1/2/3 Tokens, up to a maximum of 9/18/27 Token(s).\n" +
        "    You consume all accumulated Tokens after a Great Skill Check on a Generator.\n" +
        "    Each Token grants a stack-able 1 % Progression bonus in addition to the default Progression bonus for succeeding a Great Skill Check.",
      tokenRange: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
    },
    hyperfocus:{
      prop: "hyperfocus",
      name: "Hyper Focus",
      type: "buff",
      icon: '/src/assets/perks/survivor/hyperfocus.png',
      tip: "After hitting a Great Skill Check while repairing or healing, Hyperfocus gains +1 Token, up to a maximum of 6 Tokens\n" +
        "For each Token, the following stack-able effects are applied:\n" +
        "    Increases the Skill Check Trigger odds by +4 % per Token.\n" +
        "    Increases the Skill Check Rotation speed by +4 % per Token.\n" +
        "    Increases the Skill Check Bonus progression by 10/20/30 % of its base value per Token.",
    },
  },
  effects:{
    madness:{
      prop: "madness",
      name: "Madness",
      type: "debuff",
      icon: "/src/assets/icons/madness.webp",
      tip: "Madness is a Status Effect in Dead by Daylight which affects Survivors by giving them the Madness Skill Check. \nThe Madness Skill Check is a Skill Check that appears randomly on the screen, occasionally going counter clockwise and usually with a shaking effect.",
    },
    correctiveaction:{
      prop: "correctiveaction",
      name: "Corrective Action",
      type: "buff",
      icon: "/src/assets/perks/survivor/correctiveAction.webp",
      tip: "You start the Trial with 3 Tokens on Corrective Action and gain +1 Token each time you succeed at a Great Skill Check, up to a maximum of 5 Tokens.\n" +
        "    Each time another Survivor cooperating with you fails a Skill Check, Corrective Action consumes -1 Token, transforming their Failed Skill Check into Good Skill Check instead.",
    },
  },
  modifiers: {
    gentime: 90000,
    frequency: 7000,
    dstime:3000,
    advertisetime: 500,
    glyphduration: 5000,
    gliphbasesize: 35,
    speed: 1,
    advertise:"advertise_02",
    v: 1
  }
}
export default Static;
