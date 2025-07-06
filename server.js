require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { creatClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyUser(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return (
            res.status(401).json({ error: 'No Token Provided' })
        );
    }
    
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) return res.status(401).json({ error: 'Unauthorized' });

    req.user = user;
    next();
}

app.post('/submit-form', verifyUser, (req, res) => {
    const formData = req.body;
    console.log(`Recevied form from user ${req.user.email}:`, formData);
    res.json({ message: 'Form received!' });
});

app.listen(3000, () => {
    console.log('Server runnig on http://localhost:3000')
})