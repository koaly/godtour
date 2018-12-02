import React, { Component } from "react";
import { getAllTiys } from "../services/tiyService";
import { Link } from "react-router-dom";
import "./common/formInput.css"
import "./common/allTiys.css"

class AllTiys extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoaded	: false,
			tiys		: []
		};
	}

	async componentDidMount() {
		this.downloadTiys();
	}

	async downloadTiys() {
		console.log( "Download Data ");
		const { data } = await getAllTiys();
		const { tiys } = data;
		this.setState({ tiys, isLoaded: true });
		console.log(data);
		console.log(tiys);
	}

	render() {
		const { tiys, isLoaded } = this.state;
		console.log(tiys);
		return (
		<div className=" minWidth100  ">
			<h1 className="minWidth100 textCenter">List Tour by Customer</h1>
			<div className=" minWidth100 clearBoth  headColumn">
				<div className="width30 textLeft paddingLeft10px sameLine ">NAME TOUR</div>
				<div className="width20 textCenter sameLine">DESTINATIOn</div>
				<div className="width20 textCenter sameLine">PRICE</div>
				<div className="width15 textCenter sameLine">DURATION</div>
			</div>
			{isLoaded && tiys.map(t => (
				<div className="">
					<p key={t._id} className="sameLine width30">{t.name}</p>
					<p className="sameLine width20 textCenter">{t.dest}</p>
					<p className="sameLine width20 textCenter">{t.minPrice} - {t.maxPrice}</p>
					<p className="sameLine width15 textCenter">{t.minDuration} - {t.maxDuration}</p>
					<Link className="btn btn-primary sameLine" to={`/${t._id}/createOffer`}>CREATE</Link>
					
				</div>
			) ) }
		</div>
		);
	}
}

export default AllTiys;
