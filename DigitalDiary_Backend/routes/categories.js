const express = require("express");
const router = express.Router();
const {validateCat,Category} = require("../model/category");
const auth = require("../middleware/auth");

/******************************************************/

// route - /api/categories
// method - get
// type - private
// params - none
// for displaying categories
router.get("/",auth,async(req,res) =>{
    try{

        const id = req.user.id;

        let categories = await Category.find({userID:id});

        if(!categories.length){
            res.status(200).json({status:0, message:"No Categories to display"});
        }
        res.status(200).json({status: 0, message:"These are the categories",category:categories})
    }catch(error){
        console.log(`category - ${error.message}`);
    res.status(500).json({ status: 1, message: "unexpected error occured!" });
    }
});

// route - /api/categories/
// method - post
// type - private
// params - none
// to add the categories for a logged in user.
router.post("/",auth, async(req,res) =>{
 
  let user_id = req.user.id;
  // console.log(req)
    try{
        const {err} = validateCat(req.body);


        if(err){
            return res.status(200).json({status: 1, message:error.details[0].message })
        }

        let catName = await Category.findOne({
            name : req.body.name
        });

        if(catName){
            return res.status(200).json({status:1, message:"Category already exists!!"});
        }
        const category = new Category({
            userID: req.user.id,
            name: req.body.name,
            description:req.body.desc
          });

          const cat = await category.save();
        res.status(200).json({ status: 0, message: "category added successfully!", category: cat });
        
    }catch (error) {
        console.log(`category - ${error.message}`);
        res.status(500).json({ status: 1, message: "unexpected error occured!" });
      }
});

// route - /api/categories/
// method - delete
// type - private
// params - none
// body - contactid
// to delete specific contact of logged in user
router.delete("/",auth, async(req, res) =>{
  console.log(req.body)
    const categoryID = req.body.id;


  try {
    let deleteCat = await Category.findByIdAndRemove({ _id: categoryID });

    if (!deleteCat) {
      return res.status(200).json({status:1, message :"no category exists"});
    }

    return res.status(200).json({status:0, message :"category deleted"});
  } catch(error) {
    console.log(`category - ${error.message}`);
    res.status(500).json({ status: 1, message: "unexpected error occured!" });
  }
});

// route - /api/categories/
// method - put
// type - private
// params - none
// to update information of logged in user
router.put("/",auth, async (req, res) => {
  console.log(req.body)
    const categoryID = req.body._id;
  
    try {
      // this contact will always be found!
      let foundCategory = await Category.findById({_id:categoryID});
  
      // check did we able to find
      if(!foundCategory){
        return res.status(200).json({status:1,message:"no category found"})
      }
  
      foundCategory.name = req.body.name;
      foundCategory.description = req.body.description;
            
        
      const cat = await foundCategory.save();
  
      return res
        .status(200)
        .json({ status: 0, message: "category updated", category: cat });
      
    } catch (error) {
      console.log(`category - ${error.message}`);
      res.status(500).json({ status: 1, message: "unexpected error occured!" });
    }

  });

  // router.get("/:id",)

//exports
module.exports = router;