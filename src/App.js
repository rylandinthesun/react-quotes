import axios from 'axios';
import { useState } from 'react';
import Nav from './Nav';
import './App.css';

function App () {
	const [
		randomQuote,
		setRandomQuote
	] = useState('');

	const getQuote = () => {
		try {
			axios.get('https://api.quotable.io/random').then((res) => {
				const q = res.data;
				console.log(q);
				setRandomQuote(q);
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="App">
			<Nav />
			<div className="main">
				{randomQuote ? (
					<div className="quote-container">
						<div className="quote">"{randomQuote.content}"</div>
						<div className="author">- {randomQuote.author || 'Author Unknown '}</div>
						<div className="btn-group">
							<button className="new-btn" onClick={getQuote}>
								New Quote
							</button>
							<a
								className="twitter-btn"
								href={`https://twitter.com/intent/tweet?text=${randomQuote.content}${'  - '}${randomQuote.author}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-twitter" />
							</a>
						</div>
					</div>
				) : (
					<button className="get-btn" onClick={getQuote}>
						Get A Random Quote
					</button>
				)}
			</div>
			<footer>
				Inspirational quotes provided by{'  '}
				<a
					className="zen-link"
					href="https://github.com/lukePeavey/quotable"
					target="_blank"
					rel="noopener noreferrer"
				>
					Quotable
				</a>
			</footer>
		</div>
	);
}

export default App;
