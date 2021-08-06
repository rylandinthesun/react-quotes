import QuoteCard from './QuoteCard';

const QuoteList = ({ favQuotes, handleRemove }) => {
	return (
		<div className="saved-container">
			{favQuotes.map((q) => (
				<QuoteCard key={q._id} id={q._id} content={q.content} author={q.author} handleRemove={handleRemove} />
			))}
		</div>
	);
};

export default QuoteList;
