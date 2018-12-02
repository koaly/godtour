import React, { Component } from "react";
import "./hompage.css";
import Form from "../common/form";
import { NotificationsIcon, ShowerHeadIcon } from "mdi-react";
import Spinner from "../common/spinner";
import { showRandomTour } from "../../services/homeService";
import { toast } from "react-toastify";
import SlideBox from "./slideBox";
import TourIn from "./tourIntro";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tours: [],
      isLoaded: false
    };
  }

  async getTour() {
    try {
      const response = await showRandomTour();

      const { tours } = response.data;
      this.setState({ tours });
    } catch (e) {
      const message = e.response.data.error.message;
      toast.error(`${message}`);
    }
  }
  async componentDidMount() {
    await this.getTour();
    this.setState({ isLoaded: true });
  }

  render() {
    const { isLoaded } = this.state;
    // if (!isLoaded) {
    //   return (
    //     <div className="container text-align mgtb-2">
    //       <div>
    //         <Spinner />
    //       </div>
    //     </div>
    //   );
    // }

    return (
      <div>
        <div className="HomePage">
          <SlideBox />
        </div>
        <center>
          <h1 className="mb-5">Why Tour with To-ur World?</h1>
        </center>
        <TourIn />
      </div>
    );
  }
}

export default HomePage;
