import axios from 'axios';
import { useState } from 'react';
import Nav from './Nav';
import './App.css';

function App () {
	const [
		radnomQuote,
		setRandomQuote
	] = useState('');

	const getQuote = () => {
		try {
			axios.get('https://type.fit/api/random').then((res) => {
				const q = res.data;

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
				{radnomQuote ? (
					<div className="quote-container">
						<div className="quote">"{radnomQuote.text}"</div>
						<div className="author">- {radnomQuote.author || 'Author Unknown '}</div>
						<div className="btn-group">
							<button className="new-btn" onClick={getQuote}>
								New Quote
							</button>
							<a
								className="twitter-btn"
								href={`https://twitter.com/intent/tweet?text=${radnomQuote.text}${'  - '}${radnomQuote.author}`}
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
