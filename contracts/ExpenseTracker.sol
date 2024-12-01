// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.27;

contract ExpenseTracker {
    // enum for category of transaction
    enum Category {
        Expense,
        Saving,
        Investment
    }

    // enum for payment mode
    enum PaymentType {
        UPI,
        Cash,
        Card
    }

    struct Transaction {
        uint256 _id;
        uint256 _amount;
        Category _category;
        PaymentType _paymentType;
        uint256 _timestamp;
        string _description;
    }

    // mapping transactions and storing them by ID
    mapping(address => mapping(uint256 => Transaction)) private transactionsMap;
    mapping(address => uint256) private transactionsCountMap;
    uint256 private transactionID; // to keep the track of id;

    // event for logging the transactions
    event TransactionCreated(
        address indexed user,
        uint256 _id,
        uint256 _amount,
        Category _category,
        PaymentType _paymentType,
        uint256 timestamp,
        string _description
    );

    // Creating Transaction
    function createTransaction(
        uint256 amount,
        Category category,
        PaymentType paymentType,
        string calldata description
    ) external {
        transactionID++;
        transactionsCountMap[msg.sender] = transactionID;
        transactionsMap[msg.sender][transactionID] = Transaction({
            _id: transactionID,
            _amount: amount,
            _category: category,
            _paymentType: paymentType,
            _timestamp: block.timestamp,
            _description: description
        });
        emit TransactionCreated(
            msg.sender,
            transactionID,
            amount,
            category,
            paymentType,
            block.timestamp,
            description
        );
    }

    event TransactionUpdated(
        address indexed user,
        uint256 _id,
        uint256 _amount,
        Category _category,
        PaymentType _paymentType,
        string _description
    );

    function updateTransaction(
        uint256 id,
        uint256 amount,
        Category category,
        PaymentType paymentType,
        string calldata description
    ) external {
        Transaction memory transactionToUpdate = transactionsMap[msg.sender][
            id
        ];
        require(
            transactionToUpdate._id != 0,
            "No Transaction found with this ID"
        );
        transactionToUpdate._amount = amount;
        transactionToUpdate._category = category;
        transactionToUpdate._paymentType = paymentType;
        transactionToUpdate._description = description;

        emit TransactionUpdated(
            msg.sender,
            id,
            amount,
            category,
            paymentType,
            description
        );
    }

    function getTransactionById(
        uint256 transactionId
    ) external view returns (Transaction memory) {
        Transaction memory transaction = transactionsMap[msg.sender][
            transactionId
        ];
        require(transaction._id != 0, "No Transaction found with this ID");
        return transaction;
    }

    event DeleteTransaction(address indexed user, uint256 _id);

    function deleteTransaction(uint256 transactionId) external {
        Transaction memory transaction = transactionsMap[msg.sender][
            transactionId
        ];
        require(transaction._id != 0, "No Transaction found with this ID");

        delete transactionsMap[msg.sender][transactionId];
        emit DeleteTransaction(msg.sender, transactionId);
    }
}
