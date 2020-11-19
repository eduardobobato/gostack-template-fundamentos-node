import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: "income" | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce((acc, obj) => {
      if (obj.type === 'income') {
        acc.income += obj.value;
        acc.total += obj.value;
      }
      if (obj.type === 'outcome') {
        acc.outcome += obj.value;
        acc.total -= obj.value;
      }
      return acc;
    },{
      income: 0,
      outcome: 0,
      total: 0
    });

    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
