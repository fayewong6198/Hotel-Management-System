const Payment = require("../models/Payment");

const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Create remove field
  let removeFields = [
    "select",
    "sort",
    "limit",
    "page",
    "checkInDate",
    "checkOutDate"
  ];

  // Copy req.query
  const reqQuery = { ...req.query };

  // Delete removeField from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Stringify req.query
  queryStr = JSON.stringify(reqQuery);

  // Change lte, gte, ... to $lte, $gte, ...
  queryStr = queryStr.replace(/\b(lt|lte|gt|gte|in)\b/g, match => `$${match}`);

  // Query
  query = model.find(JSON.parse(queryStr));

  // Select field
  if (req.query.select) {
    const field = req.query.select.split(",").join(" ");
    query = query.select(field);
  }
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  let results = await query;

  let cc = JSON.parse(JSON.stringify(results));
  for (let i = 0; i < results.length; i++) {
    cc[i].isValidDate = await checkValidDate(
      new Date(req.query.checkInDate),
      new Date(req.query.checkOutDate),
      results[i]
    );
  }

  // Check valid Date
  let finalResult;
  if (req.query.checkInDate !== null && req.query.checkOutDate !== null) {
    finalResult = cc.filter(room => room.isValidDate);
  } else {
    finalResult = results;
  }

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.advancedResults = {
    success: true,
    count: finalResult.length,
    pagination,
    data: finalResult
  };

  next();
};

const checkValidDate = async (check_in_date, check_out_date, room) => {
  const payments = await Payment.find({
    room: room,
    $or: [{ status: "watting" }, { status: "checked_in" }]
  });

  for (let i = 0; i < payments.length; i++) {
    if (
      (check_in_date >= payments[i].checkInDate &&
        check_in_date <= payments[i].checkOutDate) ||
      (check_out_date >= payments[i].checkInDate &&
        check_out_date <= payments[i].checkOutDate) ||
      (payments[i].checkInDate >= check_in_date &&
        payments[i].checkInDate <= check_out_date)
    ) {
      console.log("--------------------FOUNT ONE-----------------------------");
      return false;
    }
  }
  return true;
};

module.exports = advancedResults;
