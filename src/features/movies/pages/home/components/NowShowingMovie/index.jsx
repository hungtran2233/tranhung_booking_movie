import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { fetchMovieListAction } from "../../utils/homeAction";
import { movieListSelector } from "../../utils/homeSelector";
import SampleNextArrow from "../SliderArrow/SampleNextArrow";
import SamplePrevArrow from "../SliderArrow/SamplePrevArrow";
import ShowingMovieItem from "./components/ShowingMovieItem";

function NowShowingMovie() {
	const dispatch = useDispatch();

	const movieList = useSelector(movieListSelector);
	// Create next arrow  and prev arrow
	// const slider = useRef(null);

	const fetchNowShowingMovie = () => {
		dispatch(fetchMovieListAction());
	};

	useEffect(() => {
		fetchNowShowingMovie();
	}, []);

	if (!movieList) {
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="large" />
			</div>
		);
	}

	const showingMovie = movieList.filter((item) => {
		return item.dangChieu === true;
	});

	// Setting for slick slider
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 5,
		autoplay: true,
		autoplaySpeed: 4000,
		// arrows: false,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,

		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
		],
	};

	return (
		<div className="NowShowingMovie" id="nowShowing">
			<h1 className="title">Phim đang chiếu</h1>

			<Slider {...settings} className="container">
				{showingMovie?.map((item) => {
					return (
						<ShowingMovieItem
							key={item.maPhim}
							className="showingMovieItem"
							item={item}
						/>
					);
				})}
			</Slider>
		</div>
	);
}

export default NowShowingMovie;
