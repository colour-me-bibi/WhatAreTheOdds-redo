import listMarkets from "#/api/queries/listMarkets";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Markets: React.FC = () => {
  const markets = listMarkets();

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Markets</h1>
        <Link className="btn btn-primary" to="/markets/new">
          Create
        </Link>
      </div>
      {markets.isLoading && <div>Loading...</div>}
      {markets.isError && <div>Error: {markets.error.message}</div>}
      {markets.isSuccess &&
        markets.data.map((market) => (
          <div key={market.id} className="card">
            <Link to={`/markets/${market.id}`} className="text-reset text-decoration-none">
              <div className="card-body">
                <h5 className="card-title">{market.name}</h5>
                {market.tags.map((tag) => (
                  <span key={`${market.id}-${tag.name}`} className="badge bg-secondary">
                    {tag.name}
                  </span>
                ))}
                {market.contracts.map((contract) => (
                  <h4 key={`${market.id}-${contract.name}`} className="">
                    {contract.name}
                  </h4>
                ))}
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Markets;
