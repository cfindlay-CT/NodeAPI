// index.js
require('dotenv').config();

const apiKeyAuth = require('./middleware/apiKeyAuth');
const supabaseRoutes = require('./routes/supabase.routes');

const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const DEFAULT_CORS_ORIGIN = process.env.CORS_ALLOWED_ORIGINS.split(',');


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || DEFAULT_CORS_ORIGIN.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(apiKeyAuth);

app.use(express.json());
app.use('/api/supabase', supabaseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
