export default function sketch(p) {
  let data_objects;

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    props.data ? (data_objects = props.data) : (data_objects = {});
  };

  p.setup = function() {
    console.log("P5: " + data_objects);
    p.createCanvas(500, 500);
    p.colorMode(p.HSB, 360, 100, 100, 100);
  };

  p.draw = function() {
    p.background(95);
    p.fill(0);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(data_objects.length, 100, 100);
  };
}
