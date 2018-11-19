import React, { Component } from "react";
import "./hompage.css";
import Form from "../common/form";
import { NotificationsIcon, ShowerHeadIcon } from "mdi-react";
import Spinner from "../common/spinner";
import { showRandomTour } from "../../services/homeService";
import { toast } from "react-toastify";
import SlideBox from "./slideBox";

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
    return (
      <div>
        <div className="HomePage">
          <SlideBox />
        </div>
      </div>
    );
  }
}

export default HomePage;
