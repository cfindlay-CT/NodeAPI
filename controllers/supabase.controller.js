const supabase = require('../services/supabaseClient');

exports.getProducts = async (req, res) => {
  try {
    console.log("GET /products hit");
    const { data, error } = await supabase.from('printed_products').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Supabase error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
