-- CREATE TABLE User (
--     CorporateAccount varchar(255),
--     CorporateName varchar(255),
--     UserId varchar(255),
--     UserName varchar(255),
--     UserRole varchar(255),
--     PhoneNumber varchar(255),
--     Email varchar(255),
--     Verification varchar(255),
--     Password varchar(255)
-- );

-- DROP TABLE TransactionList;

-- CREATE TABLE TransactionList (
--     ReferenceNo varchar(100),
--     TransferAmount varchar(100),
--     TransferRecord varchar(100),
--     FromAccountNo varchar(100),
--     ToAccountNo varchar(100),
--     ToAccountName varchar(100),
--     ToAccountBank varchar(100),
--     Description varchar(255),
--     Maker varchar(100),
--     TransferDate TIMESTAMP,
--     ApprovalStatus varchar(100)
-- )


TRUNCATE TABLE User;

-- INSERT INTO TransactionList (ReferenceNo, TransferAmount, TransferRecord, FromAccountNo, ToAccountNo, ToAccountName, ToAccountBank, Description, Maker, TransferDate, ApprovalStatus) 
-- VALUES ('KIK423424321', '2000.00', 'Completed', 'ACC09E54321', 'BBC2342342', 'Scarlett Red', 'BNC', 'This is message', 'maker name' ,'2024-05-24 15:30:00', 'Approved');