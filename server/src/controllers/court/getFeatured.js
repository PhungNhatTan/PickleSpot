import getFeaturedCourts from '../../models/court/getFeatured.js';

export default async function getFeatured(req, res) {
  try {
    const courts = await getFeaturedCourts();
    return res.json(courts);
  } catch (error) {
    console.error('Error fetching featured courts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
