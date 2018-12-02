import React, { Component } from "react";
import { getAllTiys } from "../../services/tiyService";
import { Link } from "react-router-dom";
import "./../common/formInput.css";
import "./../common/allTiys.css";

class AllTiys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      tiys: [],
	  mode: 0
    };
	this.firstStyle = " width30";
	this.secondStyle = " width20";
	this.thirdStyle = " width15";
  }

  async componentDidMount() {
    this.downloadTiys();
	this.updateDimension();
	window.addEventListener("resize" , this.updateDimension.bind( this ) );
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
		console.log( "Download Data ");
		const { data } = await getAllTiys();
		const { tiys } = data;
		this.setState({ tiys, isLoaded: true });
		console.log(data);
		console.log(tiys);
	}

	updateDimension(){
		let width = window.innerWidth;
		console.log("width is " , width );
		if( width > 660 ){
			this.firstStyle = " width30";
			this.secondStyle = " width20";
			this.thirdStyle = " width15";
			this.setState( { mode : 0 } );	
		}
		else if( width > 440 ){
			this.firstStyle = " width35";
			this.secondStyle = " width25";
			this.setState( { mode : 1});
		}
		else{
			this.firstStyle = " width40";
			this.secondStyle = " width35";
			this.setState( { mode : 2});
		}
	}

	componentWillUnmound(){
		window.removeEventListener("resize" , this.updateDimension.bind( this ) );
	}

	render() {
		const { tiys, isLoaded , mode} = this.state;
		console.log(tiys);
		return (
		<div className=" minWidth100  ">
			<h1 className="minWidth100 textCenter">List Tour by Customer</h1>
			<div className=" minWidth100 clearBoth  headColumn">
				<div className={"textLeft paddingLeft4 sameLine" + this.firstStyle}>
					NAME TOUR</div>
				<div className={"textCenter sameLine" + this.secondStyle}>
					DESTINATIOn</div>
				{ mode < 2 &&
				<div className={"textCenter sameLine" + this.secondStyle}>
					PRICE</div>}
				{ mode < 1 &&
				<div className={"textCenter sameLine" + this.thirdStyle}>
					DURATION</div>}
			</div>
			{isLoaded && tiys.map(t => (
				<div className="">
					<p key={t._id} className={"sameLine paddingLeft2" + this.firstStyle}>
						{t.name}</p>
					<p className={"sameLine textCenter" + this.secondStyle}>
						{t.dest}</p>
					{ mode < 2 &&
					<p className={"sameLine textCenter" + this.secondStyle}>
						{t.minPrice} - {t.maxPrice}</p>}
					{ mode < 1 &&
					<p className={"sameLine textCenter" + this.thirdStyle}>
						{t.minDuration} - {t.maxDuration}</p>}
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
			) ) }
		</div>
		);
	}
}

export default AllTiys;
