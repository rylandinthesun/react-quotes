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

	const getRandomQuote = () => {
		try {
			axios.get('/random').then((res) => {
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
							<div className="btn-group">
								<button className="new-btn" onClick={getRandomQuote}>
									New Quote
								</button>
								<a
									className="twitter-btn"
									href={`https://twitter.com/intent/tweet?text=${q.q}${'  - '}${q.a}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fab fa-twitter" />
								</a>
							</div>
						</div>
					))
				) : (
					<button className="get-btn" onClick={getQuote}>
						Get Quote of the Day
					</button>
				)}
			</div>
		</div>
	);
}

export default App;
