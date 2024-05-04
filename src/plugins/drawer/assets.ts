class Assets{
  isLoaded = false;
  assets: Record<string, string> = {};
  constructor(){
    this.loadAssets();
  }
  async loadAsset(url: string): Promise<string>{
    const response = await fetch(url);
    if (response.ok) {
      const blob = await response.blob();
      return  URL.createObjectURL(blob);
    }
    return "";
  }
  async loadAssets(){
    const list = [
      {name: "cursor", src: "assets/game/cursor.png"},
      {name: "advertise_01", src: "assets/game/sfx_hud_skillcheck_open_01.ogg"},
      {name: "advertise_02", src: "assets/game/sfx_hud_skillcheck_open_02.ogg"},
      {name: "advertise_03", src: "assets/game/sfx_hud_skillcheck_open_03.ogg"},
      {name: "advertise_04", src: "assets/game/sfx_hud_skillcheck_open_04.ogg"},
      {name: "generator_done", src:"assets/game/HUD_Generator_Started_Bounce.ogg"},
      {name: "generator_explode", src:"assets/game/sfx_generator_explode_01.ogg"},
      {name: "generator_sparks", src:"assets/game/Generator_Sparks_Bounc_05.ogg"},
      {name: "skillcheck_good", src:"assets/game/sfx_hud_skillcheck_good_01.ogg"},
      {name: "skillcheck_great", src:"assets/game/sfx_hud_skillcheck_bonus_01.ogg"},
      {name: "skillcheck_fail", src:"assets/game/sfx_hud_wiggle_skillcheck_fail_04.ogg"},
    ];
    for (const elem of list){
      this.assets[elem.name] = await this.loadAsset(elem.src);
    }
    this.isLoaded = true;
  }
  async getAsset(name: string){
    //wait untill assets are loaded
    while (!this.isLoaded){
      await new Promise(r => setTimeout(r, 100));
    }
    return this.assets[name];
  }
}

export default new Assets();
