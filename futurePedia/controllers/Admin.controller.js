const db = require("../../_helpers/db");
const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = db.User
const product = db.Product
const news = db.News
const category = db.Category
const feature = db.Feature
const pricing = db.Pricing
const blog = db.Blog
const comment = db.Comment

module.exports = {
  userList,
  addUser,
  userById,
  userUpdate,
  userDelete,

  productList,
  addproduct,
  productById,
  productUpdate,
  productStatusUpdate,

  newsList,
  addnews,
  newsById,
  newsUpdate,
  newsStatusUpdate,
  newsdelete,

  categoryList,
  addcategory,
  categoryById,
  categoryUpdate,
  categoryDelete,


  FeatureList,
  addFeature,
  featureById,
  featureUpdate,
  featureDelete,


  PricingList,
  addPricing,
  pricingById,
  pricingUpdate,
  PricingDelete,


  BlogList,
  addBlog,
  BlogById,
  BlogUpdate,
  BlogDelete,
  
  CommentList,
  addComment,
  CommentById,
 CommentUpdate,
  CommentDelete,

}

// -------USER------------

//  user list
async function userList(req, res) {
  console.log("userList", req.body)

  const data = await user.find({}).sort({ _id: -1 });

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// Add user
async function addUser(req, res) {
  console.log("addUser", req.body)

  if (await user.findOne({ email: req.body.email })) {
    return res.status(200).json({
      message: "Email " + req.body.email + " is already taken",
      status: "0",
    });
  }

  const Userdata = new user({
    full_name: req.body.full_name,
    email: req.body.email.toLowerCase()
  });

  const Users = new user(Userdata);
  // hash password
  if (req.body.password) {
    Users.password = bcrypt.hashSync(req.body.password, 10);
  }
  //   JWT token
  const payload = {
    full_name: req.body.full_name,
    email: req.body.email.toLowerCase()
  }
  const token = jwt.sign(payload, config.secret, {
    expiresIn: "365d",
  });
  console.log("token", token)
  Users.token = token
  // save user
  await Users.save();

  return res.status(200).json({
    messgae: "success",
    status: "1"
  })
}

// user by id
async function userById(req, res) {
  console.log("UserById", req.body)

  const data = await user.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// user Update
async function userUpdate(req, res) {
  console.log("userUpdate", req.body)

  await user.updateOne({ _id: req.body.id },
    {
      full_name: req.body.full_name,
      email: req.body.email.toLowerCase(),
      updated_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// user Delete
async function userDelete(req, res) {
  console.log("userDelete", req.body)

  await db.User.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
      deleted_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}



// -------NEWS------------

//  newsList 
async function newsList(req, res) {
  console.log("newsList", req.body)

  const data = await news.find({}).sort({ _id: -1 });

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// Add news
async function addnews(req, res) {
  console.log("addnews", req.body)
  var files = req.files;
  if (typeof files.image != "undefined") {
    var images = "";
    for (var j = 0; j < files.image.length; j++) {
      var image_name = files.image[j].filename;
      images += image_name + ",";
      var image = images.replace(/,\s*$/, "");
    }
  } else {
    var image = req.body.image;
  }

  const newsData = new news({
    title: req.body.title,
    url: req.body.url,
    category: req.body.category,
    image: image,
  });

  db.News.create(newsData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}

// news by id
async function newsById(req, res) {
  console.log("newsById", req.body)

  const data = await news.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// news Update
async function newsUpdate(req, res) {
  console.log("newsUpdate", req.body)

  if (typeof files.image != "undefined") {
    var images = "";
    for (var j = 0; j < files.image.length; j++) {
      var image_name = files.image[j].filename;
      images += image_name + ",";
      var image = images.replace(/,\s*$/, "");
    }
  } else {
    var image = req.body.image;
  }

  await news.updateOne({ _id: req.body.id },
    {
      title: req.body.title,
      url: req.body.url,
      category: req.body.category,
      updated_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// news status Update
async function newsStatusUpdate(req, res) {
  console.log("newsStatusUpdate", req.body)

  await db.News.updateOne({ _id: req.body.id },
    {
      verified: "verified",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}
// news status Update
async function newsdelete(req, res) {
  console.log("newsdelete", req.body)

  await db.News.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}



// -------Product------------

//  productList 
async function productList(req, res) {
  console.log("productList", req.body)

  const data = await product.find({}).sort({ _id: -1 });

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// Add product
async function addproduct(req, res) {
  console.log("addproduct", req.body)
  var files = req.files;
  if (typeof files.image != "undefined") {
    var images = "";
    for (var j = 0; j < files.image.length; j++) {
      var image_name = files.image[j].filename;
      images += image_name + ",";
      var image = images.replace(/,\s*$/, "");
    }
  } else {
    var image = req.body.image;
  }

  const productData = new product({
    title: req.body.title,
    url: req.body.url,
    category: req.body.category,
    short_discription: req.body.short_discription,
    discription: req.body.discription,
    features: req.body.features,
    pricing_category: req.body.pricing_category,
    price: req.body.price,
    association: req.body.association,
    image: image,
  });

  db.Product.create(productData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}

// product by id
async function productById(req, res) {
  console.log("productById", req.body)
  if (__dirname == "/jinni/backend/jinni/controllers") {
    var PicUrl = `${process.env.URL}/uploads/product/`;
  } else {
    var PicUrl =
    "https://" + "api.findup.ai" + "/uploads/product/";
  }
  const data = await product.findOne({ _id: req.body.id })
  const features = await feature.findOne({ _id: data.features })
  const categoryTitle = await category.findOne({ _id: data.category })
  const price = await pricing.findOne({ _id: data.pricing_category })
  console.log("feature", features.title)
  if(req.body.user_id != undefined){
    console.log()
    var heartStatus1 = ""
    const favourites1 = await db.Favourites.findOne({user_id:req.body.user_id,product_id:data.id})
    if(favourites1==null){
        heartStatus1="0"
    }else{
        heartStatus1=favourites1.heart_status
    }
}
  const productData = {
    title: data.title,
    url: data.url,
    category: categoryTitle.title,
    heartStatus:heartStatus1,
    short_discription: data.short_discription,
    discription: data.discription,
    features: features.title,
    pricing_category: price.title,
    price: data.price,
    association: data.association,
    created_at:data.created_at,
    id: data._id,
    image: PicUrl + data.image,
    verified:data.verified
  };
  const categorybyproduct = await product.find({category:data.category})
  var simmilarproduct=[]
  for(let i=0;categorybyproduct.length>i;++i){
    if(req.body.user_id != undefined){
      console.log()
      var heartStatus = ""
      const favourites = await db.Favourites.findOne({user_id:req.body.user_id,product_id:categorybyproduct[i].id})
      if(favourites==null){
          heartStatus="0"
      }else{
          heartStatus=favourites.heart_status
      }
  }
   simmilarproduct.push({
    title: categorybyproduct[i].title,
    url: categorybyproduct[i].url,
    category: categoryTitle.title,
    heartStatus:heartStatus,
    short_discription: categorybyproduct[i].short_discription,
    discription: categorybyproduct[i].discription,
    features: features.title,
    pricing_category: price.title,
    price: categorybyproduct[i].price,
    association: categorybyproduct[i].association,
    id: categorybyproduct[i]._id,
    image: PicUrl + categorybyproduct[i].image,
    verified:categorybyproduct[i].verified
   
   })
  }
  const CommentList = []
  const comment = await db.Comment.find({productId:req.body.id})
  for(let i=0;comment.length>i;++i){
    const userTitle = await user.findOne({_id:comment[i].userId})

    CommentList.push({
  ratting:comment[i].ratting,
  comment:comment[i].comment,
  productId:comment[i].productId,
  userName:userTitle.full_name,
  created_at:userTitle.created_at,
 })
  }
  return res.status(200).json({
    data: productData,
    simmilarproduct:simmilarproduct,
    commentList:CommentList,
    comment:comment,
    messgae: "success",
    status: "1"
  })
}

// product Update
async function productUpdate(req, res) {
  console.log("productUpdate", req.body)

  if (typeof files.image != "undefined") {
    var images = "";
    for (var j = 0; j < files.image.length; j++) {
      var image_name = files.image[j].filename;
      images += image_name + ",";
      var image = images.replace(/,\s*$/, "");
    }
  } else {
    var image = req.body.image;
  }

  await product.updateOne({ _id: req.body.id },
    {
      title: req.body.title,
      url: req.body.url,
      category: req.body.category,
      short_discription: req.body.shortDiscription,
      discription: req.body.discription,
      features: req.body.features,
      pricing_category: req.body.pricingCategory,
      price: req.body.price,
      association: req.body.association,
      image: image,
      updated_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// productStatusUpdate
async function productStatusUpdate(req, res) {
  console.log("productStatusUpdate", req.body)

  await db.Product.updateOne({ _id: req.body.id },
    {
      verified: "verifieds",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}


// -------Category------------

//  CategoryList 
async function categoryList(req, res) {
  console.log("categoryList", req.body)

  const data = await category.find({}).sort({ _id: -1 });
  var list = []
  for(let i=0;data.length>i;++i){
    var productlength = await product.find({category:data[i].id})
    list.push({
      title:data[i].title,
      type:data[i].type,
      status:data[i].status,
      id:data[i].id,
      productCount:productlength.length
    })
  }

  return res.status(200).json({
    data: list,
   
    messgae: "success",
    status: "1"
  })
}

// Add Category
async function addcategory(req, res) {
  console.log("addcategoryyyyy", req.body)

  const categoryData = new category({
    title: req.body.title,
    type: req.body.type
  });

  db.Category.create(categoryData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      console.log("err",err)
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}

// category by id
async function categoryById(req, res) {
  console.log("categoryById", req.body)

  const data = await category.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// category Update
async function categoryUpdate(req, res) {
  console.log("categoryUpdate", req.body)


  await product.updateOne({ _id: req.body.id },
    {
      title: req.body.title,
      type: req.body.type,
      updated_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// category Delete
async function categoryDelete(req, res) {
  console.log("categoryDelete", req.body)

  await db.Category.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}
// -------Feature------------

//  FeatureList 
async function FeatureList(req, res) {
  console.log("FeatureList", req.body)

  const data = await feature.find({}).sort({ _id: -1 });

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// Add Feature
async function addFeature(req, res) {
  console.log("addFeature", req.body)

  const FeatureData = new feature({
    title: req.body.title,
  });

  db.Feature.create(FeatureData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}

// Feature by id
async function featureById(req, res) {
  console.log("categoryById", req.body)

  const data = await feature.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// Feature Update
async function featureUpdate(req, res) {
  console.log("categoryUpdate", req.body)


  await product.updateOne({ _id: req.body.id },
    {
      title: req.body.title,
      type: req.body.type,
      updated_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// Feature Delete
async function featureDelete(req, res) {
  console.log("featureDelete", req.body)

  await db.Feature.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}
// -------Pricing------------

//  PricingList 
async function PricingList(req, res) {
  console.log("pricingList", req.body)

  const data = await pricing.find({}).sort({ _id: -1 });

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// Add Pricing
async function addPricing(req, res) {
  console.log("addPricing", req.body)

  const PricingData = new pricing({
    title: req.body.title,
  });

  db.Pricing.create(PricingData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}

// Pricing by id
async function pricingById(req, res) {
  console.log("pricingById", req.body)

  const data = await pricing.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// Pricing Update
async function pricingUpdate(req, res) {
  console.log("PricingUpdate", req.body)


  await pricing.updateOne({ _id: req.body.id },
    {
      title: req.body.title,
      updated_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// Pricing Delete
async function PricingDelete(req, res) {
  console.log("PricingDelete", req.body)

  await db.Pricing.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// -------Blog------------

//  BlogList 
async function BlogList(req, res) {
  console.log("BlogList", req.body)
  if (__dirname == "/jinni/backend/jinni/controllers") {
    var PicUrl = `${process.env.URL}/uploads/blog/`;
  } else {
    var PicUrl =
    "https://" + "api.findup.ai" + "/uploads/blog/";
  }
  const data = await blog.find({}).sort({ _id: -1 });
  const list =[]
  for(let i=0;data.length>i;++i){
      list.push({
        image:PicUrl+data[i].image,
        id:data[i].id,
        title:data[i].title,
        paragraph:data[i].paragraph,
        status:data[i].status,
        created_at:data[i].created_at
      })
  }

  return res.status(200).json({
    data: list,
    messgae: "success",
    status: "1"
  })
}

// Add Blog
async function addBlog(req, res) {
  console.log("addBlog", req.body)
  var files = req.files;
  if (typeof files.image != "undefined") {
    var images = "";
    for (var j = 0; j < files.image.length; j++) {
      var image_name = files.image[j].filename;
      images += image_name + ",";
      var image = images.replace(/,\s*$/, "");
    }
  } else {
    var image = req.body.image;
  }

  const blogData = new blog({
    title: req.body.title,
    paragraph: req.body.paragraph,
    image: image,
  });

  db.Blog.create(blogData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}

// Blog by id
async function BlogById(req, res) {
  console.log("BlogById", req.body)
  if (__dirname == "/jinni/backend/jinni/controllers") {
    var PicUrl = `${process.env.URL}/uploads/blog/`;
  } else {
    var PicUrl =
    "https://" + "api.findup.ai" + "/uploads/blog/";
  }
  const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
        const endOfWeek = new Date();
        endOfWeek.setHours(23, 59, 59, 999);
        endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
    
        const Products = await product.aggregate([
          {
            $match: {
                created_at: {
                $gte: startOfWeek,
                $lte: endOfWeek,
              },
            },
          },
        ]);
        const News = await news.aggregate([
          {
            $match: {
                created_at: {
                $gte: startOfWeek,
                $lte: endOfWeek,
              },
            },
          },
        ]);
  const data = await blog.findOne({ _id: req.body.id })
   data.image=PicUrl+data.image
  return res.status(200).json({
    data: data,
    Products:Products,
    news:News,
    messgae: "success",
    status: "1"
  })
}

// Blog Update
async function BlogUpdate(req, res) {
  console.log("BlogUpdate", req.body)

  if (typeof files.image != "undefined") {
    var images = "";
    for (var j = 0; j < files.image.length; j++) {
      var image_name = files.image[j].filename;
      images += image_name + ",";
      var image = images.replace(/,\s*$/, "");
    }
  } else {
    var image = req.body.image;
  }

  await blog.updateOne({ _id: req.body.id },
    {
      title: req.body.title,
      paragraph: req.body.paragraph,
      imgae: image,
      updated_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// Blog Delete
async function BlogDelete(req, res) {
  console.log("BlogDelete", req.body)

  await db.Blog.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}
// -------Comment------------

//  CommentList 
async function CommentList(req, res) {
  console.log("BlogList", req.body)
  const data = await comment.find({}).sort({ _id: -1 });
  const list =[]
  for(let i=0;data.length>i;++i){
    const productName = await product.findOne({_id:data[i].productId})
    const userName = await user.findOne({_id:data[i].userId})
      list.push({
        id:data[i].id,
        ratting:data[i].ratting,
        comment:data[i].comment,
        productname:productName.title,
        username:userName.full_name,
        status:data[i].status,
        created_at:data[i].created_at
      })
  }

  return res.status(200).json({
    data: list,
    messgae: "success",
    status: "1"
  })
}

// addComment
async function addComment(req, res) {
  console.log("addBlog", req.body)
  
  const commentData = new comment({
    ratting:req.body.ratting,
    comment:req.body.comment,
    productId:req.body.productId,
    userId:req.body.userId,
  });

  db.Comment.create(commentData, async function (err, result) {
    if (result) {
      return res.status(200).json({
        message: "success",
        status: "1",
      });
    } else {
      res.status(200).json({
        message: "error",
        status: "0",
      });
    }
  });
}

// CommentById
async function CommentById(req, res) {
  console.log("BlogById", req.body)
  if (__dirname == "/jinni/backend/jinni/controllers") {
    var PicUrl = `${process.env.URL}/uploads/blog/`;
  } else {
    var PicUrl =
    "https://" + "api.findup.ai" + "/uploads/blog/";
  }
  const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
        const endOfWeek = new Date();
        endOfWeek.setHours(23, 59, 59, 999);
        endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
    
        const Products = await product.aggregate([
          {
            $match: {
                created_at: {
                $gte: startOfWeek,
                $lte: endOfWeek,
              },
            },
          },
        ]);
        const News = await news.aggregate([
          {
            $match: {
                created_at: {
                $gte: startOfWeek,
                $lte: endOfWeek,
              },
            },
          },
        ]);
  const data = await blog.findOne({ _id: req.body.id })
   data.image=PicUrl+data.image
  return res.status(200).json({
    data: data,
    Products:Products,
    news:News,
    messgae: "success",
    status: "1"
  })
}

// CommentUpdate
async function CommentUpdate(req, res) {
  console.log("BlogUpdate", req.body)

  if (typeof files.image != "undefined") {
    var images = "";
    for (var j = 0; j < files.image.length; j++) {
      var image_name = files.image[j].filename;
      images += image_name + ",";
      var image = images.replace(/,\s*$/, "");
    }
  } else {
    var image = req.body.image;
  }

  await blog.updateOne({ _id: req.body.id },
    {
      title: req.body.title,
      paragraph: req.body.paragraph,
      imgae: image,
      updated_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// CommentDelete
async function CommentDelete(req, res) {
  console.log("BlogDelete", req.body)

  await db.Blog.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}
