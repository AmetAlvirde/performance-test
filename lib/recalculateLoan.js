const calcPayments = () => {};

const recalculateLoan = ({
  newAmount,
  terms,
  fee,
  interestRate,
  extraPeriods
}) =>
  calcPayments({
    amount: newAmount,
    fee,
    rate: interestRate,
    term: Number(terms),
    extraPeriods
  });

export default recalculateLoan;
