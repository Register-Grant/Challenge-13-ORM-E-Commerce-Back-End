const router = require('express').Router();
const { response } = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [
        {
          model: Product,
          as: 'products'
        }
      ]
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [
        {
          model: Product,
          as: 'products'
        }
      ]
    });
    if (!categoryId) {
      res.status(404).json({ message: 'Why are you still here - move the eff along' });
      return;
    }
    res.status(200).json(categoryId)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategoryData = await Category.create();
    res.status(200).json(newCategoryData);
} catch (err) {
    res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategoryById = await Category.update({
      tag_name: req.body.category_name,
    }, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updateCategoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const destroyCategoryById = await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!destroyCategoryById) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(destroyCategoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
