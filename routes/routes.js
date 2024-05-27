
const db = require('mysql-promise')();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/index.js');
const mysql = require('mysql');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

db.configure({
	"host": "localhost",
	"user": "root",
	"password": "Password01",
	"database": "bankNeoCommerce"
});


const express = require('express');

const router = express.Router();


const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
}

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[\W_]).{8,20}$/;
    return passwordRegex.test(password);
}


router.post('/register', async (req, res) => {
    const data = {
        CorporateAccount: req.body.corporateAccountNo,
        CorporateName: req.body.corporateName,
        UserId: req.body.userId,
        UserName: req.body.userName,
        UserRole: req.body.role,
        PhoneNumber: req.body.phoneNumber,
        Email: req.body.email,
        Verification: req.body.verification,
        Password: req.body.password
    }
    
    // all fields are required
    for (const [key, value] of Object.entries(data)) {
        if (value === undefined || value === null) {
            return res.status(400).json({ error: `${key} is required` });
        }
    }

    // email, phone number, password validation
    if(!validateEmail(data.Email)) {
        res.status(400).json("Please use proper email address")
    }
    if(!validatePhoneNumber(data.PhoneNumber)) {
        res.status(400).json("Please use valid phone number")
    }
    if(!validatePassword(data.Password)) {
        res.status(400).json("Password must contain at least one unique character, minimum 8 characters, and maximum 20 characters")
    }
    
    //Corporate Bank Account Number is unique validation
    const existingBankAccount = await db.query('SELECT * FROM USER WHERE CorporateAccount = ?', [data.CorporateAccount]);
    if(existingBankAccount?.length) {
        res.status(400).json({message: "Bank account number is already registered"})
    }


    //User ID is unique validation
    const existingUser = await db.query('SELECT * FROM USER WHERE UserId = ?', [data.UserId]);
    if(existingUser?.length) {
        res.status(400).json("user already exist")
    }

    const hashedPassword = await bcrypt.hash(data.Password, 10);

    try {
        db.query(`INSERT INTO User (CorporateAccount, CorporateName, UserId, UserName, UserRole, PhoneNumber,Email, Verification, Password ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [data.CorporateAccount, data.CorporateName, data.UserId, data.UserName, data.UserRole, data.PhoneNumber, data.Email, data.Verification, hashedPassword]).spread(function (users) {
            res.status(200).json("successful")
        });
    }
    catch (error) {
        res.status(400).json({message: 'There is an error on the operation'})
    }
})

router.post('/login', async (req, res) => {

    const data = {
        CorporateAccount: req.body.corporateAccountNo,
        UserId: req.body.userId,
        Password: req.body.password
    }
    
    for (const [key, value] of Object.entries(data)) { // all required
        if (value === undefined || value === null) {
            return res.status(400).json({ error: `${key} is required` });
        }
    }

    try {
        db.query("SELECT * FROM User WHERE CorporateAccount = ? AND UserId = ?", [data.CorporateAccount, data.UserId]).then(rows => {
           if(!rows[0].length) {
                res.status(400).json("error")
           }

           let item = rows[0][0];
           const passwordMatch = bcrypt.compare(data.Password, item.Password);
           if(!passwordMatch) {
            res.status(403).json("Username / Corporate Account / Password doesn't match");
           }

           const token = jwt.sign({ userId: item.UserId }, 'bnc-web-token', {expiresIn: '1h', })
    
           res.status(200).json({
            data: {
               user: {
                    id: item.UserId,
                    name: item.UserName,
                    role: item.UserRole,
                    phoneNumber: item.PhoneNumber,
                    email: item.Email,
                    token: token
               },
                corporate: {
                    account: item.CorporateAccount,
                    name: item.CorporateName
                }
            }
           })
        });
    }
    catch (error) {
        res.status(400).json({ message: 'There is an error on the operation'})
    }
})



// transaction for maker / approver role
router.get('/transactions/:role', verifyToken, async (req, res) => {
    const role = req.params.role;
    try {   
        const [overviewRows] = await db.query('SELECT * FROM TransactionOverview');
        const [listRows] = await db.query('SELECT * FROM TransactionList');
        let approverList = []
        if(role === 'Approver') { // Approver can only view Awaiting Approval
            approverList = listRows.filter(item => item["ApprovalStatus"] === 'Awaiting Approval');
        }

        res.status(200).json({
            overview: overviewRows[0],
            list: role === 'Approver' ? approverList : listRows
        });
    }
    catch (error) {
        res.status(400).json({error: 'There is an error on the operation'})
    }
})


// transaction for maker role 
router.get('/transactions/detail/:referenceNo', verifyToken, async (req, res) => {
    const referenceNo = req.params.referenceNo;
    try {
        const rows = await db.query('SELECT * FROM TransactionList WHERE ReferenceNo = ?', [referenceNo]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(rows[0][0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'There is an error on the operation' });
    }
});

// POST Approval role
router.post('/transactions/operation', verifyToken,  async (req, res) => {
    const data = {
        role: req.body.role,
        referenceNo: req.body.referenceNo,
        operation: req.body.operation
    }
    if(data.role !== "Approver") {
        return res.status(400).json({ error: 'Wrong role'}) // cannot say Approver directly due to security reason I guess?
    }
    if(data.operation !== 'Approve' || 'Reject') {
        return res.status(400).json({error: 'You can only approve or reject'})
    }
    try {
        const checkQuery = 'SELECT * FROM TransactionList WHERE ReferenceNo = ?';
        const rows = await query(checkQuery, [data.referenceNo]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        const updateQuery = 'UPDATE TransactionList SET operation = ? WHERE referenceNo = ?';
        await query(updateQuery, [data.operation, data.referenceNo]);

        res.status(200).json({ message: 'Transaction updated successfully' });
  
    }
    catch (error) {
        res.status(400).json({ message: 'There is an error on the operation'})
    }
})

const upload = multer({ dest: 'uploads/' });

router.post('/upload-csv', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    //to_bank_name (numeric), to_account_no (numeric), to_account_name, transfer_amount (decimal)
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Insert data into the database
            results.forEach(row => {
                if(row.transfer_amount && row.to_account_no && row.to_account_name && row.to_bank_name) { // all these fields are required
                    db.query(`INSERT INTO TransactionList (ReferenceNo, TransferAmount, TransferRecord, FromAccountNo, ToAccountNo, ToAccountName, ToAccountBank, Description, Maker, TransferDate, ApprovalStatus ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                        'ReferenceNo', row.transfer_amount, 'TransferRecord', 'FromAccountNo', row.to_account_no, row.to_account_name, row.to_bank_name, 'Description', 'Maker', '2024-05-24 14:30:00', 'Awaiting Approval'
                    ])
                }

            fs.unlinkSync(req.file.path); // Remove the file from the server
            res.status(200).json({ message: 'CSV data successfully inserted' });
        });
    });
});



module.exports = router;
