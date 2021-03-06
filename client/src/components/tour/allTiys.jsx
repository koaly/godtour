import React, { Component } from "react";
import { getAllTiys } from "../../services/tiyService";
import { Link } from "react-router-dom";
import "../../css/formInput.css";
import "../../css/allTiys.css";

class AllTiys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      tiys: [],
      mode: 0
    };
    this.nameStyle = " width30";
    this.secondStyle = " width20";
    this.thirdStyle = " width15";
  }

  async componentDidMount() {
    this.downloadTiys();
    this.updateDimension();
    window.addEventListener("resize", this.updateDimension.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimension.bind(this));
  }
  updateDimension() {
    console.log(
      "width : height of window is ",
      window.innerWidth,
      window.innerHeight
    );
    let widthSize = window.innerWidth;
    if (widthSize > 660) {
      this.setState({ mode: 0 });
      this.nameStyle = " width30";
      this.secondStyle = " width20";
    } else if (widthSize < 660) {
      this.nameStyle = " width30";
      this.secondStyle = " width25";
      this.setState({ mode: 1 });
    }
  }

  async downloadTiys() {
    console.log("Download Data ");
    const { data } = await getAllTiys();
    const { tiys } = data;
    this.setState({ tiys, isLoaded: true });
    console.log(data);
    console.log(tiys);
  }

  async downloadTiys() {
    console.log("Download Data ");
    const { data } = await getAllTiys();
    const { tiys } = data;
    this.setState({ tiys, isLoaded: true });
    console.log(data);
    console.log(tiys);
  }

  updateDimension() {
    let width = window.innerWidth;
    console.log("width is ", width);
    if (width > 660) {
      this.firstStyle = " width30";
      this.secondStyle = " width20";
      this.thirdStyle = " width15";
      this.setState({ mode: 0 });
    } else if (width > 440) {
      this.firstStyle = " width35";
      this.secondStyle = " width25";
      this.setState({ mode: 1 });
    } else {
      this.firstStyle = " width40";
      this.secondStyle = " width35";
      this.setState({ mode: 2 });
    }
  }

  componentWillUnmound() {
    window.removeEventListener("resize", this.updateDimension.bind(this));
  }

  render() {
    const { tiys, isLoaded, mode } = this.state;
    console.log(tiys);
    return (
      <div className=" minWidth100  mgtb">
        <h1 className="minWidth100 textCenter">List Tour by Customer</h1>
        <div className=" minWidth100 clearBoth  headColumn">
          <div
            className={"textLeft paddingLeft4 sameLine mb-2" + this.firstStyle}
          >
            NAME TOUR
          </div>
          <div className={"textCenter sameLine mb-2" + this.secondStyle}>
            DESTINATION
          </div>
          {mode < 2 && (
            <div className={"textCenter sameLine mb-2" + this.secondStyle}>
              PRICE
            </div>
          )}
          {mode < 1 && (
            <div className={"textCenter sameLine mb-2" + this.thirdStyle}>
              DURATION
            </div>
          )}
        </div>
        {isLoaded &&
          tiys.map(t => (
            <div className="">
              <p
                key={t._id}
                className={"sameLine paddingLeft2" + this.firstStyle}
                style={{ fontSize: 18 }}
              >
                {t.name}
              </p>
              <p
                className={"sameLine textCenter" + this.secondStyle}
                style={{ fontSize: 18 }}
              >
                {t.dest}
              </p>
              {mode < 2 && (
                <p
                  className={"sameLine textCenter" + this.secondStyle}
                  style={{ fontSize: 18 }}
                >
                  {t.minPrice} - {t.maxPrice}
                </p>
              )}
              {mode < 1 && (
                <p
                  className={"sameLine textCenter" + this.thirdStyle}
                  style={{ fontSize: 18 }}
                >
                  {t.minDuration} - {t.maxDuration}
                </p>
              )}
              <Link
                className="btn btn-primary sameLine width10"
                to={{
                  pathname: `/${t._id}/createOffer`,
                  state: {
                    tiys: t
                  }
                }}
              >
                CREATE
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

export default AllTiys;
