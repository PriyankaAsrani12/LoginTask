const express=require("express");
const router=express.Router();
const Launches=require("../models/launches");
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

//@desc Getting all the data regarding launches
//@route GET
router.get('/read/:id',async(req,res)=>{
    myid=req.params.id
    try{
        const launches=await Launches.find()
        console.log(launches)
        res.send(launches)
    }catch(err){
        console.log(err)
        res.send("Launch not found")
    }
})

//@desc Fetching all launch departments
//@route GET
router.get('/read/launch_departments/:id',async(req,res)=>{
    myid=req.params.id
    try{
        const launches=await Launches.find({_id: myid},{launch_departments:1})
        console.log(launches)
        res.send(launches)
    }catch(err){
        console.log(err)
        res.send("Launch department not found")
    }
})


//@desc Fetching a particular launch department
//@route GET
router.get('/read/launch_departments/:id/:did',async(req,res)=>{
    myid=req.params.id
    mydid=req.params.did
    try{
        const launches=await Launches.find(
            {_id: myid},
            {
                launch_departments: {
                  "$elemMatch": {
                    "_id": mydid
                  }
                }
            })
        console.log(launches)
        res.send(launches)
    }catch(err){
        console.log(err)
        res.send("Launch department not found")
    }
})

//@desc Fetching all launch function
//@route GET
router.get('/read/launch_functions/:id',async(req,res)=>{
    myid=req.params.id
    try{
        const launches=await Launches.find({_id: myid},{launch_functions:1})
        console.log(launches)
        res.send(launches)
    }catch(err){
        console.log(err)
        res.send("Launch not found")
    }
})

//@desc Fetching a particular launch function
//@route GET
router.get('/read/launch_functions/:id/:fid',async(req,res)=>{
    myid=req.params.id
    myfid=req.params.fid
    try{
        const launches=await Launches.find(
            {_id: myid},
            {
                launch_functions: {
                  "$elemMatch": {
                    "_id": myfid
                  }
                }
            })
        console.log(launches)
        res.send(launches)
    }catch(err){
        console.log(err)
        res.send("Launch function not found")
    }
})

//@desc Fetching all launch sub function
//@route GET
router.get('/read/launch_sub_functions/:id',async(req,res)=>{
    myid=req.params.id
    try{
        const launches=await Launches.find({_id: myid},{launch_sub_functions:1})
        console.log(launches)
        res.send(launches)
    }catch(err){
        console.log(err)
        res.send("Launch not found")
    }
})

//@desc Fetching a particular launch sub function
//@route GET
router.get('/read/launch_sub_functions/:id/:sfid',async(req,res)=>{
    myid=req.params.id
    mysfid=req.params.sfid
    try{
        const launches=await Launches.find(
            {_id: myid},
            {
                launch_sub_functions: {
                  "$elemMatch": {
                    "_id": mysfid
                  }
                }
            })
        console.log(launches)
        res.send(launches)
    }catch(err){
        console.log(err)
        res.send("Launch department not found")
    }
})

//@desc Fetching all projects of a particular launch sub function
//@route GET
router.get('/read/launch_sub_functions/projects/:id/:sfid',async(req,res)=>{
    myid=req.params.id
    mysfid=req.params.sfid
    try{
        const launches=await Launches.find(
            {_id: myid},
            {
                launch_sub_functions: {
                  "$elemMatch": {"_id": mysfid}
                }
            })
        console.log(launches[0].launch_sub_functions[0].projects)
        res.send(launches[0].launch_sub_functions[0].projects)
    }catch(err){
        console.log(err)
        res.send("Launch project not found")
    }
})

//@desc Fetching a particular project of a particular launch sub function using index on project array
//@route GET
router.get('/read/launch_sub_functions/projects/:id/:sfid/:pindex',async(req,res)=>{
    myid=req.params.id
    mysfid=req.params.sfid
    pindex=req.params.pindex
    try{
        // const launches=await Launches.find(
        //     {_id: myid},
        //     {
        //         launch_sub_functions: {
        //           "$elemMatch": {"_id": mysfid}
        //         }
        //     })
        // console.log(launches[0].launch_sub_functions[0].projects[pindex])
        // res.send(launches[0].launch_sub_functions[0].projects[pindex])

        const launches=await Launches.aggregate([
            {
                $match: {
                    _id: myid	
                }
            },
            {
                $unwind: '$launch_sub_functions'
            },
            {
                $match: {
                    _id: mysfid
                }
            }
        ])

        console.log(launches)
        res.send(launches)

    }catch(err){
        console.log(err)
        res.send("Launch project not found")
    }
})

//@desc Fetching all activities of a particular project of a particular launch sub function using index on project array
//@route GET
router.get('/read/launch_sub_functions/projects/activities/:id/:sfid/:pindex',async(req,res)=>{
    myid=req.params.id
    mysfid=req.params.sfid
    pindex=req.params.pindex
    try{
        const launches=await Launches.find(
            {_id: myid},
            {
                launch_sub_functions: {
                  "$elemMatch": {"_id": mysfid}
                }
            })
        console.log(launches[0].launch_sub_functions[0].projects[pindex].activities)
        res.send(launches[0].launch_sub_functions[0].projects[pindex].activities)
    }catch(err){
        console.log(err)
        res.send("Launch project not found")
    }
})

//@desc Fetching a particular activity of a particular project of a particular launch sub function using index on project array
//@route GET
router.get('/read/launch_sub_functions/projects/activities/:id/:sfid/:pindex/:aindex',async(req,res)=>{
    myid=req.params.id
    mysfid=req.params.sfid
    pindex=req.params.pindex
    aindex=req.params.aindex
    try{
        const launches=await Launches.find(
            {_id: myid},
            {
                launch_sub_functions: {
                  "$elemMatch": {"_id": mysfid}
                }
            })
        console.log(launches[0].launch_sub_functions[0].projects[pindex].activities[aindex])
        res.send(launches[0].launch_sub_functions[0].projects[pindex].activities[aindex])
    }catch(err){
        console.log(err)
        res.send("Launch project not found")
    }
})


//@desc Inserting in launch departments
//@route POST
router.post('/insert/launch_departments/:id',jsonParser,async(req,res)=>{
    try{
        const dept=req.body
        myid=req.params.id
        const launches=await Launches.update({_id:myid},{
            $push: {
                launch_departments: dept
            }})
        res.send("Done with insertion!")
    }catch(err){
        console.log(err)
        res.send("Cannot insert")
    }
})

//@desc Inserting in functions array of launch departments
//@route POST
router.post('/insert/launch_departments/functions/:id/:did',jsonParser,async(req,res)=>{
    try{
        const fun=req.body.functions[0]
        myid=req.params.id
        mydid=req.params.did
        const launches=await Launches.update({_id:myid, "launch_departments._id" :mydid},{
            $push: {
                "launch_departments.$.functions": fun
            }})
        res.send("Done with insertion!")
    }catch(err){
        console.log(err)
        res.send("Cannot insert")
    }
})

//@desc Inserting in launch functions
//@route POST
router.post('/insert/launch_functions/:id',jsonParser,async(req,res)=>{
    try{
        const fun=req.body
        myid=req.params.id
        const launches=await Launches.update({_id:myid},{
            $push: {
                launch_functions: fun
            }})
        res.send("Done with insertion!")
    }catch(err){
        console.log(err)
        res.send("Cannot insert")
    }
})

//@desc Inserting in sub functions array of launch functions
//@route POST
router.post('/insert/launch_functions/sub_functions/:id/:fid',jsonParser,async(req,res)=>{
    try{
        const fun=req.body.functions[0]
        myid=req.params.id
        myfid=req.params.fid
        const launches=await Launches.update({_id:myid, "launch_departments._id" :myfid},{
            $push: {
                "launch_functions.$.sub_functions": fun
            }})
        res.send("Done with insertion!")
    }catch(err){
        console.log(err)
        res.send("Cannot insert")
    }
})

//@desc Inserting in launch sub functions
//@route POST
router.post('/insert/launch_sub_functions/:id',jsonParser,async(req,res)=>{
    try{
        const fun=req.body
        myid=req.params.id
        const launches=await Launches.update({_id:myid},{
            $push: {
                launch_sub_functions: fun
            }})
        res.send("Done with insertion!")
    }catch(err){
        console.log(err)
        res.send("Cannot insert")
    }
})

//@desc Inserting in projects array of launch sub functions
//@route POST
router.post('/insert/launch_sub_functions/projects/:id/:sfid',jsonParser,async(req,res)=>{
    try{
        const fun=req.body
        console.log(fun)
        myid=req.params.id
        mysfid=req.params.sfid
        const launches=await Launches.update({_id:myid, "launch_sub_functions._id" :mysfid},{
            $push: {
                "launch_sub_functions.$.projects": fun
            }})
        res.send("Done with insertion!")
    }catch(err){
        console.log(err)
        res.send("Cannot insert")
    }
})

//@desc Inserting in activity array of projects array of launch sub functions
//@route POST
// router.post('/insert/launch_sub_functions/projects/activities/:id/:sfid/:pid',jsonParser,async(req,res)=>{
//     try{
//         const fun=req.body.functions[0]
//         myid=req.params.id
//         mysfid=req.params.sfid
//         mypid=req.params.pid
//         const launches=await Launches.update({_id:myid, "launch_sub_functions._id" :mysfid},{
//             $push: {
//                 "launch_sub_functions.$.projects": fun
//             }})
//         res.send("Done with insertion!")
//     }catch(err){
//         console.log(err)
//         res.send("Cannot insert")
//     }
// })



//@desc Inserting in activity array of projects array of launch sub functions
//@route POST
router.post('/insert/launch_sub_functions/projects/activities/:id/:sfid/:pid',jsonParser,async(req,res)=>{
    try{
        const fun=req.body
        console.log(fun)
        myid=req.params.id
        mysfid=req.params.sfid
        mypid=req.params.pid
        const launches=await Launches.updateOne({_id:myid},{
            $push: {
                "launch_sub_functions.0.projects.2.activities": fun
            }})
        console.log(launches)
        res.send("Done with insertion!")
    }catch(err){
        console.log(err)
        res.send("Cannot insert")
    }
})

//@desc Updating an activity of projects array of launch sub functions
//@route POST
router.post('/insert/launch_sub_functions/projects/activities/update/:id/:sfid/:pid',jsonParser,async(req,res)=>{
    try{
        const fun=req.body
        console.log(fun)
        myid=req.params.id
        mysfid=req.params.sfid
        mypid=req.params.pid
        const launches=await Launches.findOneAndUpdate({_id:myid},{
            $set: {
                "launch_sub_functions.0.projects.10.activities.0.activity_name": "Priyanka"
            }})
        console.log(launches)
        res.send("Done with insertion!")
    }catch(err){
        console.log(err)
        res.send("Cannot insert")
    }
})

//@desc Inserting
//@route POST
router.post('/insert',async(req,res)=>{
    try{
        let newLaunch = {
            "launch_id": "01",
            "product_id": "hjd8fbsd90bd",
            "product_name": "Lenacapavir_UBI-6201",
            "organization_id": "asjdhhj788sdf",
            "launch_name": "Lenacapavir_UBI-6201_India",
            "launch_type": "New Product(12-18 months)",
            "launch_date": new Date(Date.now()),
            "launch_activity_start_date": new Date(Date.now()),
            "launch_salesforce_launch_readiness_date": new Date(Date.now()),
            "launch_commercial_launch_readiness_date": new Date(Date.now()),
            "launch_region": "APAC",
            "launch_country": "India",
            "launch_theraputic_area": "Oncology",
            "launch_indication": "ALL",
            "launch_lead_id": "kjdf89df",
            "launch_lead_full_name": "Prem Laila",
            "launch_program_manager_id": "jgsdhsdf9sdf9087",
            "launch_program_manager_full_name": "Liz Huber",
            "launch_departments": [
                {
                    "department_id": "01_D01",
                    "department_name": "Commercial",
                    "functions": ["F001", "F002", "F003"]
                },
                {
                    "department_id": "D002",
                    "department_name": "IT",
                    "functions": ["F003", "F004", "F005"]
                }
            ],
            "launch_functions": [
                {
                    "function_id": "01_D01_F01",
                    "function_name": "Market Access",
                    "sub_functions": ["SB001, SB002"]
                },
                {
                    "function_id": "F002",
                    "function_name": "Commercial Ops",
                    "sub_functions": ["SB002, SB003"]
                },
                {
                    "function_id": "F003",
                    "function_name": "Marketing",
                    "sub_functions": ["SB001, SB003"]
                }
            ],
            "launch_sub_functions": [
                {
                    "sub_function_id": "SF001",
                    "sub_function_name": "Disease Ad Campaign",
                    "projects": [
                        {
                            "project_id": "hj7dsfhjsdfsd",
                            "project_name": "Identify Agencies for Patient Promotions",
                            "project_start_date": new Date(Date.now()),
                            "project_end_date": new Date(Date.now()),
                            "project_progress_percentage": 70,
                            "project_upstream_dependency": [ "Disease Ed Campaign Development" ],
                            "project_downstream_dependency": [ "Disease Journal Add", "Patient Brochure Readiness" ],
                            "project_lead_id": "hdf8787bjds",
                            "project_lead_name": "Emily Price",
                            "project_comments_id": "hjsdf79889bsdhf",
                            "activities": [
                                {
                                    "activity_id": "01_D01_F01_SB01_P01_A01",
                                    "activity_name": "Finalize & Select Agency",
                                    "activity_progress_precentage": 40,
                                    "activity_buffer_days": 7,
                                    "activity_is_milestone": true,
                                    "activity_is_critical_path": false,
                                    "activity_start_date": new Date(Date.now()),
                                    "activity_end_date": new Date(Date.now())
                                },
                                {
                                    "activity_name": "Internal Discussion",
                                    "activity_progress_precentage": 40,
                                    "activity_buffer_days": 7,
                                    "activity_is_milestone": true,
                                    "activity_is_critical_path": false,
                                    "activity_start_date": new Date(Date.now()),
                                    "activity_end_date": new Date(Date.now())
                                }
                            ]
                        },
                        {
                            "project_name": "Identify Agencies for Patient Promotions",
                            "project_start_date": new Date(Date.now()),
                            "project_end_date": new Date(Date.now()),
                            "project_progress_percentage": 70,
                            "project_upstream_dependency": [ "Disease Ed Campaign Development" ],
                            "project_downstream_dependency": [ "Disease Journal Add", "Patient Brochure Readiness" ],
                            "project_lead_id": "hdf8787bjds",
                            "project_lead_name": "Emily Price",
                            "project_comments_id": "hjsdf79889bsdhf",
                            "activities": [
                                {
                                    "activity_name": "Finalize & Select Agency",
                                    "activity_progress_precentage": 40,
                                    "activity_buffer_days": 7,
                                    "activity_is_milestone": true,
                                    "activity_is_critical_path": false,
                                    "activity_start_date": new Date(Date.now()),
                                    "activity_end_date": new Date(Date.now())
                                },
                                {
                                    "activity_name": "Internal Discussion",
                                    "activity_progress_precentage": 40,
                                    "activity_buffer_days": 7,
                                    "activity_is_milestone": true,
                                    "activity_is_critical_path": false,
                                    "activity_start_date": new Date(Date.now()),
                                    "activity_end_date": new Date(Date.now())
                                }
                            ]
                        }
                    ]
                }
            ],
        }

        let l= await Launches.create(newLaunch);
        res.send("Done with insertion!")
    }catch(err){
        console.log(err)
        res.send("Cannot insert")
    }
})


module.exports=router