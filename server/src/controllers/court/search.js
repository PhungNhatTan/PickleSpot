import search from '../../models/court/search.js';

const searchCourts = async (req, res) => {
  try {
    const {
      location,
      start,
      end,
      minPrice,
      maxPrice,
      minRating,
    } = req.query;

    const result = await search({
      location,
      start,
      end,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      minRating: minRating ? parseFloat(minRating) : undefined,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search courts' });
  }
};

export default searchCourts;
