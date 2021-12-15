const mongoose=require("mongoose");

const LaunchesSchema=new mongoose.Schema({
    launch_id:{
        type: String,   
    },
    product_id:{
        type: String,  
    },
    product_name:{
        type: String, 
    },
    organization_id: {
        type: String,
    },
    launch_name:{
        type: String,
    },
    launch_type:{
        type: String,
    },
    launch_date:{
        type: Date,
    },
    launch_activity_start_date:{
        type: Date,
    },
    launch_salesforce_launch_readiness_date:{
        type: Date,
    },
    launch_commercial_launch_readiness_date:{
        type: Date,
    },
    launch_region:{
        type: String,
    },
    launch_country:{
        type: String,
    },
    launch_theraputic_area:{
        type: String,
    },
    launch_indication:{
        type: String,   
    },
    launch_lead_id:{
        type: String, 
    },
    launch_lead_full_name:{
        type: String,
    },
    launch_program_manager_id:{
        type: String, 
    },
    launch_program_manager_full_name:{
        type: String, 
    },
    launch_departments:[
        {
            department_id: String,
            department_name: String,
            functions: Array
        }
    ],
    launch_functions:[
        {
            function_id: String,
            function_name: String,
            sub_functions: Array
        }
    ],
    launch_sub_functions:[
        {
            sub_function_id: String,
            sub_function_name: String,
            projects: [
                {
                    project_id: String,
                    project_name: String,
                    project_start_date: Date,
                    project_end_date: Date,
                    project_progress_percentage: Number,
                    project_upstream_dependency: Array,
                    project_downstream_dependency: Array,
                    project_lead_id: String,
                    project_comments_id: String,
                    activities:[
                        {
                            activity_id: String,
                            activity_name: String,
                            activity_progress_percentage: Number,
                            activity_buffer_days: Number,
                            activity_is_milestone: Boolean,
                            activity_is_critical_path: Boolean,
                            activity_start_date: Date,
                            activity_end_date: Date
                        }
                    ]
                }
            ]
        }
    ],
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }
})

module.exports=mongoose.model('Launches',LaunchesSchema);