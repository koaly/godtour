import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/showtour.css";
import FetchAllTours from "./fetch/FetchAllTours";
import SearchBox from "./searchBox";
import Pagination from "./common/pagination";
import queryString from "query-string";

import {
  ClockIcon,
  PlaneShieldIcon,
  AirlineSeatReclineNormalIcon,
  AirplaneIcon
} from "mdi-react";
import { getAllTours } from "../services/tourService";
import InformationConvert from "./fetch/InformationFunction.jsx";
import TourConvert from "./fetch/TourFunction.jsx"; // import function for convert object
var HandleObject = new TourConvert();

class ShowTour extends Component {
  constructor(props) {
    super(props);
    const values = queryString.parse(this.props.location.search);
    this.state = {
      Loading: true,
      Max: false,
      CurrentOrder: 0,
      ListTour: [],
      searchQuery: "",
      limit: values.limit,
      currentPage: values.page,
      hasNextPage: false,
      total: 0,
      pageSize: 0
    };
    this.condition = 0; // 0 not anythin 1 is now loading 2 can look more tour
    this.ShowMoreCallback = this.ShowMoreCallback.bind(this);
    this.FetchReceiveTourCallback = this.FetchReceiveTourCallback.bind(this);
    this.FetchAllTours = new FetchAllTours();
    this.handleShowMore = this.handleShowMore.bind(this);
    this.numberShowMore = 5;
    this.dataAllTours = [];
  }
  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  ShowMoreCallback() {
    console.log("===============> ShowTour:ShowMoreCallback");
    this.FetchAllTours.get_all_tours(
      this.state.CurrentOrder,
      5,
      this.FetchReceiveTourCallback
    );
    this.setState(state => ({
      Loading: true
    }));
  }

  handleNextPage = () => {
    const { currentPage } = this.state;
    let currentPageInt = parseInt(currentPage, 10);
    this.setState({ currentPage: currentPageInt + 1 });
    console.log(currentPage);
  };
  handlePrevPage = () => {
    const { currentPage } = this.state;
    let currentPageInt = parseInt(currentPage, 10);
    if (currentPageInt > 1) {
      this.setState({ currentPage: currentPageInt - 1, hasPrevPage: true });
    }
    console.log(currentPage);
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  componentDidMount() {
    console.log("===============> ShowTour:componentDidMount");
    //    this.FetchAllTours.get_all_tours(this.FetchReceiveTourCallback);
    this.getAllData();
  }

  async getAllData() {
    try {
      const result = await getAllTours(
        this.state.limit,
        this.state.currentPage
      );
      console.log("getAllData", result);
      const value = result.data;
      const { next: hasNextPage } = value;
      const { count, total } = value;
      console.log("getAllData", value);
      this.setState({ hasNextPage, total, count });
      this.dataAllTours = HandleObject.manage_group_tour_order(
        value,
        0,
        value.count
      );
      this.handleShowMore();
      console.log(this.props.location.search);
      const values = queryString.parse(this.props.location.search);
      console.log(values);
      console.log(values.page);
    } catch {}
  }

  handleShowMore() {
    console.log("===============> ShowTour:handleShowMore", this.state);
    if (
      this.state.CurrentOrder + this.numberShowMore <
      this.dataAllTours.length
    ) {
      console.log("Add show 5");
      let temporary = this.state.ListTour;
      let limitOrder = this.state.ListTour.length + this.numberShowMore;
      for (let count = this.state.CurrentOrder; count < limitOrder; count++) {
        temporary.push(this.dataAllTours[count]);
      }
      this.setState(state => ({
        Loading: false,
        CurrentOrder: this.state.ListTour.length,
        ListTour: temporary
      }));
    } else {
      let temporary = this.state.ListTour;
      let limitOrder = this.dataAllTours.length;
      for (let count = this.state.CurrentOrder; count < limitOrder; count++) {
        temporary.push(this.dataAllTours[count]);
      }
      this.setState(state => ({
        Loading: false,
        Max: true,
        CurrentOrder: this.dataAllTours.lenth - 1,
        ListTour: temporary
      }));
    }
  }

  FetchReceiveTourCallback(ReceiveInformation, ReceiveData) {
    console.log("=====> FetchReceiveTourCallback.ReceiveData", ReceiveData);
    this.dataAllTours = ReceiveData;
    this.handleShowMore();
  }

  render() {
    console.log(
      "===============> Show_tour.render()",
      this.state,
      this.dataAllTours
    );
    console.log(this.dataAllTours);
    console.log("After filter");
    const {
      ListTour,
      searchQuery,
      currentPage,
      limit,
      hasNextPage,
      count,
      total
    } = this.state;
    console.log(ListTour);
    let filtered = this.dataAllTours;
    if (searchQuery) {
      filtered = this.dataAllTours.filter(tour =>
        tour.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    const showlistTour = ListTour.map(tour => (
      <li key={tour.id} className="card mb-5 card-size">
        <img
          src={tour.info.imgsrc}
          alt="sample image"
          className="mb-3"
          width="100%"
          height="auto"
        />
        <div className="showtour-content">
          <h3 className="mb-3">{tour.name}</h3>
          <p>
            <ClockIcon className="mr-3 mb-1" />
            {tour.info.dayDuration} Day(s) {tour.info.nightDuration} Night(s)
          </p>
          <p>
            <AirplaneIcon className="mr-3 mb-1" />
            Fly with {tour.info.airline}
          </p>
          <p>
            <AirlineSeatReclineNormalIcon className="mr-3 mb-1" />
            Remaining Seat(s) : {tour.info.remainingSeat}/{tour.info.maxSeat}{" "}
            Seat(s)
          </p>
          <Link className="" to={`/tours/id=${tour.id}`}>
            Read More...
          </Link>
        </div>
      </li>
    ));

    const showfilterTour = filtered.map(tour => (
      <li key={tour.id} className="card mb-5 card-size">
        <img
          src={tour.info.imgsrc}
          alt="sample image"
          className="mb-3"
          width="100%"
          height="auto"
        />
        <div className="showtour-content">
          <h3 className="mb-3">{tour.name}</h3>
          <p>
            <ClockIcon className="mr-3 mb-1" />
            {tour.info.dayDuration} Day(s) {tour.info.nightDuration} Night(s)
          </p>
          <p>
            <AirplaneIcon className="mr-3 mb-1" />
            Fly with {tour.info.airline}
          </p>
          <p>
            <AirlineSeatReclineNormalIcon className="mr-3 mb-1" />
            Current Seat : {tour.info.remainingSeat}/{tour.info.maxSeat} Seats
          </p>
          <Link className="" to={`/tours/id=${tour.id}`}>
            Read More...
          </Link>
        </div>
      </li>
    ));
    console.log(filtered);
    console.log(searchQuery);
    if (this.state.Max) this.condition = 0;
    else {
      if (this.state.Loading) this.condition = 1;
      else this.condition = 2;
    }
    return (
      <div className="container mgtb">
        {this.condition !== 1 && (
          <React.Fragment>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <div className="tourlist">
              <h1 className="mb-5">Tour List</h1>
            </div>
            {searchQuery !== "" && <div>{showfilterTour}</div>}
            {searchQuery === "" && <div>{showlistTour}</div>}
          </React.Fragment>
        )}
        <ul>
          {/* tour have data follow  database so have _v , _id , airline , currentSeat , dayDuration ,
 departDate , dest , ddetail , endBooking , food , freeSeat , highlight , maxSeat , name ,
 nightDuration , operatorID , operatorName , price , rating , ratineCount , returnDate ,
 startBooking */}
          {/* {this.state.ListTour.map(tour => (
            <li key={tour._id} className="card mb-5 card-size">
              <img
                src={tour.imgsrc}
                alt="sample image"
                className="mb-3"
                height="350px"
              />
              <div className="showtour-content">
                <h3 className="mb-3">{tour.name}</h3>
                <p>
                  <ClockIcon className="mr-3 mb-1" />
                  {tour.dayDuration} Day(s) {tour.nightDuration} Night(s)
                </p>
                <p>
                  <AirplaneIcon className="mr-3 mb-1" />
                  Fly with {tour.airline}
                </p>
                <p>
                  <AirlineSeatReclineNormalIcon className="mr-3 mb-1" />
                  Remaining Seat(s) : {tour.currentSeat}/{tour.maxSeat} Seat(s)
                </p>
                <Link className="" to={`/tours/id=${tour._id}`}>
                  Read More...
                </Link>
              </div>
            </li>
          ))} */}
        </ul>
        {this.condition === 1 && (
          <button className="GeneralButtonTour mgb"> 'Now Loading!' </button>
        )}
        {searchQuery === "" && this.condition === 2 && (
          <button
            className="ButtonMoreTour GeneralButtonTour"
            onClick={this.handleShowMore}
          >
            {" "}
            "More Tour!"{" "}
          </button>
        )}
        {/* <button className="btn btn-primary" onClick={this.handlePageChange}>
          next page
        </button> */}
        {currentPage !== "1" && (
          <a
            className="btn btn-primary mb-2 mr-2"
            href={`/tours/?page=${currentPage}&limit=${limit}`}
            onClick={this.handlePrevPage}
          >
            Previous Page
          </a>
        )}
        {hasNextPage && (
          <a
            className="btn btn-primary mb-2"
            href={`/tours/?page=${currentPage}&limit=${limit}`}
            onClick={this.handleNextPage}
          >
            Next Page
          </a>
        )}
        <Pagination
          itemsCount={total}
          pageSize={count}
          onPageChange={this.handlePageChange}
          currentPage={parseInt(currentPage, 10)}
          hrefTo={`/tours/?page=${currentPage}&limit=${limit}`}
        />
      </div>
    );
  }
}

export default ShowTour;
