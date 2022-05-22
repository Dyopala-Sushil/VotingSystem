const {Voter, Organizer} = require("../models/users.model");
const bcrypt = require("bcrypt");

class UserController{
    getVoter(req,res,next){
        Voter.find()
        .then((voters)=>{
            res.json(voters)
        })
        .catch((err)=>{
            res.json({
                "status":false,
                "msg":"voter not added",
                "data": err
            })
        })
    }

    getOrganizer(req,res,next){
        Organizer.find()
        .then((organizers)=>{
            res.json(organizers)
        })
        .catch((err)=>{
            res.json({
                "status":false,
                "msg":"voter not added",
                "data": err
            })
        })
    }

    getVoterById(req,res,next){
        Voter.findById(req.params.voter_id)
        .then((voter)=>{
            if(voter){
                res.json({
                    "status":true,
                    "msg":"voter found",
                    "data":voter
                })
            }else{
                res.json({
                    "status":true,
                    "msg":"voter not found",
                    "data": voter
                })
            }
            
        })
        .catch((err)=>{
            res.json({
                "status":false,
                "msg":"error occured",
                "data":err
            })
        })
    }

    getOrganizerById(req,res,next){
        Organizer.findById(req.params.organizer_id)
        .then((organizer)=>{
            if(organizer){
                res.json({
                    "status":true,
                    "msg":"organizer found",
                    "data":organizer
                })
            }else{
                res.json({
                    "status":true,
                    "msg":"organizer not found",
                    "data": organizer
                })
            }
            
        })
        .catch((err)=>{
            res.json({
                "status":false,
                "msg":"error occured",
                "data":err
            })
        })
    }

    updateVoterById(req,res,next){
        Voter.findByIdAndUpdate(
            req.params.voter_id,
            {
                $set : req.body
            },{
                upsert: true
            }
        )
        .then((success)=>{
            res.json({
                "status":true,
                "msg": "voter updated",
                "data":success
            })
        })
        .catch((err)=>{
            res.json({
                "status":false,
                "msg": "error occured",
                "data": err
            })
        })
    }

    updateOrganizerById(req,res,next){
        let organizer = req.body
        if(req.file){
            organizer.companyLogo = req.file.filename
        }
        Organizer.findByIdAndUpdate(
            req.params.organizer_id,
            {
                $set : organizer
            },{
                upsert: true
            }
        )
        .then((success)=>{
            res.json({
                "status":true,
                "msg": "organizer updated",
                "data":success
            })
        })
        .catch((err)=>{
            res.json({
                "status":false,
                "msg": "error occured",
                "data": err
            })
        })
    }

    deleteVoterById(req,res,next){
        Voter.findByIdAndDelete(req.params.voter_id)
        .then((success)=>{
            res.json({
                "status":true,
                "msg":"voter deleted successfully",
                "data": success
            })
        })
        .catch((err)=>{
            res.json({
                "status":false,
                "msg":"error occured",
                "data":err
            })
        })
    }

    deleteOrganizerById(req,res,next){
        Organizer.findByIdAndDelete(req.params.organizer_id)
        .then((success)=>{
            res.json({
                "status":true,
                "msg":"organizer deleted successfully",
                "data": success
            })
        })
        .catch((err)=>{
            res.json({
                "status":false,
                "msg":"error occured",
                "data":err
            })
        })
    }

    registerVoter(req,res,next){
        const voter = new Voter(req.body)
        bcrypt.hash(voter.password,10)
        .then((hash)=>{
            //success
            voter.password = hash

            voter.save()
            .then((success)=>{
                res.json({
                    "status":true,
                    "msg":"voter added successfully",
                    "data": voter
                })
            })
            .catch((err)=>{
                res.json({
                    "status":false,
                    "msg":"voter not added",
                    "data": err
                })
            })
            
        })
        .catch((err)=>{
            res.json({
                "status":false,
                "msg":"hashing error",
                "data":err
            })
        })
    }


    registerOrganizer(req,res,next){
        const organizer = new Organizer(req.body);
        console.log(organizer)
        if(req.file){
            console.log(req.file)
            organizer.companyLogo = req.file.filename
        }
        bcrypt.hash(organizer.organizerLead.password,10)
        .then((hash)=>{
            organizer.organizerLead.password = hash
            organizer.save()
            .then((success)=>{
                res.json({
                    "status":true,
                    "msg":"organizer added successfully",
                    "data":organizer
                })
            })
            .catch((err)=>{
                res.json({
                    "status":false,
                    "msg":"organizer not added",
                    "data":err
                })
            })
        })
        .catch((err)=>{
            res.json({
                "status":false,
                "msg":"password hashing error",
                "data":err
            })
        })
    }
}

module.exports = UserController;