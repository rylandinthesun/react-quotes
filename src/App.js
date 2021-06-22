import axios from 'axios';
import { useState } from 'react';
import Nav from './Nav';
import './App.css';

function App () {
	const [
		quote,
		setQuote
	] = useState([]);

	const getQuote = () => {
		try {
			axios.get('/today').then((res) => {
				const q = res.data;
				setQuote(q);
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="App">
			<Nav />
			<div className="main">
				{quote.length > 0 ? (
					quote.map((q, pos) => (
						<div className="quote-container" key={pos}>
							<div className="quote">"{q.q}"</div>
							<div className="author">- {q.a}</div>
							<a href="#">
								<i className="far fa-plus-square" />
							</a>
						</div>
					))
				) : (
					<button onClick={getQuote}>Get Quote of the Day</button>
				)}
			</div>
		</div>
	);
}

export default App;
