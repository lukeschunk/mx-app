import React from 'react';
// import Card from 'card.jsx'

require('./App.css');


export default class App extends React.Component {



    constructor(props) {
        super(props);
    }

    render() {
        const styles = {
            card: {
                backgroundColor: '#059e9a',
                borderRadius: '10px',
                width: '100px',
                height: '200px'
            },
			image: {
				width: '40px'
			},
			text: {
				fontFamily: 'sans-serif',
				color: 'white'
			}
        }
        return (
			<div className='card' style={styles.card} >
			<div className='image'  >
				<img style={styles.image} src={this.props.image} />
			</div>
			<div className='text' style={styles.text} >
				{this.props.mainText}
			</div>
			 <h3></h3>
			</div>
		);
    }
}

// App.propTypes = {
// 	image: React.propTypes.string,
// 	mainText: React.propTypes.string
// };

	const mxpoint = [1000, 1000];
	let dataset = [];


	            // Setup data
	            var numDataPoints = 20; // Number of dummy data points
	            var maxRange = Math.random() * 1000; // Max range of new values
	            for (var i = 0; i < numDataPoints; i++) {
	                var newNumber1 = (Math.floor(Math.random() * maxRange) + 25); // New random integer
	                var newNumber2 = (Math.floor(Math.random() * maxRange) + 50); // New random integer
	                dataset.push([newNumber1, newNumber2]); // Add new number to array
	            }
				dataset.push(mxpoint);

	            // Setup settings for graphic
	            var canvas_width = 1000;
	            var canvas_height = 350;
	            var padding = 30; // for chart edges

				console.log("This is dataset", dataset);
	            // Create scale functions
	            var xScale = d3.scale.linear() // xScale is width of graphic
	                .domain([0, d3.max(dataset, d => {
	                    return d[0]; // input domain

	                })])
	                .range([padding, canvas_width - padding * 2]); // output range

	            var yScale = d3.scale.linear() // yScale is height of graphic
	                .domain([0, d3.max(dataset, d => {
	                    return d[1]; // input domain
	                })])
	                .range([canvas_height - padding, padding]); // remember y starts on top going down so we flip

	            // Define X axis
	            const xAxis = d3.svg.axis()
	                .scale(xScale)
	                .orient("bottom")
	                .ticks(0);

	            // Define Y axis
	            const yAxis = d3.svg.axis()
	                .scale(yScale)
	                .orient("left")
	                .ticks(0);

	            // Create SVG element
	            const svg = d3.select("h3") // This is where we put our vis
	                .append("svg")
	                .attr("width", canvas_width)
	                .attr("height", canvas_height)

	            //randomize radius size
	            function randomizeRadius () {
	                return Math.round(Math.random() * 25 + 5);
	            }
				//pick either blue or orange
	            function colorPicker () {
	                var randomizer = Math.floor(Math.random() * 2);
	                console.log("this is randomizer", randomizer);
	                if (randomizer === 0) {
	                    return '#059e9a';
	                } else {
	                    return 'black'
	                }
	            }
	            // Create Circles
	            svg.selectAll("circle")
	                .data(dataset)
	                .enter()
	                .append("circle") // Add circle svg
	                .attr("cx", d => {
	                    return xScale(d[0]); // Circle's X
	                })
	                .attr("cy", d => { // Circle's Y
	                    return yScale(d[1]);
	                })
	                .attr("r", () => {
	                    return randomizeRadius()
	                }) // radius
	                .attr("fill", () => {
	                    return colorPicker()
	                });

	            // Add to X axis
	            svg.append("g")
	                .attr("class", "x axis")
	                .attr("transform", "translate(0," + (canvas_height - padding) + ")")
	                .call(xAxis);

	            // Add to Y axis
	            svg.append("g")
	                .attr("class", "y axis")
	                .attr("transform", "translate(" + padding + ",0)")
	                .call(yAxis);

	            // On interval, update with new data
	            setInterval( () => {
					const mxpoint = [1000, 1000];
					console.log("this is svg", svg);
					console.log(d3.select('h6'));
	                d3.select("h6")
	                console.log("you clicked me!");
	                var numValues = dataset.length; // Get original dataset's length
	                var maxRange = Math.random() * 1000; // Get max range of new values
	                dataset = []; // Initialize empty array
	                for (let i = 0; i < numValues - 1; i++) {
	                    let newNumber1 = (Math.floor(Math.random() * maxRange) + 25); // Random int for x
	                    let newNumber2 = (Math.floor(Math.random() * maxRange) + 50); // Random int for y
	                    dataset.push([newNumber1, newNumber2]); // Add new numbers to array
	                }
					dataset.push(mxpoint);
					console.log("LSJLFIJLSIJLFIJLISJEF", dataset);

	                // Update scale domains
	                xScale.domain([0, d3.max(dataset, d => {
	                    return d[0];
	                })]);
	                yScale.domain([0, d3.max(dataset, d => {
	                    return d[1];
	                })]);

	                // Update circles
	                svg.selectAll("circle")
	                    .data(dataset) // Update with new data
	                    .transition() // Transition from old to new
	                    .duration(1000) // Length of animation
	                    .each("start", () => { // Start animation
	                        d3.select(this) // 'this' means the current element
	                            .attr("fill", "gray") // Change color
	                            .attr("r", 5);  // Change size
	                    })
	                    .delay( (d, i) => {
	                        return i / dataset.length * 500; // Dynamic delay (i.e. each item delays a little longer)
	                    })
	                    //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
	                    .attr("cx", d => {
	                        return xScale(d[0]); // Circle's X
	                    })
	                    .attr("cy", d => {
	                        return yScale(d[1]); // Circle's Y
	                    })
	                    .each("end", () => { // End animation
	                        d3.select(this) // 'this' means the current element
	                            .transition()
	                            .duration(500)
	                            .attr("fill", () => {
	                                return colorPicker();
	                            }) // Change color
	                            .attr("r", () => {
	                                return randomizeRadius()
	                            }); // Change radius
	                    });

	                // Update X Axis
	                svg.select(".x.axis")
	                    .transition()
	                    .duration(1000)
	                    .call(xAxis);

	                // Update Y Axis
	                svg.select(".y.axis")
	                	.transition()
	                    .duration(100)
	                    .call(yAxis);
	            }, 3000);


App.defaultProps = {
	image: 'http://uxrepo.com/static/icon-sets/font-awesome/svg/smile.svg',
	mainText: 'This is some text for the card. It is some pretty informative text about why I want to work at MX'
}
