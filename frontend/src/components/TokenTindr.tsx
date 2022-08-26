import useTokenTindrVote from "#/api/mutations/useTokenTindrVote";
import getTokenTindr from "#/api/queries/getTokenTindr";
import { useQueryClient } from "@tanstack/react-query";

const TokenTindr = () => {
  const queryClient = useQueryClient();

  const tokenTindr = getTokenTindr();
  const tokenTindrVote = useTokenTindrVote({
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["user"]);
      tokenTindr.refetch();
    },
  });

  return (
    <div className="container mt-3">
      <h3>Choose the best cat and earn more tokens!</h3>

      {tokenTindr.isLoading && <div>Loading...</div>}
      {tokenTindr.isError && <div>Error: {tokenTindr.error.message}</div>}

      {tokenTindr.isSuccess && (
        <div className="row row-cols-6 justify-content-center">
          <div className="card w-25">
            <img src={tokenTindr.data.one.imageUrl} className="card-img-top img-fluid" alt="..." />
            <div className="card-body">
              <button
                className="btn btn-primary"
                onClick={() => tokenTindrVote.mutate(tokenTindr.data.one.id)}
                disabled={tokenTindrVote.isLoading}
              >
                Choose One
              </button>
            </div>
          </div>
          <div className="card w-25">
            <img src={tokenTindr.data.two.imageUrl} className="card-img-top img-fluid" alt="..." />
            <div className="card-body">
              <button
                className="btn btn-primary"
                onClick={() => tokenTindrVote.mutate(tokenTindr.data.two.id)}
                disabled={tokenTindrVote.isLoading}
              >
                Choose Two
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenTindr;
