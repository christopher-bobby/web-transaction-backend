-- CREATE TABLE User (
--     CorporateAccount varchar(150),
--     CorporateName varchar(150),
--     UserId varchar(50),
--     UserName varchar(50),
--     UserRole varchar(30),
--     PhoneNumber varchar(30),
--     Email varchar(100),
--     Verification varchar(100),
--     Password varchar(100)
-- );


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

-- CREATE TABLE TransactionOverview (
--     AwaitingApproval int,
--     Approved int,
--     Rejected int
-- )



-- INSERT INTO TransactionList (ReferenceNo, TransferAmount, TransferRecord, FromAccountNo, ToAccountNo, ToAccountName, ToAccountBank, Description, Maker, TransferDate, ApprovalStatus) 
-- VALUES ('KIK423424321', '2000.00', 'Completed', 'ACC09E54321', 'BBC2342342', 'Scarlett Red', 'BNC', 'This is message', 'maker name' ,'2024-05-24 15:30:00', 'Approved');