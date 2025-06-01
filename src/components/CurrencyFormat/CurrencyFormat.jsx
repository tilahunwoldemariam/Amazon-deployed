import numeral from 'numeral'
import React from 'react'

function CurrencyFormat({ amount }) {
    const FormattedAmount = numeral(amount).format('$0,0.00');

  return <div>{FormattedAmount}</div>;
}

export default CurrencyFormat