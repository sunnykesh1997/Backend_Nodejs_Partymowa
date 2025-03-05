// // routes/themes.js
// const express = require('express');
// const router = express.Router();
// const Theme = require('../models/Theme');
// const upload = require('../middleware/upload');


// // Fetch all themes
// router.get('/', async (req, res) => {
//   try {
//     const themes = await Theme.find(); // Fetch themes from MongoDB
//     res.json(themes);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });
// // Delete a theme by ID
// router.delete('/:id', async (req, res) => {
//   try {
//       const theme = await Theme.findById(req.params.id);

//       if (!theme) {
//           return res.status(404).json({ message: 'Theme not found' });
//       }

//       // Delete the theme
//       await theme.remove();
//       res.json({ message: 'Theme deleted successfully' });
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Server error');
//   }
// });


// // Create a new theme with image upload
// router.post('/', upload.single('theme_img'), async (req, res) => {
//     const { theme_name, base_price, base_hr, base_extra_person_price, price, hours, extra_person_price } = req.body;

//     const theme = new Theme({
//         theme_name,
//         theme_img: req.file.filename,
//  // Save uploaded file path
//         base_price,
//         base_hr,
//         base_extra_person_price,
//         price,
//         hours,
//         extra_person_price,
//     });

//     try {
//         const newTheme = await theme.save();
//         res.status(201).json(newTheme);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Theme = require('../models/Theme');
const upload = require('../middleware/upload');

// Fetch all themes
router.get('/', async (req, res) => {
    try {
        const themes = await Theme.find(); // Fetch themes from MongoDB
        res.json(themes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Fetch a theme by ID
router.get('/:id', async (req, res) => {
    try {
        const theme = await Theme.findById(req.params.id);
        
        if (!theme) {
            return res.status(404).json({ message: 'Theme not found' });
        }

        res.json(theme);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update a theme by ID
router.put('/:id', upload.single('theme_img'), async (req, res) => {
    const { theme_name, base_price, base_hr, base_extra_person_price, price, hours, extra_person_price } = req.body;
    try {
        const theme = await Theme.findById(req.params.id);
        
        if (!theme) {
            return res.status(404).json({ message: 'Theme not found' });
        }

        // Update fields with the new values
        theme.theme_name = theme_name || theme.theme_name;
        theme.base_price = base_price || theme.base_price;
        theme.base_hr = base_hr || theme.base_hr;
        theme.base_extra_person_price = base_extra_person_price || theme.base_extra_person_price;
        theme.price = price || theme.price;
        theme.hours = hours || theme.hours;
        theme.extra_person_price = extra_person_price || theme.extra_person_price;

        // If new theme image is provided, update the image
        if (req.file) {
            theme.theme_img = req.file.filename;
        }

        // Save updated theme
        const updatedTheme = await theme.save();
        res.json(updatedTheme);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// Delete a theme by ID
// routes/themes.js
// routes/themes.js
router.delete('/:id', async (req, res) => {
  try {
      const theme = await Theme.findByIdAndDelete(req.params.id);

      if (!theme) {
          return res.status(404).json({ message: 'Theme not found' });
      }

      res.json({ message: 'Theme deleted successfully' });
  } catch (err) {
      console.error('Error deleting theme:', err);  // Log the error to understand it
      res.status(500).json({ message: 'Error deleting theme', error: err.message });
  }
});


// Create a new theme with image upload
router.post('/', upload.single('theme_img'), async (req, res) => {
    const { theme_name, base_price, base_hr, base_extra_person_price, price, hours, extra_person_price } = req.body;

    const theme = new Theme({
        theme_name,
        theme_img: req.file.filename, // Save uploaded file path
        base_price,
        base_hr,
        base_extra_person_price,
        price,
        hours,
        extra_person_price,
    });

    try {
        const newTheme = await theme.save();
        res.status(201).json(newTheme);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
