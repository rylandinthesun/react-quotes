const QuoteCard = ({ content, author, handleRemove, id }) => {
	return (
		<div className="quote-container-2">
			<div className="quote">"{content}"</div>
			<div className="author">- {author}</div>
			<div className="btn-group">
				<button onClick={() => handleRemove(id)} className="btn">
					Remove
				</button>
				<div className="external-links">
					<a
						className="btn email"
						href={`mailto:?subject=I%20thought%20you%20might%20like%20this%20quote&body="${content}"${'  - '}${author}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<i className="fas fa-envelope" />
					</a>
					<a
						className="btn twitter"
						href={`https://twitter.com/intent/tweet?text="${content}"${'  - '}${author}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<i className="fab fa-twitter" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default QuoteCard;
