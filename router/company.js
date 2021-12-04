const express = require("express");
const router = express.Router();
router.use(express.json());

const company = require("../Model/company");
const product = require("../Model/product");

router.get("/companyOfProduct", async (req,res)=>{
    const name = req.body.name;
    const details = await company.find({name:name});
    if(details){
        const pDetail = await product.findOne({product_id:details["product_id"]});
        return res.json({data:pDetail});
    }
    return res.json({data:"No Data Found"});
});

router.post("/addCompany",(req,res)=>{
    const {addCompany} = req.body;

    if(addCompany){
        company.create(addCompany);
        return res.json({data:"New Company Add Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

router.put("/updateProductId", async (req,res)=>{
    const cId = req.body.company_id;
    const pId = req.body.product_id;
    const findCid = await company.findOne({company_id:cId});
    if(findCid){
        const details = await company.findOneAndUpdate({company_id:cId , product_id:pId});
            return res.json({data:"Product_Id Update Successfully",Update : details});
    }
    return res.json({data:"No Data Found"});
});

router.delete("/deleteCompany", async (req,res)=>{
    const cId = req.body.company_id;
    const findCid = await company.findOne({company_id:cId});
    if(findCid){
        company.findOneAndDelete({company_id:cId});
        return res.json({data:"Delete Company Successfully"});
    }
    return res.json({data:"No Data Found"});
});


module.exports = router;