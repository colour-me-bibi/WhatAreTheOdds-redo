import OfferForm from "#/components/OfferForm";
import { Contract, SelectedContract } from "#/types";
import { useEffect, useState } from "react";

const ContractList: React.FC<{ contracts: Contract[] }> = ({ contracts }) => {
  const [selectedContract, setSelectedContract] = useState<SelectedContract>();

  return (
    <>
      <table className="table">
        <thead>
          <tr className="table-dark">
            <th scope="col">Contract</th>
            <th scope="col" className="text-center">
              Latest Yes Price
            </th>
            <th scope="col" className="text-center">
              Best Offer
            </th>
            <th scope="col" />
            <th scope="col" className="text-center">
              Best Offer
            </th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.id}>
              <th scope="row" className="align-middle fs-6">
                {contract.name}
              </th>
              <td className="text-center fw-bold fs-4">50c</td>
              <td className="text-center fw-bold fs-4">50c</td>
              <td className="d-flex justify-content-center">
                <button
                  className="btn btn-success"
                  onClick={() =>
                    setSelectedContract({
                      contract,
                      bestPrice: 50,
                      contractType: "Y",
                      offerType: "B",
                    })
                  }
                >
                  Buy Yes
                </button>
                <div className="px-1" />
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    setSelectedContract({
                      contract,
                      bestPrice: 50,
                      contractType: "N",
                      offerType: "B",
                    })
                  }
                >
                  Buy No
                </button>
              </td>
              <td className="text-center fw-bold fs-4">50c</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* TODO add transition animation */}
      {selectedContract && <OfferForm {...selectedContract} />}
    </>
  );
};

export default ContractList;
