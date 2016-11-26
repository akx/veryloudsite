var ctx = new AudioContext();
var sp = ctx.createScriptProcessor(0, 0, 1);
var bit = 0, div = 0, t = 0;

setInterval(function () {
  if (Math.random() < 0.1) {
    div = 2 + Math.random() * 600;
  }
}, 50);

sp.onaudioprocess = function (event) {
  var buf = event.outputBuffer;
  var prob = Math.random() * 0.05;
  for (var ch = 0; ch < buf.numberOfChannels; ch++) {
    var data = buf.getChannelData(ch);
    for (var i = 0; i < buf.length; i++) {
      if (Math.random() < prob) bit = 1 - bit;
      var byte = bit * 250; // 1 bit noise
      byte <<= i % div;
      byte += (t++ < div);
      data[i] = -1 + (byte & 0xFF) / 128;
    }
  }
};
sp.connect(ctx.destination);
