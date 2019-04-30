import './style/style.scss';

import * as dat from 'dat.gui';
import * as PIXI from 'pixi.js';
const STATS = require('stats.js');

const settings = {
  speed: 0.5,
  scale: 0.5,
};

const appDiv = document.getElementById('app');
if (appDiv) {
  // DOM
  const pixiDiv = document.createElement('div');
  pixiDiv.id = 'PIXI';
  appDiv.appendChild(pixiDiv);

  const uiDiv = document.createElement('div');
  uiDiv.id = 'UI';
  appDiv.appendChild(uiDiv);

  uiDiv.innerHTML = '<strong>Hello</strong> World!';


  // PIXI
  const app = new PIXI.Application(
      window.innerWidth, window.innerHeight, {transparent: false});
  PIXI.ticker.shared.add(tick);
  pixiDiv.appendChild(app.view);

  const sprite = PIXI.Sprite.fromImage(`./assets/images/test.png`);
  sprite.anchor.set(0.5, 0.5);
  app.stage.addChild(sprite);

  // STATS.JS
  const stats = new STATS();
  document.body.appendChild(stats.dom);

  // DAT.GUI
  const gui = new dat.GUI();
  gui.add(settings, 'speed', 0, 1);
  gui.add(settings, 'scale', 0, 2);

  window.addEventListener('resize', onResize);

  function tick(dt: number) {
    stats.begin();

    const newRotation = sprite.rotation + settings.speed * 0.01;
    sprite.position.set(window.innerWidth / 2, window.innerHeight / 2);
    sprite.rotation = newRotation;
    sprite.scale.set(settings.scale);

    stats.end();
  }

  function onResize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  }
}
