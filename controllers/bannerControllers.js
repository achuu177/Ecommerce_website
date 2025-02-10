const { Banner } = require("../models/bannerModel");
const { Seller } = require("../models/sellerModel");
const { catchErrorHandler } = require("../utils/catchErrorHandler");
const { cloudinaryInstance } = require("../config/cloudinary");

// Add banner
exports.addBanner = async (req, res) => {
  try {
    const { title, color } = req.body;

    if (!title || !color) {
      return res.status(400).json({ message: "All fields required" });
    }

    const sellerId = req.user.id;

    const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);

    const banner = new Banner({
      title,
      color,
      image: uploadResult.url,
      seller: sellerId,
    });

    await banner.save();

    await Seller.findOneAndUpdate(
      { _id: sellerId },
      { $push: { banners: banner._id } },
      { new: true }
    );

    res.json({ message: "Banner added successfully", data: banner });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Get banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();

    if (!banners.length) {
      return res.status(404).json({ message: "No banners found" });
    }

    res.status(200).json({ message: "Banners rendered successfully", data: banners });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Get seller banners
exports.getSellerBanners = async (req, res) => {
  try {
    const userId = req.user.id;
    const seller = await Seller.findById(userId).populate("banners");

    if (!seller || !seller.banners || seller.banners.length === 0) {
      return res.status(404).json({ message: "No banners found for this seller" });
    }

    res.status(200).json({ message: "Seller banners rendered successfully", data: seller.banners });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Get black banner
exports.getBlackBanner = async (req, res) => {
  try {
    const blackBanners = await Banner.find({ color: "black" });

    if (!blackBanners.length) {
      return res.status(404).json({ message: "No black banner found" });
    }

    res.status(200).json({ message: "Black banners rendered successfully", data: blackBanners });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Get yellow banner
exports.getYellowBanner = async (req, res) => {
  try {
    const yellowBanners = await Banner.find({ color: "yellow" });

    if (!yellowBanners.length) {
      return res.status(404).json({ message: "No yellow banner found" });
    }

    res.status(200).json({ message: "Yellow banners rendered successfully", data: yellowBanners });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Delete banner
exports.deleteBanner = async (req, res) => {
  try {
    const { bannerId } = req.body;
    const banner = await Banner.findByIdAndDelete(bannerId);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found", data: [] });
    }

    res.status(200).json({ message: "Banner deleted", data: banner });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Search banner
exports.searchBanner = async (req, res) => {
  try {
    const { searchResult } = req.body;

    if (!searchResult || searchResult.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchResults = await Banner.find({
      $or: [{ title: { $regex: searchResult, $options: "i" } }],
    });

    if (!searchResults) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner fetched", data: searchResults });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};

// Search seller banners
exports.searchSellerBanners = async (req, res) => {
  try {
    const userId = req.user.id;
    const { searchResult } = req.body;

    if (searchResult && searchResult.trim() !== "") {
      const searchResults = await Banner.find({
        seller: userId,
        $or: [{ title: { $regex: searchResult, $options: "i" } }],
      });

      if (!searchResults || searchResults.length === 0) {
        return res.status(404).json({ message: "No matching banner found" });
      }

      return res.status(200).json({ message: "Banners found", data: searchResults });
    }
  } catch (error) {
    catchErrorHandler(res, error);
  }
};
