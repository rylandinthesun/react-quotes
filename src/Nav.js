import './Nav.css';

const Nav = () => {
	return (
		<nav>
			<ul>
				<li>
					<a href="/">
						<i className="fas fa-quote-right" />
					</a>
				</li>
				<li>
					<a href="/yours">
						<i class="fas fa-bookmark" />
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
