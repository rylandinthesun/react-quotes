const Nav = ({ getQuote, randomQuote }) => {
	return (
		<nav>
			<ul>
				<li className="home-logo">
					<i className="fas fa-quote-right" />
				</li>
				{randomQuote ? (
					<button className="btn new" onClick={() => getQuote()}>
						New Quote
					</button>
				) : null}
			</ul>
		</nav>
	);
};

export default Nav;
