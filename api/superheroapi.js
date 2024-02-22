const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req, res) => {
  const { id } = req.query;
  const apiKey = process.env.API_KEY;
  const url = `https://superheroapi.com/api/${apiKey}/${id}`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    console.log('API Response:', data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching superhero data' });
  }
};

module.exports = allowCors(handler);
