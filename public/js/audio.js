// AudioPlayer.numInstances = 0;
//
// function AudioPlayer(options) {
//   //Options
//   options = options || {};
//   this.file = options.file === undefined ? null : options.file;
//   this.element = options.element === undefined ? "#player" : options.element;
//   this.width = options.width === undefined ? 500 : options.width;
//   this.height = 100;
//   this.scaleFactor = options.scaleFactor === undefined ? 60 : options.scaleFactor;
//   this.amplify = options.amplify === undefined ? 2 : options.amplify;
//   this.ceiling = options.ceiling === undefined ? this.height/2 : options.ceiling;
//
//   //Background, highlight and hover respectively.
//   this.bgColour = options.bgColour === undefined ? "#7a7b7b" : options.bgColour;
//   this.hlColour = options.hlColour === undefined ? "#f77007" : options.hlColour;
//   this.hvColour = options.hvColour === undefined ? "#e0e0e0" : options.hvColour;
//
//   //Internal stuff
//   window.AudioContext = window.AudioContext || window.webkitAudioContext;
//   this._playing = false;
//   this._audioContext = new AudioContext();
//   //Will be set to true when the rest of the init stuff is finished.
//   this._loaded = false;
//   AudioPlayer.numInstances++;
//   this._audioData = [];
//   this._playTime = 0;
//   this._playTimer = null;
//   this._mouseX = 0;
//   this._firstRun = true;
//   this._loadDeltaTime = 0;
//   //Build audio player.
//   this._init();
// }
//
// AudioPlayer.prototype._init = function() {
//   this._createCanvas();
//   this._loadAudioFile();
//   this._draw();
// };
//
// //Starts playing the audio.
// AudioPlayer.prototype.play = function() {
//   if (!this._playing) {
//     this._audioSource = this._audioContext.createBufferSource();
//     this._audioSource.buffer = this._audioBuffer;
//     this._audioSource.connect(this._audioContext.destination);
//     this._audioSource.start(0, this._playTime);
//     this._playing = true;
//     var self = this;
//
//     this._playStart = Date.now();
//     this._previousPlayTime = this._playTime;
//     this._playTimer = window.setInterval(function() {
//       var currentTime = Date.now();
//       self._playTime = ((currentTime - self._playStart)/1000) + self._previousPlayTime;
//     }, 30);
//   }
// };
//
// //Pauses the audio.
// AudioPlayer.prototype.pause = function() {
//   if(this._playing) {
//     this._audioSource.stop();
//     this._playing = false;
//     clearInterval(this._playTimer);
//   }
// };
//
// //Draws our frames.
// AudioPlayer.prototype._draw = function() {
//   //Clear the canvas.
//   var backCanvas = document.createElement("canvas");
//   backCanvas.width = this.width;
//   backCanvas.height = this.height;
//   var backContext = backCanvas.getContext('2d');
//
//   backContext.clearRect(0, 0, this.width, this.height);
//   this._drawingContext.clearRect(0, 0, this.width, this.height);
//
//   if (this._loaded) {
//     var waveImage = this._waveContext.getImageData(0, 0, this.width, this.height);
//     var hlWaveImage = this._hlWaveContext.getImageData(0, 0, this.width, this.height);
//     backContext.putImageData(waveImage, 0, 0);
//
//     if(this._playTime > 0) {
//       var playSample = this._playTime * this._audioContext.sampleRate;
//       var playScaledSample = playSample / this.scaleFactor;
//       var hlWaveX = this._xStep * playScaledSample;
//       backContext.putImageData(hlWaveImage, 0, 0, 0, 0, hlWaveX, this.height);
//     }
//
//       //Draw seek line if needed.
//     if(this._mouseX > 0) {
//       backContext.strokeStyle = this.hvColour;
//       backContext.beginPath();
//       backContext.moveTo(this._mouseX, this.height);
//       backContext.lineTo(this._mouseX, 0);
//       backContext.stroke();
//     }
//
//     //Render the frame.
//     var image = backContext.getImageData(0, 0, this.width, this.height);
//     this._drawingContext.putImageData(image, 0, 0);
//
//     } else {
//       //Not loaded yet. Draw Animation
//       this._drawLoadingAnimation();
//     }
//
//   //Request our next frame.
//   var self = this;
//   window.requestAnimationFrame(function() {
//     self._draw();
//   });
// };
//
// AudioPlayer.prototype._drawLoadingAnimation = function () {
//   this._loadDeltaTime += 0.1;
//
//   this._drawingContext.strokeStyle = this.hvColour;
//   this._drawingContext.fillStyle = this.hvColour;
//   for(var i = 0; i < 8; i++) {
//     var heightOffset = Math.sin(this._loadDeltaTime + i) * 20;
//     this._drawingContext.beginPath();
//     this._drawingContext.arc((this.width/2) - (i * 20) + 60, (this.height/2) + heightOffset, 5, 0, 360);
//     this._drawingContext.fill();
//     this._drawingContext.stroke();
//   }
//
//
// };
//
// AudioPlayer.prototype._createCanvas = function() {
//   //Create the canvas.
//   var buttonContainerID = "ac-controls" + AudioPlayer.numInstances;
//   var canvasContainerID = "ac-surface" + AudioPlayer.numInstances;
//   var playButtonID = "ac-play-btn" + AudioPlayer.numInstances;
//   var canvasID = "ac-" + AudioPlayer.numInstances;
//   var containerClass = "ac-container";
//   var playContainerClass = "ac-play-container";
//   var playClass = "ac-play";
//
//
//   $('<div>', {
//     id: buttonContainerID,
//     class: containerClass + " " + playContainerClass
//   }).css({
//     width:  this.height + "px",
//     height: this.height + "px"
//   }).appendTo(this.element);
//
//   $('<div>', {
//     id: canvasContainerID,
//     class: containerClass
//   }).css({
//     width: this.width + "px",
//     height: this.height + "px"
//   }).appendTo(this.element);
//
//   $('<canvas>', {
//     id: canvasID
//   }).prop({
//     width: this.width,
//     height: this.height
//   }).appendTo("#"+canvasContainerID);
//
//   $('<button>', {
//     id: playButtonID,
//     class: playClass
//   }).css({
//     width: (this.height - 30) + "px",
//     height: (this.height - 30) + "px"
//   }).appendTo("#"+buttonContainerID);
//
//   this._drawingCanvas = document.getElementById(canvasID);
//   this._drawingContext = this._drawingCanvas.getContext('2d');
//   var self = this;
//
//   $("#"+playButtonID).on('click', function() {
//     if(self._loaded) {
//       if(!self._playing) {
//       $(this).addClass("ac-playing");
//     } else {
//       $(this).removeClass("ac-playing");
//     }
//     self._togglePlay();
//     }
//   });
//
//   $("#"+canvasID).mousemove(function(e) {
//     self._mouseX = (e.clientX - this.height)-10;
//   });
//   $("#"+canvasID).mouseleave(function() {
//     self._mouseX = 0;
//   });
//   $("#"+canvasID).on('click', function() {
//     if(self._mouseX > 0) {
//       var numElements = (self._audioData.length / self.scaleFactor);
//       var samplesPerPixel = numElements / self.width;
//       var selectedSample = (self._mouseX * samplesPerPixel)*self.scaleFactor;
//       var selectedTime = selectedSample / self._audioContext.sampleRate;
//       if(self._playing) {
//         self.pause();
//         self._playTime = selectedTime;
//         self.play();
//       } else {
//         self._playTime = selectedTime;
//       }
//     }
//   });
// };
//
// AudioPlayer.prototype._togglePlay = function() {
//   if(this._playing) {
//     this.pause();
//   } else {
//     this.play();
//   }
// };
//
// AudioPlayer.prototype._generateLayers = function() {
//   this._waveCanvas = document.createElement("canvas");
//   this._waveCanvas.width = this.width;
//   this._waveCanvas.height = this.height;
//   this._waveContext = this._waveCanvas.getContext('2d');
//
//   this._hlWaveCanvas = document.createElement("canvas");
//   this._hlWaveCanvas.width = this.width;
//   this._hlWaveCanvas.height = this.height;
//   this._hlWaveContext = this._hlWaveCanvas.getContext('2d');
//
//   var currentX = 0;
//   var midY = (this.height / 2);
//   var currentY = midY;
//
//   for (var i = 0; i < this._sampledData.length; i++) {
//       //Have to draw a point here.
//       var scaledSample = this._sampledData[i];
//
//       this._waveContext.strokeStyle = this.bgColour;
//       this._waveContext.beginPath();
//       this._waveContext.moveTo(currentX-this._xStep, currentY);
//       this._waveContext.lineTo(currentX, (midY + scaledSample));
//       this._waveContext.stroke();
//
//       this._hlWaveContext.strokeStyle = this.hlColour;
//       this._hlWaveContext.beginPath();
//       this._hlWaveContext.moveTo(currentX-this._xStep, currentY);
//       this._hlWaveContext.lineTo(currentX, (midY + scaledSample));
//       this._hlWaveContext.stroke();
//
//       currentY = (midY + scaledSample);
//       currentX += this._xStep;
//   }
// };
//
// AudioPlayer.prototype._loadAudioFile = function() {
//   var request = new XMLHttpRequest();
//   request.open("GET", this.file, true);
//   request.responseType = "arraybuffer";
//   var self = this;
//
//   //On successful load.
//   request.onload = function() {
//     if (request.status == 200) {
//       self._audioContext.decodeAudioData(request.response, function(buffer) {
//         self._audioBuffer = buffer;
//         self._audioSource = self._audioContext.createBufferSource();
//         self._audioSource.buffer = self._audioBuffer;
//         self._audioSource.connect(self._audioContext.destination);
//
//
//         //Mix two channels down to mono if necessary for waveform drawing.
//         if (self._audioBuffer.numberOfChannels > 1) {
//           //Stereo
//           var leftChannel = self._audioBuffer.getChannelData(0);
//           var rightChannel = self._audioBuffer.getChannelData(1);
//
//           //Average samples into a single channel.
//           for (var i = 0; i < leftChannel.length; i++) {
//             self._audioData[i] = (leftChannel[i] + rightChannel[i]) / 2;
//           }
//         } else {
//           //Mono
//           self._audioData = self._audioBuffer.getChannelData(0);
//         }
//
//         //Average samples for drawing.
//         self._numElements = Math.round(self._audioData.length / self.scaleFactor);
//         self._xStep = (self.width / self._numElements);
//         self._sampledData = [];
//
//         var avgSample = 0;
//
//         for(var i = 0; i < self._audioData.length; i++) {
//           if((i % self.scaleFactor) == 0) {
//               var scaledSample = ((avgSample / self.scaleFactor) * self.amplify);
//               self._sampledData[i/self.scaleFactor] = Math.min(Math.max(scaledSample, -(self.ceiling)), self.ceiling);
//               avgSample = 0;
//           }
//           avgSample += self._audioData[i] * self.height;
//         }
//
//         self._generateLayers();
//         //Wait a couple of seconds to show off the loading animation.
//         setTimeout(function(){self._loaded = true;}, 1000);
//       }, function(e) {
//         //Some sort of error in decoding the audio data.
//         throw new AudioPlayerException("Error decoding audio data: " + e.err);
//       });
//     } else {
//       //Not loaded successfully.
//       throw new AudioPlayerException("Unable to load audio file '" + self.file + "'");
//     }
//   };
//
//   //On Error
//   request.onerror = function() {
//     throw new AudioPlayerException("Unable to load audio file '" + self.file + "'");
//   };
//
//   request.send();
// };
//
// function AudioPlayerException(message) {
//   this.message = message;
//   this.name = "AudioPlayerException";
// }
//
// $(document).ready(function() {
//   var playerCount = 0;
//   $("[data-ap]").each(function() {
//     var playerID = "ap-top-" + playerCount;
//     $(this).attr("ID", playerID);
//     new AudioPlayer({
//       element: "#" + playerID,
//       file: $(this).data("ap-file"),
//       width: 500,
//       amplify: 2,
//       scaleFactor: 60
//     });
//   });
// });

var SC=SC||{};SC.Widget=function(n){function t(r){if(e[r])return e[r].exports;var o=e[r]={exports:{},id:r,loaded:!1};return n[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var e={};return t.m=n,t.c=e,t.p="",t(0)}([function(n,t,e){function r(n){return!!(""===n||n&&n.charCodeAt&&n.substr)}function o(n){return!!(n&&n.constructor&&n.call&&n.apply)}function i(n){return!(!n||1!==n.nodeType||"IFRAME"!==n.nodeName.toUpperCase())}function a(n){var t,e=!1;for(t in b)if(b.hasOwnProperty(t)&&b[t]===n){e=!0;break}return e}function s(n){var t,e,r;for(t=0,e=I.length;t<e&&(r=n(I[t]),r!==!1);t++);}function u(n){var t,e,r,o="";for("//"===n.substr(0,2)&&(n=window.location.protocol+n),r=n.split("/"),t=0,e=r.length;t<e&&t<3;t++)o+=r[t],t<2&&(o+="/");return o}function c(n){return n.contentWindow?n.contentWindow:n.contentDocument&&"parentWindow"in n.contentDocument?n.contentDocument.parentWindow:null}function l(n){var t,e=[];for(t in n)n.hasOwnProperty(t)&&e.push(n[t]);return e}function d(n,t,e){e.callbacks[n]=e.callbacks[n]||[],e.callbacks[n].push(t)}function E(n,t){var e,r=!0;return t.callbacks[n]=[],s(function(t){if(e=t.callbacks[n]||[],e.length)return r=!1,!1}),r}function f(n,t,e){var r,o,i=c(e);return!!i.postMessage&&(r=e.getAttribute("src").split("?")[0],o=JSON.stringify({method:n,value:t}),"//"===r.substr(0,2)&&(r=window.location.protocol+r),r=r.replace(/http:\/\/(w|wt).soundcloud.com/,"https://$1.soundcloud.com"),void i.postMessage(o,r))}function p(n){var t;return s(function(e){if(e.instance===n)return t=e,!1}),t}function h(n){var t;return s(function(e){if(c(e.element)===n)return t=e,!1}),t}function v(n,t){return function(e){var r=o(e),i=p(this),a=!r&&t?e:null,s=r&&!t?e:null;return s&&d(n,s,i),f(n,a,i.element),this}}function S(n,t,e){var r,o,i;for(r=0,o=t.length;r<o;r++)i=t[r],n[i]=v(i,e)}function R(n,t,e){return n+"?url="+t+"&"+g(e)}function g(n){var t,e,r=[];for(t in n)n.hasOwnProperty(t)&&(e=n[t],r.push(t+"="+("start_track"===t?parseInt(e,10):e?"true":"false")));return r.join("&")}function m(n,t,e){var r,o,i=n.callbacks[t]||[];for(r=0,o=i.length;r<o;r++)i[r].apply(n.instance,e);(a(t)||t===L.READY)&&(n.callbacks[t]=[])}function w(n){var t,e,r,o,i;try{e=JSON.parse(n.data)}catch(a){return!1}return t=h(n.source),r=e.method,o=e.value,(!t||A(n.origin)===A(t.domain))&&(t?(r===L.READY&&(t.isReady=!0,m(t,C),E(C,t)),r!==L.PLAY||t.playEventFired||(t.playEventFired=!0),r!==L.PLAY_PROGRESS||t.playEventFired||(t.playEventFired=!0,m(t,L.PLAY,[o])),i=[],void 0!==o&&i.push(o),void m(t,r,i)):(r===L.READY&&T.push(n.source),!1))}function A(n){return n.replace(Y,"")}var _,y,O,D=e(1),b=e(2),P=e(3),L=D.api,N=D.bridge,T=[],I=[],C="__LATE_BINDING__",k="http://wt.soundcloud.dev:9200/",Y=/^http(?:s?)/;window.addEventListener?window.addEventListener("message",w,!1):window.attachEvent("onmessage",w),n.exports=O=function(n,t,e){if(r(n)&&(n=document.getElementById(n)),!i(n))throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");t&&(e=e||{},n.src=R(k,t,e));var o,a,s=h(c(n));return s&&s.instance?s.instance:(o=T.indexOf(c(n))>-1,a=new _(n),I.push(new y(a,n,o)),a)},O.Events=L,window.SC=window.SC||{},window.SC.Widget=O,y=function(n,t,e){this.instance=n,this.element=t,this.domain=u(t.getAttribute("src")),this.isReady=!!e,this.callbacks={}},_=function(){},_.prototype={constructor:_,load:function(n,t){if(n){t=t||{};var e=this,r=p(this),o=r.element,i=o.src,a=i.substr(0,i.indexOf("?"));r.isReady=!1,r.playEventFired=!1,o.onload=function(){e.bind(L.READY,function(){var n,e=r.callbacks;for(n in e)e.hasOwnProperty(n)&&n!==L.READY&&f(N.ADD_LISTENER,n,r.element);t.callback&&t.callback()})},o.src=R(a,n,t)}},bind:function(n,t){var e=this,r=p(this);return r&&r.element&&(n===L.READY&&r.isReady?setTimeout(t,1):r.isReady?(d(n,t,r),f(N.ADD_LISTENER,n,r.element)):d(C,function(){e.bind(n,t)},r)),this},unbind:function(n){var t,e=p(this);e&&e.element&&(t=E(n,e),n!==L.READY&&t&&f(N.REMOVE_LISTENER,n,e.element))}},S(_.prototype,l(b)),S(_.prototype,l(P),!0)},function(n,t){t.api={LOAD_PROGRESS:"loadProgress",PLAY_PROGRESS:"playProgress",PLAY:"play",PAUSE:"pause",FINISH:"finish",SEEK:"seek",READY:"ready",OPEN_SHARE_PANEL:"sharePanelOpened",CLICK_DOWNLOAD:"downloadClicked",CLICK_BUY:"buyClicked",ERROR:"error"},t.bridge={REMOVE_LISTENER:"removeEventListener",ADD_LISTENER:"addEventListener"}},function(n,t){n.exports={GET_VOLUME:"getVolume",GET_DURATION:"getDuration",GET_POSITION:"getPosition",GET_SOUNDS:"getSounds",GET_CURRENT_SOUND:"getCurrentSound",GET_CURRENT_SOUND_INDEX:"getCurrentSoundIndex",IS_PAUSED:"isPaused"}},function(n,t){n.exports={PLAY:"play",PAUSE:"pause",TOGGLE:"toggle",SEEK_TO:"seekTo",SET_VOLUME:"setVolume",NEXT:"next",PREV:"prev",SKIP:"skip"}}]);
