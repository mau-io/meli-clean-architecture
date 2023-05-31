class PriceEntity {
  constructor(currency = 'N/A', amount = 0, decimals = 0) {
    this.currency = currency;
    this.amount = amount;
    this.decimals = decimals;
  }
}

export default PriceEntity;
