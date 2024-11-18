 const createTables = async (con) => {

  await con.query("CREATE DATABASE IF NOT EXISTS hmaparel;", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  con.query("use hmaparel;", function (err, result) {
    if (err) throw err;
    console.log("using db hmaparel");
  });
  await con.query(`CREATE TABLE IF NOT EXISTS credentials (
    credential_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);`, function (err, result) {
    if (err) throw err;
    console.log("created table credentials");
  });
  await con.query(`CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    credential_id INT,
    isAdmin BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (credential_id) REFERENCES credentials(credential_id) ON DELETE CASCADE
);`, function (err, result) {
    if (err) throw err;
    console.log("created table user");
  });
  await con.query(`CREATE TABLE IF NOT EXISTS listing (
    listing_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stock INT NOT NULL
);`, function (err, result) {
    if (err) throw err;
    console.log("created table listing");
  });
  await con.query(`CREATE TABLE IF NOT EXISTS listing_images (
    listing_id INT,
    image_path VARCHAR(255) NOT NULL,
    PRIMARY KEY (listing_id, image_path),
    FOREIGN KEY (listing_id) REFERENCES listing(listing_id) ON DELETE CASCADE
);`, function (err, result) {
    if (err) throw err;
    console.log("created table listing_images");
  });
  await con.query(`CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    listing_id INT,
    amount INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES listing(listing_id) ON DELETE CASCADE
);`, function (err, result) {
    if (err) throw err;
    console.log("created table orders");
  });
  await con.query(`CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    listing_id INT,
    amount INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES listing(listing_id) ON DELETE CASCADE
);`, function (err, result) {
    if (err) throw err;
    console.log("created table orders");
  });
 await  con.query(`CREATE TABLE IF NOT EXISTS wishlist (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    listing_id INT,
    amount INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES listing(listing_id) ON DELETE CASCADE
);`, function (err, result) {
    if (err) throw err;
    console.log("created table wishlist");
  });
  await con.query(`CREATE TABLE IF NOT EXISTS customer_category (
    cc_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);`, function (err, result) {
    if (err) throw err;
    console.log("created table customer_category");
  });
  await con.query(`CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    cc_id INT,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (cc_id) REFERENCES customer_category(cc_id) ON DELETE CASCADE
);`, function (err, result) {
    if (err) throw err;
    console.log("created table category");
  });
  await con.query(`CREATE TABLE IF NOT EXISTS sub_categories (
    sub_category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);`, function (err, result) {
    if (err) throw err;
    console.log("created table sub_category");
  });
  await con.query(`CREATE TABLE IF NOT EXISTS listing_categories (
    listing_id INT,
    sub_category_id INT,
    PRIMARY KEY (listing_id, sub_category_id),
    FOREIGN KEY (listing_id) REFERENCES listing(listing_id) ON DELETE CASCADE,
    FOREIGN KEY (sub_category_id) REFERENCES sub_categories(sub_category_id) ON DELETE CASCADE
);`, function (err, result) {
    if (err) throw err;
    console.log("created table listing_categories");
  }); 
}

module.exports = createTables;