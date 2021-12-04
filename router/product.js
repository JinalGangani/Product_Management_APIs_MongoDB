const express = require("express");
const router = express.Router();
router.use(express.json());

const product = require("../Model/product");
const company = require("../Model/company");
const seller = require("../Model/seller");

router.get("/allproduct", async (req,res)=>{
        const details = await product.find();
        return res.json({data:details});
});

router.get("/productOfCompnay", async (req,res)=>{
    const t = req.body.title;
    if(t){
        const details = await product.findOne({title:t});
        const cDetail = await company.find({},{company_id:details["company_id"]});
        return res.json({data:cDetail});
    }
    return res.json({data:"No Data Found"});
});

router.get("/productOfSeller", async (req,res)=>{
    const t = req.body.title;
    if(t){
        const details = await product.findOne({title:t});
        const sDetail = await company.find({},{seller_id:details["seller_id"]});
        return res.json({data:sDetail});
    }
    return res.json({data:"No Data Found"});
});


router.post("/addProduct",(req,res)=>{
    const {addProduct} = req.body;

    if(addProduct){
        product.create(addProduct);
        return res.json({data:"New Product Add Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

router.put("/updateProductCategory", async (req,res)=>{
    const pId = req.body.product_id;
    const c = req.body.category;
    const details = await product.findOne({product_id:pId});
    if(details){
        product.findOneAndUpdate({product_id:pId , category:c});
        return res.json({data:"Product Category Update Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

router.delete("/deleteProduct", async (req,res)=>{
    const pId = req.body.product_id;
    const deatils = await product.findOne({product_id:pId});
    if(deatils){
        return res.json({data:"Delete Product Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

module.exports = router;