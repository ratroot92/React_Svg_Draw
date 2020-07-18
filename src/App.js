import React from "react";
import "./styles.css";
import Header from "./Header";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null
    };
    this.isColor = this.isColor.bind(this);
    this.draw = this.draw.bind(this);
    this.Plot = this.Plot.bind(this);
    this.consoleLogger = this.consoleLogger.bind(this);
    this.cleanDrawSpace = this.cleanDrawSpace.bind(this);
    this.Draw = this.Draw.bind(this);
    this.generateRandomColor = this.generateRandomColor.bind(this);
  }
  //validate if string is color
  isColor(strColor) {
    var s = new Option().style;
    s.color = strColor;
    return s.color === strColor;
  }

  generateRandomColor() {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
    //random color will be freshly served
  }
  // console.log overriding default implementation
  Plot() {
    console.log("Plotter Clicked");
  }
  //Logger
  consoleLogger(string) {
    let logger = document.getElementById("logDetails");
    let inputError = document.getElementById("inputError");
    var tagNode = document.createElement("LI"); // Create a <li> node
    var textNode = document.createTextNode("" + string); // Create a text node
    tagNode.appendChild(textNode); // Append the text to <li>
    logger.insertBefore(tagNode, logger.childNodes[0]);
    if (string.includes("warning")) {
      inputError.innerHTML = "";
      inputError.innerHTML += "" + string + "<br/>";
    }
  }

  cleanDrawSpace() {
    var drawContainer = document.getElementById("draw_div");
    drawContainer.innerHTML = "";
    this.consoleLogger("-- info -- Draw Space Cleared Sucessfully ");
  }

  Draw() {
    let inputField = document.getElementById("text_field");
    var input = inputField.value.trim();
    var numberOfLineBreaks = (input.match(/\n/g) || []).length;
    if (numberOfLineBreaks > 0) {
      var arr_input = input.split("\n");
      for (value of arr_input) {
        this.draw(value);
      }
    } else {
      this.draw(input);
    }
  }

  draw(input) {
    let TextField = document.getElementById("text_field");
    var drawContainer = document.getElementById("draw_div");
    input = input.trim();

    if (input === "") {
      this.consoleLogger("-- warning -- No input is provided by user");
      TextField.style.borderColor = "red";
    } else {
      this.consoleLogger("-- info -- Received Input ");
      this.consoleLogger("-- info --  " + input);
      let input_array = input.split(" ");
      this.consoleLogger("-- info --  Spliting input with white spaces  ");
      this.consoleLogger("-- info --  CommandType   [" + input_array[0] + "]");
      if (
        input_array[0] === "r" ||
        input_array[0] === "R" ||
        input_array[0] === "P" ||
        input_array[0] === "p" ||
        input_array[0] === "c" ||
        input_array[0] === "C"
      ) {
        this.consoleLogger(
          "-- info --  Draw Type  Recived=  " + input_array[0]
        );
        if (input_array[0] === "R" || input_array[0] === "r") {
          if (input_array.length === 5) {
            this.consoleLogger("-- info --  Shape = [Rectangle]  ");
            this.consoleLogger(
              "-- info -- Recieved  <X Cordinate> =  " +
                input_array[1] +
                " <Y Cordinate> =  " +
                input_array[2] +
                " <width> =  " +
                input_array[3] +
                " <height> =  " +
                input_array[4]
            );

            if (
              isNaN(input_array[0]) === true &&
              isNaN(input_array[1]) === false &&
              isNaN(input_array[2]) === false &&
              isNaN(input_array[3]) === false &&
              isNaN(input_array[4]) === false
            ) {
              this.consoleLogger("-- info --  Drawing Coordinate Verified ");
              this.consoleLogger(
                "-- info --  Initializing SVG Wrapper --with URI = 'http://www.w3.org/2000/svg'   "
              );
              //create SVG wrapper
              let RectSVGWrapper = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg",
                ""
              );
              //set SVG wrapper width and height
              RectSVGWrapper.setAttribute("width", "250");
              RectSVGWrapper.setAttribute("height", "250");

              this.consoleLogger(
                "-- info --  SVG Wrapper created with height=500px width=500px "
              );
              const rect = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
              );
              //create rectangle rect
              rect.setAttribute("x", input_array[1]);
              rect.setAttribute("y", input_array[2]);
              rect.setAttribute("width", input_array[3]);
              rect.setAttribute("height", input_array[4]);
              rect.setAttribute("fill", "" + this.generateRandomColor() + "");
              //append in SVG wrapper
              RectSVGWrapper.appendChild(rect);

              //append in div
              // this.consoleLogger("-- info --  Drawing Container cleaned  ");
              // drawContainer.innerHTML = "";
              drawContainer.appendChild(RectSVGWrapper);
              this.consoleLogger(
                "-- success --  Rectangle drawn with given dimensions successfully   "
              );
            } else {
              if (!isNaN(input_array[1]) === false) {
                this.consoleLogger(
                  "-- warning --  <X Cordinate > is wrong = " + input_array[1]
                );
              }
              if (!isNaN(input_array[2]) === false) {
                this.consoleLogger(
                  "-- warning --  <y Cordinate > is wrong = " + input_array[2]
                );
              }
              if (!isNaN(input_array[3]) === false) {
                this.consoleLogger(
                  "-- warning --  <width> is wrong = " + input_array[3]
                );
              }
              if (!isNaN(input_array[4]) === false) {
                this.consoleLogger(
                  "-- warning --  <height> is wrong = " + input_array[3]
                );
              }
            }
          } else {
            this.consoleLogger(
              "-- warning --  Input mismatched  for rectangle "
            );
          }
        }
        //END RECTANGLE
        //CASE CIRCLE
        else if (input_array[0] === "C" || input_array[0] === "c") {
          if (input_array.length === 4) {
            this.consoleLogger("-- info --  Shape = [Circle]  ");
            this.consoleLogger(
              "-- info -- Recieved  <CX Cordinate> =  " +
                input_array[1] +
                " <CY Cordinate> =  " +
                input_array[2] +
                "<radius> =  " +
                input_array[3]
            );
            //if input values are valid number s and strings
            if (
              isNaN(input_array[0]) === true &&
              isNaN(input_array[1]) === false &&
              isNaN(input_array[2]) === false &&
              isNaN(input_array[3]) === false
            ) {
              this.consoleLogger("-- info --  Drawing coordinate Verified ");
              this.consoleLogger(
                "-- info --  Initializing SVG wrapper --with URI = 'http://www.w3.org/2000/svg'   "
              );
              //create SVG wrapper
              let CircleSVGWrapper = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg",
                ""
              );
              //set SVG wrapper width and height
              CircleSVGWrapper.setAttribute("width", "250");
              CircleSVGWrapper.setAttribute("height", "250");
              this.consoleLogger(
                "-- info --  SVG wrapper created with height=500px width=500px "
              );
              const circle = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
              );
              //create circleangle circle
              circle.setAttribute("cx", input_array[1]);
              circle.setAttribute("cy", input_array[2]);
              circle.setAttribute("r", input_array[3]);
              circle.setAttribute("fill", "" + this.generateRandomColor() + "");
              //append in SVG wrapper
              CircleSVGWrapper.appendChild(circle);

              //append in div
              // this.consoleLogger("-- info --  Drawing container cleaned  ");
              // drawContainer.innerHTML = "";
              drawContainer.appendChild(CircleSVGWrapper);
              this.consoleLogger(
                "-- success --  Circle drawn with given dimensions successfully   "
              );
            }
            //ELSE -- problem in any input array value
            else {
              if (!isNaN(input_array[1]) === false) {
                this.consoleLogger(
                  "-- warning --  <CX Cordinate > is wrong = " + input_array[1]
                );
              }
              if (!isNaN(input_array[2]) === false) {
                this.consoleLogger(
                  "-- warning --  <CY Cordinate > is wrong = " + input_array[2]
                );
              }
              if (!isNaN(input_array[3]) === false) {
                this.consoleLogger(
                  "-- warning --  <raidus> is wrong = " + input_array[3]
                );
              }
            }
            //END -- if input values are valid number s and strings
          }

          //Circle input array sized mismateched
          else {
            this.consoleLogger(
              "-- warning -- Input mismatched with required format   "
            );
          }
        } else if (input_array[0] === "P" || input_array[0] === "p") {
          this.consoleLogger("-- info --  Shape = [Polygon]  ");

          let status = true;
          let re = new RegExp("([0-9]{2,3}),?");
          for (var x = 0; x < input_array.length; x++) {
            if (x === 0 || x === "0") {
            } else {
              console.log(input_array[x]);
              status = re.test(input_array[x]);
              console.log(status);
            }
          }
          //if any value fails to match
          if (status === true) {
            this.consoleLogger(
              "-- info --  All recieved polygons pionts are valid   "
            );
            let PolygonWrapper = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg",
              ""
            );
            //set SVG wrapper width and height
            PolygonWrapper.setAttribute("width", "250");
            PolygonWrapper.setAttribute("height", "250");
            var Polygon = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "polygon"
            );
            Polygon.setAttribute("fill", "" + this.generateRandomColor() + "");
            Polygon.setAttribute("stroke", "black");
            Polygon.setAttribute("strokeWidth", "1");
            PolygonWrapper.appendChild(Polygon);
            input_array.shift();
            for (var i = 0; i < input_array.length; i++) {
              input_array[i] = [input_array[i]];
            }
            console.log("###########");
            for (var x = 0; x < input_array.length; x++) {
              var arr = input_array[x].toString().split(",");
              console.log(input_array[0]);
              var point = PolygonWrapper.createSVGPoint();
              point.x = arr[0];
              point.y = arr[1];
              Polygon.points.appendItem(point);
            }
            console.log(Polygon);
            drawContainer.appendChild(PolygonWrapper);
            //create polygon from array
          }
          //polygons pionts are in valid
          else {
            this.consoleLogger(
              "-- warning --  Received polygon pionts are in valid "
            );
          }
        } else {
          this.consoleLogger(
            "-- warning  --  Allowed shapes are Rectangle ['p','P'] , Circle ['c','C'] and Polygon ['p','P']  "
          );
          this.consoleLogger("-- warning  --  Input mismatched  ");
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container-fluid">
          <div className="row d-flex flex-row justify-content-center">
            <div className="col-md-12 jumbotron text-center ">
              <h2 className="text-muted">HOW TO PLOT </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4  card-header border border-dark text-center  ">
              <h3 className="text-success font-weight-bold ">Draw Rectangle</h3>
            </div>
            <div className="col-md-4  card-header border border-dark text-center">
              <h3 className="text-success font-weight-bold ">Draw Circle</h3>
            </div>
            <div className="col-md-4  card-header border border-dark text-center  ">
              <h3 className="text-success font-weight-bold ">Draw Polygon</h3>
            </div>
            {/*  */}
            <div className="col-md-4   card-body border border-dark text-center  ">
              <code className="text-info  ">
                -- Rectangle -- R &lt;X Corodinate&gt; &lt;Y Cordinate&gt;
                &lt;Width&gt; &lt;Height&gt;
                <br />
                -- Example -- R 80 80 40 40
                <br />r 100 50 25 25
              </code>
              <br />
              <br />
              <code>
                &lt;svg width="400" height="180"&gt; &lt;rect x="50" y="20"
                width="150" height="150" fill="lime" stroke="purple"
                strokeWidth="1" /&gt; &lt;/svg&gt;
              </code>
            </div>
            {/*  */}
            <div className="col-md-4   card-body border border-dark text-center  ">
              <code className="text-info  ">
                -- Circle -- C &lt;Cx Cordinate&gt; &lt;Cy Cordinate&gt;
                &lt;Radius&gt;
                <br />
                -- Example -- C 80 80 40
                <br />c 20 100 20
              </code>
              <br />
              <br />
              <code>
                &lt;svg height="100" width="100"&gt; &lt;circle cx="50" cy="50"
                r="40" stroke="black" strokeWidth="3" fill="red" /&gt;
                &lt;/svg&gt;
              </code>
            </div>
            {/*  */}
            <div className="col-md-4   card-body border border-dark text-center  ">
              <code className="text-info  ">
                -- Polygon -- &lt;X1,Y1&gt; &lt;X2,y2&gt;.....&lt;Xn,Yn&gt;
                <br />
                -- Example -- P 200,10 250,190 160,210
                <br />p 200,10 250,190 160,210
              </code>
              <br />
              <br />
              <code>
                &lt;svg height="250" width="500"&gt; &lt;polygon points="220,10
                300,210 170,250 123,234" fill="lime" stroke="purple"
                strokeWidth="1" /&gt; &lt;/svg&gt;
              </code>
            </div>
            {/*  */}
            <div className="col-md-4 border border-dark d-flex flex-row justify-content-center  align-items-center text-center  ">
              <svg width="400" height="180">
                <rect
                  x="50"
                  y="20"
                  width="150"
                  height="150"
                  fill="lime"
                  stroke="purple"
                  strokeWidth="1"
                />
              </svg>
            </div>
            {/*  */}
            <div className="col-md-4 border border-dark d-flex flex-row justify-content-center  align-items-center text-center">
              <svg height="100" width="100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="black"
                  strokeWidth="3"
                  fill="red"
                />
              </svg>
            </div>
            {/*  */}
            <div className="col-md-4 border border-dark d-flex flex-row justify-content-center  align-items-center text-center  ">
              <svg height="250" width="500">
                <polygon
                  points="220,10 300,210 170,250 123,234"
                  fill="lime"
                  stroke="purple"
                  strokeWidth="1"
                />
              </svg>
            </div>
            {/*  */}
          </div>
          {/* row */}
          <div className="row">
            {/* logger start  */}
            <div className="col-md-6 bg-dark   text-center " id="">
              <div className="row">
                <div className="col-md-12">
                  <h2 className=" text-white btn btn-lg btn-info mt-2 text-uppercase ">
                    <i className="fa fa-history" aria-hidden="true" />
                    Application Logger{" "}
                  </h2>
                </div>
                <div
                  className="col-md-12 jumbotron border  loggerWrapper"
                  id=""
                >
                  <code id="logDetails" />
                </div>
              </div>
            </div>
            {/* logger end  */}
            {/* start input field  */}
            <div className="col-md-6  bg-dark  d-flex flex-column justify-content-start align-items-center ">
              <h2 className=" text-white btn btn-lg mt-2 btn-info text-uppercase ">
                <i className="fa fa-file" aria-hidden="true" />
                Text Area
              </h2>
              <textarea
                className="form-control"
                name="text_field"
                id="text_field"
                rows="10"
                cols="30"
                placeholder="Enter value "
              />
              <div
                id="inputError"
                className="inputError text-center   text-warning font-weight-bold  w-100 "
              />
            </div>

            {/* end input field  */}
          </div>
          {/* row end  */}

          <div className="row">
            <div className="col-md-12 text-center  mt-5 ">
              <button
                className="customBtn font-weight-bold"
                onClick={this.Draw}
              >
                PLOT
              </button>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-12 card-header text-center">
              <h1 className="text-priamry float-left">Draw Space Below </h1>
              <button
                className="btn btn-warning float-right"
                onClick={this.cleanDrawSpace}
              >
                CLEAR DRAW AREA
              </button>
              <div id="draw_div" className="draw_div " />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
