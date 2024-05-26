
const db = require('mysql-promise')();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/index.js');

db.configure({
	"host": "localhost",
	"user": "root",
	"password": "Password01",
	"database": "bankNeoCommerce"
});


const express = require('express');

const router = express.Router();

// const Model = require('../models/model');
// const MenuModel = require('../models/menuModel');
// const RecipeModel = require('../models/recipeModel');



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

    for (const [key, value] of Object.entries(data)) { // all required
        if (value === undefined || value === null) {
            return res.status(400).json({ error: `${key} is required` });
        }
    }

    const hashedPassword = await bcrypt.hash(data.Password, 10);


    try {
        db.query(`INSERT INTO User (CorporateAccount, CorporateName, UserId, UserName, UserRole, PhoneNumber,Email, Verification, Password ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [data.CorporateAccount, data.CorporateName, data.UserId, data.UserName, data.UserRole, data.PhoneNumber, data.Email, data.Verification, hashedPassword]).spread(function (users) {
            res.status(200).json("successful")
        });
    }
    catch (error) {
        res.status(400).json({message: error.message})
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

           const token = jwt.sign({ userId: item.UserId }, 'bnc-web-token', {expiresIn: '1h', });
    
    
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
        res.status(400).json("error")
    }
})





// transaction for maker role
router.get('/transactions/:role', verifyToken, async (req, res) => {
    try {   
        const [overviewRows] = await db.query('SELECT * FROM TransactionOverview');
        const [listRows] = await db.query('SELECT * FROM TransactionList');
        console.log("listRows", listRows)
        res.status(200).json({
            overview: overviewRows[0],
            list: listRows
        });
    }
    catch (error) {
        res.status(400).json("error")
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
        res.status(500).json({ error: 'Server error' });
    }
});

// POST Approval role
router.post('/transactions/operation',verifyToken,  async (req, res) => {
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
        res.status(400).json({message: error.message})
    }
})

module.exports = router;
