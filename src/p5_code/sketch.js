import p5Dom from "p5/lib/addons/p5.dom.js";

export default function sketch(p) {
  let data_objects;

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    props.data ? (data_objects = props.data) : (data_objects = {});
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.redraw();
  };

  p.setup = function() {
    // console.log("P5: " + data_objects);
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 100);
  };

  p.draw = function() {
    p.background(10);
    p.fill(95);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(100);
    p.text(data_objects.length, p.width / 2, p.height / 2);
  };
}
