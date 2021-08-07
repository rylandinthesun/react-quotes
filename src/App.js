import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Nav from './Nav';
import QuoteList from './QuoteList';

function App () {
	const [
		randomQuote,
		setRandomQuote
	] = useState([]);

	const [
		favQuotes,
		setFavQuotes
	] = useState([]);

	const [
		open,
		setOpen
	] = useState(false);

	useEffect(() => {
		const quoteFavs = JSON.parse(localStorage.getItem('react-quote-app-favorites'));

		if (quoteFavs === null) {
			setFavQuotes([]);
		}
		else {
			setFavQuotes(quoteFavs);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-quote-app-favorites', JSON.stringify(items));
	};

	const clearLocalStorage = () => {
		localStorage.clear('react-quote-app-favorites');
		setFavQuotes([]);
		setOpen(false);
	};

	const openModal = () => {
		setOpen(true);
	};

	const closeModal = () => {
		setOpen(false);
	};

	const getQuote = () => {
		try {
			axios.get('https://api.quotable.io/random?').then((res) => {
				const q = res.data;
				setRandomQuote(q);
			});
		} catch (e) {
			console.log(e);
		}
	};

	const addFav = (quote) => {
		const newFavs = [
			...favQuotes,
			quote
		];
		setFavQuotes(newFavs);
		saveToLocalStorage(newFavs);
	};

	const removeFav = (id) => {
		const newFav = favQuotes.filter((f) => f._id !== id);

		setFavQuotes(newFav);
		saveToLocalStorage(newFav);
	};

	const match = favQuotes.filter((f) => f._id === randomQuote._id);

	return (
		<div className="App">
			<Nav getQuote={getQuote} randomQuote={randomQuote} />
			<div className="main">
				{randomQuote.length >= 1 ? (
					<div className="quote-container">
						<div className="quote-main">"{randomQuote.content}"</div>
						<div className="author-main">- {randomQuote.author || 'Author Unknown '}</div>
						<div className="btn-group">
							{match.length >= 1 ? (
								<div className="saved">Saved</div>
							) : (
								<button onClick={() => addFav(randomQuote)} className="btn btn-main">
									Save Quote
								</button>
							)}
							<div className="external-links">
								<a
									className="btn email btn-main"
									href={`mailto:?subject=I%20thought%20you%20might%20enjoy%20this%20quote...&body="${randomQuote.content}"${'  - '}${randomQuote.author}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fas fa-envelope" />
								</a>
								<a
									className="btn twitter btn-main"
									href={`https://twitter.com/intent/tweet?text="${randomQuote.content}"${'  - '}${randomQuote.author}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fab fa-twitter" />
								</a>
							</div>
						</div>
					</div>
				) : (
					<div>
						{favQuotes.length >= 1 ? (
							<div>
								<button className="get-btn" onClick={getQuote}>
									Get A Random Quote
								</button>
								<div className="quotable">
									Inspirational quotes provided by{'  '}
									<a
										className="zen-link"
										href="https://github.com/lukePeavey/quotable"
										target="_blank"
										rel="noopener noreferrer"
									>
										Quotable
									</a>
								</div>
							</div>
						) : (
							<div className="no-saves">
								<button className="get-btn" onClick={getQuote}>
									Get A Random Quote
								</button>
								<div className="quotable">
									Inspirational quotes provided by{'  '}
									<a
										className="zen-link"
										href="https://github.com/lukePeavey/quotable"
										target="_blank"
										rel="noopener noreferrer"
									>
										Quotable
									</a>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
			{favQuotes && (
				<section>
					{favQuotes.length >= 1 && (
						<div>
							<h2 className="fav-heading">Saved Quotes</h2>
							<div>
								<QuoteList handleRemove={removeFav} favQuotes={favQuotes} />
							</div>
							<div className="clear-storage">
								{!open && (
									<button onClick={() => openModal()} className="get-btn clear-btn">
										Remove All Saves
									</button>
								)}

								{open && (
									<div className="clear-btn-group">
										<h6>Are you sure you want to clear your saved quotes?</h6>
										<button onClick={() => closeModal()} className="get-btn">
											No Don't
										</button>
										<button onClick={() => clearLocalStorage()} className="get-btn">
											Clear them!
										</button>
									</div>
								)}
							</div>
						</div>
					)}
				</section>
			)}
		</div>
	);
}

export default App;
