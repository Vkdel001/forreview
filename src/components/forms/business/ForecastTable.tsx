import React from 'react';

interface ForecastYear {
  year: string;
  annualTurnover: string;
  tradingDividendOtherIncome: string;
  loanFromShareholderRelatedParty: string;
  consultancyFees: string;
  investment: string;
  loanFromShareholderRelatedPartyOutflow: string;
  netCash: string;
}

interface Props {
  currency: string;
  years: ForecastYear[];
  onCurrencyChange: (value: string) => void;
  onYearUpdate: (yearIndex: number, field: string, value: string) => void;
}

const ForecastTable: React.FC<Props> = ({
  currency,
  years,
  onCurrencyChange,
  onYearUpdate
}) => {
  return (
    <div className="bg-red-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Business forecast for 3 years - as per latest financial statement
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Currency
        </label>
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="">dropdown</option>
          <option value="MUR">MUR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left font-medium">Inflow</th>
              {years.map((year, index) => (
                <th key={index} className="border border-gray-300 px-3 py-2 text-center font-medium">
                  {year.year} (date picker)
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Annual turnover', field: 'annualTurnover' },
              { label: 'Trading / Dividend / Other income', field: 'tradingDividendOtherIncome' },
              { label: 'Loan from shareholder / Related party', field: 'loanFromShareholderRelatedParty' },
              { label: 'Consultancy fees', field: 'consultancyFees' }
            ].map((row) => (
              <tr key={row.field}>
                <td className="border border-gray-300 px-3 py-2 font-medium">{row.label}</td>
                {years.map((year, index) => (
                  <td key={index} className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      value={year[row.field as keyof ForecastYear] as string}
                      onChange={(e) => onYearUpdate(index, row.field, e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="Numerical"
                    />
                  </td>
                ))}
              </tr>
            ))}

            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 font-medium">Outflow</td>
              <td colSpan={years.length} className="border border-gray-300 px-3 py-2"></td>
            </tr>

            {[
              { label: 'Expenses', field: 'investment' },
              { label: 'Investment', field: 'investment' },
              { label: 'Loan from shareholder / Related party', field: 'loanFromShareholderRelatedPartyOutflow' },
              { label: 'Net Cash', field: 'netCash', readOnly: true }
            ].map((row) => (
              <tr key={row.field}>
                <td className="border border-gray-300 px-3 py-2 font-medium">{row.label}</td>
                {years.map((year, index) => (
                  <td key={index} className="border border-gray-300 px-2 py-1">
                    <input
                      type={row.readOnly ? 'text' : 'number'}
                      value={year[row.field as keyof ForecastYear] as string}
                      onChange={(e) =>
                        !row.readOnly && onYearUpdate(index, row.field, e.target.value)
                      }
                      className={`w-full px-2 py-1 border border-gray-300 rounded ${
                        row.readOnly ? 'bg-gray-100' : ''
                      } focus:outline-none focus:ring-1 focus:ring-red-500`}
                      placeholder={row.readOnly ? 'Autopopulate' : 'Numerical'}
                      readOnly={row.readOnly}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ForecastTable;
