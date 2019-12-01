const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Create remove field
  let removeFields = ["select", "sort", "limit", "page"];

  // Copy req.query
  const reqQuery = { ...req.query };

  // Delete removeField from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  console.log(reqQuery);

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

  const results = await query;

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
    count: results.length,
    pagination,
    data: results
  };

  next();
};

module.exports = advancedResults;
