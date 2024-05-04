import GameState from "@/plugins/store/gameState";
import Assets from "./assets";

class Skillcheck {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  needlePositionState: {
    great: {
      start: number,
      end: number
    },
    good: {
      start: number,
      end: number
    },
    startTime: number,
    startZero: number,
    clockWise: boolean,
    speed: number,
    mode: string,
    modifiers: any[],
    advertiseTime: number
  } | null;
  perks: any | null = null;
  effects: any | null = null;
  fps: number = 60;
  animate: boolean = false;
  clickEvent: boolean = false;
  event: Function | null = null;
  state: any;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.needlePositionState = null;
    this.fps = GameState.getState().settings.fps;
    this.setDisplay(false);
  }

  getRandomArbitraryRange(min: number, max: number, fixed: number | null = null) {
    return Number((Math.random() * (max - min) + min).toFixed(fixed || 0))
  }

  rad(deg: number) {
    return (Math.PI / 180) * deg
  }

  setDisplay(display: boolean) {
    const ds = this;
    if (display) {
      this.event = function (e) {
        ds.clickEvent = true;
        console.log("Skillcheck Clicked")
      }
      //eslint-disable-next-line
      document.addEventListener("skillchedkClick", this.event);
      this.canvas.classList.remove("hidden")
      this.canvas.classList.add("visible")
    } else {
      //eslint-disable-next-line
      document.removeEventListener("skillchedkClick", this.event);
      this.canvas.classList.remove("visible")
      this.canvas.classList.remove("shake")
      this.canvas.classList.add("hidden")
    }
  }
  shake(time: number){
    this.canvas.classList.add("shake")
    setTimeout(() => {
      this.canvas.classList.remove("shake")
    }, time)
  }
  drawGeneratorSkillcheck(props: {
    greatSize: number,
    goodSize: number,
    perks: any[] | null,
    effects: any[] | null,
    autoApplyModifiers: boolean,
    autoApplyPerks: boolean,
    color: string
  }) {
    this.canvas.style.top = null;
    this.canvas.style.left = null;
    const state = GameState.getState();
    this.state = state;
    if (props.autoApplyModifiers) {
      props.effects = state.effects;
    }
    if (props.autoApplyPerks) {
      props.perks = state.perks;
    }
    this.perks = props.perks;
    this.effects = props.effects;
    let speed = state.modifiers.speed;
    if (this.perks && this.perks.oppression && this.perks.unnervingPresence.active) {
      props.goodSize = props.goodSize * ((this.perks.unnervingPresence.tier + 30) / 100);
    }
    if (this.perks && this.perks.oppression && this.perks.oppression.active) {
      props.goodSize = 0;
      props.greatSize = 15;
    }
    if (this.perks && this.perks.thisisnothappening && this.perks.thisisnothappening.active) {
      props.greatSize = props.greatSize + props.greatSize * 0.5;
    }
    if (this.perks && this.perks.hyperfocus && this.perks.hyperfocus.active && this.perks.hyperfocus.tokens > 0) {
      speed = speed + (speed * 0.04) * this.perks.hyperfocus.tokens;
    }
    if (this.perks && this.perks.coulrophobia && this.perks.coulrophobia.active) {
      speed = speed + speed * 0.5;
    }
    if (this.perks && this.perks.ruin && this.perks.ruin.active) {
      props.color = "#c92828";
    }
    if (this.perks && this.perks.deadline && this.perks.deadline.active) {
      this.canvas.style.top = this.getRandomArbitraryRange(30,80) + "vh";
      this.canvas.style.left = this.getRandomArbitraryRange(30,80) + "vw";
    }
    let clockwise = true;
    const minRotateDegStart = 20
    let maxRotateDegStop = (240 - minRotateDegStart) - props.goodSize + props.greatSize;
    if (this.effects && this.effects.madness && this.effects.madness.active) {
      if (this.getRandomArbitraryRange(0, 2) === 0) {
        clockwise = false;
        maxRotateDegStop = 180 - minRotateDegStart;
      }
      if (this.getRandomArbitraryRange(0, 2) === 0) {
        speed = speed + speed * 0.2;
      }
      if (this.getRandomArbitraryRange(0, 1) === 0) {
        console.log("Skillcheck Shake")
        this.canvas.classList.add("shake")
      }
      if (this.getRandomArbitraryRange(0, 2) === 0) {
        console.log("Skillcheck Random Position")
        this.canvas.style.top = this.getRandomArbitraryRange(30,80) + "vh";
        this.canvas.style.left = this.getRandomArbitraryRange(30,80) + "vw";
      }
    }
    const startFrom = this.getRandomArbitraryRange(minRotateDegStart, maxRotateDegStop, 4)
    this.needlePositionState = {
      great: {
        start: startFrom,
        end: Number((startFrom + props.greatSize).toFixed(4))
      },
      good: {
        start: Number((startFrom + props.greatSize).toFixed(4)),
        end: Number((startFrom + props.greatSize + props.goodSize).toFixed(4))
      },
      mode: "generator",
      modifiers: [],
      startTime: Date.now(),
      startZero: 0,
      clockWise: clockwise,
      speed: speed,
      advertiseTime: this.state.modifiers.advertisetime,
    }
    console.log(props.color)
    const counterClockwise = false;
    const x = this.width / 2;
    const y = this.height / 2;
    const radius = 65;
    const offsetSize = 3.6;
    this.ctx.clearRect(0, 0, this.width, this.height);
    //OUTLINE
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, this.rad(this.needlePositionState.good.end), this.rad(this.needlePositionState.great.start), counterClockwise);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = props.color;
    this.ctx.stroke();
    //GREAT
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, this.rad(this.needlePositionState.great.start), this.rad(this.needlePositionState.great.end), counterClockwise);
    this.ctx.lineWidth = offsetSize * 2 + 1;
    this.ctx.strokeStyle = props.color;
    this.ctx.stroke();
    //GOOD TOP
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius - offsetSize, this.rad(this.needlePositionState.good.start), this.rad(this.needlePositionState.good.end), counterClockwise);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = props.color;
    this.ctx.stroke();
    //GOOD BOTTOM
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius + offsetSize, this.rad(this.needlePositionState.good.start), this.rad(this.needlePositionState.good.end), counterClockwise);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = props.color;
    this.ctx.stroke();
    //GOOD BORDER TOP
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, this.rad(this.needlePositionState.good.start) - 0.02, this.rad(this.needlePositionState.good.start), counterClockwise);
    this.ctx.lineWidth = offsetSize * 2 + 1;
    this.ctx.strokeStyle = props.color;
    this.ctx.stroke();
    //GOOD BORDER BOTTOM
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, this.rad(this.needlePositionState.good.end), this.rad(this.needlePositionState.good.end) + 0.02, counterClockwise);
    this.ctx.lineWidth = offsetSize * 2 + 1;
    this.ctx.strokeStyle = props.color;
    this.ctx.stroke();
    return;
  }

  angleToXY(angle: number, center: number[], radius: number) {
    return [
      center[0] + radius * Math.cos(angle),
      center[1] + radius * Math.sin(angle)
    ];
  }

  async getImage(name: string): Promise<HTMLImageElement> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const image = new Image();
      image.onload = function () {
        resolve(image);
      }
      image.src = await Assets.getAsset(name);
    });
  }

  async getAudio(name: string): Promise<HTMLAudioElement> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const audio = new Audio();
      audio.oncanplay = function () {
        resolve(audio);
      }
      audio.src = await Assets.getAsset(name);
    });
  }

  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async animateGenerator(
    props: {
      maxrotation: number,
      onSuccess: Function,
    }
  ) {
    const fps = this.fps;
    const ref = this;
    const canvasSave = this.ctx.getImageData(0, 0, this.width, this.height);
    const image = await this.getImage("cursor");
    const advertise = await this.getAudio(this.state.modifiers.advertise);
    advertise.volume = this.state.settings.sound / 100;
    ref.animate = true;
    if (ref.needlePositionState.advertiseTime > 0) {
      let play = true;
      let d = ref.needlePositionState.advertiseTime;
      if (this.perks && this.perks.lullaby && this.perks.lullaby.active) {
        if (this.perks.lullaby.tokens === 5) {
          play = false;
        }
        d = d - (d * (this.perks.lullaby.tokens * 0.14));
      }
      console.log(play, d)
      if (play) {
        advertise.play();
      }
      await this.sleep(d);
    }
    ref.needlePositionState.startTime = Date.now();
    ref.setDisplay(true);
    animate()

    async function animate() {
      if (!ref.animate) {
        return ref.setDisplay(false);
      }
      if (ref.state.playStatus !== 'start') {
        return ref.setDisplay(false);
      }
      const rotationTime = 1050;
      let angle =
        ref.needlePositionState.startZero + ref.needlePositionState.speed * ((Date.now() - ref.needlePositionState.startTime) / (rotationTime / 360));
      if (ref.needlePositionState.clockWise==false) {
        angle = -angle;
      }
      ref.ctx.clearRect(0, 0, ref.width, ref.height);
      ref.ctx.putImageData(canvasSave, 0, 0);
      //Create cursor from center of canvas. Cursor is a red line, with faded borders and a shadow
      const imageX = 11;
      const imageY = 140;
      ref.ctx.save();
      ref.ctx.translate(ref.width / 2, ref.height / 2);
      ref.ctx.rotate(ref.rad(angle));
      ref.ctx.drawImage(image, -imageX / 2, -imageY / 2, imageX, imageY);
      ref.ctx.restore();
      //ADD TEXT AT THE CENTER
      ref.ctx.font = "14px Arial";
      ref.ctx.fillStyle = "white";
      ref.ctx.textAlign = "center";
      ref.ctx.fillText("SPACE", ref.width / 2, ref.height / 2 + 3);
      //Draw the image in the center of the canvas
      if (angle >= props.maxrotation) {
        ref.animate = false;
        ref.setDisplay(false);
        props.onSuccess("fail");
      }
      angle = angle - 90;
      if (angle < 0) {
        angle = 360 + angle;
      }
      angle = angle % 360;
      if (ref.clickEvent) {
        ref.animate = false;
        if (angle >= ref.needlePositionState.great.start && angle <= ref.needlePositionState.great.end) {
          props.onSuccess("great");
        } else if (angle >= ref.needlePositionState.good.start && angle <= ref.needlePositionState.good.end) {
          if (ref.perks && ref.perks.stakeout && ref.perks.stakeout.active && ref.perks.stakeout.tokens > 0) {
            ref.perks.stakeout.tokens--;
            console.log("Stakeout Tokens", ref.perks.stakeout.tokens)
            props.onSuccess("great");
          } else {
            props.onSuccess("good");
          }
        } else {
          if (ref.effects && ref.effects.correctiveaction && ref.effects.correctiveaction.active) {
            props.onSuccess("good");
          }else{
            props.onSuccess("fail");
          }
        }
        await ref.sleep(400)
        ref.setDisplay(false);
      }
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 1000 / fps);
    }
  }

  playStatusSound(name: string) {
    let audio = "";
    if (name === "great") {
      audio = "skillcheck_great";
    } else if (name === "good") {
      audio = "skillcheck_good";
      if (this.perks && this.perks.ruin && this.perks.ruin.active) {
        audio = "generator_sparks";
      }
    }
    if (audio !== "") {
      this.getAudio(audio).then((audio) => {
        audio.volume = this.state.settings.sound / 100;
        audio.play();
      });
    }
  }
}

export default Skillcheck;
