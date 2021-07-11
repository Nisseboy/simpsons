let seas;
let sButtons = [];

let season;
let lSeason;
let episode;
let lEpisode;

let changeTime = -1;
let changeBuffer = 2000;

function preload() {
  
  seas = loadJSON('simpsons.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.body.style.overflow = 'hidden';
  seas = seas.seasons;
  
  season = createSlider(1, seas.length, 20);
  season.position(0, height - 100);
  season.size(width, 20);
  episode = createSlider(1, 25, 1);
  episode.position(0, height - 60);
  episode.size(width, 20);
  
  
  lSeason = season.value();
  lEpisode = episode.value();
}

function draw() {
  background(40, 40, 50);
  episode.value(min(episode.value(), seas[season.value() - 1].length));
  
  fill(255);
  textSize(50);
  text("Season: " + season.value() + "\nEpisode: " + episode.value() + "\n" + seas[season.value() - 1][episode.value() - 1], 10, height / 4 * 0.3);
  
  if (lSeason != season.value() || lEpisode != episode.value()) {
    changeTime = millis();
  }
  
  lSeason = season.value();
  lEpisode = episode.value();
  
  if (changeTime > -1 && millis() - changeTime > changeBuffer) {
    changeTime = -1;
    document.getElementById('iframe-embed').src = "https://www.2embed.ru/embed/tmdb/tv?id=456&s=" + season.value() + "&e=" + episode.value();
  }
}
